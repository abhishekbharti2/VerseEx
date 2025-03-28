import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import "../styles/ChatEx.css";

const socket = io("https://server-verseex.onrender.com");

export default function ChatEx() {
  const [posts, setPosts] = useState([]);
  const [userInput, setUserInput] = useState("");
  const chatFeedRef = useRef(null);
  const [username, setUser] = useState("Cosmic Explorer");

  useEffect(() => {
    fetch("https://server-verseex.onrender.com/chatex")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching messages:", err));

    socket.on("receiveMessage", (message) => {
      setPosts((prevPosts) => [...prevPosts, message]);
    });

    return () => socket.off("receiveMessage");
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
      timestamp: new Date().toLocaleTimeString([], { 
        hour: "2-digit", 
        minute: "2-digit", 
        hour12: false 
      }),
    };

    try {
      await fetch("https://server-verseex.onrender.com/chatex", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });
      socket.emit("sendMessage", newPost);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setUserInput("");
  };

  return (
    <div className="cosmic-chat">
      <div className="chat-window">
        <div className="message-feed" ref={chatFeedRef}>
          {posts.map((post, index) => (
            <div 
              key={index} 
              className={`message-bubble ${
                post.username === username ? "sent" : "received"
              }`}
            >
              <div className="message-meta">
                <span className="message-sender">
                  {post.username}
                </span>
                <span className="message-time">
                  {post.timestamp}
                </span>
              </div>
              <div className="message-text">
                {post.message}
              </div>
            </div>
          ))}
        </div>
        
        <div className="chat-controls">
          <div className="username-editor" >
            <span className="username-label">You are:</span>
            <input className="message-input" style={{color: "green"}} value={username} onChange={(u) => setUser(u.target.value)}/>
            <span className="edit-icon fa fa-pencil"></span>
          </div>
          
          <form className="message-form" onSubmit={handlePost}>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your interstellar message..."
              className="message-input"
            />
            <button 
              type="submit" 
              className="send-button fa fa-paper-plane"
            ></button>
          </form>
        </div>
      </div>
    </div>
  );
}