import React from 'react';
import { HashLoader } from 'react-spinners';

const ScreenLoading = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        zIndex: 999,
      }}
    >
      <HashLoader color='#36d7b7' />
    </div>
  );
};

export default ScreenLoading;
