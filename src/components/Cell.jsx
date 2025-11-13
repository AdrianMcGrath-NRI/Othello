import './Cell.css';

function Cell({ value, onClick, isValid, showHint, isPlayerTurn }) {
  const handleClick = () => {
    if (isValid && isPlayerTurn) {
      onClick();
    }
  };

  return (
    <div 
      className={`cell ${isValid && showHint ? 'valid' : ''} ${isPlayerTurn && isValid ? 'clickable' : ''}`}
      onClick={handleClick}
    >
      {value && (
        <div className={`disc ${value}`}>
          <div className="disc-inner"></div>
        </div>
      )}
    </div>
  );
}

export default Cell;
