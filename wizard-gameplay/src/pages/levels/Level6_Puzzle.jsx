import { useState } from 'react'

import level6_3 from '../../assets/level6_3.webp' // Ensure the correct image path
import { Link, useNavigate } from 'react-router-dom'
import LayoutPage from '../../components/Layout'
import checkAnswer from '../../utils/checkAnswer.js'
import { useDispatch } from 'react-redux';
import { unlockLevel  } from '../../protectedRoutes/store';

const Level6_Puzzle = () => {
  const [answer, setAnswer] = useState('')
  const [showError, setShowError] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const handleSubmitAnswer = async () => {
    const { correct } = await checkAnswer(answer, '6')

    if (correct) {
      dispatch(unlockLevel("level7_1"));
      navigate('/level7_1')
    } else {
      setShowError(true)
    }
  }

  return (
    <div
      className="flex justify-center items-center flex-col imageContainer"
      style={{
        backgroundImage: `url(${level6_3})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        transition: 'background-image 0.8s ease-in-out',
      }}
    >
      <LayoutPage />
      <div className="boundary">
        <div className="heading">Level 6</div>
        {/* <div
            className="font-serif text-container"
            style={{ fontFamily: "'Pirata One', cursive" }}
          >
            {displayedText}
          </div> */}
        <input
          type="text"
          value={answer}
          className="answer answer-container"
          onChange={(e) => {
            setAnswer(e.target.value)
            setShowError(false)
          }}
          style={{ width: '400px' }}
          placeholder="Enter your answer here"
        />
        {showError && <div className="error">❌ Wrong Answer! Try Again</div>}
        <div className="button flex">
          <Link
            to="/level6"
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
  )
}

export default Level6_Puzzle
