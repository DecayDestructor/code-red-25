import { useState, useEffect } from "react";
import level1_2 from './assets/level1_2.webp';
import level1_1 from './assets/level1_1.webp'; 
import level1_3 from './assets/level1_3.webp'; // Ensure the correct image path
import { useNavigate } from "react-router-dom";

const Level1 = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const level1_texts = [
    "Eryndor’s have to find all of the pieces of Malakaroth’s soul to disable Malakaroth’s invincibility once and for all." + 
    "Eryndor’s first mission is to seek the Infernal Blade, the Ebon Relic representing Wrath." + 
    "Mount Draemora, a dormant volcano reawakened by Malevoryx's dark magic, is now a chaotic inferno of molten rivers, ash storms, and unpredictable eruptions." + 
    "The Infernal Blade lies embedded in the Obsidian Altar, deep within the volcano’s core, radiating anger and violence.",

    "The blade corrupts the environment, twisting creatures into mindless berserkers and magnifying rage in anyone who approaches." + 
    "For Eryndor, whose heart still smolders with anger over his shattered past, the relic’s influence is a personal and dangerous test.",

    "To reach the Obsidian Altar where the Infernal Blade resides, Eryndor encounters a massive Magma Flow Regulator, an ancient mechanical system designed by the Fire-Kin engineers to stabilize Mount Draemora." + 
    "The Regulator is corrupted by Malevoryx's influence, causing a chaotic magma surge that blocks access to the altar and threatens to collapse the entire structure.",

    "The system must be repaired and optimized to control the magma flow, opening a safe path to the altar." +
    "However, the system's logic is highly complex, designed to test both intelligence and composure under pressure.",

    "“Ah, a challenger approaches! If you seek passage through these hallowed gates, you must solve a riddle of transformation and balance. Only those with keen minds and steady resolve may proceed.”",
    "First, take this phrase and let it dance forward through the cycles of letters, shifting each one with the rhythm of seven steps. The spaces between words are sacred and shall remain untouched. When you have completed this transformation, you will hold a phrase of power in your grasp.",
    "But your task is not yet done. Each symbol in this new phrase carries its own weight, a value intrinsic to its nature. Ignore the voids between words, and instead, focus on the letters and convert them to numbers in the most obvious way possible. Find the balance—the average weight—of the entire phrase you have crafted."   
  ];



  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [backgroundImage, setBackgroundImage] = useState(level1_1);
  const [showQuestion, setShowQuestion] = useState(false);
  const [answer, setAnswer] = useState("");
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentTextIndex >= 2 && currentTextIndex < 4) {
      setBackgroundImage(level1_2);
    } else if(currentTextIndex >= 4){ 
      setBackgroundImage(level1_3);
    } else {
      setBackgroundImage(level1_1);
    }

    if (currentIndex < level1_texts[currentTextIndex]?.length) {
      const timeout = setTimeout(() => {
        const char = level1_texts[currentTextIndex][currentIndex];
        setDisplayedText((prev) => prev + char);
        setCurrentIndex(currentIndex + 1);
      }, 20);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, level1_texts, currentTextIndex]);

  const handleNext = () => {
    if (currentTextIndex + 1 < level1_texts.length) {
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
      navigate("/");
    }
  };

  const handleSubmitAnswer = () => {
    const correctAnswer = 79.5; // Adjust based on your logic
    const userAnswer = parseFloat(answer);

    if (userAnswer >= correctAnswer - 1 && userAnswer <= correctAnswer + 1) {
      setIsAnswerCorrect(true);
      navigate("/level2");
    } else {
      setShowError(true);
    }
  };

  return (
    <div
      className="flex justify-center items-center flex-col imageContainer"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "fit",
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
        <div className=" boundary">
            <div className="heading"> CRYPTOGRAPHY IS FUN</div>
            
          <input
            type="text"
            value={answer}
            className="answer answer-container"
            onChange={(e) => {
              setAnswer(e.target.value);
              setShowError(false);
            }}
            placeholder="Enter your answer here"
          />
          {showError && <div className="error">❌ Wrong Answer! Try Again</div>}
          <div className="button flex">
          <button
              onClick={handleBack}
              className="btn bg-black hover:bg-gray-700 text-white"
            >
              Back
            </button>
            <button
              onClick={handleSubmitAnswer}
              className="btn bg-green-500 hover:bg-green-700 text-white"
            >
              Submit
            </button>
            </div>
          {/* <button onClick={handleSubmitAnswer} className="btn bg-green-500 hover:bg-green-700 text-white">
            Submit
          </button> */}
        </div>
      )}
    </div>
  );
};

export default Level1;
