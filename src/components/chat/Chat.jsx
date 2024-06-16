import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styles from './chat.module.css';

function Chat({ roomName }) {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);
  const messageEndRef = useRef(null);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const socketUrl = `${process.env.REACT_APP_WS_URL}/ws/chat/${roomName}/`;
    const newSocket = new WebSocket(socketUrl);

    newSocket.onopen = () => {
      console.log('WebSocket connection established');
    };

    newSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'chat_message') {
        setMessages((prevMessages) => [...prevMessages, { user: data.user, message: data.message }]);
      } else if (data.type === 'online_users') {
        setOnlineUsers(Array.isArray(data.users) ? data.users : []);
      }
    };

    newSocket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [roomName]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (socket && message.trim()) {
      const messageData = { type: 'chat_message', message, user: user.username };
      socket.send(JSON.stringify(messageData));
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setMessage('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

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
                <strong>{msg.user}</strong>: {msg.message}
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
