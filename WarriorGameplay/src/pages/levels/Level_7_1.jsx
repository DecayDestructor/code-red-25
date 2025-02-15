import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LayoutPage from '../interfaces/LayoutPage'
import checkAnswers from '../../../utils/checkAnswers'
import bgImg from "../../assets/levels/Level_7_1.png"

import { useDispatch } from 'react-redux';
import { unlockLevel  } from '../../protectedRoutes/store';
const Level7_1 = () => {
  const [buttonsState, setButtonsState] = useState(Array(9).fill('0'))
  const [isCorrect, setIsCorrect] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const handleButtonClick = (index) => {
    const newState = [...buttonsState]
    newState[index] = newState[index] === '0' ? '1' : '0'
    setButtonsState(newState)
  }

  const handleSubmit = async () => {
    const currentPattern = buttonsState.join('')
    setSubmitted(true)
    const isPatternCorrect = await checkAnswers(currentPattern, '7_1')
    setIsCorrect(isPatternCorrect)

    if (isPatternCorrect) {
      setTimeout(() => {
        dispatch(unlockLevel("level_7a"));
        navigate('/options_level_7a')
      }, 1000)
    } else {
      setTimeout(() => {
        setSubmitted(false)
      }, 900)
    }
  }

  return (
    <div className="flex justify-center items-center flex-col h-screen relative">
      {/* Background Image */}
      <img
        src={bgImg}
        alt="Background"
        className="object-cover w-full h-full absolute z-0"
      />
      <LayoutPage />

      <div className="relative bg-gray-700 bg-opacity-70 w-11/12 max-w-4xl p-5 rounded-lg border-4 border-yellow-600 shadow-lg flex flex-col items-center">
        <div
          id="middle-text"
          className="bg-red-800 bg-opacity-80 w-1/3 p-3 mt-5 rounded-md border-4 border-white shadow-md"
        >
          <p className="text-white text-lg font-bold text-center">
            x<sup>5</sup>, e<sup>x</sup>, x<sup>2</sup>
          </p>
        </div>

        <div className="flex flex-wrap gap-4 justify-center items-center mt-5">
          {buttonsState.map((value, index) => (
            <button
              key={index}
              onClick={() => handleButtonClick(index)}
              className={`w-20 h-20 text-2xl font-bold border-4 rounded-lg cursor-pointer transition-all ${
                submitted
                  ? isCorrect
                    ? 'border-green-500 bg-green-300'
                    : 'border-red-500 bg-red-200'
                  : value === '1'
                  ? 'border-gray-400 bg-gray-300'
                  : 'border-gray-400 bg-white'
              }`}
            >
              {value}
            </button>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className={`mt-5 px-6 py-3 text-white text-lg font-bold rounded-lg shadow-md transition-transform transform hover:scale-105 ${
            isCorrect
              ? 'bg-green-500'
              : 'bg-gradient-to-r from-pink-500 to-orange-400'
          }`}
        >
          Submit Code
        </button>
      </div>
    </div>
  )
}

export default Level7_1
