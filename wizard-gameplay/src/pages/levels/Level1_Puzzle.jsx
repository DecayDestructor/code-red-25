import { useState } from "react";

import level1_3 from '../../assets/level1_3.webp'; // Ensure the correct image path
import { Link, useNavigate } from "react-router-dom";
import LayoutPage from '../../components/Layout'

const Level1_Puzzle = () => {
  const [answer, setAnswer] = useState("");
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();


  const handleSubmitAnswer = () => {
    const correctAnswer = 79.5;
    const userAnswer = parseFloat(answer);

    if (userAnswer >= correctAnswer - 1 && userAnswer <= correctAnswer + 1) {
      navigate("/level2");
    } else {
      setShowError(true);
    }
  };




  return (
    <div
      className="flex justify-center items-center flex-col imageContainer"
      style={{
        backgroundImage: `url(${level1_3})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        transition: "background-image 0.8s ease-in-out",
      }}
    >
      <LayoutPage />
      <div className=" boundary">
        <div className="heading "> CRYPTOGRAPHY IS FUN</div>

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
          <Link
            to="/level1"
            className="btn bg-black hover:bg-gray-700 text-white"
          >
            Back
          </Link>
          <button
            onClick={handleSubmitAnswer}
            className="btn bg-green-500 hover:bg-green-700 text-white"
          >
            Submit
          </button>
        </div>

      </div>
    </div>
  );
};

export default Level1_Puzzle;
