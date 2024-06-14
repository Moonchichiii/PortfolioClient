import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../api/ApiConfig';
import styles from './ChatBot.module.css';
import chatbotImage from '../../assets/images/chatt.webp';

const ChatBot = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    
    const fetchCsrfToken = async () => {
      try {
        const res = await axiosInstance.get('chat/csrf/');
        setCsrfToken(res.data.csrfToken);
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    };

    fetchCsrfToken();
  }, []);

  const handleSendMessage = async () => {
    try {
      const res = await axiosInstance.post(
        'chat/chat/',
        { message },
        {
          headers: {
            'X-CSRFToken': csrfToken
          }
        }
      );
      setResponse(res.data.response);
    } catch (error) {
      setResponse('An error occurred. Please try again.');
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.chatbotContainer}>
      <div className={styles.tooltipContainer} onClick={toggleChat}>
        <span className={styles.tooltip}>Ask me!</span>
        <img
          src={chatbotImage}
          alt="Chatbot"
          className={styles.chatbotImage}
        />
      </div>
      <div className={`${styles.chatContainer} ${isOpen ? styles.visible : ''}`}>
        <div className={styles.chatResponse}>
          <p>{response}</p>
        </div>
        <div className={styles.chatBox}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className={styles.chatInput}
          />
          <button onClick={handleSendMessage} className={styles.chatButton}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
