import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check if the pressed key is "Enter"
      if (event.key === 'Enter') {
        // Navigate to the login page
        navigate('/login');
      }
    };

    // Add the keydown event listener when the component is mounted
    window.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);

  return (
    <div className='flex justify-center items-center h-screen'>
      <img
        src="/src/assets/interfaces/Intro Background.png"
        alt=""
        className='object-cover w-full h-full'
      />
      <div
        className='font-[Seagram] absolute bottom-16 text-5xl w-full flex items-center justify-center'
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