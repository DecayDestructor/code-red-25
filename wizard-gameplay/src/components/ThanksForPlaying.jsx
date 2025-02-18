import React, { useState, useEffect } from 'react'
import { useSpring, animated, config } from 'react-spring'
import styles from './ThanksPage.module.css' // Import CSS module for styling
import background from '../assets/interfaces/glitch.mp4'

const ThanksPage = () => {
  const [showThanks, setShowThanks] = useState(false)
  const [showCodeRed, setShowCodeRed] = useState(false)

  // Animation for "Time Up" text
  const timeUpAnimation = useSpring({
    opacity: showThanks ? 1 : 0,
    transform: showThanks ? 'scale(1)' : 'scale(0.8)',
    config: { tension: 210, friction: 20 },
  })

  // Animation for "Thanks for playing Code Red" text
  const codeRedAnimation = useSpring({
    from: { marginTop: '-100px', opacity: 0 },
    to: { marginTop: '0px', opacity: 1 },
    config: config.gentle,
    delay: 1000,
    onRest: () => setShowCodeRed(true),
  })

  // Trigger animations on component mount
  useEffect(() => {
    setShowThanks(true)
  }, [])

  return (
    <div className={styles.container}>
      <video autoPlay loop muted className={styles.background}>
        <source src={background} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div
        className={styles.content}
        style={{ color: 'white', padding: '3rem' }}
      >
        <animated.h1 style={timeUpAnimation} className={styles.text}>
          Time Up
        </animated.h1>
        {showCodeRed && (
          <animated.p className={`${styles.text}`} style={codeRedAnimation}>
            Thanks for playing{' '}
            <span style={{ color: 'red', fontSize: '32px' }}>Code Red</span>
          </animated.p>
        )}
      </div>
    </div>
  )
}

export default ThanksPage
