import React, { useState, useEffect } from 'react';

const Game = () => {
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });
  const [obsPos,setObsPos]=useState({x:100,y:0});
  const [score,setscore]=useState(0);
  const [inter,setinter]=useState(50);
  const [gameOver,setgameover]=useState(false);

  useEffect(()=>{
    //if((playerPos.x===obsPos.x&&(playerPos.y*40+40)===obsPos.y)||(playerPos.x===obsPos.x&&(playerPos.y*40-40)===obsPos.y))
    if(((playerPos.x===obsPos.x &&((playerPos.y*40)-obsPos.y)<=40))&&((playerPos.x===obsPos.x &&((playerPos.y*40)-obsPos.y)>=-40)))
    {
      setgameover(true);
    }
  },[playerPos,obsPos]);
  useEffect(() => {
    if(!gameOver){
    const interval = setInterval(() => {
      setObsPos((prevPos) => ({ ...prevPos, x: prevPos.x - 1 }));
    }, inter);
    if(obsPos.x===0)
    {
      var y=Math.floor(Math.random() * 1000);
      y=Math.floor(Math.min(y,window.innerHeight / 1.4));
      setObsPos({ x: 100, y: y });
      setscore((sc)=>sc+1);
      if(inter>5)
      setinter((inter)=>inter-5);
    }
    return () => {
      clearInterval(interval);
    };
  }}, [obsPos.x,obsPos.y,inter,gameOver]);
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Adjust player position based on arrow key presses
      if (e.key === 'ArrowUp') {
        setPlayerPos((prevPos) => ({
          ...prevPos,
          y: Math.max(prevPos.y - 1, 0), // Restrict movement within the top half of the screen
        }));
      } else if (e.key === 'ArrowDown') {
        setPlayerPos((prevPos) => ({
          ...prevPos,
          y: Math.min(prevPos.y + 1, window.innerHeight / 50 -1), // Restrict movement within the bottom half of the screen
        }));
      } else if (e.key === 'ArrowLeft') {
        setPlayerPos((prevPos) => ({
          ...prevPos,
          x: Math.max(prevPos.x - 1, 0), // Restrict movement within the left half of the screen
        }));
      } else if (e.key === 'ArrowRight') {
        setPlayerPos((prevPos) => ({
          ...prevPos,
          x: Math.min(prevPos.x + 1, 50), // Restrict movement within the right half of the screen
        }));
      }
    };
    // Add event listener for keydown events
    window.addEventListener('keydown', handleKeyPress);
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [playerPos.x]);

  return (
    <div>
      {!gameOver && (
        <>
      {/*<h1>2D Movement Game Player X {playerPos.x} Player y {playerPos.y*40} Obs X{obsPos.x} Obs Y{obsPos.y} Diff {(playerPos.y*40)-obsPos.y}</h1>*/}  
      <h1>Simple Game Score :{score}</h1>
      <div
        style={{
          position: 'relative',
          width: '99%',
          height: '50%',
          border: '1px solid black',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: `${playerPos.y * 40}px`,
            left: `${playerPos.x }%`,
            width: '40px',
            height: '40px',
            background: 'blue',
          }}
        ></div>
        <div
          style={{
            position: 'absolute',
            top: `${obsPos.y}px`,
            left: `${obsPos.x}%`,
            width: '40px',
            height: '40px',
            background: 'red',
          }}
        ></div>
      </div>
      </>
      )}
      <h1><center>{gameOver && <p>Game Over! Score: {score}</p>}</center></h1>
      
    </div>
  );
};

export default Game;
