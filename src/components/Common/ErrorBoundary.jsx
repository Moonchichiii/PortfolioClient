import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styles from './error.module.css'; 

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error, errorInfo) {
    
    console.error(error, errorInfo);
  }

  handleRetry = () => {
    const { history } = this.props;
    this.setState({ hasError: false, errorMessage: '' });
    history.goBack();
  };

  render() {
    const { hasError, errorMessage } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <div className={styles.errorContainer}>
          <h1>Something went wrong.</h1>
          <p>{errorMessage}</p>
          <button type="button" onClick={this.handleRetry}>Return to Previous Page</button>
          <img src="https://res.cloudinary.com/dakjlrean/image/upload/v1718437131/fu56rvqkfjsdkttj5dnq.webp" alt="Funny" className={styles.errorImage} />
        </div>
      );
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(ErrorBoundary);
