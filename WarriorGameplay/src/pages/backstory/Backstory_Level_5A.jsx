import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import bg from '../../assets/backstory/Backstory.png'
import { useDispatch } from 'react-redux'
import { unlockLevel } from '../../protectedRoutes/store'
const Backstory_1 = () => {
  const [text, setText] = useState('')
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const dispatch = useDispatch()
  const sourceText = `Inside the room there lies a torch. Upon touching the torch, Gavin is now teleported to a mysterious palace. The palace has a long hallway which even after having flaring torches over the banks is not bright enough to give a fair visibility. The walls of the palace show grim sightings of the war of Azzgardos… This palace is none other than the fortress of Argzak; capital of Kravaros; home of Lord Malakaroth.`
  const typingSpeed = 3

  useEffect(() => {
    let index = 0

    const interval = setInterval(() => {
      if (index < sourceText.length) {
        setText((prev) => prev + (sourceText[index] || ''))
        index++
      } else {
        clearInterval(interval)
        setIsTypingComplete(true)
      }
    }, typingSpeed)

    return () => clearInterval(interval)
  }, [])
  useEffect(() => {
    dispatch(unlockLevel('level_6_1'))
  }, [])
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
            onClick={() => (window.location.href = '/Level_5A.html')}
            className="absolute bottom-[-4rem] right-0 px-6 py-3 bg-white bg-opacity-70 text-2xl tracking-wide rounded-lg hover:bg-opacity-90 transition-transform transform hover:scale-105"
          >
            Next
          </button>
        )}
      </div>
    </div>
  )
}

export default Backstory_1
