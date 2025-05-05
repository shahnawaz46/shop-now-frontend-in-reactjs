import './style.css';

interface ICustomButtonProps {
  text: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
  onClick?: (...args: unknown[]) => void;
}

const CustomButton = ({
  text,
  type = 'button',
  // backgroundColor = '#478ccd',
  // color = '#fff',
  // width = '100%',
  disabled = false,
  onClick,
  className,
}: ICustomButtonProps) => {
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
