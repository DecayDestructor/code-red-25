import React, { useEffect, useState } from 'react'
import { isRouteErrorResponse, useNavigate } from 'react-router-dom' // Import useNavigate
import LayoutPage from '../interfaces/LayoutPage'
import checkAnswers from '../../../utils/checkAnswers'
import { useDispatch } from 'react-redux';
import { unlockLevel  } from '../../protectedRoutes/store';

const CombinedComponent = () => {
  const [userInput, setUserInput] = useState('')
  const [resultMessage, setResultMessage] = useState('')

  const navigate = useNavigate() // Initialize navigate
  const dispatch = useDispatch();
  const handleVerify = async () => {
    const { correct } = await checkAnswers(userInput, '7_1A')
    if (correct) {
      setResultMessage('Correct! Well done!')
      setTimeout(() => {
        dispatch(unlockLevel("jumpscare_7_1A"));
        navigate('/jumpscare_7_1A')
      }, 1500)
    } else {
      setResultMessage('Incorrect. Try again!')
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleVerify()
    }
  }

  return (
    <div className="flex justify-center items-center flex-col h-screen relative">
      {/* Background Image */}
      <img
        src="src/assets/levels/Level_7_1A.png"
        alt="Background"
        className="object-cover w-full h-full absolute z-0"
      />
      <LayoutPage />
      <div className="bg-black bg-opacity-50 backdrop-blur-md shadow-lg rounded-lg p-8 w-11/12 sm:w-2/3 lg:w-1/3 text-white text-center">
        <h1 className="text-2xl font-bold mb-4">Enter Answer</h1>
        <input
          type="text"
          id="morseInput"
          placeholder="Enter Your Answer Here"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className="w-full px-4 py-2 text-black rounded-md border-2 border-gray-300 focus:outline-none focus:border-white focus:ring focus:ring-white"
        />
        <button
          id="verifyButton"
          onClick={handleVerify}
          className="mt-4 px-6 py-2 bg-blue-900 hover:bg-blue-700 text-white font-semibold rounded-md"
        >
          Verify
        </button>
        <p id="resultMessage" className="mt-4 text-lg font-medium">
          {resultMessage}
        </p>
      </div>
    </div>
  )
}

export default CombinedComponent
