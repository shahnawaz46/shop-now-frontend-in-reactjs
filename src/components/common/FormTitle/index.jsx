import React from 'react';
import './style.css';

const FormTitle = ({
  text,
  children,
  justifyContent = 'flex-start',
  fontWeight = 500,
}) => {
  return (
    <div className="title-container" style={{ justifyContent }}>
      <h1 className="title" style={{ fontWeight }}>
        {text}
      </h1>
      {children}
    </div>
  );
};

export default FormTitle;
