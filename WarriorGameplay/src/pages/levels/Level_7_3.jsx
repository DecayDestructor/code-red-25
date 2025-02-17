import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LayoutPage from '../interfaces/LayoutPage'
import checkAnswers from '../../utils/checkAnswers'
import { useDispatch } from 'react-redux'
import { lockLevel, unlockLevel } from '../../protectedRoutes/store'
import bg from '../../../src/assets/levels/Level_7_3.png'

const YourComponent = () => {
  const navigate = useNavigate()
  const [userInput, setUserInput] = useState('')
  const [resultMessage, setResultMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const link =
    'https://docs.google.com/document/d/1sjiGhP8IMtobg1o5iGfNM1JxFcf6kcijlh2LtyCz0B8/edit?usp=sharing'
  window.link = link
  const dispatch = useDispatch()

  const handleVerify = async () => {
    if (loading) return
    setLoading(true)
    try {
      const { correct } = await checkAnswers(userInput, '7_3')
      if (correct) {
        setResultMessage('Correct! Well done!')
        setTimeout(() => {
          navigate('/level_7_4')
          dispatch(unlockLevel('level_7_4'))
          dispatch(lockLevel('level_7_1b'))
        }, 1500)
      } else {
        setResultMessage('Incorrect. Try again!')
      }
    } catch (e) {
      console.error(e)
      setResultMessage('Error occurred. Please try again later.')
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
        level={'7_3'}
        hintText={
          'Find the “link” from the console. Using the link, open a huge script wherein you shall navigate through the json using the given instructions.'
        }
      />

      <div className="bg-black bg-opacity-50 backdrop-blur-md shadow-lg rounded-lg p-8 w-11/12 sm:w-2/3 lg:w-1/3 text-white text-center">
        <h1 className="text-2xl font-bold mb-4">Enter Answer</h1>
        <input
          type="text"
          placeholder="Enter Your Answer Here"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className="w-full px-4 py-2 text-black rounded-md border-2 border-gray-300 focus:outline-none focus:border-white focus:ring focus:ring-white"
        />
        <button
          onClick={handleVerify}
          className="mt-4 px-6 py-2 bg-blue-900 hover:bg-blue-700 text-white font-semibold rounded-md"
          disabled={loading}
        >
          Verify
        </button>
        <p id="resultMessage" className="mt-4 text-lg font-medium">
          {resultMessage}
        </p>
        <a href={link} hidden />
      </div>
    </div>
  )
}

export default YourComponent
