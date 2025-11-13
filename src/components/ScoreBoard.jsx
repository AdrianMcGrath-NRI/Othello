import './ScoreBoard.css';

function ScoreBoard({ scores, currentPlayer }) {
  return (
    <div className="scoreboard">
      <div className={`score-item ${currentPlayer === 'black' ? 'active' : ''}`}>
        <div className="score-disc black">
          <div className="score-disc-inner"></div>
        </div>
        <div className="score-label">YOU</div>
        <div className="score-value">{scores.black}</div>
      </div>
      
      <div className="score-divider">VS</div>
      
      <div className={`score-item ${currentPlayer === 'white' ? 'active' : ''}`}>
        <div className="score-disc white">
          <div className="score-disc-inner"></div>
        </div>
        <div className="score-label">AI</div>
        <div className="score-value">{scores.white}</div>
      </div>
    </div>
  );
}

export default ScoreBoard;
