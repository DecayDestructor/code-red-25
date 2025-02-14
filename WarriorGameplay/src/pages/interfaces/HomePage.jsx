import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../../assets/interfaces/HomePage Background.png';

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleSkip = (e) => {
      if (e.code === 'Enter' || e.type === 'touchstart') {
        navigate('/login');
      }
    };

    window.addEventListener('keydown', handleSkip);
    window.addEventListener('touchstart', handleSkip);

    return () => {
      window.removeEventListener('keydown', handleSkip);
      window.removeEventListener('touchstart', handleSkip);
    };
  }, [navigate]);

  return (
    <div
      className="w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div
        className='font-[Seagram] bottom-16 text-5xl w-full flex items-center justify-center fixed'
        style={{
          color: '#EFA34F',
          WebkitTextStroke: '6px black',
          paintOrder: 'stroke',
          letterSpacing: '0.54rem',
        }}
      >
        Press Enter To Proceed
      </div>
    </div>
  );
};

export default HomePage;