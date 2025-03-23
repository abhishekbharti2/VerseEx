import React, { useState, useEffect, useRef } from 'react';
import '../styles/ChatEx.css'
import message from '../assets/message.json'

export default function ChatEx() {
  const [posts, setPosts] = useState(message || []);
  const [userInput, setUserInput] = useState("");
  const chatFeedRef = useRef(null);

  useEffect(() => {
    if (chatFeedRef.current) {
      chatFeedRef.current.scrollTop = chatFeedRef.current.scrollHeight;
    }
  }, [posts]);

  const handlePost = (e) => {
    e.preventDefault();
    if (userInput.trim() !== "") {
      const newPost = {
        text: userInput,
        id: Date.now(),
        sender: "You",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
        avatar: "https://th.bing.com/th/id/OIP.TvhHgD8EKy6DYNngT6gYswHaFS?w=182&h=130&c=7&r=0&o=5&dpr=1.3&pid=1.7"
      };
      setPosts([...posts, newPost]);
      setUserInput("");
    }
  };

  return (
    <div className='chat-container'>
      <div className='chat-feed' ref={chatFeedRef}>
        {posts.map((post, index) => (
          <div key={index} className={`chat-message ${post.sender === "You" ? "my-message" : "other-message"}`}>
            <img src={post.avatar} alt='User' className='avatar' />
            <div className='message-content' style={{ backgroundColor: `${post.sender === "You" ? "#22003e" : "#373737"}` }}>
              <div className='message-header'>
                <span className='sender-name'>{post.sender}</span>
                <span className='timestamp'>{post.timestamp}</span>
              </div>
              <p>{post.text || post.message}</p>
            </div>
          </div>
        ))}
      </div>
      <form className='chat-input' onSubmit={handlePost}>
        <input
          type='text'
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder='Type your message...'
        />
        <button type='submit' className='fa fa-send'></button>
      </form>
    </div>
  );
}
