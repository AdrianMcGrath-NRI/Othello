import './Controls.css';

function Controls({ onNewGame, onToggleHints, showHints, onShowRules, difficulty, onDifficultyChange, gameOver }) {
  return (
    <div className="controls">
      <div className="button-group">
        <button className="btn btn-primary" onClick={onNewGame}>
          {gameOver ? 'New Game' : 'Reset Game'}
        </button>
        <button className="btn btn-secondary" onClick={onShowRules}>
          Rules
        </button>
        <button 
          className={`btn btn-toggle ${showHints ? 'active' : ''}`}
          onClick={onToggleHints}
        >
          {showHints ? 'Hide Hints' : 'Show Hints'}
        </button>
      </div>

      <div className="difficulty-selector">
        <label>Difficulty:</label>
        <div className="difficulty-buttons">
          <button
            className={`btn-difficulty ${difficulty === 'easy' ? 'active' : ''}`}
            onClick={() => onDifficultyChange('easy')}
          >
            Easy
          </button>
          <button
            className={`btn-difficulty ${difficulty === 'medium' ? 'active' : ''}`}
            onClick={() => onDifficultyChange('medium')}
          >
            Medium
          </button>
          <button
            className={`btn-difficulty ${difficulty === 'hard' ? 'active' : ''}`}
            onClick={() => onDifficultyChange('hard')}
          >
            Hard
          </button>
        </div>
      </div>
    </div>
  );
}

export default Controls;
