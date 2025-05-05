import CustomButton from '../components/common/CustomButton';

const PageNotFound = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'var(--background-primary)',
        textAlign: 'center',
      }}
    >
      <div>
        <h1
          style={{
            color: 'var(--primary-color)',
            fontSize: '100px',
          }}
        >
          404
        </h1>
        <p
          style={{
            fontSize: '1.5rem',
            margin: '20px 0',
            color: 'var(--text-primary)',
          }}
        >
          Oops! The page you are looking for does not exist.
        </p>

        <a
          href="/"
          // style={{
          //   display: 'inline-block',
          //   padding: '10px 20px',
          //   fontSize: '18px',
          //   color: '#fff',
          //   backgroundColor: '#3498db',
          //   textDecoration: 'none',
          //   borderRadius: '5px',
          //   transition: 'background-color 0.3s',
          // }}
          // onMouseOver={(e) =>
          //   (e.currentTarget.style.backgroundColor = '2980b9')
          // }
          // onMouseOut={(e) =>
          //   (e.currentTarget.style.backgroundColor = '#3498db')
          // }
        >
          <CustomButton
            text={'Go to Homepage'}
            className={'page-not-found-btn'}
          />
        </a>
        {/* </CustomButton> */}
      </div>
    </div>
  );
};

export default PageNotFound;
