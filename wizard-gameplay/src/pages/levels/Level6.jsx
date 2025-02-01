import { useState, useEffect } from "react";
import level6_1 from '../../assets/level6_1.webp'; 
import level6_2 from '../../assets/level6_2.webp'; 
import { useNavigate } from "react-router-dom";

const Level6 = () => {
  const level6_texts = [
    "The kraken’s heart is made of metal and fortunately after a battle between the vicious creature and your spells, you are supposed to take down the kraken by destroying its heart and indirectly destroying Malakaroth’s power. The heart has a self-destruction sequence wherein a code entered properly can cause it to self-destruct. However, the code required here is the same key which is required to enter Malakaroth's armory in his fort encoded to the 64th base.",
    "Since you, Eryndor, have been destroying Malakaroth’s horcruxes, you need the help of a warrior who has broken into Fort Argzak in Azzgardos. A warrior who has progressed far, six times, to be precise, and in the seventh quest of the warrior, you shall find the code you need."
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [answer, setAnswer] = useState("");
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentIndex < level6_texts[currentTextIndex]?.length) {
      const timeout = setTimeout(() => {
        const char = level6_texts[currentTextIndex][currentIndex];
        setDisplayedText((prev) => prev + char);
        setCurrentIndex(currentIndex + 1);
      }, 20);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, level6_texts, currentTextIndex]);

  const handleNext = () => {
    if (currentTextIndex + 1 < level6_texts.length) {
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
      setShowQuestion(false); 
    } else {
      setAnswer("");
      setShowError(false);
      setShowQuestion(false);
      navigate("/");
    }
  };

  const handleSubmitAnswer = () => {
    const correctAnswer = "MTEwMDExMDEx";

    if (answer === correctAnswer) {
      setIsAnswerCorrect(true);
      navigate("/level7");
    } else {
      setShowError(true);
    }
  };

  const getBackgroundImage = () => {
    return currentTextIndex === 0 ? level6_1 : level6_2;
  };

  return (
    <div
      className="flex justify-center items-center flex-col imageContainer"
      style={{
        backgroundImage: `url(${getBackgroundImage()})`,
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
        <div className="boundary">
          <div className="heading">Level 6</div>
          <div
            className="font-serif text-container"
            style={{ fontFamily: "'Pirata One', cursive" }}
          >
            {displayedText}
          </div>
          <input
            type="text"
            value={answer}
            className="answer answer-container"
            onChange={(e) => {
              setAnswer(e.target.value);
              setShowError(false);
            }}
            style={{ width: "400px" }}
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
        </div>
      )}
    </div>
  );
};

export default Level6;
