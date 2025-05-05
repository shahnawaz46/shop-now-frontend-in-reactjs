import type { ReactNode } from 'react';
import './style.css';

interface IFormTitleProps {
  children?: ReactNode;
  text?: string;
  display?: 'flex' | 'block' | 'none';
  flexDirection?: 'column' | 'row';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  alignItems?: 'flex-start' | 'flex-end' | 'center';
  marginBottom?: string;
  fontWeight?: number;
}

const FormTitle = ({
  text,
  children,
  display = 'flex',
  flexDirection = 'column',
  justifyContent = 'flex-start',
  alignItems = 'flex-start',
  marginBottom = '20px',
  fontWeight = 500,
}: IFormTitleProps) => {
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
      <h1
        className="title"
        style={{ fontWeight, color: 'var(--text-primary)' }}
      >
        {text}
      </h1>
      {children}
    </div>
  );
};

export default FormTitle;
