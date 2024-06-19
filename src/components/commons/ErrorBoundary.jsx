import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styles from './errorboundry.module.css';

class ErrorBoundary extends Component {
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
    const { navigate } = this.props;
    this.setState({ hasError: false, errorMessage: '' });
    navigate(-1);
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
  navigate: PropTypes.func.isRequired,
};

const ErrorBoundaryWithNavigate = (props) => {
  const navigate = useNavigate();
  return <ErrorBoundary {...props} navigate={navigate} />;
};

export default ErrorBoundaryWithNavigate;
