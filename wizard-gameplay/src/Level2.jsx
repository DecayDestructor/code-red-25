import { useState, useEffect } from "react";
import level2_2 from './assets/level2_2.webp';
import level2_1 from './assets/level2_1.webp'; 

import { useNavigate } from "react-router-dom";
import Level2_Puzzle from "./Level2_Puzzle";

const Level2 = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const level2_texts = [
   
    "For the next relic you (Eryndor) walk to the catacombs of Ehmest to find the trumpet of war used by Malakaroth as that can be the relic where the second piece of his soul is hidden. Within the ancient catacombs of Ehmest, a soft glow begins to emanate from the intricate carvings on the walls.",
    " The markings, previously dormant, now hum with power, responding to your presence. As you approach the center of the chamber, you feel an overwhelming force—a melding of magic and divine energy. A towering statue of a hooded figure dominates the space, its eyes hollow yet watching.",
    "Before you can proceed further, the statue speaks, its voice deep and resonant, shaking the very air:"+"To claim the legacy of Arthur, you must pass the Trials of Convergence. Only those who understand the resonance between magic and might are worthy.",
    "In the ruined hallways of catacombs the crystalline structure hums with chaotic energy, and an intricate pattern of light and sound begins to emerge across its surface. To proceed, you must identify and amplify the crystal’s natural resonant frequency, harmonizing it with your magical aura.",
    
  ];



  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [backgroundImage, setBackgroundImage] = useState(level2_1);
  const [showQuestion, setShowQuestion] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentTextIndex >= 2 && currentTextIndex < 4) {
      setBackgroundImage(level2_2);
    }  else {
      setBackgroundImage(level2_1);
    }

    if (currentIndex < level2_texts[currentTextIndex]?.length) {
      const timeout = setTimeout(() => {
        const char = level2_texts[currentTextIndex][currentIndex];
        setDisplayedText((prev) => prev + char);
        setCurrentIndex(currentIndex + 1);
      }, 20);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, level2_texts, currentTextIndex]);

  const handleNext = () => {
    if (currentTextIndex + 1 < level2_texts.length) {
      setDisplayedText("");
      setCurrentIndex(0);
      setCurrentTextIndex(currentTextIndex + 1);
    } else {
      setShowQuestion(true);
      
    }
  };

  const handleBack = () => {
    if (currentTextIndex > 0) {
      setDisplayedText("");
      setCurrentIndex(0);
      setCurrentTextIndex(currentTextIndex - 1);
    } else {
      navigate("/level2");
    }
  };


  return (
    <div
      className="flex justify-center h-screen  items-center flex-col imageContainer"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      {!showQuestion ? (
        <>
          <div className="boundary">
            <div
              className="font-serif text-container"
              style={{ fontFamily: "'Pirata One', cursive" }}
            >
              {displayedText}
            </div>
          </div>
          <div className="button flex">
            <button
              onClick={handleBack}
              className="btn bg-black hover:bg-gray-700 text-white"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="btn hover:bg-blue-800 text-white"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <>
        <Level2_Puzzle/>

        </>
      )}
    </div>
  );
};

export default Level2;
