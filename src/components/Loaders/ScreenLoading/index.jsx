import React from 'react';
import { HashLoader } from 'react-spinners';

const ScreenLoading = ({ backgroundColor = '#fff' }) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: backgroundColor,
        position: 'fixed',
        inset: 0,
        zIndex: 999,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <HashLoader color="#36d7b7" />
      </div>
    </div>
  );
};

export default ScreenLoading;
