import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div style={{
      backgroundColor: '#111827',
      color: '#fff',
      padding: '5rem 1rem',
      textAlign: 'center'
    }}>
      <h1 style={{
        fontSize: '3rem',
        fontWeight: '700',
        marginBottom: '1rem',
        color: '#dc2626'
      }}>
        Login
      </h1>
    </div>
  );
};

const Options = () => {
  const cardStyle = {
    flex: '1',
    minWidth: '280px',
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '1rem',
    margin: '1rem',
    boxShadow: '0 0 30px rgba(0, 0, 0, 0.05)',
    textAlign: 'center',
    transition: 'all 0.3s ease-in-out',
    textDecoration: 'none',
    color: '#111827',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  };

  const iconStyle = {
    fontSize: '4rem',
    margin: '1rem 0',
    color: '#dc2626'
  };

  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '3rem 1rem',
    backgroundColor: '#f9fafb',
  };

  const hoverStyle = {
    transform: 'scale(1.03)',
    boxShadow: '0 0 40px rgba(220, 38, 38, 0.15)',
  };

  return (
    <div style={containerStyle}>
      <Link to="/login/projectsignup"
        className="link-flex-box"
        style={cardStyle}
        onMouseEnter={e => Object.assign(e.currentTarget.style, hoverStyle)}
        onMouseLeave={e => Object.assign(e.currentTarget.style, cardStyle)}
      >
        <h3 style={{ fontSize: '1.5rem', fontWeight: '600' }}>
          PROJECT<br />SIGNUP
        </h3>
        <i className="fa fa-user-plus" style={iconStyle} />
        <p style={{ color: '#dc2626', fontWeight: '500' }}>
          Click to Signup <i className="fa fa-arrow-right" />
        </p>
      </Link>

      <Link to="/login/projectlogin"
        className="link-flex-box"
        style={cardStyle}
        onMouseEnter={e => Object.assign(e.currentTarget.style, hoverStyle)}
        onMouseLeave={e => Object.assign(e.currentTarget.style, cardStyle)}
      >
        <h3 style={{ fontSize: '1.5rem', fontWeight: '600' }}>
          PROJECT<br />LOGIN
        </h3>
        <i className="fa fa-sign-in" style={iconStyle} />
        <p style={{ color: '#dc2626', fontWeight: '500' }}>
          Click to Login <i className="fa fa-arrow-right" />
        </p>
      </Link>
    </div>
  );
};

function Login() {
  return (
    <div>
      <Hero />
      <Options />
    </div>
  );
}

export default Login;
