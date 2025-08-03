import { useState } from 'react'


function Square({ value, onSqc }) {
  return (
    <button className="square" onClick={onSqc}>
      {value}
    </button>
  );
}

function minmax(squares,max){
  const result = check(squares);
  if(result){
    if(result == "X") return {score:-1};
    if(result == "O") return {score:1};
    else return {score:0};
  }

  let bmove={index : -1 , score : max? -Infinity:Infinity};
  
  for(let i=0;i<9;i++){
    if(!squares[i]){
      const next = squares.slice();
      next[i]=max? "O":"X";
      
      const {score}=minmax(next,!max);
      const res ={index : i , score:score};


      bmove = max? (res.score>bmove.score ? res : bmove) : (res.score<bmove.score ? res : bmove);
    }   
  }

  return bmove;  
  
}

function playbest(squares){
  const {index} = minmax(squares,true);
  return index;
}

function check(squares){
    const lines = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
      }
    }
    return (squares.includes(null)) ? null : "Tie";
}

function Board({curr,squares,play}){

  function handleClick(i){
    const nextSquares = squares.slice();
    if(nextSquares[i] || check(squares))
      return;

    if(!(curr%2))nextSquares[i]="X";
    else nextSquares[i]="O";

    play(nextSquares);
    
  }


  function status(){
    const c=check(squares);
    if(c==="X" || c==="O")
      return("Winner : " + c +"");
    else if(!c)
      return("Next turn : " + ((curr%2)? "O" : "X"));
    else
      return("Its a " + c);      
  }

  return (
    <>
      <div><h1>Tic Tac Toe (vs AI)</h1></div>
      <div className='status'>{status()}</div>
      <div className="board-row" >
        <Square value={squares[0]} onSqc={() => handleClick(0)} />
        <Square value={squares[1]} onSqc={() => handleClick(1)} />
        <Square value={squares[2]} onSqc={() => handleClick(2)} />
      </div>
      <div className="board-row" >
        <Square value={squares[3]} onSqc={() => handleClick(3)} />
        <Square value={squares[4]} onSqc={() => handleClick(4)} />
        <Square value={squares[5]} onSqc={() => handleClick(5)} />
      </div>
      <div className="board-row" >
        <Square value={squares[6]} onSqc={() => handleClick(6)} />
        <Square value={squares[7]} onSqc={() => handleClick(7)} />
        <Square value={squares[8]} onSqc={() => handleClick(8)} />
      </div>
    </>
  );
}


export default function MinimaxTicTacToe(){
  const [curr,setcurr] = useState(0);
  const [hist,sethist] = useState([Array(9).fill(null)]);
  const current = hist[curr];

  function play(nextSquares){
    const nexthist=[...hist.slice(0,curr+1),nextSquares];
    sethist(nexthist);
    setcurr(nexthist.length - 1);

    if(check(nextSquares) === null){
      setTimeout(()=>{
        const ai=playbest(nextSquares);
         
        const aiSquares = nextSquares.slice();
        aiSquares[ai] = "O";
        const newHist = [...nexthist, aiSquares];
        sethist(newHist);
        setcurr(newHist.length - 1);
        
      }, 200);    
    }
  }

  function op(i){
    const travel = curr + i;
    if(travel >= 0 && travel < hist.length)setcurr(travel);
  }

  function Timetravel(){
      return(
        <>
          <button className='time' onClick={() =>op(-(curr%2)-2)} disabled={curr == 0}>Undo</button>
          <button className='time' onClick={() =>op(2+(curr%2))} disabled={curr == hist.length-1}>Redo</button>
        </>
      );
  }

  function Restart(){
    sethist([Array(9).fill(null)]);
    setcurr(0);
  }

  return(
    <>
      <div className='board'>
        <Board curr = {curr} squares = {current} play={play}/>
        <Timetravel/>
      <div>
        <button className='re' onClick={Restart} disabled={curr ===0}>Restart</button>
      </div>
      </div>
      <footer>
        <div className='foot'>
        Copyright &copy; 2025 Ashwin Upadhya
        </div>
      </footer>
    </>
  )
}



