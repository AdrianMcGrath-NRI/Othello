import './HighScores.css';

function HighScores({ scores }) {
  if (scores.length === 0) return null;

  return (
    <div className="high-scores">
      <h3>Session High Scores</h3>
      <div className="scores-list">
        {scores.map((score, index) => (
          <div key={index} className="score-entry">
            <span className="score-rank">#{index + 1}</span>
            <span className="score-points">{score.score} pts</span>
            <span className="score-difficulty">{score.difficulty}</span>
            <span className="score-date">{score.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HighScores;
