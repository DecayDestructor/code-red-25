import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Backstory from "../../assets/backstory/Backstory.png"

const Backstory_Level_1_2 = () => {
  const [text, setText] = useState('')
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const navigate = useNavigate()

  // Replace all newline characters with spaces
  const sourceText = `  The grave opens, revealing Arthur's legendary sword. As you grasp the sword, you're transported to the desolate plains of Azzgardos. To begin your assault, you must conquer the land of Titans at the borders of Kravaros. These monstrous beings, bound only to bloodshed, are nearly invincible—except to the rays of the sun, which can scorch them to death. Malakaroth, their dark master, has cast a spell of eternal darkness over Kravaros to shield them. Your only hope of defeating the Titans is to break this spell and restore the sunlight.
    To find the hidden spell, you must look beyond the screen.`
  const typingSpeed = 3

  useEffect(() => {
    let index = 0

    const interval = setInterval(() => {
      if (index < sourceText.length) {
        // Append the next character if it exists
        setText((prev) => prev + (sourceText[index] || ''))
        index++
      } else {
        clearInterval(interval)
        setIsTypingComplete(true)
      }
    }, typingSpeed)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex justify-center items-center flex-col h-screen relative">
      {/* Background Image */}
      <img
        src={Backstory}
        alt="Background"
        className="object-cover w-full h-full absolute z-0"
      />
      {/* Text Container */}
      <div className="relative bg-white bg-opacity-70 p-6 rounded-lg w-[58%] z-10 h-[75%]">
        <h1 className="text-2xl tracking-wide">
          {text}
          {!isTypingComplete && <span className="animate-pulse">|</span>}
        </h1>
        {isTypingComplete && (
          <button
            onClick={() => navigate('/level_3')}
            className="absolute bottom-[-4rem] right-0 px-6 py-3 bg-white bg-opacity-70 text-2xl tracking-wide rounded-lg hover:bg-opacity-90 transition-transform transform hover:scale-105"
          >
            Next
          </button>
        )}
      </div>
    </div>
  )
}

export default Backstory_Level_1_2
