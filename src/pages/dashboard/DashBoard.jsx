import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Link, Route, Routes } from 'react-router-dom';
import LoadingSpinner from '../../components/loadingspinner/LoadingSpinner';
import styles from './DashBoard.module.css';

const Profile = React.lazy(() => import('../profile/Profile'));
const Projects = React.lazy(() => import('../profile/Projects'));
const Settings = React.lazy(() => import('../profile/Settings'));

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className={styles.dashboard}>
      <aside className={styles.sidebar}>
        <div className={styles.profile}>
          <img src={user?.avatar || '/default-avatar.png'} alt="Profile" />
          <h3>{user?.username}</h3>
        </div>
        <nav className={styles.nav}>
          <Link to="profile">Profile</Link>
          <Link to="projects">Projects</Link>
          <Link to="settings">Settings</Link>
        </nav>
      </aside>
      <main className={styles.mainContent}>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="profile" element={<Profile />} />
            <Route path="projects" element={<Projects />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

export default Dashboard;
