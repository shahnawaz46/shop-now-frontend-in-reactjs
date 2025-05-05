import './style.css';

interface IHeadingAndParagraphProps {
  heading?: string;
  para?: string;
}

const HeadingAndParagraph = ({ heading, para }: IHeadingAndParagraphProps) => {
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
