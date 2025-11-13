# Othello

A fully functional React implementation of the classic Othello (Reversi) board game with a beautiful Hasbro-inspired design.

![Othello Game](https://github.com/user-attachments/assets/a6d299a0-97b9-4bf0-99cb-697d223a6abf)

## Features

### Gameplay
- ✅ Complete Othello rules implementation following [World Othello Federation](https://www.worldothello.org/about/about-othello/othello-rules/official-rules/english) standards
- ✅ Player vs AI with 3 difficulty levels (Easy, Medium, Hard)
- ✅ Automatic turn passing when no valid moves available
- ✅ Win/loss/draw detection with message display
- ✅ Real-time score tracking

### AI Difficulty Levels
- **Easy**: Randomly selects from valid moves
- **Medium**: Strategic play prioritizing corners, edges, and maximizing disc flips
- **Hard**: Minimax algorithm with depth-3 search and sophisticated board evaluation

### User Interface
- 🎨 Hasbro-inspired design with green board and black frame
- 🎭 3D CSS disc rendering with realistic highlights and shadows
- ✨ Smooth flip animations when placing discs
- 💡 Toggleable valid move hints (subtle indicators)
- 📊 Session high score tracking
- 📖 Comprehensive rules popup
- 🔄 New game / Reset functionality
- 📱 Responsive design for mobile and desktop

### Visual Design
- Black/white/green/silver color scheme matching classic Hasbro packaging
- CSS 3D transforms for realistic disc appearance
- Gradient board cells mimicking the classic green felt
- Active player indicator in scoreboard
- Professional UI with smooth transitions

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/AdrianMcGrath-NRI/Othello.git
cd Othello
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## How to Play

1. **Starting Position**: The game begins with 4 discs in the center (2 black, 2 white) arranged diagonally
2. **Taking Turns**: Black moves first, then players alternate
3. **Valid Moves**: You must place a disc to outflank one or more opponent's discs
4. **Outflanking**: Place your disc so that one or more straight lines are formed between the new disc and another of your discs, with only opponent discs in between
5. **Flipping**: All outflanked discs are immediately flipped to your color
6. **Passing**: If you have no valid moves, your turn is automatically passed
7. **Winning**: The game ends when neither player can move. The player with the most discs wins!

### Strategy Tips
- 🏆 Corner positions are extremely valuable - they cannot be flipped!
- 📏 Edge positions are generally stronger than interior positions
- ⚠️ Avoid moves that give your opponent access to corners
- 🎯 Mobility (having many move options) is important in the early game

## Technology Stack

- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **CSS3** - 3D transforms and animations
- **JavaScript (ES6+)** - Game logic and AI implementation

## Project Structure

```
Othello/
├── src/
│   ├── components/
│   │   ├── Board.jsx/css         # Game board grid
│   │   ├── Cell.jsx/css          # Individual cells with 3D discs
│   │   ├── ScoreBoard.jsx/css    # Score display
│   │   ├── Controls.jsx/css      # Game controls
│   │   ├── RulesModal.jsx/css    # Rules popup
│   │   ├── GameMessage.jsx/css   # Win/loss messages
│   │   └── HighScores.jsx/css    # High score tracking
│   ├── App.jsx                   # Main game logic
│   ├── App.css                   # App styling
│   ├── main.jsx                  # React entry point
│   └── index.css                 # Global styles
├── index.html                    # HTML template
├── vite.config.js               # Vite configuration
└── package.json                 # Dependencies

```

## Game Logic

The game implements the official Othello rules with:
- 8-directional move validation
- Disc flipping algorithm
- AI with configurable difficulty using minimax algorithm
- Board position evaluation (corners, edges, mobility)
- Automatic game end detection

## License

ISC

## Acknowledgments

- Game rules based on [World Othello Federation](https://www.worldothello.org/) official rules
- Design inspired by the classic Hasbro Othello board game
- Built with React and modern web technologies
