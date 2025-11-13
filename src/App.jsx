import { useState, useEffect, useCallback } from 'react'
import './App.css'
import Board from './components/Board'
import ScoreBoard from './components/ScoreBoard'
import Controls from './components/Controls'
import RulesModal from './components/RulesModal'
import GameMessage from './components/GameMessage'
import HighScores from './components/HighScores'

const BOARD_SIZE = 8;
const PLAYER = 'black';
const AI = 'white';

// Initialize the board with starting position
const createInitialBoard = () => {
  const board = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null));
  // Starting position
  board[3][3] = 'white';
  board[3][4] = 'black';
  board[4][3] = 'black';
  board[4][4] = 'white';
  return board;
};

function App() {
  const [board, setBoard] = useState(createInitialBoard());
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER);
  const [validMoves, setValidMoves] = useState([]);
  const [showValidMoves, setShowValidMoves] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [showRules, setShowRules] = useState(false);
  const [difficulty, setDifficulty] = useState('medium');
  const [scores, setScores] = useState({ black: 2, white: 2 });
  const [highScores, setHighScores] = useState([]);
  const [gameMessage, setGameMessage] = useState('');

  // Direction vectors for checking adjacent cells
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1],  [1, 0],  [1, 1]
  ];

  // Check if a position is valid
  const isValidPosition = (row, col) => {
    return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE;
  };

  // Get discs that would be flipped for a move
  const getFlippedDiscs = useCallback((board, row, col, player) => {
    if (board[row][col] !== null) return [];

    const opponent = player === 'black' ? 'white' : 'black';
    const flipped = [];

    directions.forEach(([dx, dy]) => {
      const temp = [];
      let x = row + dx;
      let y = col + dy;

      while (isValidPosition(x, y) && board[x][y] === opponent) {
        temp.push([x, y]);
        x += dx;
        y += dy;
      }

      if (isValidPosition(x, y) && board[x][y] === player && temp.length > 0) {
        flipped.push(...temp);
      }
    });

    return flipped;
  }, []);

  // Calculate valid moves for a player
  const calculateValidMoves = useCallback((board, player) => {
    const moves = [];
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        if (board[row][col] === null) {
          const flipped = getFlippedDiscs(board, row, col, player);
          if (flipped.length > 0) {
            moves.push({ row, col, flipped });
          }
        }
      }
    }
    return moves;
  }, [getFlippedDiscs]);

  // Calculate scores
  const calculateScores = useCallback((board) => {
    let black = 0;
    let white = 0;
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        if (board[row][col] === 'black') black++;
        if (board[row][col] === 'white') white++;
      }
    }
    return { black, white };
  }, []);

  // Make a move
  const makeMove = useCallback((row, col, player, board) => {
    const flipped = getFlippedDiscs(board, row, col, player);
    if (flipped.length === 0) return null;

    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = player;
    flipped.forEach(([r, c]) => {
      newBoard[r][c] = player;
    });

    return newBoard;
  }, [getFlippedDiscs]);

  // AI Logic
  const getAIMove = useCallback((board, difficulty) => {
    const moves = calculateValidMoves(board, AI);
    if (moves.length === 0) return null;

    if (difficulty === 'easy') {
      // Random move
      return moves[Math.floor(Math.random() * moves.length)];
    } else if (difficulty === 'medium') {
      // Prefer corners, then edges, then maximize flips
      const corners = moves.filter(m => 
        (m.row === 0 || m.row === 7) && (m.col === 0 || m.col === 7)
      );
      if (corners.length > 0) {
        return corners[Math.floor(Math.random() * corners.length)];
      }

      const edges = moves.filter(m => 
        m.row === 0 || m.row === 7 || m.col === 0 || m.col === 7
      );
      if (edges.length > 0) {
        return edges.reduce((best, move) => 
          move.flipped.length > best.flipped.length ? move : best
        );
      }

      return moves.reduce((best, move) => 
        move.flipped.length > best.flipped.length ? move : best
      );
    } else {
      // Hard - Use minimax with limited depth
      const evaluateBoard = (b) => {
        const scores = calculateScores(b);
        let score = scores.white - scores.black;

        // Corner bonus
        const corners = [[0, 0], [0, 7], [7, 0], [7, 7]];
        corners.forEach(([r, c]) => {
          if (b[r][c] === AI) score += 25;
          if (b[r][c] === PLAYER) score -= 25;
        });

        // Edge bonus
        for (let i = 0; i < BOARD_SIZE; i++) {
          if (b[0][i] === AI || b[7][i] === AI || b[i][0] === AI || b[i][7] === AI) score += 5;
          if (b[0][i] === PLAYER || b[7][i] === PLAYER || b[i][0] === PLAYER || b[i][7] === PLAYER) score -= 5;
        }

        // Mobility
        const aiMoves = calculateValidMoves(b, AI).length;
        const playerMoves = calculateValidMoves(b, PLAYER).length;
        score += (aiMoves - playerMoves) * 2;

        return score;
      };

      const minimax = (b, depth, maximizing) => {
        if (depth === 0) return evaluateBoard(b);

        const player = maximizing ? AI : PLAYER;
        const moves = calculateValidMoves(b, player);

        if (moves.length === 0) {
          const oppMoves = calculateValidMoves(b, maximizing ? PLAYER : AI);
          if (oppMoves.length === 0) return evaluateBoard(b);
          return minimax(b, depth - 1, !maximizing);
        }

        if (maximizing) {
          let maxScore = -Infinity;
          for (const move of moves) {
            const newBoard = makeMove(move.row, move.col, player, b);
            const score = minimax(newBoard, depth - 1, false);
            maxScore = Math.max(maxScore, score);
          }
          return maxScore;
        } else {
          let minScore = Infinity;
          for (const move of moves) {
            const newBoard = makeMove(move.row, move.col, player, b);
            const score = minimax(newBoard, depth - 1, true);
            minScore = Math.min(minScore, score);
          }
          return minScore;
        }
      };

      let bestMove = moves[0];
      let bestScore = -Infinity;

      for (const move of moves) {
        const newBoard = makeMove(move.row, move.col, AI, board);
        const score = minimax(newBoard, 3, false);
        if (score > bestScore) {
          bestScore = score;
          bestMove = move;
        }
      }

      return bestMove;
    }
  }, [calculateValidMoves, calculateScores, makeMove]);

  // Handle player move
  const handleCellClick = (row, col) => {
    if (gameOver || currentPlayer !== PLAYER) return;

    const move = validMoves.find(m => m.row === row && m.col === col);
    if (!move) return;

    const newBoard = makeMove(row, col, PLAYER, board);
    if (!newBoard) return;

    setBoard(newBoard);
    setCurrentPlayer(AI);
  };

  // Check for game over
  useEffect(() => {
    const playerMoves = calculateValidMoves(board, PLAYER);
    const aiMoves = calculateValidMoves(board, AI);

    if (playerMoves.length === 0 && aiMoves.length === 0) {
      setGameOver(true);
      const finalScores = calculateScores(board);
      setScores(finalScores);

      if (finalScores.black > finalScores.white) {
        setWinner('black');
        setGameMessage('You Win! 🎉');
        // Add to high scores
        const newScore = {
          score: finalScores.black,
          date: new Date().toLocaleDateString(),
          difficulty
        };
        setHighScores(prev => [...prev, newScore].sort((a, b) => b.score - a.score).slice(0, 10));
      } else if (finalScores.white > finalScores.black) {
        setWinner('white');
        setGameMessage('AI Wins! 😞');
      } else {
        setWinner('draw');
        setGameMessage('Draw! 🤝');
      }
    }
  }, [board, calculateValidMoves, calculateScores, difficulty]);

  // Update valid moves when player changes
  useEffect(() => {
    if (!gameOver) {
      const moves = calculateValidMoves(board, currentPlayer);
      setValidMoves(moves);

      // If current player has no moves, pass turn
      if (moves.length === 0) {
        const opponent = currentPlayer === PLAYER ? AI : PLAYER;
        const opponentMoves = calculateValidMoves(board, opponent);
        
        if (opponentMoves.length > 0) {
          setGameMessage(`${currentPlayer === PLAYER ? 'You have' : 'AI has'} no valid moves. Turn passed.`);
          setTimeout(() => {
            setCurrentPlayer(opponent);
            setGameMessage('');
          }, 1500);
        }
      }
    }
  }, [board, currentPlayer, gameOver, calculateValidMoves]);

  // AI move
  useEffect(() => {
    if (currentPlayer === AI && !gameOver && validMoves.length > 0) {
      const timer = setTimeout(() => {
        const move = getAIMove(board, difficulty);
        if (move) {
          const newBoard = makeMove(move.row, move.col, AI, board);
          if (newBoard) {
            setBoard(newBoard);
            setCurrentPlayer(PLAYER);
          }
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [currentPlayer, gameOver, validMoves, board, difficulty, getAIMove, makeMove]);

  // Update scores
  useEffect(() => {
    if (!gameOver) {
      setScores(calculateScores(board));
    }
  }, [board, gameOver, calculateScores]);

  // Reset game
  const resetGame = () => {
    setBoard(createInitialBoard());
    setCurrentPlayer(PLAYER);
    setGameOver(false);
    setWinner(null);
    setGameMessage('');
    setScores({ black: 2, white: 2 });
  };

  return (
    <div className="app">
      <div className="game-container">
        <h1 className="title">OTHELLO</h1>
        
        <ScoreBoard 
          scores={scores}
          currentPlayer={currentPlayer}
        />

        <Board
          board={board}
          onCellClick={handleCellClick}
          validMoves={validMoves}
          showValidMoves={showValidMoves}
          currentPlayer={currentPlayer}
        />

        <Controls
          onNewGame={resetGame}
          onToggleHints={() => setShowValidMoves(!showValidMoves)}
          showHints={showValidMoves}
          onShowRules={() => setShowRules(true)}
          difficulty={difficulty}
          onDifficultyChange={setDifficulty}
          gameOver={gameOver}
        />

        {gameMessage && <GameMessage message={gameMessage} />}

        <HighScores scores={highScores} />
      </div>

      {showRules && <RulesModal onClose={() => setShowRules(false)} />}
    </div>
  );
}

export default App;
