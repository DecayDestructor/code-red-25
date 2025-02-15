import { useState, useEffect } from 'react'
import LayoutPage from '../../components/Layout'
import level3_1 from '../../assets/level3_1.webp'
import { Link, useNavigate } from 'react-router-dom'
import checkAnswers from '../../utils/checkAnswer'
import { useDispatch } from 'react-redux';
import { lockLevel, unlockLevel  } from '../../protectedRoutes/store';

const Level3_Puzzle = () => {
  const [answer1, setAnswer1] = useState('')
  const [showError, setShowError] = useState(false)
  const [answer2, setAnswer2] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const handleSubmitAnswer = async () => {
    // const correctAnswer1 = '312211'
    // const correctAnswer2 = '3112221'
    // const userAnswer1 = answer1
    // const userAnswer2 = answer2
    const { correct } = await checkAnswers(answer1.concat(answer2), '3')

    if (correct) {
      dispatch(unlockLevel("level4"));
      dispatch(lockLevel("level3"));
      navigate('/level4')
    } else {
      setShowError(true)
    }
  }

  return (
    <div
      className="flex justify-center items-center flex-col imageContainer"
      style={{
        backgroundImage: `url(${level3_1})`,
        backgroundSize: 'fit',
        backgroundPosition: 'center',
        height: '100vh',
        transition: 'background-image 0.8s ease-in-out',
      }}
    >
      <LayoutPage />
      <div className=" boundary">
        <div className="heading"> Level 3</div>

        <input
          type="text"
          value={answer1}
          className="answer answer-container"
          onChange={(e) => {
            setAnswer1(e.target.value)
            setShowError(false)
          }}
          placeholder="Enter your answer here"
        />
        <input
          type="text"
          value={answer2}
          className="answer answer-container"
          onChange={(e) => {
            setAnswer2(e.target.value)
            setShowError(false)
          }}
          placeholder="Enter your answer here"
        />
        {showError && <div className="error">❌ Wrong Answer! Try Again</div>}
        <div className="button flex">
          <Link
            to="/level3"
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

export default Level3_Puzzle
