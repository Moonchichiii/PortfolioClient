import React, { Suspense, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/loadingspinner/LoadingSpinner';
import Chat from '../../components/chat/Chat';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { useCurrentUser } from '../../context/CurrentUserContext';

import styles from './dashboard.module.css';

const Profile = React.lazy(() => import('../profile/Profile'));
const Projects = React.lazy(() => import('../profile/Projects'));
const Settings = React.lazy(() => import('../profile/Settings'));

const Welcome = () => {
  const { user } = useSelector((state) => state.auth);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const fetchOnlineUsers = async () => {
      try {
        const response = await axios.get('/api/profiles/online/');
        if (Array.isArray(response.data)) {
          setOnlineUsers(response.data);
        } else {
          setOnlineUsers([]);
        }
      } catch (error) {
        console.error('Error fetching online users:', error);
        setOnlineUsers([]);
      }
    };

    fetchOnlineUsers();
  }, []);

  return (
    <div className={styles.welcome}>
      <div className={styles.profile}>
        <img src={user?.avatar || '/default-avatar.png'} alt="Profile" />
        <h3>{user?.username}</h3>
        <p>{user?.bio}</p>
        <p>{user?.location}</p>
      </div>
      <div className={styles.onlineUsers}>
        <h4>Online Users</h4>
        <ul>
          {Array.isArray(onlineUsers) &&
            onlineUsers.map((user, index) => (
              <li key={index}>{user.username}</li>
            ))}
        </ul>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { logout } = useAuth();
  const { profile } = useCurrentUser();
  const navigate = useNavigate();

  if (!profile) {
    return <LoadingSpinner />;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={styles.dashboard}>
      <aside className={styles.sidebar}>
        <nav className={styles.nav}>
          <Link to="profile">Profile</Link>
          <Link to="projects">Projects</Link>
          <Link to="settings">Settings</Link>
          <Link to="chat">Chat</Link>
          <span onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </span>
        </nav>
      </aside>
      <main className={styles.mainContent}>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="profile" element={<Profile />} />
            <Route path="projects" element={<Projects />} />
            <Route path="settings" element={<Settings />} />
            <Route path="chat" element={<Chat />} />
            <Route path="/" element={<Welcome />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

export default Dashboard;
