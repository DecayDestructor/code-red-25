import { useState, useEffect } from "react";
import level3_1 from './assets/level3_1.webp'; 
import level3_2 from './assets/level3_2.webp'; // Ensure the correct image path
import { useNavigate } from "react-router-dom";

const Level3 = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const level3_texts = [
    "As you step into the chamber, the air is filled with faint whispers—a symphony of voices merging, overlapping, and fading into silence." +
    "In the center, a large crystalline sphere hovers, glowing faintly with pulsing light. This is the Core of Echoes, an artifact that preserves fragments of memories from those who have attempted the trial before you.",

    "The Core speaks in riddles, presenting a challenge steeped in logic:" + 
    "“Within me lies a fractured sequence, a pattern obscured by noise and repetition. Decode the echoes, and the truth shall be revealed.”",   
  ];



  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [backgroundImage, setBackgroundImage] = useState(level3_1);
  const [showQuestion, setShowQuestion] = useState(false);
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentTextIndex >= 2) {
      setBackgroundImage(level3_2);
    } else {
      setBackgroundImage(level3_1);
    }

    if (currentIndex < level3_texts[currentTextIndex]?.length) {
      const timeout = setTimeout(() => {
        const char = level3_texts[currentTextIndex][currentIndex];
        setDisplayedText((prev) => prev + char);
        setCurrentIndex(currentIndex + 1);
      }, 20);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, level3_texts, currentTextIndex]);

  const handleNext = () => {
    if (currentTextIndex + 1 < level3_texts.length) {
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
    const correctAnswer1 = 312211;
    const correctAnswer2 = 13112221// Adjust based on your logic
    const userAnswer1 =  answer1;
    const userAnswer2 =  answer2;

    if (userAnswer1 == correctAnswer1 && userAnswer2 == correctAnswer2) {
      setIsAnswerCorrect(true);
      navigate("/level4");
    } else {
      setShowError(true);
    }
  };

  return (
    <div
      className="flex justify-center items-center flex-col imageContainer"
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
        <div className=" boundary">
            <div className="heading"> LEvel 3</div>
            <div
              className="font-serif text-container"
              style={{ fontFamily: "'Pirata One', cursive" }}
            >
              {displayedText}
            </div>
          <input
            type="text"
            value={answer1}
            className="answer answer-container"
            onChange={(e) => {
              setAnswer1(e.target.value);
              setShowError(false);
            }}
            placeholder="Enter your answer here"
          />
          <input
            type="text"
            value={answer2}
            className="answer answer-container"
            onChange={(e) => {
              setAnswer2(e.target.value);
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

export default Level3;
