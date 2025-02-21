import { useEffect, useRef } from "react";
import './style.css';
import coinImage from './coin.png';  
import heartImage from './heart.png';  
import { initGame } from "./main.js";

const GameApp = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const c = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    import('./main.js').then(() => {
      window.c = c;
      initGame(c, canvas);
    });

    return () => {
    };
  }, []);

  return (
    <div className="game-container">
      <canvas ref={canvasRef}></canvas>
      <div id="gameOver">GAME OVER</div>
      <div id="round">Round: 1</div>

      <div className="status-bar">
        <div className="coins">
          <img src={coinImage} alt="Coins" width={30} height={30} />
          <div id="coins">100</div>
        </div>
        <div className="hearts">
          <img src={heartImage} alt="Hearts" width={30} height={30} />
          <div id="hearts">10</div>
        </div>
      </div>
    </div>
  );
};

export default GameApp;
