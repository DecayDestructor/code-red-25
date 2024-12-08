import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HomePage2 = () => {
  const navigate = useNavigate();
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [frames, setFrames] = useState({
    currentIndex: 0,
    maxIndex: 240,
  });
  const [preloaderVisible, setPreloaderVisible] = useState(true);
  const canvasRef = useRef(null);
  const images = useRef([]);
  const animationCompleteRef = useRef(false);

  const preloadImages = async () => {
    const loadedImages = [];
    let loadedCount = 0;

    for (let i = 1; i <= frames.maxIndex; i++) {
        const imageUrl = `/src/assets/frames1_jpeg/frame_${i.toString().padStart(4, '0')}.png`;
        const img = new Image();
      img.src = imageUrl;

      img.onload = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);

        if (loadedCount === frames.maxIndex) {
          console.log('All images loaded');
          loadImage(frames.currentIndex);
          startAnimation();
          setPreloaderVisible(false);
        }
      };

      loadedImages.push(img);
    }

    images.current = loadedImages;
  };

  const loadImage = (index) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (canvas && images.current[index]) {
      const img = images.current[index];

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const scaleX = canvas.width / img.width;
      const scaleY = canvas.height / img.height;
      const scale = Math.max(scaleX, scaleY);

      const newWidth = img.width * scale;
      const newHeight = img.height * scale;

      const offsetX = (canvas.width - newWidth) / 2;
      const offsetY = (canvas.height - newHeight) / 2;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';
      context.drawImage(img, offsetX, offsetY, newWidth, newHeight);

      setFrames((prevFrames) => ({ ...prevFrames, currentIndex: index }));
    }
  };

  const startAnimation = () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#parent',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.7,
        onComplete: () => {
          // Set a flag to indicate animation is complete
          animationCompleteRef.current = true;
          
          // Navigate to login page
          navigate('/login');
        },
      },
    }).to(frames, {
      currentIndex: frames.maxIndex,
      onUpdate: function () {
        loadImage(Math.floor(frames.currentIndex));
      },
    });
  };

  const updateProgress = (loaded, total) => {
    const progress = (loaded / total) * 100;
    return Math.round(progress);
  };

  useEffect(() => {
    preloadImages();

    // Optional: Add a keyboard or touch event to skip to login if needed
    const handleSkip = (e) => {
      if (!animationCompleteRef.current) {
        // If space is pressed or screen is touched, navigate to login
        if (e.code === 'Enter' || e.type === 'touchstart') {
          navigate('/login');
        }
      }
    };

    window.addEventListener('keydown', handleSkip);
    window.addEventListener('touchstart', handleSkip);

    // Cleanup event listeners
    return () => {
      window.removeEventListener('keydown', handleSkip);
      window.removeEventListener('touchstart', handleSkip);
    };
  }, [navigate]); 

  return (
    <div>
      {/* Preloader */}
      {preloaderVisible && (
        <div id="preloader" className="fixed inset-0 bg-black flex justify-center items-center z-50">
          <div className="text-center">
            <div className="w-48 h-2 bg-gray-700 mb-2">
              <div
                className="bg-white h-full"
                style={{ width: `${updateProgress(imagesLoaded, frames.maxIndex)}%` }}
              ></div>
            </div>
            <p className="text-white text-sm">
              {updateProgress(imagesLoaded, frames.maxIndex)}%
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="w-full bg-black">
        <div id="parent" className="relative w-full h-[1000vh]">
          <div
            id="container"
            className="w-full h-screen sticky top-0 left-0 flex justify-center items-center"
          >
            <canvas ref={canvasRef} className="w-full h-screen"></canvas>
          </div>
        </div>
      </main>

      {/* Skip Animation Hint */}
      <div
        className='font-[Seagram] bottom-16 text-5xl w-full flex items-center justify-center fixed'
        style={{
          color: '#EFA34F',
          WebkitTextStroke: '6px black',
          paintOrder: 'stroke',
          letterSpacing: '0.54rem',
        }}
      >
        Scroll Or Press Enter To Proceed
      </div>
    </div>
  );
};

export default HomePage2;