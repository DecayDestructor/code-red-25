import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LayoutPage from '../interfaces/LayoutPage'
import checkAnswers from '../../../utils/checkAnswers'
import bgImg from '../../assets/levels/Level_6_2.png'
import { useDispatch } from 'react-redux'
import { lockLevel, unlockLevel } from '../../protectedRoutes/store'

const BackstoryLevelComponent = () => {
  const [userInput, setUserInput] = useState('')
  const [resultMessage, setResultMessage] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const handleVerify = async () => {
    if (loading) return
    setLoading(true)
    try {
      const { correct } = await checkAnswers(userInput, '6_2')
      if (correct) {
        setResultMessage('Correct! Well done!')
        setTimeout(() => {
          dispatch(unlockLevel('jumpscare_6_2'))

          navigate('/jumpscare_6_2')
          dispatch(lockLevel('options_level_5b'))
        }, 1500)
      } else {
        setResultMessage('Incorrect. Try again!')
      }
    } catch (e) {
      console.error(e)
      setResultMessage('An error occurred. Please try again!')
    } finally {
      setLoading(false)
    }
  }

  const handleNextClick = () => {
    if (currentPassage === firstPassage) {
      // If currently showing the first passage, switch to the second
      setCurrentPassage(secondPassage)
    } else {
      // If showing the second passage, show the input
      setIsNextClicked(true)
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
        src={bgImg}
        alt="Background"
        className="object-cover w-full h-full absolute z-0"
      />
      <LayoutPage
        level={'6_2'}
        hintText={'Because of this tech, our laptops runs on mere seconds time'}
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

export default BackstoryLevelComponent
