import './style.css';

const CustomButton = ({
  text,
  type = 'button',
  backgroundColor = '#478ccd',
  color = '#fff',
  width = '100%',
  onClick,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="custom-button"
      style={{ backgroundColor, color, width }}
    >
      {text}
    </button>
  );
};

export default CustomButton;
