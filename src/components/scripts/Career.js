import React, { useState } from 'react';
import Road from '../../DataSet/RoadMap.json';
import '../styles/Career.css';

export default function Career() {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" }
  ]);
  const [userInput, setUserInput] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);

  const handleSend = () => {
    if (userInput.trim() !== "") {
      const userMessage = { text: userInput, sender: "user" };
      setMessages([...messages, userMessage]);

    
      setIsWaiting(true);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Thankyou for your response!", sender: "bot" },
      ]);

  
      setTimeout(() => {
        const botResponse = { text: "Your message has been sent to experts, You'll be answered soon...", sender: "bot" };
        setMessages((prevMessages) => [
          ...prevMessages,
          botResponse,
        ]);
      }, 1500);
      setTimeout(() => {
        const botResponse = { text: "How else can I help you ?", sender: "bot" };
        setMessages((prevMessages) => [
          ...prevMessages,
          botResponse,
        ]);
        setIsWaiting(false);
      }, 3000);
      setUserInput("");
    }
  };

  return (
    <div className='career-container'>
      <div className="roadmap-container">
        <h3 className="roadmap-title">How to Become an Astronomer ?</h3>
        <div className="roadmap-steps">
          {Road.map((step, index) => (
            <div className="roadmap-step" key={index}>
              <span className="step-title" >{step.title}</span>
              <p className='step-description'>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="chatbot-container">
        <div className="chat-window" >
          <div className="messages" id='chat-win'>
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                <span>{msg.text}</span>
              </div>
            ))}
          </div>
          <form className="input-area">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your message..."
              disabled={isWaiting}
            />
            <button onClick={handleSend} type='submit' disabled={isWaiting}>Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};
