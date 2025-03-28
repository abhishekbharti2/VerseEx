import { useState } from "react";

export default function NewAdd() {
    const [formData, setFormData] = useState({
        gmail: "",
        name: "",
        agency: "NASA",
        information: "",
        result: "",
        image: "",
        details: "",
        start: "",
        end: "",
    });

    const [responseMessage, setResponseMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const spaceAgencies = ["NASA", "ESA", "ISRO", "ROSCOSMOS", "CNSA", "JAXA"];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResponseMessage("");
    
        try {
            // Basic validation
            if (!formData.gmail || !formData.name || !formData.start || !formData.end) {
                throw new Error("Please fill all required fields");
            }
    
            const response = await fetch("https://server-verseex.onrender.com/api/missions/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to submit form");
            }
    
            const result = await response.json();
            setResponseMessage(result.message);
            
            // Reset form after successful submission
            setFormData({
                gmail: "",
                name: "",
                agency: "NASA",
                information: "",
                result: "",
                image: "",
                details: "",
                start: "",
                end: "",
            });
        } catch (error) {
            setResponseMessage(error.message || "Error submitting form. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="new-add-container" style={{ paddingTop: '60px' }}>
            <h2 className="new-add-title">Add New Mission</h2>
            
            <form className="new-add-form" onSubmit={handleSubmit}>
                <div className="new-add-form-row">
                    <div className="new-add-form-col">
                        <div className="new-add-form-group">
                            <label className="new-add-label">Email</label>
                            <input
                                type="email"
                                name="gmail"
                                className="new-add-input"
                                value={formData.gmail}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="new-add-form-group">
                            <label className="new-add-label">Mission Title</label>
                            <input
                                type="text"
                                name="name"
                                className="new-add-input"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="new-add-form-group">
                            <label className="new-add-label">Start Date</label>
                            <input
                                type="text"
                                name="start"
                                className="new-add-input"
                                value={formData.start}
                                onChange={handleChange}
                                required
                                placeholder="YYYY-MM-DD"
                            />
                        </div>

                        <div className="new-add-form-group">
                            <label className="new-add-label">Result</label>
                            <input
                                type="text"
                                name="result"
                                className="new-add-input"
                                value={formData.result}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="new-add-form-col">
                        <div className="new-add-form-group">
                            <label className="new-add-label">Space Agency</label>
                            <select
                                name="agency"
                                className="new-add-select"
                                value={formData.agency}
                                onChange={handleChange}
                            >
                                {spaceAgencies.map((agency) => (
                                    <option key={agency} value={agency}>
                                        {agency}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="new-add-form-group">
                            <label className="new-add-label">End Date</label>
                            <input
                                type="text"
                                name="end"
                                className="new-add-input"
                                value={formData.end}
                                onChange={handleChange}
                                required
                                placeholder="YYYY-MM-DD"
                            />
                        </div>

                        <div className="new-add-form-group">
                            <label className="new-add-label">Image URL</label>
                            <input
                                type="url"
                                name="image"
                                className="new-add-input"
                                value={formData.image}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="new-add-form-group">
                    <label className="new-add-label">Information</label>
                    <textarea
                        name="information"
                        className="new-add-textarea"
                        value={formData.information}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <div className="new-add-form-group">
                    <label className="new-add-label">Details</label>
                    <textarea
                        name="details"
                        className="new-add-textarea"
                        value={formData.details}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <button 
                    type="submit" 
                    className="new-add-submit-btn"
                    disabled={loading}
                >
                    {loading ? (
                        <span className="new-add-submit-loading">
                            <span className="new-add-spinner"></span>
                            Submitting...
                        </span>
                    ) : (
                        "Submit Mission"
                    )}
                </button>

                {responseMessage && (
                    <div className={`new-add-response ${
                        responseMessage.includes("Error") ? "new-add-error" : "new-add-success"
                    }`}>
                        {responseMessage}
                    </div>
                )}
            </form>
        </div>
    );
}