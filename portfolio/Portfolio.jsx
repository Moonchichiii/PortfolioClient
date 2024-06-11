import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GitHubCalendar from 'react-github-calendar';
import styles from './port.module.css';

function Portfolio() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const repoResponse = await axios.get(
          'https://api.github.com/users/Moonchichiii/repos',
        );
        setRepos(repoResponse.data);
      } catch (error) {
        console.error('Error fetching GitHub data', error);
      }
    };

    fetchGitHubData();
  }, []);

  return (
    <div className={styles.portfolio}>
      <div className="container">
        <h2>My Portfolio</h2>
        <div className="row">
          {repos.slice(0, 6).map((repo) => (
            <div className="col-md-4" key={repo.id}>
              <div className={styles.projectCard}>
                <h3>{repo.name}</h3>
                <p>{repo.description}</p>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
        <h2>GitHub Contribution Calendar</h2>
        <div className={styles.calendar}>
          <GitHubCalendar username="Moonchichiii" />
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
