import React from 'react';

const NotFound = ({ children }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '45%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        padding: '20px',
        textAlign: 'center',
      }}
    >
      <h2 style={{ fontSize: '22px' }}>{children}</h2>
    </div>
  );
};

export default NotFound;
