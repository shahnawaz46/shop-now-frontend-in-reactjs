import './style.css';

const CustomButton = ({
  text,
  type = 'button',
  // backgroundColor = '#478ccd',
  // color = '#fff',
  // width = '100%',
  disabled = false,
  onClick,
  className,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`custom-button ${className}`}
      // style={{ backgroundColor, color, width }}
    >
      {text}
    </button>
  );
};

export default CustomButton;
