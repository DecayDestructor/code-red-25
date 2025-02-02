import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutPage from '../interfaces/LayoutPage';

const ColorBoxes = () => {
  const [colors, setColors] = useState(Array(6).fill(''));
  const [showNextPageButton, setShowNextPageButton] = useState(false);
  const [hoveredBox, setHoveredBox] = useState(null);
  const [invalidInputs, setInvalidInputs] = useState(Array(6).fill(false));
  const navigate = useNavigate();

  const normalizeColor = (color) => {
    return color.split(',').map((part) => part.trim()).join(',');
  };

  useEffect(() => {
    const allColorsValidAndGreen = colors.every(
      (color) => normalizeColor(color) === '0,255,0' && color !== ''
    );
    setShowNextPageButton(allColorsValidAndGreen);
  }, [colors]);

  const handleColorChange = (index, value) => {
    const updatedColors = [...colors];
    updatedColors[index] = value;
    setColors(updatedColors);

    // Update invalid inputs
    const newInvalidInputs = [...invalidInputs];
    newInvalidInputs[index] = value !== '' && !isValidRgb(value);
    setInvalidInputs(newInvalidInputs);
  };

  const isValidRgb = (color) => {
    const regex = /^\d{1,3},\s*\d{1,3},\s*\d{1,3}$/;
    if (regex.test(color)) {
      const parts = color.split(',').map((val) => parseInt(val.trim()));
      return parts.every((part) => part >= 0 && part <= 255);
    }
    return false;
  };

  const handleNextPage = () => {
    navigate('/backstory_level_7_3');
  };

  return (
    <div className="flex justify-center items-center flex-col h-screen relative">
      {/* Background Image */}
      <img
        src="src/assets/levels/Level_7_1.png"
        alt="Background"
        className="object-cover w-full h-full absolute z-0"
      />
      <LayoutPage />

      {/* Main Container */}
      <div className="relative bg-white bg-opacity-50 backdrop-blur-md shadow-xl rounded-xl p-8 w-11/12 sm:w-4/5 lg:w-3/4 text-white z-10 h-[70.8%]">
        {/* Header */}
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          RGB Color Challenge
        </h2>

        {/* Grid of boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {colors.map((color, i) => (
            <div
              key={i}
              className="relative transform transition-all duration-300 hover:scale-105"
              onMouseEnter={() => setHoveredBox(i)}
              onMouseLeave={() => setHoveredBox(null)}
            >
              <div
                className={`h-32 rounded-xl shadow-lg flex flex-col items-center justify-center p-6
                           transition-all duration-300 ${invalidInputs[i] ? 'shake-animation' : ''}`}
                style={{
                  backgroundColor: isValidRgb(colors[i])
                    ? `rgb(${colors[i]})`
                    : 'rgba(0, 0, 0, 0.3)',
                  boxShadow: hoveredBox === i ? '0 0 20px rgba(255,255,255,0.3)' : 'none'
                }}
              >
                {/* Box number */}
                <div className="absolute top-2 left-2 w-7 h-7 rounded-full bg-black bg-opacity-50 
                              flex items-center justify-center text-white font-bold">
                  {i + 1}
                </div>

                <input
                  type="text"
                  placeholder="Enter RGB values"
                  value={colors[i]}
                  onChange={(e) => handleColorChange(i, e.target.value)}
                  className={`w-full px-4 py-3 text-black rounded-lg border-2 
                            focus:outline-none focus:ring-2 focus:ring-offset-2
                            bg-white bg-opacity-90 transition-all duration-300
                            ${invalidInputs[i]
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-blue-500'}`}
                />

                {/* Validation message */}
                {invalidInputs[i] && (
                  <p className="absolute -bottom-6 left-0 right-0 text-red-500 text-sm text-center">
                    Invalid RGB format
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Result Message and Next Button */}
        <div className="text-center mt-8">
          {showNextPageButton ? (
            <div className="animate-fadeIn relative bottom-5">
              <p className="text-xl font-medium text-green-600">
                Success! The pattern is complete.
              </p>
              <button
                onClick={handleNextPage}
                className="px-8 py-3 bg-gradient-to-r from-blue-900 to-blue-700 text-white 
                          font-bold rounded-lg transform transition-all duration-300
                          hover:scale-105 hover:shadow-lg hover:from-blue-800 hover:to-blue-600
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Continue to Next Level
              </button>
            </div>
          ) : (
            <p className="text-lg text-gray-700">
              Find the correct RGB combination to unlock the next level
            </p>
          )}
        </div>
      </div>

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .shake-animation {
          animation: shake 0.5s ease-in-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ColorBoxes;