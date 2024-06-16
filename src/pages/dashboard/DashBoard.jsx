import React, { Suspense, useState, useEffect } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../api/ApiConfig';
import LoadingSpinner from '../../components/loadingspinner/LoadingSpinner';
import Chat from '../../components/chat/Chat';
import useAuth from '../../hooks/useAuth';
import { useCurrentUser } from '../../context/CurrentUserContext';
import styles from './dash.module.css';

const Projects = React.lazy(() => import('../profile/Projects'));
const Settings = React.lazy(() => import('../profile/Settings'));

function Welcome() {
  const { profile } = useCurrentUser();
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const fetchOnlineUsers = async () => {
      try {
        const response = await axiosInstance.get('profiles/online/');
        setOnlineUsers(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        setOnlineUsers([]);
      }
    };

    fetchOnlineUsers();
  }, []);

  return (
    <div className={styles.welcome}>
      <div className={styles.profile}>
        <img src={profile?.avatar || '/default-avatar.png'} alt="Profile" />
        <h3>{profile?.username}</h3>
        <p>{profile?.bio}</p>
        <p>{profile?.location}</p>
      </div>
      <div className={styles.onlineUsers}>
        <h4>Online Users</h4>
        <ul>
          {onlineUsers.map((onlineUser) => (
            <li key={onlineUser.id}>{onlineUser.username}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Dashboard() {
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
          <Link to="/dashboard">Home</Link>
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
            <Route path="projects" element={<Projects />} />
            <Route path="settings" element={<Settings />} />
            <Route path="chat" element={<Chat />} />
            <Route path="/dashboard" element={<Welcome />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default Dashboard;
