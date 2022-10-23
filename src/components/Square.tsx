import "./Square.css";

const Square: React.FC<{
  squareContent?: string;
  onAddContent: () => void;
}> = ({ squareContent, onAddContent }) => {
  return (
    <div className="square" onClick={onAddContent}>
      {squareContent}
    </div>
  );
};

export default Square;
