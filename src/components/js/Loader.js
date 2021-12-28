import React, { useState, useEffect } from 'react';
import '../css/Loder.css';
import Logo from '../images/fuzicon_logo.png';
import { useHistory } from 'react-router';

const Loader = () => {
    const [preload, setPreload] = useState(true)
    const history = useHistory()

    useEffect(() => {
        setTimeout(() => {
            setPreload(false)
        }, 2000);
    }, [])

    return (
        <>
            {
                preload ?
                    <div className="home-reloader-box">
                        <img src={Logo} alt="" className="home-image-box" />
                    </div>
                    :
                    <>
                        {
                            history.push('/home')
                        }
                    </>
            }

        </>
    );
};

export default Loader;