import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Jumpscare_7_1A = () => {
  const videoRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleVideoEnd = () => {
      navigate('/backstory_level_7_1');
    };

    const video = videoRef.current;
    if (video) {
      video.addEventListener('ended', handleVideoEnd);
    }

    return () => {
      if (video) {
        video.removeEventListener('ended', handleVideoEnd);
      }
    };
  }, [navigate]);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}>
      <video 
        ref={videoRef}
        src="src/assets/jumpscares/Jumpscare_7_1A.mp4"
        autoPlay 
        muted 
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
  );
};

export default Jumpscare_7_1A;