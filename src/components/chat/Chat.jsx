import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io(import.meta.env.VITE_SOCKET_URL);

function Chat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    socket.on('message', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    socket.on('online_users', (users) => {
      if (Array.isArray(users)) {
        setOnlineUsers(users);
      } else {
        setOnlineUsers([]);
      }
    });

    return () => {
      socket.off('message');
      socket.off('online_users');
    };
  }, []);

  const sendMessage = () => {
    socket.emit('sendMessage', { message });
    setMessage('');
  };

  return (
    <div>
      <h2>Chat</h2>
      <div>
        {messages.map((msg, index) => (
          <p key={msg.id || index}>
            <strong>{msg.username}</strong>: {msg.message}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="button" onClick={sendMessage}>
        Send
      </button>
      <div>
        <h3>Online Users</h3>
        <ul>
          {Array.isArray(onlineUsers) &&
            onlineUsers.map((user, index) => (
              <li key={user.id || index}>{user.username}</li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Chat;
