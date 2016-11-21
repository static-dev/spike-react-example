require('./base')

const React = require('react')
const ReactDOM = require('react-dom')

class Square extends React.Component {
  render () {
    return (
      <button className={`square ${this.props.highlight}`} onClick={this.props.onClick.bind(this)}>
        {this.props.value}
      </button>
    )
  }
}

class Board extends React.Component {
  renderSquare (i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={this.props.onClick.bind(this, i)}
        highlight={this.props.winningSquares.includes(i) ? 'hl' : ''}
        />
    )
  }
  render () {
    return (
      <div>
        <div className='board-row'>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className='board-row'>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className='board-row'>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    )
  }
}

class Game extends React.Component {
  constructor () {
    super()
    this.state = {
      history: [{ squares: Array(9).fill(null) }],
      xIsNext: true
    }
  }
  handleClick (i) {
    const history = this.state.history
    const current = history[history.length - 1]
    const squares = current.squares.slice()

    if (calculateWinner(current.squares) || squares[i]) return

    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      history: history.concat({ squares }),
      xIsNext: !this.state.xIsNext
    })
  }
  jumpTo (i) {
    this.setState({
      history: this.state.history.slice(0, i + 1),
      xIsNext: !(i % 2)
    })
  }
  render () {
    const history = this.state.history
    const current = history[history.length - 1]
    const winner = calculateWinner(current.squares)
    const status = winner ? `Winner: ${winner.player}` : `Next player: ${this.state.xIsNext ? 'X' : 'O'}`

    const moves = history.map((step, i) => {
      const desc = i ? `Move #${i}` : 'Game start'
      const currentMove = i === history.length - 1
      return (
        <li key={i} className={currentMove ? 'bold' : ''}>
          <a href='#' onClick={() => this.jumpTo(i)}>{desc}</a>
        </li>
      )
    })

    return (
      <div className='game'>
        <div className='game-board'>
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            winningSquares={winner ? winner.pattern : []}
          />
        </div>
        <div className='game-info'>
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    )
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('container')
)

function calculateWinner (squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { player: squares[a], pattern: [a, b, c] }
    }
  }
  return null
}
