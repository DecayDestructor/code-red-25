import React, { useEffect, useRef, useState } from "react";
import Building from "../../classes/Building";
import Enemy from "../../classes/Enemy";
import PlacementTile from "../../classes/PlacementTile";
import Sprite from "../../classes/Sprite";
import placementTilesData from "../../classes/placementTilesData";
import waypoints from "../../classes/waypoints";
import "./Level7_2.css"; 

const Level7_2 = () => {
  const canvasRef = useRef(null);

  const [coins, setCoins] = useState(100);
  const [hearts, setHearts] = useState(10);
  let enemies = [];
  let buildings = [];
  let placementTiles = [];
  let explosions = [];
  let activeTile = undefined;
  let enemyCount = 3;

  useEffect(() => {
    const canvas = canvasRef.current;
    const c = canvas.getContext("2d");

    canvas.width = 1280;
    canvas.height = 768;

    c.fillStyle = "white";
    c.fillRect(0, 0, canvas.width, canvas.height);

    const placementTilesData2D = [];
    for (let i = 0; i < placementTilesData.length; i += 20) {
      placementTilesData2D.push(placementTilesData.slice(i, i + 20));
    }

    placementTilesData2D.forEach((row, y) => {
      row.forEach((symbol, x) => {
        if (symbol === 14) {
          placementTiles.push(
            new PlacementTile({
              position: {
                x: x * 64,
                y: y * 64,
              },
            })
          );
        }
      });
    });

    const image = new Image();

    image.src = "/assets/img/gameMap.png";
    image.onerror = () => {
      console.error("Error loading image:", image.src);
    };
    spawnEnemies(enemyCount);

    function spawnEnemies(spawnCount) {
      for (let i = 1; i <= spawnCount; i++) {
        const xOffset = i * 150;
        const newEnemy = new Enemy({
          position: { x: waypoints[0].x - xOffset, y: waypoints[0].y },
        });

        console.log(newEnemy); 

        enemies.push(newEnemy);
      }
    }

    function animate() {
      c.clearRect(0, 0, canvas.width, canvas.height); 

      const animationId = requestAnimationFrame(animate);

      c.drawImage(image, 0, 0);

      for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i];
        enemy.update(c);
        enemy.draw(c);

        if (enemy.position.x > canvas.width) {
          setHearts((prev) => prev - 1);
          enemies.splice(i, 1);

          if (hearts - 1 === 0) {
            document.getElementById("gameOver").style.display = "flex";
            cancelAnimationFrame(animationId);
            return;
          }
        }
      }

      for (let i = explosions.length - 1; i >= 0; i--) {
        const explosion = explosions[i];
        explosion.draw(c);
        explosion.update();
        if (explosion.frames.current >= explosion.frames.max - 1) {
          explosions.splice(i, 1);
        }
      }

      if (enemies.length === 0) {
        enemyCount += 2;
        spawnEnemies(enemyCount);
      }

      placementTiles.forEach((tile) => {
        tile.update(mouse, c);
      });

buildings.forEach((building) => {
  building.update(c);

  console.log("Building center:", building.center);
  console.log("Building radius:", building.radius); 

  const validEnemies = enemies.filter((enemy) => {
    console.log("Enemy center:", enemy.center);
    console.log("Enemy radius:", enemy.radius); 

    if (!enemy.center || !building.center) return false;

    const distance = Math.hypot(
      enemy.center.x - building.center.x,
      enemy.center.y - building.center.y
    );

    console.log("Distance between building and enemy:", distance); 

    return distance < enemy.radius + building.radius;
  });

  console.log("Valid enemies for building:", validEnemies);

  if (validEnemies.length > 0) {
    building.target = validEnemies[0];
  } else {
    building.target = null; 
  }
});

    }

    image.onload = animate;
    image.onerror = () => {
      console.log("Error loading image:", image.src);
  };
    const mouse = { x: undefined, y: undefined };

    const handleMouseMove = (event) => {

      const rect = canvas.getBoundingClientRect();

      mouse.x = event.clientX - rect.left;  
      mouse.y = event.clientY - rect.top;   

      activeTile = null;

      for (let tile of placementTiles) {
        if (
          mouse.x > tile.position.x &&
          mouse.x < tile.position.x + tile.size &&
          mouse.y > tile.position.y &&
          mouse.y < tile.position.y + tile.size
        ) {
          activeTile = tile;
          break;
        }
      }

    };
    const handleClick = (event) => {

      if (activeTile && !activeTile.occupied && coins - 50 >= 0) {
        setCoins((prev) => prev - 50);
        buildings.push(
          new Building({
            position: {
              x: activeTile.position.x,
              y: activeTile.position.y,
            },
            imageSrc: "/assets/img/tower.png"
          })
        );
        activeTile.occupied = true;
        console.log("Building placed on:", activeTile.position); 
      } else {
        console.warn("No active tile selected or tile already occupied", activeTile); 
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("click", handleClick);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="game-container">
      <div className="hud">
        <p>Hearts: {hearts}</p>
        <p>Coins: {coins}</p>
      </div>
      <div className="canvas-container">
        <canvas ref={canvasRef} />
        <div id="gameOver" className="game-over">GAME OVER</div>
      </div>
    </div>
  );
};

export default Level7_2;