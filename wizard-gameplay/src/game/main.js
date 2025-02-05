import './style.css';
import { Enemy } from './classes/Enemy.js';
import { Building } from './classes/Building.js';
import { PlacementTile } from './classes/PlacementTile.js';
import { Sprite } from './classes/Sprite.js';
import { waypoints } from './waypoints.js';
import { placementTilesData } from './placementTilesData.js';
window.onload = function () {

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
window.c = c;

canvas.width = 1280;
canvas.height = 768;

c.fillStyle = 'white';
c.fillRect(0, 0, canvas.width, canvas.height);

const placementTilesData2D = [];
for (let i = 0; i < placementTilesData.length; i += 20) {
  placementTilesData2D.push(placementTilesData.slice(i, i + 20));
}

const placementTiles = [];
placementTilesData2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 14) {
      placementTiles.push(
        new PlacementTile({
          position: {
            x: x * 64,
            y: y * 64
          }
        })
      );
    }
  });
});

const image = new Image();
image.onload = () => {
  animate();
};
image.src = '/assets/img/gameMap.png';

const enemies = [];
const buildings = [];
const explosions = [];
let activeTile = undefined;
let hearts = 10;
let coins = 100;
let round = 1;
let enemyCount = 4;
let spawnInProgress = false;

let baseBuildingCost = 45; 

function startRound() {
  if (spawnInProgress) return;
  spawnInProgress = true;
  document.querySelector('#round').innerHTML = `Round: ${round}`;

  const adjustedEnemyCount = round > 2 ? enemyCount * 1.5 : enemyCount;
  spawnEnemies(adjustedEnemyCount);

  if (round > 3) {
    baseBuildingCost = Math.round(baseBuildingCost * 1.5);
  } else {
    baseBuildingCost = Math.round(baseBuildingCost * 1.1);
  }

  console.log(`Building cost for this round: ${baseBuildingCost}`);

  const roundTime = round > 3 ? 800 : 1000;

  setTimeout(() => {
    round++;
    enemyCount += 1;
    if(round > 7){
      enemyCount += (2 * (round % 7));
    }
    spawnInProgress = false;

    if (round > 10) {
      window.location.href = '/level8';
    }

  }, roundTime);
}


function spawnEnemies(spawnCount) {
  for (let i = 1; i < spawnCount + 1; i++) {
    const xOffset = i * 150;
    enemies.push(
      new Enemy({
        position: { x: waypoints[0].x - xOffset, y: waypoints[0].y }
      })
    );
  }
}

function animate() {
  const animationId = requestAnimationFrame(animate);

  c.drawImage(image, 0, 0);

  if (enemies.length === 0 && !spawnInProgress) {
    startRound();
  }

  for (let i = enemies.length - 1; i >= 0; i--) {
    const enemy = enemies[i];
    enemy.update();

    if (enemy.position.x > canvas.width) {
      hearts -= 1;
      enemies.splice(i, 1);
      document.querySelector('#hearts').innerHTML = hearts;

      if (hearts === 0) {
        console.log('game over');
        cancelAnimationFrame(animationId);
        document.querySelector('#gameOver').style.display = 'flex';
      }
    }
  }

  for (let i = explosions.length - 1; i >= 0; i--) {
    const explosion = explosions[i];
    explosion.draw();
    explosion.update();

    if (explosion.frames.current >= explosion.frames.max - 1) {
      explosions.splice(i, 1);
    }
  }

  placementTiles.forEach((tile) => {
    tile.update(mouse);
  });

  buildings.forEach((building) => {
    building.update();
    building.target = null;
    const validEnemies = enemies.filter((enemy) => {
      const xDifference = enemy.center.x - building.center.x;
      const yDifference = enemy.center.y - building.center.y;
      const distance = Math.hypot(xDifference, yDifference);
      return distance < enemy.radius + building.radius;
    });
    building.target = validEnemies[0];

    for (let i = building.projectiles.length - 1; i >= 0; i--) {
      const projectile = building.projectiles[i];
      projectile.update();

      const xDifference = projectile.enemy.center.x - projectile.position.x;
      const yDifference = projectile.enemy.center.y - projectile.position.y;
      const distance = Math.hypot(xDifference, yDifference);

      if (distance < projectile.enemy.radius + projectile.radius) {
        projectile.enemy.health -= 20;
        if (projectile.enemy.health <= 0) {
          const enemyIndex = enemies.findIndex((enemy) => {
            return projectile.enemy === enemy;
          });

          if (enemyIndex > -1) {
            enemies.splice(enemyIndex, 1);
            coins += 15;
            document.querySelector('#coins').innerHTML = coins;
          }
        }

        explosions.push(
          new Sprite({
            position: { x: projectile.position.x, y: projectile.position.y },
            imageSrc: '/assets/img/explosion.png',
            frames: { max: 4 },
            offset: { x: 0, y: 0 }
          })
        );
        building.projectiles.splice(i, 1);
      }
    }
  });
}

const mouse = {
  x: undefined,
  y: undefined
};

function getMousePos(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}

canvas.addEventListener('click', (event) => {
  const mousePos = getMousePos(canvas, event);
  if (activeTile && !activeTile.occupied && coins >= baseBuildingCost) {
    coins -= baseBuildingCost;
    document.querySelector('#coins').innerHTML = coins;

    buildings.push(
      new Building({
        position: {
          x: activeTile.position.x,
          y: activeTile.position.y
        }
      })
    );
    activeTile.occupied = true;
    buildings.sort((a, b) => {
      return a.position.y - b.position.y;
    });
  }
});

window.addEventListener('mousemove', (event) => {
  const mousePos = getMousePos(canvas, event);
  mouse.x = mousePos.x;
  mouse.y = mousePos.y;

  activeTile = null;
  for (let i = 0; i < placementTiles.length; i++) {
    const tile = placementTiles[i];
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
});

spawnEnemies(enemyCount);

}