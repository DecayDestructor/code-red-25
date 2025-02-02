import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Level5_2 = () => {
  const [setHoveredButton] = useState(null);
const navigate = useNavigate();
  const handleOption1Click = () => {
    setTimeout(() => {
      navigate("/level_4A");
    }, 500);
  };

  const handleOption2Click = () => {
    setTimeout(() => {
      navigate("/backstory_level_5B");
    }, 500);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0a0a0a]">
      <div className="w-full max-w-4xl mx-4">
        <div className="text-center mb-16">
          <h1 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 mb-4 animate-pulse">
            Choose one option
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
          {/* Button 1 */}
          <button
            className="group relative min-h-[100px] w-full perspective"
            onClick={handleOption1Click}
            onMouseEnter={() => setHoveredButton(1)}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <div className="relative h-full w-full transition-all duration-300 transform group-hover:scale-105 group-hover:rotate-x-6">
              {/* Front face */}
              <div className="absolute inset-0 backface-hidden">
                <div className="h-full w-full rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-[2px] shadow-xl transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/50">
                  <div className="relative h-full w-full rounded-2xl bg-black p-4 overflow-hidden">
                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.2)_50%,transparent_75%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_200%] animate-gradient-fast" />

                    {/* Animated borders */}
                    <div className="absolute inset-[1px] rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />

                    {/* Glow effects */}
                    <div className="absolute -inset-2 bg-blue-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Text content */}
                    <div className="relative flex h-full items-center justify-center">
                      <span className="text-2xl font-bold text-white tracking-[0.2em] transform transition-all duration-300 group-hover:scale-110 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-indigo-400">
                      DEFEAT THE FORTRESS ALONE
                      </span>
                    </div>

                    {/* Animated particles */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute h-1 w-1 rounded-full bg-blue-400"
                          style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animation: `float ${2 + Math.random() * 2}s linear infinite`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </button>

          {/* Button 2 */}
          <button
            className="group relative min-h-[100px] w-full perspective"
            onClick={handleOption2Click}
            onMouseEnter={() => setHoveredButton(2)}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <div className="relative h-full w-full transition-all duration-300 transform group-hover:scale-105 group-hover:rotate-x-6">
              {/* Front face */}
              <div className="absolute inset-0 backface-hidden">
                <div className="h-full w-full rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 p-[2px] shadow-xl transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/50">
                  <div className="relative h-full w-full rounded-2xl bg-black p-4 overflow-hidden">
                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(147,51,234,0.2)_50%,transparent_75%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_200%] animate-gradient-fast" />

                    {/* Animated borders */}
                    <div className="absolute inset-[1px] rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />

                    {/* Glow effects */}
                    <div className="absolute -inset-2 bg-purple-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Text content */}
                    <div className="relative flex h-full items-center justify-center">
                      <span className="text-2xl font-bold text-white tracking-[0.2em] transform transition-all duration-300 group-hover:scale-110 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-indigo-400">
                      TAKE ASSISTANCE FROM RAVEN
                      </span>
                    </div>

                    {/* Animated particles */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute h-1 w-1 rounded-full bg-purple-400"
                          style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animation: `float ${2 + Math.random() * 2}s linear infinite`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>

      <style jsx>{`
        .perspective {
          perspective: 2000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        @keyframes float {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 0;
          }
          50% {
            transform: translate(20px, -20px) scale(1.5);
            opacity: 1;
          }
          100% {
            transform: translate(40px, -40px) scale(1);
            opacity: 0;
          }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-fast {
          animation: gradient 2s linear infinite;
        }
        .rotate-x-6 {
          transform: rotateX(6deg);
        }
      `}</style>
    </div>
  );
};

export default Level5_2;
