import React from 'react';


export default function Loader() {
  return (
    <div style={loaderContainerStyle}>
      <h1 style={loaderTextStyle}>Smart Edge</h1>
    </div>
  );
}

// Inline styles for the loader container
const loaderContainerStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'black',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 999,
};

// Inline styles for the gradient text
const loaderTextStyle = {
  fontSize: '8vh',
  fontWeight: 'bold',
  color: 'transparent', // We'll show gradient color with background-clip
  background: 'linear-gradient(to right, rgba(0, 0, 255, 0.582), grey)',
  WebkitBackgroundClip: 'text', // So the gradient is clipped by the text
  animation: 'fadeText 1s linear 1s forwards',
};
