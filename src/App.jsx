import Player from './component/player.jsx';
import GameBoard from './component/GameBoard.jsx';
import Log from './component/Log.jsx';
import { useState } from 'react';
import { WINNING_COMBINATIONS } from './component/winning_combination.js';
import GameOver from './component/GameOver.jsx';

const initialGameBoard = [
  [null,null,null],
  [null,null,null],
  [null,null,null]
]

const player = {
  'X':'Player 1',
  'O':'Player 2'
}

function deriveActivePlayer(gameTurn){
  let currPlayer = 'X';
  if(gameTurn.length>0&&gameTurn[0].player==='X'){
    currPlayer = 'O';
  }
  return currPlayer;
}

function deriveGameboard(gameTurn){
  let gameboard = [...initialGameBoard.map(array=>[...array])];

    for(const turn of gameTurn){
      const {square,player}=turn;
      const {row,col} = square;
      gameboard[row][col]=player;
    }
    return gameboard;
}

function deriveWinner(gameboard,players){
  let winner = null;
  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol =gameboard[combination[0].row][combination[0].column];
    const secondSquareSymbol =gameboard[combination[1].row][combination[1].column];
    const thirdSquaereSymbol =gameboard[combination[2].row][combination[2].column];
    if(firstSquareSymbol && secondSquareSymbol === firstSquareSymbol && firstSquareSymbol === thirdSquaereSymbol){
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function App() {
  const [players,setPlayer]= useState(player)
  const [gameTurn,setGameTurn] = useState([]);
  // const [activePlayer,setActivePlayer] = useState('X');
  const activePlayer = deriveActivePlayer(gameTurn);
  const gameboard = deriveGameboard(gameTurn);
  const winner = deriveWinner(gameboard,players);
  const hasdraw = gameTurn.length === 9 && !winner ;

  function handleSelectivePlayer(rowIndex,colIndex){
    setGameTurn((prevTurn)=>{
      let currTurn = deriveActivePlayer(prevTurn);
      const udpateTurn = [{
          square:{row:rowIndex,col:colIndex},player:currTurn
        },...prevTurn]
      return udpateTurn;
    })
  }

  function handleRestart(){
    setGameTurn([]);
  }

  function handlePlayernameChange(symbol,newName){
    setPlayer(prevPlayer=>{
      return {
        ...prevPlayer,
        [symbol]: newName
      };
    });
}
  
  return (
    <main>
      <div id="game-container">
        <ol id="players" className='highlight-player'>
            <Player initialName={players.X} symbol="X" isActive={activePlayer=='X'} onChangeName={handlePlayernameChange}/>
            <Player initialName={players.O} symbol="O" isActive={activePlayer=='O'} onChangeName={handlePlayernameChange} />
        </ol>
        {(winner || hasdraw )&& <GameOver winner={winner} onRestart={handleRestart}/>}
            <GameBoard onSelectSquare={handleSelectivePlayer} board={gameboard}/>
      </div>
      <Log turns={gameTurn}/>
    </main>
  )
}

export default App
