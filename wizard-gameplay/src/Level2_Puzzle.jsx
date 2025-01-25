import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Orb from "./assets/orb8.png"

const Level2_Puzzle = () => {

    const [sliderValues, setSliderValues] = useState([8, 8, 8]); // Default mid-point
    const [activeOrb, setActiveOrb] = useState(null);
    const [solved, setSolved] = useState(false);
    const navigate = useNavigate();
    
    const targetPositions = [3, 12, 15];
    
    const handleSliderChange = (index, value) => {
      const newValues = [...sliderValues];
      newValues[index] = value;
      setSliderValues(newValues);
    
      // Check if the puzzle is solved
      const isSolved = newValues.every((val, i) => val === targetPositions[i]);
      setSolved(isSolved);

        if(isSolved){
            navigate('/level3')
        }
    };
    
    const getRandomSpeed = () => Math.random() * 2 + 1; // Random speed between 1 and 3 seconds
    const getRandomAmplitude = () => Math.random() * 70 + 30; // Random range (30-100px)



  return (
    <div className=" flex items-center boundary justify-center ">
    <div className="max-w-4xl w-full bg-gradient-to-b bg-zinc-50/10  p-8 rounded-lg border border-amber-900/800 shadow-2xl">


      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Magical Orbs */}
        <div className="space-y-8 flex flex-col items-center">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className={`relative group cursor-pointer ${
                activeOrb === index ? "scale-110 transition-transform" : ""
              }`}
            //   onMouseEnter={() => setActiveOrb(index)}
            //   onMouseLeave={() => setActiveOrb(null)}
              animate={{
                x: solved
                  ? targetPositions[index] * 10
                  : [
                      0,
                      getRandomAmplitude(),
                      -getRandomAmplitude(),
                      0,
                    ],
              }}
              transition={{
                repeat: solved ? 0 : Infinity,
                duration: getRandomSpeed(),
                ease: "easeInOut",
                repeatType: "mirror",
              }}
            >
              <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-radial from-white/20 to-transparent" />
              <img src={Orb} className="w-[100px] h-[100px]" alt="" />

            </motion.div>
          ))}
        </div>

        {/* Control Panel */}
        <div className="bg-stone-900/50 p-6 rounded-lg border border-amber-900/30">
          <h2 className="text-2xl font-medieval text-amber-200 mb-8 text-center">
            Mystical Controls
          </h2>
          <div className="space-y-8">
            {[0, 1, 2].map((index) => (
              <div key={index} className="space-y-2">
                <label className="text-amber-200/80 font-medieval block">
                  Arcane Power {index + 1}
                </label>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-100/20 to-700/20 rounded-full blur" />
                  <input
                    type="range"
                    min="0"
                    max="15"
                    step="1" // Precise increments
                    value={sliderValues[index]}
                    onChange={(e) =>
                      handleSliderChange(index, parseInt(e.target.value))
                    }
                    className="w-full h-2 bg-slate-100/30 rounded-full appearance-none cursor-pointer relative"
                  />
                  <div className="text-center text-amber-200/80 tracking-normal mt-1 font-medieval">
                    {sliderValues[index]} pts
                  </div>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </div>
  </div>
  )
}

export default Level2_Puzzle