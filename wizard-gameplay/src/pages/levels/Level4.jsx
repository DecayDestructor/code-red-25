import { useState, useEffect } from "react";
import level4_2 from '../../assets/level4_1.webp';
import level4_1 from '../../assets/level4_1.webp'; 
import { useNavigate } from "react-router-dom";

const Level4 = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const level4_texts = [
    "“To find the Wizard's Legacy, seek the market where ownable digital treasures are traded. The biggest marketplace will reveal the key to unlock the artifact. ‘Cassandra’ , some call the treasure… seek his, and give us his address…”"   
  ];



  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [backgroundImage, setBackgroundImage] = useState(level4_1);
  const [showQuestion, setShowQuestion] = useState(false);
  const [answer, setAnswer] = useState("");
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentTextIndex >= 2 && currentTextIndex < 4) {
      setBackgroundImage(level4_2);
    } else {
      setBackgroundImage(level4_1);
    }

    if (currentIndex < level4_texts[currentTextIndex]?.length) {
      const timeout = setTimeout(() => {
        const char = level4_texts[currentTextIndex][currentIndex];
        setDisplayedText((prev) => prev + char);
        setCurrentIndex(currentIndex + 1);
      }, 20);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, level4_texts, currentTextIndex]);

  const handleNext = () => {
    if (currentTextIndex + 1 < level4_texts.length) {
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
    } 
  };

  const handleSubmitAnswer = () => {
    const correctAnswer = "0x2804CDF61b998278124118f1E2C291bd0aD70833"; // Adjust based on your logic
    const userAnswer = answer;

    if (userAnswer >= correctAnswer - 1 && userAnswer <= correctAnswer + 1) {
      setIsAnswerCorrect(true);
      navigate("/level5");
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
        transition: "background-image 0.8s ease-in-out",
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
            <div className="heading">Level 4</div>
            <div
              className="font-serif text-container"
              style={{ fontFamily: "'Pirata One', cursive" }}
            >
              {displayedText}
            </div>
          <input
            type="text"
            value={answer}
            className="answer w-3/4 answer-container"
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

export default Level4;
