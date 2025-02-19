import './style.css';

const HeadingAndParagraph = ({ heading, para }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <div className="heading-container">
        <div className="heading-border" />
        <h2 className="heading">{heading}</h2>
        <div className="heading-border" />
      </div>
      <p className="paragraph">{para}</p>
    </div>
  );
};

export default HeadingAndParagraph;
