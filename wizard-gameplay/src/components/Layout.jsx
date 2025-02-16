import React, { useState, useEffect } from 'react'

const LayoutPage = ({ level, hint }) => {
  const [timeRemaining, setTimeRemaining] = useState('00:00:00')
  const [hintUnlocked, setHintUnlocked] = useState(false)
  const [showHintModal, setShowHintModal] = useState(false)
  const [hintTimer, setHintTimer] = useState(420) // 5 minutes in seconds

  // Game timer logic
  useEffect(() => {
    let endTime = localStorage.getItem('gameEndTime')

    if (!endTime) {
      endTime = new Date().getTime() + 60 * 60 * 1000 * 3
      localStorage.setItem('gameEndTime', endTime)
    }

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = endTime - now

      if (distance < 0) {
        clearInterval(timer)
        setTimeRemaining('00:00:00')
        localStorage.removeItem('gameEndTime')
        return
      }

      const hours = Math.floor(distance / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      const formattedTime = `${String(hours).padStart(2, '0')}:${String(
        minutes
      ).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      setTimeRemaining(formattedTime)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Hint timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setHintTimer((prev) => {
        if (prev <= 0) {
          setHintUnlocked(true)
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatHintTimer = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(
      remainingSeconds
    ).padStart(2, '0')}`
  }
  const name = localStorage.getItem('name')

  return (
    <div className="flex items-center justify-center">
      <div className="flex justify-center items-center text-black">
        <div className="z-10 absolute w-52 h-14 top-8 flex justify-center items-center rounded-full text-3xl text-white bg-opacity-20 backdrop-filter backdrop-blur-[3px] border-[1px]">
          LEVEL {level}
        </div>
      </div>
      <div className="flex justify-center items-center">
        {/* Hint Button */}
        <button
          onClick={() => hintUnlocked && setShowHintModal(true)}
          className="z-10 absolute w-14 h-14 bottom-8 right-8 flex justify-center items-center rounded-full text-3xl text-white bg-opacity-20 backdrop-filter backdrop-blur-[3px] border-[1px]"
        >
          {hintUnlocked ? (
            <img
              src="./src/assets/interfaces/Hint.svg"
              alt=""
              className="w-5"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-xs">
              <span className="text-lg">🔒</span>
              <span>{formatHintTimer(hintTimer)}</span>
            </div>
          )}
        </button>
        <div className="z-10 absolute w-52 h-14 bottom-8 flex justify-center items-center rounded-full text-3xl text-white bg-opacity-20 backdrop-filter backdrop-blur-[3px] border-[1px]">
          {name}
        </div>
        <div className="z-10 absolute w-52 h-14 bottom-8 left-8 flex justify-center items-center rounded-full text-white bg-opacity-20 backdrop-filter backdrop-blur-[3px] border-[1px]">
          <div className="flex items-center justify-center flex-col">
            <div className="text-xs tracking-wide">Time Remaining</div>
            <div className="text-2xl">{timeRemaining}</div>
          </div>
        </div>
      </div>

      {/* Hint Modal */}
      {showHintModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="text-white bg-opacity-20 backdrop-filter backdrop-blur-[3px] border-[1px] p-6 rounded-lg max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Hint</h3>
              <button
                onClick={() => setShowHintModal(false)}
                className="hover:text-gray-300"
              >
                ✕
              </button>
            </div>
            <div>{hint || 'NO HINT :('}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LayoutPage
