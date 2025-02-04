import { useState} from "react";

import level4_1 from '../../assets/level4_1.webp'; // Ensure the correct image path
import { Link, useNavigate } from "react-router-dom";

const Level4_Puzzle = () => {


  const navigate = useNavigate();
  const [answer, setAnswer] = useState("");
  const [showError, setShowError] = useState(false);


  const handleSubmitAnswer = () => {
    const correctAnswer = "0x2804CDF61b998278124118f1E2C291bd0aD70833"; // Adjust based on your logic
    const userAnswer = answer;

    if (userAnswer >= correctAnswer - 1 && userAnswer <= correctAnswer + 1) {
      navigate("/level6");
    } else {
      setShowError(true);
    }
  };

  return (
    <div
      className="flex justify-center items-center flex-col imageContainer"
      style={{
        backgroundImage: `url(${level4_1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        transition: "background-image 0.8s ease-in-out",
      }}
    >

      <div className=" boundary">
            <div className="heading">Level 4</div>

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
          <Link to="/level4"
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

export default Level4_Puzzle;
