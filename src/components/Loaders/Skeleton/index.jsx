import './style.css';

const Skeleton = ({ width = '100%', height = '100%', borderRadius = '0' }) => {
  return (
    <div className="skeleton" style={{ width, height, borderRadius }}></div>
  );
};

export default Skeleton;
