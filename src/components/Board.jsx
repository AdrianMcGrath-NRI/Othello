import './Board.css';
import Cell from './Cell';

function Board({ board, onCellClick, validMoves, showValidMoves, currentPlayer }) {
  const isValidMove = (row, col) => {
    return validMoves.some(move => move.row === row && move.col === col);
  };

  return (
    <div className="board-wrapper">
      <div className="board">
        {board.map((row, rowIndex) => (
          row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              value={cell}
              onClick={() => onCellClick(rowIndex, colIndex)}
              isValid={isValidMove(rowIndex, colIndex)}
              showHint={showValidMoves}
              isPlayerTurn={currentPlayer === 'black'}
            />
          ))
        ))}
      </div>
    </div>
  );
}

export default Board;
