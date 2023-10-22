import React from 'react';
import LoaderAnimation from '../../asset/Hourglass.gif';

const Loading = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
      }}
    >
      <img src={LoaderAnimation} alt="loader" />
    </div>
  );
};

export default Loading;
