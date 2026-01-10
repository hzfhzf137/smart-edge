import React from 'react';

export default function Loader() {
  return (
    <div style={loaderContainerStyle}>
      <h1 style={loaderTextStyle}>Smart Edge</h1>

      {/* Footmark */}
      <div style={footerStyle}>
        <p style={footerText}>
          Design and Developed by <strong>Huzaifa M.</strong>
        </p>
        <p style={footerText}>
          Contact:{' '}
          <a
            href="https://huzaifa-mahmood.online"
            target="_blank"
            rel="noopener noreferrer"
            style={footerLink}
          >
            huzaifa-mahmood.online
          </a>
        </p>
        <p style={footerText}>
          Email:{' '}
          <a href="mailto:hzfhzf137@gmail.com" style={footerLink}>
            hzfhzf137@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}

/* Container */
const loaderContainerStyle = {
  position: 'fixed',
  inset: 0,
  backgroundColor: 'black',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
};

/* Text (NO BLINK) */
const loaderTextStyle = {
  fontSize: '8vh',
  fontWeight: 'bold',
  background: 'linear-gradient(to right, rgba(0,0,255,0.7), grey)',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  opacity: 0,
  animation: 'fadeIn 1.2s ease forwards',
};

/* Footer */
const footerStyle = {
  position: 'absolute',
  bottom: '20px',
  textAlign: 'center',
};

const footerText = {
  color: '#aaa',
  fontSize: '12px',
  margin: '2px 0',
};

const footerLink = {
  color: '#6f8cff',
  textDecoration: 'none',
};
