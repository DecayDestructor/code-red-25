import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import LayoutPage from '../interfaces/LayoutPage'
import { Shield, Sword } from 'lucide-react'
import bg from '../../../src/assets/levels/Level_7_4.png'

const Level_7_4 = () => {
  const [gavinHp, setGavinHp] = useState(100)
  const [malakarothHp, setMalakarothHp] = useState(100)
  const [isPlayerTurn, setIsPlayerTurn] = useState(true)
  const [isGameOver, setIsGameOver] = useState(false)
  const [waiting, setWaiting] = useState(false)
  const [battleLog, setBattleLog] = useState([])
  const healthDecrementClassRef = useRef('decrease_by_1')
  const logRef = useRef(null)
  const navigate = useNavigate()
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight
    }
  }, [battleLog])

  // Observer for the healthbar class changes
  useEffect(() => {
    const healthbar = document.querySelector('.healthbar')

    if (healthbar) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (
            mutation.type === 'attributes' &&
            mutation.attributeName === 'class'
          ) {
            const newClassName = healthbar.className
            console.log('Healthbar class changed to:', newClassName)
            healthDecrementClassRef.current = newClassName
          }
        })
      })

      observer.observe(healthbar, {
        attributes: true,
        attributeFilter: ['class'],
      })

      return () => observer.disconnect()
    }
  }, [])

  // Time-based damage effect
  useEffect(() => {
    let interval

    if (waiting && malakarothHp > 0 && !isGameOver) {
      interval = setInterval(() => {
        const match = healthDecrementClassRef.current.match(/decrease_by_(\d+)/)
        const parsedValue = match ? parseInt(match[1], 10) : 1
        const decrementValue =
          parsedValue >= 1 && parsedValue <= 10 ? parsedValue : 1
        setMalakarothHp((prev) => {
          const newHp = Math.max(0, prev - decrementValue)
          if (newHp === 0) {
            setIsGameOver(true)
            addToBattleLog(
              'Victory! Malakaroth has been defeated by the passage of time!'
            )
            navigate('/win')
            
          }
          return newHp
        })
        addToBattleLog(`Time passes... Malakaroth loses ${decrementValue} HP`)
      }, 60000) // Real minute intervals
    }

    return () => clearInterval(interval)
  }, [waiting, malakarothHp, isGameOver])

  // Enemy turn automation
  useEffect(() => {
    if (!isPlayerTurn && !isGameOver) {
      const enemyAttackDelay = setTimeout(() => {
        handleMalakarothAttack()
        setIsPlayerTurn(true)
      }, 1500)

      return () => clearTimeout(enemyAttackDelay)
    }
  }, [isPlayerTurn, isGameOver])

  const addToBattleLog = (message) => {
    setBattleLog((prev) => [
      ...prev,
      { message, timestamp: new Date().toLocaleTimeString() },
    ])
  }

  const handleGavinAttack = () => {
    if (isPlayerTurn && !isGameOver) {
      const damage = 20 // Gavin deals 20 damage per attack
      const newMalakarothHp = Math.max(0, malakarothHp - damage)
      setMalakarothHp(newMalakarothHp)
      addToBattleLog(`You strike Malakaroth for ${damage} damage!`)

      if (newMalakarothHp === 0) {
        setIsGameOver(true)
        addToBattleLog('Victory! Malakaroth has been defeated!')
      } else {
        setIsPlayerTurn(false)
      }
    }
  }

  const handleMalakarothAttack = () => {
    if (!isPlayerTurn && !isGameOver) {
      const damage = 80 // Malakaroth deals 80 damage per attack
      const newGavinHp = Math.max(0, gavinHp - damage)
      setGavinHp(newGavinHp)
      addToBattleLog(
        `Malakaroth unleashes a devastating attack for ${damage} damage!`
      )

      if (newGavinHp === 0) {
        setIsGameOver(true)
        addToBattleLog('Defeat! Malakaroth has overwhelmed you!')
      }
    }
  }

  const handleWait = () => {
    if (isPlayerTurn && !isGameOver) {
      setWaiting(true)
      setIsPlayerTurn(false)
      addToBattleLog(
        'You choose to wait, watching as time affects Malakaroth...'
      )
    }
  }

  // Rest of the component remains the same...
  return (
    <div>
      <LayoutPage level={'7_4'} hintText={"Classes play a vital role in CSS styling. It can also change rate of health drop from 1 to 10!"}/>
      <div className="flex justify-center items-center min-h-screen relative bg-gray-900 p-4">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={bg}
            alt="Background"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        {/* Main Container */}
        <div className="relative bg-gray-800 rounded-xl shadow-2xl p-8 w-full max-w-4xl text-white z-10 border border-gray-700 ">
          {/* Title with Decorative Elements */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-yellow-400 mb-2 tracking-wider">
              Final Battle
            </h1>
          </div>

          {/* Turn Indicator */}
          <div className="text-2xl font-bold text-center mb-6">
            {!isGameOver && (
              <div
                className={`inline-block px-6 py-2 rounded-full ${
                  isPlayerTurn
                    ? 'bg-blue-900 text-blue-300'
                    : 'bg-red-900 text-red-300'
                } transition-all duration-300`}
              >
                {isPlayerTurn ? 'Your Turn' : "Malakaroth's Turn..."}
              </div>
            )}
          </div>

          {/* Health Bars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Player Health */}
            <div className="space-y-2">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-blue-300">YOUR HP</span>
                <span className="text-blue-300">{gavinHp}/100</span>
              </div>
              <div className="relative h-6 bg-gray-700 rounded-full overflow-hidden border border-gray-600">
                <div
                  className="absolute h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-300"
                  style={{ width: `${gavinHp}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-25"></div>
                </div>
              </div>
            </div>

            {/* Enemy Health */}
            <div className="space-y-2">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-red-300">MALAKAROTH HP</span>
                <span className="text-red-300">{malakarothHp}/100</span>
              </div>
              <div className="relative h-6 bg-gray-700 rounded-full overflow-hidden border border-gray-600">
                <div
                  className="absolute h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-300"
                  style={{ width: `${malakarothHp}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-25"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Battle Log */}
          <div
            ref={logRef}
            className="bg-gray-900 rounded-lg p-4 mb-6 h-24 overflow-y-auto border border-gray-700"
          >
            {battleLog.map((log, index) => (
              <div key={index} className="text-sm mb-1 text-gray-300">
                <span className="text-gray-500 text-xs">[{log.timestamp}]</span>{' '}
                {log.message}
              </div>
            ))}
          </div>

          {/* Battle Controls */}
          <div className="flex justify-center gap-4">
            <button
              onClick={handleGavinAttack}
              disabled={!isPlayerTurn || isGameOver}
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 
                       text-white rounded-lg font-bold text-lg
                       transition-all duration-300 hover:from-blue-700 hover:to-blue-600
                       disabled:opacity-50 disabled:cursor-not-allowed
                       shadow-lg hover:shadow-blue-500/50"
            >
              <Sword className="w-6 h-6" />
              Attack
            </button>

            <button
              onClick={handleWait}
              disabled={!isPlayerTurn || isGameOver || waiting}
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-yellow-600 to-yellow-500 
                       text-white rounded-lg font-bold text-lg
                       transition-all duration-300 hover:from-yellow-700 hover:to-yellow-600
                       disabled:opacity-50 disabled:cursor-not-allowed
                       shadow-lg hover:shadow-yellow-500/50"
            >
              <Shield className="w-6 h-6" />
              Wait
            </button>
          </div>

          {/* Hidden healthbar for class observation */}
          <div className="healthbar decrease_by_1 hidden"></div>

          {/* Victory/Defeat Messages */}
          {isGameOver && (
            <div
              className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75`}
            >
              <div
                className={`text-6xl font-bold text-center p-8 rounded-lg ${
                  malakarothHp === 0 ? 'text-green-400' : 'text-red-400'
                } animate-bounce`}
              >
                {malakarothHp === 0 ? 'VICTORY!' : 'DEFEAT!'}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Level_7_4
