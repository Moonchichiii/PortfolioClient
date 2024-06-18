import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { axiosInstance } from '../../api/ApiConfig'; // Import axiosInstance
import styles from './chat.module.css';

function Chat({ roomName }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);
  const messageEndRef = useRef(null);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    // Fetch chat messages
    const fetchMessages = async () => {
      try {
        const response = await axiosInstance.get(`/api/livechat/${roomName}/messages/`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    // Fetch online users
    const fetchOnlineUsers = async () => {
      try {
        const response = await axiosInstance.get('/api/livechat/online/');
        setOnlineUsers(response.data);
      } catch (error) {
        console.error('Error fetching online users:', error);
      }
    };

    fetchOnlineUsers();

    // Scroll to the end of the messages
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });

  }, [roomName, isAuthenticated]);

  const sendMessage = async () => {
    if (message.trim()) {
      const messageData = { content: message, room: roomName };
      try {
        const response = await axiosInstance.post(`/api/livechat/${roomName}/messages/`, messageData);
        setMessages((prevMessages) => [...prevMessages, response.data]);
        setMessage('');
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  if (!isAuthenticated) {
    return <div>Please log in to join the chat.</div>;
  }

  return (
    <div className={styles.chatContainer}>
      <div className={styles.onlineUsers}>
        <h3>Online Users</h3>
        <ul>
          {onlineUsers.map((onlineUser, index) => (
            <li key={index} className={styles.onlineUser}>
              <img src={onlineUser.avatar || '/default-avatar.png'} alt="Avatar" className={styles.avatar} />
              <span>{onlineUser.username}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.chatArea}>
        <h2>Chat</h2>
        <div className={styles.messageContainer}>
          {messages.map((msg, index) => (
            <div key={index} className={`${styles.message} ${msg.user === user.username ? styles.myMessage : ''}`}>
              <img src={msg.avatar || '/default-avatar.png'} alt="Avatar" className={styles.avatar} />
              <div>
                <strong>{msg.user}</strong>: {msg.content}
              </div>
            </div>
          ))}
          <div ref={messageEndRef} />
        </div>
        <div className={styles.inputContainer}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
          />
          <button type="button" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
