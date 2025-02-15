import React, { useState, useEffect } from 'react'
import LayoutPage from '../interfaces/LayoutPage'
import { useNavigate } from 'react-router-dom'
import checkAnswers from '../../../utils/checkAnswers'
import { useDispatch } from 'react-redux';
import { unlockLevel  } from '../../protectedRoutes/store';
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

const Hyperplexed = ({ id, link }) => {
  const [text, setText] = useState('HYPERPLEXED')
  const [showRedirectLink, setShowRedirectLink] = useState(false)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setText((prevText) =>
        prevText
          .split('')
          .map(() => letters[Math.floor(Math.random() * letters.length)])
          .join('')
      )
    }, 30)

    const targetNode = document.getElementById(id)

    const observer = new MutationObserver((mutationsList) => {
      for (let mutation of mutationsList) {
        if (
          mutation.type === 'attributes' &&
          !targetNode.classList.contains('hyperplexed')
        ) {
          handleClassRemoval()
        }
      }
    })

    observer.observe(targetNode, { attributes: true })

    return () => {
      clearInterval(intervalId)
      observer.disconnect()
    }
  }, [id])

  const handleClassRemoval = () => {
    setShowRedirectLink(true)
  }

  return (
    <div id={id} className="w-full flex items-center justify-center py-4">
      {showRedirectLink ? (
        <div className="flex-1 w-full flex flex-col justify-evenly text-center">
          <p></p>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-300 underline"
          >
            Visit YouTube
          </a>
        </div>
      ) : (
        <h1 className="text-white text-2xl font-mono">{text}</h1>
      )}
    </div>
  )
}

const App = () => {
  const [userInput, setUserInput] = useState('')
  const [resultMessage, setResultMessage] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const handleVerify = async () => {
    const { correct } = await checkAnswers(userInput, '5B')
    if (correct) {
      setResultMessage('Correct! Well done!')
      setTimeout(() => {
        dispatch(unlockLevel("options_level_5b"));
        navigate('/options_level_5b')
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
      <img
        src="src/assets/levels/Level_5_2.jpg"
        alt="Background"
        className="object-cover w-full h-full absolute z-0"
      />
      <LayoutPage />
      <div className="relative flex flex-col items-center bg-black/75 rounded-2xl p-8 w-[90vw] max-w-7xl h-[70vh] overflow-hidden shadow-[0_0_30px_rgba(255,255,0,0.8)]">
        <div className="flex-1 w-full flex flex-col justify-evenly">
          <Hyperplexed
            id="component-1"
            link="https://www.youtube.com/watch?v=V-_O7nl0Ii0"
          />
          <Hyperplexed
            id="component-2"
            link="https://www.youtube.com/watch?v=EE-xtCF3T94"
          />
          <Hyperplexed
            id="component-3"
            link="https://www.youtube.com/watch?v=68HrmbZiwaI"
          />
          <Hyperplexed
            id="component-4"
            link="https://www.youtube.com/watch?v=PavYAOpVpJI"
          />
        </div>
        <div className="w-full flex items-center justify-center flex-col mt-4">
          <input
            type="text"
            id="morseInput"
            placeholder="Enter Your Answer Here"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="w-[20%] px-4 py-2 text-black rounded-md border-2 border-gray-300 focus:outline-none focus:border-white focus:ring focus:ring-white"
          />
          <button
            id="verifyButton"
            onClick={handleVerify}
            className="mt-4 px-6 py-2 bg-blue-900 hover:bg-blue-700 text-white font-semibold rounded-md"
          >
            Verify
          </button>
          <p id="resultMessage" className="mt-4 text-lg font-medium text-white">
            {resultMessage}
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
