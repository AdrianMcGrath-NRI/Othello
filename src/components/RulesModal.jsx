import './RulesModal.css';

function RulesModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Othello Rules</h2>
        <div className="rules-text">
          <h3>Objective</h3>
          <p>Have the majority of your color discs on the board at the end of the game.</p>

          <h3>Starting Position</h3>
          <p>The game begins with 4 discs in the center: 2 black and 2 white, arranged diagonally.</p>

          <h3>How to Play</h3>
          <ul>
            <li><strong>Black moves first.</strong> Players alternate turns.</li>
            <li>A valid move must place a disc to outflank one or more opponent's discs.</li>
            <li><strong>Outflanking:</strong> Place your disc so that one or more straight lines (horizontal, vertical, or diagonal) are formed between the new disc and another of your discs, with only opponent discs in between.</li>
            <li>All outflanked discs are flipped to your color.</li>
            <li>If you have no valid moves, your turn is passed.</li>
            <li>The game ends when neither player can move (usually when the board is full).</li>
          </ul>

          <h3>Winning</h3>
          <p>The player with the most discs of their color on the board wins.</p>

          <h3>Tips</h3>
          <ul>
            <li>Corner positions are very valuable - they cannot be flipped!</li>
            <li>Edge positions are generally better than interior positions.</li>
            <li>Be careful about moves that give your opponent access to corners.</li>
            <li>Mobility (having many move options) is important.</li>
          </ul>

          <p className="rules-footer">
            Official rules: <a href="https://www.worldothello.org/about/about-othello/othello-rules/official-rules/english" target="_blank" rel="noopener noreferrer">worldothello.org</a>
          </p>
        </div>
        <button className="btn-close" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default RulesModal;
