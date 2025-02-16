import { useState } from 'react'

import level1_3 from '../../assets/level1_3.webp' // Ensure the correct image path
import { Link, useNavigate } from 'react-router-dom'
import LayoutPage from '../../components/Layout'
import checkAnswers from '../../utils/checkAnswer'
import { useDispatch } from 'react-redux'
import { lockLevel, unlockLevel } from '../../protectedRoutes/store'

const Level1_Puzzle = () => {
  const [answer, setAnswer] = useState('')
  const [showError, setShowError] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmitAnswer = async () => {
    if (loading) return
    setLoading(true)
    try {
      const { correct } = await checkAnswers(answer, '1')
      if (correct) {
        setLoading(true)
        setTimeout(() => {
          dispatch(unlockLevel('level2'))
          navigate('/level2')
        }, 1500)
      } else {
        setShowError(true)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }
  

  return (
    <div
      className="flex justify-center items-center flex-col imageContainer"
      style={{
        backgroundImage: `url(${level1_3})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        transition: 'background-image 0.8s ease-in-out',
      }}
    >
      <LayoutPage level={1} />
      <div className=" boundary">
        <div className="heading "> CRYPTOGRAPHY IS FUN</div>

        <input
          type="text"
          value={answer}
          className="answer answer-container"
          onChange={(e) => {
            setAnswer(e.target.value)
            setShowError(false)
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
            disabled={loading}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default Level1_Puzzle
