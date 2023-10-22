import React from 'react';

const NotFound = ({ children }) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        textAlign: 'center',
      }}
    >
      <h2>{children}</h2>
    </div>
  );
};

export default NotFound;
