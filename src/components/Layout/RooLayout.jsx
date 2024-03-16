import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';

const RootLayout = ({ children, footer = true }) => {
  return (
    <>
      <Navbar />
      {children}
      {footer && <Footer />}
    </>
  );
};

export default RootLayout;
