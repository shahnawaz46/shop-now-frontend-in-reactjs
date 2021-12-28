import React from 'react';
import Navbar from './Navbar';
import Banner from './Banner';
import MenWomenCard from './MenWomenCard';
import HomePageProducts from './HomePageProducts';
import Footer from './Footer';

const HomePage = () => {
    return (
        <>
            <Navbar />
            <Banner />
            <MenWomenCard />
            <HomePageProducts />
            <Footer />
        </>
    );
};

export default HomePage;
