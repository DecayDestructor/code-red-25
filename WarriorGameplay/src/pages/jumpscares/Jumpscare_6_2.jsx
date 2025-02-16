import React, { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { lockLevel, unlockLevel } from '../../protectedRoutes/store'

const Jumpscare_6_2 = () => {
  const videoRef = useRef(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const handleVideoEnd = () => {
      dispatch(unlockLevel('options_level_4'))

      dispatch(lockLevel('level_6_2'))
      navigate('/backstory_level_4')
    }

    const video = videoRef.current
    if (video) {
      video.addEventListener('ended', handleVideoEnd)
    }

    return () => {
      if (video) {
        video.removeEventListener('ended', handleVideoEnd)
      }
    }
  }, [navigate])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    >
      <video
        ref={videoRef}
        src="src/assets/jumpscares/Jumpscare_6_2.mp4"
        autoPlay
        muted
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
  )
}

export default Jumpscare_6_2
