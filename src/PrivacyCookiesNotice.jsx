import React, { useState, useEffect } from 'react';

const PrivacyCookiesNotice = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already accepted the policy
    const hasAccepted = localStorage.getItem('privacyAccepted');
    if (!hasAccepted) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('privacyAccepted', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div style={bannerStyle}>
      <p>
        We use cookies to ensure you get the best experience on our website. By using our site, you agree to our 
        <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className='text-primary' style={linkStyle}> Privacy Policy</a> and 
        <a href="/cookie-policy" target="_blank" rel="noopener noreferrer" className='text-primary' style={linkStyle}> Cookie Policy</a>.
      </p>
      <button onClick={handleAccept} style={buttonStyle}>
        Accept
      </button>
    </div>
  );
};

// Styles for the banner and button
const bannerStyle = {
  position: 'fixed',
  bottom: 0,
  width: '100%',
  backgroundColor: '#333',
  color: '#fff',
  textAlign: 'center',
  padding: '1rem',
  zIndex: 1000,
};

const buttonStyle = {
  marginLeft: '1rem',
  backgroundColor: '#4CAF50',
  color: '#fff',
  border: 'none',
  padding: '0.5rem 1rem',
  cursor: 'pointer',
};

const linkStyle = {
  color: '#4CAF50',
  marginLeft: '0.3rem',
};

export default PrivacyCookiesNotice;
