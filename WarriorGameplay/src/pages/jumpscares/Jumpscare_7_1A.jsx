import React, { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { lockLevel, unlockLevel } from '../../protectedRoutes/store'
import vid from "../../assets/jumpscares/Jumpscare_7_1A.mp4"

const Jumpscare_7_1A = () => {
  const videoRef = useRef(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const handleVideoEnd = () => {
      dispatch(unlockLevel('level_7_1'))
      dispatch(lockLevel('jumpscares_level_7_1a'))
      navigate('/backstory_level_7_1')
      dispatch(lockLevel('level_7_1a'))
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
        src={vid}
        autoPlay
        muted
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
  )
}

export default Jumpscare_7_1A
