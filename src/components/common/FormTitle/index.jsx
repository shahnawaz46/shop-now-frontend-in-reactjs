import './style.css';

const FormTitle = ({
  text,
  children,
  display = 'flex',
  flexDirection = 'column',
  justifyContent = 'flex-start',
  alignItems = 'flex-start',
  marginBottom = '20px',
  fontWeight = 500,
}) => {
  return (
    <div
      style={{
        display,
        flexDirection,
        alignItems,
        justifyContent,
        marginBottom,
      }}
    >
      <h1 className="title" style={{ fontWeight }}>
        {text}
      </h1>
      {children}
    </div>
  );
};

export default FormTitle;
