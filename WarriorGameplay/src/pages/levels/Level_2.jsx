import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LayoutPage from '../interfaces/LayoutPage'
import checkAnswers from '../../utils/checkAnswers'
import { useDispatch } from 'react-redux'
import { lockLevel, unlockLevel } from '../../protectedRoutes/store'
import bg from '../../../src/assets/levels/Level_2.png'
const Level_2 = () => {
  const [userInput, setUserInput] = useState('')
  const [resultMessage, setResultMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleVerify = async () => {
    if (loading) return
    setLoading(true)
    try {
      const { correct } = await checkAnswers(userInput, '2')
      if (correct) {
        setResultMessage('Correct! Well done!')
        setLoading(true)
        setTimeout(() => {
          dispatch(unlockLevel('level_3'))
          dispatch(lockLevel('level_1a'))
          navigate('/backstory_level_3')
        }, 1500)
      } else {
        setResultMessage('Incorrect. Try again!')
      }
    } catch (e) {
      console.error(e)
      setResultMessage('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleVerify()
    }
  }

  return (
    <div className="flex justify-center items-center flex-col h-screen relative">
      <img
        src={bg}
        alt="Background"
        className="object-cover w-full h-full absolute z-0"
      />
      <LayoutPage
        level={2}
        hintText={
          'Unlock the mystery by shifting your phone’s keyboard—sometimes, a simple switch reveals a new set of letters'
        }
      />

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
          disabled={loading}
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

export default Level_2
