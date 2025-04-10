// src/GameBoard.jsx
import { Stage, Graphics, Container } from '@pixi/react';
import { useState } from 'react';

const TILE_SIZE = 64;
const MAP_ROWS = 8;
const MAP_COLS = 8;

const Tile = ({ x, y, highlight = false, onClick }) => (
  <Graphics
    draw={(g) => {
      g.clear();
      g.beginFill(highlight ? 0x77ccff : 0xffffff);
      g.lineStyle(1, 0x000000);
      g.drawRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      g.endFill();
    }}
    interactive
    pointerdown={onClick}
  />
);

const Unit = ({ x, y, onClick }) => (
  <Graphics
    draw={(g) => {
      g.clear();
      g.beginFill(0xff6666);
      g.drawCircle(x * TILE_SIZE + TILE_SIZE / 2, y * TILE_SIZE + TILE_SIZE / 2, TILE_SIZE / 3);
      g.endFill();
    }}
    interactive
    pointerdown={onClick}
  />
);

const GameBoard = () => {
  const [unitPos, setUnitPos] = useState({ x: 2, y: 3 });
  const [highlightTiles, setHighlightTiles] = useState([]);

  const handleUnitClick = () => {
    const range = [
      { x: unitPos.x + 1, y: unitPos.y },
      { x: unitPos.x - 1, y: unitPos.y },
      { x: unitPos.x, y: unitPos.y + 1 },
      { x: unitPos.x, y: unitPos.y - 1 },
    ].filter(p => p.x >= 0 && p.x < MAP_COLS && p.y >= 0 && p.y < MAP_ROWS);
    setHighlightTiles(range);
  };

  const handleTileClick = (x, y) => {
    setUnitPos({ x, y });
    setHighlightTiles([]);
  };

  return (
    <Stage width={MAP_COLS * TILE_SIZE} height={MAP_ROWS * TILE_SIZE} options={{ backgroundColor: 0xeeeeee }}>
      <Container>
        {[...Array(MAP_ROWS)].map((_, y) =>
          [...Array(MAP_COLS)].map((_, x) => {
            const isHighlighted = highlightTiles.some((t) => t.x === x && t.y === y);
            return (
              <Tile
                key={`${x}-${y}`}
                x={x}
                y={y}
                highlight={isHighlighted}
                onClick={() => isHighlighted && handleTileClick(x, y)}
              />
            );
          })
        )}
        <Unit x={unitPos.x} y={unitPos.y} onClick={handleUnitClick} />
      </Container>
    </Stage>
  );
};

export default GameBoard;
