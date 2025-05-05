import { HashLoader } from 'react-spinners';

interface IScreenLoadingProps {
  backgroundColor?: string;
  position?: 'fixed' | 'absolute' | 'relative';
}

const ScreenLoading = ({
  backgroundColor = 'var(--background-primary)',
  position = 'fixed',
}: IScreenLoadingProps) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: backgroundColor,
        position: position,
        inset: 0,
        zIndex: 99999,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <HashLoader color="#36d7b7" />
      </div>
    </div>
  );
};

export default ScreenLoading;
