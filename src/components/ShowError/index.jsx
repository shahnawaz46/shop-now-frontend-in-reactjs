const ShowError = ({ message }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
      }}
    >
      {message}
    </div>
  );
};

export default ShowError;
