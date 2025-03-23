import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import "../styles/ChatEx.css";

const socket = io("https://server-verseex.onrender.com"); // Connect to backend

export default function ChatEx() {
  const [posts, setPosts] = useState([]);
  const [userInput, setUserInput] = useState("");
  const chatFeedRef = useRef(null);
  const [username, setUser] = useState("unknown"); // Default username

  // Fetch chat history when the component loads
  useEffect(() => {
    fetch("https://server-verseex.onrender.com/chatex")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching messages:", err));

    // Listen for new messages from Socket.IO
    socket.on("receiveMessage", (message) => {
      setPosts((prevPosts) => [...prevPosts, message]);
    });

    return () => socket.off("receiveMessage"); // Cleanup on unmount
  }, []);

  useEffect(() => {
    if (chatFeedRef.current) {
      chatFeedRef.current.scrollTop = chatFeedRef.current.scrollHeight;
    }
  }, [posts]);

  const handlePost = async (e) => {
    e.preventDefault();
    if (userInput.trim() === "") return;

    const newPost = {
      username,
      message: userInput,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }),
    };

    // Send to backend (save in MongoDB)
    try {
      await fetch("https://server-verseex.onrender.com/chatex", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });

      // Emit message to all users via Socket.IO
      socket.emit("sendMessage", newPost);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setUserInput("");
  };

  return (
    <div className="chat-container">
      <div className="chat-feed" ref={chatFeedRef}>
        {posts.map((post, index) => (
          <div key={index} className={`chat-message ${post.username === username ? "my-message" : "other-message"}`}>
            <div className="message-content" style={{backgroundColor:post.username === username ? `rgb(35, 0, 49)`: `rgb(0, 40, 1)`}}>
              <div className="message-header">
                <span className="sender-name">{post.username}</span>
                <span className="timestamp">{post.timestamp}</span>
              </div>
              <p>{post.message}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <span className='usernamein' onClick={() => setUser(prompt('enter your name'))}>Your Name ?</span>
        <form onSubmit={handlePost}>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button type="submit" className="fa fa-send"></button>
        </form>
      </div>
    </div>
  );
}
