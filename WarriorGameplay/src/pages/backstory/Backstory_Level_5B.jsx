import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import bg from "../../assets/backstory/Backstory.png"

const Backstory_1 = () => {
  const [text, setText] = useState('')
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const navigate = useNavigate()

  // Replace all newline characters with spaces
  const firstPassage = `  Raven leads you through the scorched ruins of the stronghold, the world around you swallowed by pitch-black darkness. Together, you cross the borders into Kravaros—a land that was once the heart of the world during the Age of Gods, now shrouded in endless gloom. As you navigate the desolate landscape, Raven uncovers a map from his pocket and shows the entire hidden path, saying he stole it from Malakaroth's castle.`

  const secondPassage = `  After studying the map, Raven's expression hardens. He turns to you and says, "This map… it feels like a trap. Something about it doesn’t sit right." He pauses, then adds, "I know a shorter route—one that bypasses the dangers this map might lead us into Malakaroth's castle. Trust me; we can save time and avoid falling into their hands."
With Raven's instincts guiding you, a crucial decision lies ahead: "Follow the map’s uncertain path or follow me.", he suggests.`

  const [currentPassage, setCurrentPassage] = useState(firstPassage)
  const typingSpeed = 4

  useEffect(() => {
    setText('')
    setIsTypingComplete(false)
    let index = 0

    const interval = setInterval(() => {
      if (index < currentPassage.length) {
        // Append the next character if it exists
        setText((prev) => prev + (currentPassage[index] || ''))
        index++
      } else {
        clearInterval(interval)
        setIsTypingComplete(true)
      }
    }, typingSpeed)

    return () => clearInterval(interval)
  }, [currentPassage])

  const handleNextClick = () => {
    if (currentPassage === firstPassage) {
      // If currently showing the first passage, switch to the second
      setCurrentPassage(secondPassage)
    } else {
      // If showing the second passage, navigate to the next level
      navigate('/level_5b')
    }
  }

  return (
    <div className="flex justify-center items-center flex-col h-screen relative">
      {/* Background Image */}
      <img
        src={bg}
        alt="Background"
        className="object-cover w-full h-full absolute z-0"
      />
      {/* Text Container */}
      <div className="relative bg-white bg-opacity-70 p-6 rounded-lg w-[48%] z-10 h-[66%]">
        <h1 className="text-2xl tracking-wide">
          {text}
          {!isTypingComplete && <span className="animate-pulse">|</span>}
        </h1>
        {isTypingComplete && (
          <button
            onClick={handleNextClick}
            className="absolute bottom-[-4rem] right-0 px-6 py-3 bg-white bg-opacity-70 text-2xl tracking-wide rounded-lg hover:bg-opacity-90 transition-transform transform hover:scale-105"
          >
            {currentPassage === firstPassage ? 'Continue' : 'Next'}
          </button>
        )}
      </div>
    </div>
  )
}

export default Backstory_1
