import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LayoutPage from '../interfaces/LayoutPage'
import checkAnswers from '../../../utils/checkAnswers'
import { useDispatch } from 'react-redux'
import { lockLevel, unlockLevel } from '../../protectedRoutes/store'

const HiddenChallengeComponent = () => {
  const [userInput, setUserInput] = useState('')
  const [panelColor, setPanelColor] = useState('rgb(0,255,0)') // Default green
  const [colorChanged, setColorChanged] = useState(false)
  const [resultMessage, setResultMessage] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleVerify = async () => {
    const { correct } = await checkAnswers(userInput, '7_1B')
    console.log(colorChanged, correct)

    if (colorChanged && correct) {
      setResultMessage('Correct! Proceeding to next level...')
      setTimeout(() => {
        dispatch(unlockLevel('level_7_3'))

        navigate('/backstory_level_7_3')
      }, 1500)
    } else if (!colorChanged) {
      setResultMessage('Incomplete!')
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
      {/* Hidden instruction */}
      <img
        src="src/assets/levels/Level_7_1B.jpg"
        alt="Background"
        className="object-cover w-full h-full absolute z-0"
      />
      <LayoutPage level={'7_1 B'} />
      {/* Central panel */}
      <div
        className="w-2/3 h-2/3 flex flex-col justify-center items-center relative"
        style={{ backgroundColor: panelColor }} // Apply dynamic color
      >
        {/* Camouflaged text */}
        <p
          className="absolute top-5 text-center w-full"
          style={{ color: panelColor, userSelect: 'none' }}
        >
          SUBMIT
          C86FE9E9CC38771BF90CE8AB26C17806E21305B3E040DD49EF475DC989CD8C67
        </p>

        {/* Input and verification area */}
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className="w-2/3 px-4 py-2 text-center rounded-md"
          style={{ backgroundColor: panelColor }}
          placeholder="Enter your input"
        />
        <button
          onClick={handleVerify}
          className="mt-4 px-6 py-2 bg-blue-900 text-white rounded-md"
        >
          Verify
        </button>

        {resultMessage && <p className="mt-4 text-white">{resultMessage}</p>}
      </div>

      {/* Color change input */}
      <input
        type="text"
        placeholder=""
        className="absolute bottom-5 left-5 px-4 py-2 rounded-md bg-transparent text-white"
        onChange={(e) => {
          const colorValue = e.target.value.trim()
          if (/^rgb\(\d{1,3},\d{1,3},\d{1,3}\)$/i.test(colorValue)) {
            setPanelColor(colorValue)
            setColorChanged(true)
            setResultMessage(`Color changed to ${colorValue}!`)
          } else {
            setColorChanged(false)
            setResultMessage('Enter a valid rgb(x,x,x) format')
          }
        }}
      />
    </div>
  )
}

export default HiddenChallengeComponent
