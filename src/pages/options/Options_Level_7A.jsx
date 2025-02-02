import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Level5_2 = () => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  const handleOption1Click = () => {
    setTimeout(() => {
      navigate("/105_99_104_111_114_102_111_110_105_97_115");
    }, 500);
  };

  const handleOption2Click = () => {
    setTimeout(() => {
      navigate("/level_7_1B");
    }, 500);
  };

  // Calculate evasive movement for the first button
  const calculateEvasiveMovement = (e, buttonRect) => {
    if (!buttonRect) return { x: 0, y: 0 };

    const buttonCenterX = buttonRect.left + buttonRect.width / 2;
    const buttonCenterY = buttonRect.top + buttonRect.height / 2;

    // Calculate direction from mouse to button center
    const dirX = e.clientX - buttonCenterX;
    const dirY = e.clientY - buttonCenterY;

    // Normalize and inverse the direction
    const length = Math.sqrt(dirX * dirX + dirY * dirY);
    const normalizedX = dirX / length;
    const normalizedY = dirY / length;

    // Movement strength decreases as distance increases
    const distanceFactor = Math.min(1, 100 / length);

    return {
      x: -normalizedX * 1000 * distanceFactor,
      y: -normalizedY * 1000 * distanceFactor
    };
  };

  const handleMouseMove = (e) => {
    if (hoveredButton === 1) {
      const buttonElement = document.getElementById('evasiveButton');
      if (buttonElement) {
        const buttonRect = buttonElement.getBoundingClientRect();
        const movement = calculateEvasiveMovement(e, buttonRect);
        setMousePosition(movement);
      }
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center bg-fixed relative overflow-hidden"
      style={{
        backgroundImage: "url('src/assets/options/Options_Level_4.png')",
      }}
      onMouseMove={handleMouseMove}
    >
      {/* Animated overlay gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-transparent to-purple-900/30 animate-pulse" />

      {/* Main content */}
      <div className="w-full max-w-6xl mx-4 relative z-10">
        <div className="text-center mb-20">
          <h1 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-teal-400 mb-4 animate-pulse">
            Choose Your Path
          </h1>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-blue-500 to-teal-500 rounded-full animate-pulse" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 px-4">
          {/* Evasive Tech/Crystal themed button */}
          <button
            id="evasiveButton"
            className="group relative min-h-[120px] w-full perspective transform-gpu"
            onClick={handleOption1Click}
            onMouseEnter={() => setHoveredButton(1)}
            onMouseLeave={() => {
              setHoveredButton(null);
              setMousePosition({ x: 0, y: 0 });
            }}
            style={{
              transform: hoveredButton === 1 ?
                `translate(${mousePosition.x}px, ${mousePosition.y}px)` :
                'translate(0, 0)',
              transition: hoveredButton === 1 ? 'transform 0.1s ease-out' : 'transform 0.3s ease-out'
            }}
          >
            <div className="relative h-full w-full transition-all duration-500 transform-gpu group-hover:scale-105 group-hover:rotate-x-12">
              <div className="absolute inset-0 backface-hidden">
                <div className="h-full w-full rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-teal-500 p-[2px] shadow-xl transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-blue-500/50">
                  <div className="relative h-full w-full rounded-2xl bg-black/80 p-6 overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-blue-500 animate-pulse" />
                    <div className="relative flex h-full items-center justify-center">
                      <span className="text-3xl font-bold text-white tracking-[0.2em] transition-all duration-300 group-hover:scale-110 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-teal-400">
                        DESTROY ICHORFONIAS
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </button>

          {/* Normal Dark fantasy themed button */}
          <button
            className="group relative min-h-[120px] w-full perspective transform-gpu"
            onClick={handleOption2Click}
            onMouseEnter={() => setHoveredButton(2)}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <div className="relative h-full w-full transition-all duration-500 transform-gpu group-hover:scale-105 group-hover:rotate-x-12">
              <div className="absolute inset-0 backface-hidden">
                <div className="h-full w-full rounded-2xl bg-gradient-to-br from-purple-500 via-purple-600 to-teal-500 p-[2px] shadow-xl transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-purple-500/50">
                  <div className="relative h-full w-full rounded-2xl bg-black/80 p-6 overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-purple-500 animate-pulse" />
                    <div className="relative flex h-full items-center justify-center">
                      <span className="text-3xl font-bold text-white tracking-[0.2em] transition-all duration-300 group-hover:scale-110 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-teal-400">
                        TAKE ENGINEER'S HELP
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Level5_2;