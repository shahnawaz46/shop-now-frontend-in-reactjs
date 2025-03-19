import { useEffect } from 'react';
import './style.css';
// import Logo from '../../../asset/shopnow_logo.png';
import { useNavigate } from 'react-router';

const IndexPageLoading = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // setTimeout(() => {
    navigate('/home');
    // }, 2000);
  }, []);

  return (
    // <div className='container'>
    //   <img src={Logo} alt='' className='loader-image' />
    // </div>
    <></>
  );
};

export default IndexPageLoading;
