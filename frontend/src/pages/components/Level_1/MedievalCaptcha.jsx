import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTimer } from 'react-timer-hook';

const MedievalCaptcha = () => {
  // Define medieval equipment categories with specific keywords
  const equipmentCategories = [
    { 
      name: 'Defensive Equipment', 
      keywords: ['medieval shield', 'knight armor', 'medieval helmet'],
      description: 'Identify medieval defensive gear used by warriors'
    },
    { 
      name: 'Weapons', 
      keywords: ['medieval sword', 'battle axe', 'medieval spear'],
      description: 'Select authentic medieval combat weapons'
    },
    // Add more if you like Mantri and Urunkar
    // { 
    //   name: 'Battle Implements', 
    //   keywords: ['medieval weapon', 'knight equipment', 'medieval armor'],
    //   description: 'Choose genuine medieval warrior equipment'
    // }
  ];

  // Keywords for non-medieval images to create confusion
  const wrongKeywords = [
    'bottle', 'bicycle', 'water', 'beach', 'ball', 
    'mountain', 'tree', 'road', 'sky', 'car'
  ];

  // State management for the captcha challenge
  const [targetCount, setTargetCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [correctIndexes, setCorrectIndexes] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [captchaStatus, setCaptchaStatus] = useState(null);

  // Pexels API configuration (Replace with your actual key)
  const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

  // Timer setup for the 20-second challenge
  const time = new Date();
  time.setSeconds(time.getSeconds() + 20);
  const { seconds, pause } = useTimer({ 
    expiryTimestamp: time, 
    onExpire: () => setCaptchaStatus('Not solved in 20') 
  });

  // Fetch images from Pexels for a specific keyword
  const fetchPexelsImages = async (keyword) => {
    try {
      const response = await axios.get('https://api.pexels.com/v1/search', {
        params: {
          query: keyword,
          per_page: 30,
          orientation: 'square'
        },
        headers: {
          'Authorization': PEXELS_API_KEY
        }
      });

      return response.data.photos;
    } catch (error) {
      console.error('Image fetch error', error);
      return [];
    }
  };

  // Initialize the captcha challenge
  const initializeCaptcha = async () => {
    // Reset game state
    setCaptchaStatus(null);
    setSelectedImages([]);

    // Randomly select a medieval equipment category
    const category = equipmentCategories[Math.floor(Math.random() * equipmentCategories.length)];
    setSelectedCategory(category);

    // Determine number of correct images to select (3-6)
    const count = Math.floor(Math.random() * 4) + 3;
    setTargetCount(count);

    // Generate unique indexes for correct images
    const correctIdxs = [];
    while (correctIdxs.length < count) {
      const idx = Math.floor(Math.random() * 9) + 1;
      if (!correctIdxs.includes(idx)) correctIdxs.push(idx);
    }
    setCorrectIndexes(correctIdxs);

    // Fetch images for all grid positions
    const finalImages = await Promise.all(
      Array(9).fill().map(async (_, index) => {
        // Correct indices get medieval category images
        if (correctIdxs.includes(index + 1)) {
          const medievalKeyword = category.keywords[Math.floor(Math.random() * category.keywords.length)];
          const medievalImages = await fetchPexelsImages(medievalKeyword);
          return {
            url: medievalImages[0]?.src.medium || '',
            index: index + 1,
            isCorrect: true
          };
        } 
        // Incorrect indices get random everyday object images
        else {
          const wrongKeyword = wrongKeywords[Math.floor(Math.random() * wrongKeywords.length)];
          const wrongImages = await fetchPexelsImages(wrongKeyword);
          return {
            url: wrongImages[0]?.src.medium || '',
            index: index + 1,
            isCorrect: false
          };
        }
      })
    );

    setImages(finalImages);
  };

  // Handle image selection in the grid
  const handleImageSelect = (image) => {
    const newSelectedImages = selectedImages.includes(image.index)
      ? selectedImages.filter(idx => idx !== image.index)
      : [...selectedImages, image.index];
    
    setSelectedImages(newSelectedImages);
  };

  // Verify the selected images
  const verifyCaptcha = () => {
    // Check if selected images match correct indexes
    const isCorrect = selectedImages.sort().join(',') === correctIndexes.sort().join(',');
    
    if (isCorrect) {
      // Calculate time taken
      const remainingTime = seconds;
      const timeDiff = 20 - remainingTime;
      
      // Pause the timer
      pause();

      // Set status based on time taken
      // TODO : Urunkar navigate to the appropriate level after success
      if (remainingTime > 0) {
        // Solved within 20 seconds
        setCaptchaStatus(`Solved in ${timeDiff} seconds`);
        setTimeTaken(timeDiff);
      } else {
        // Solved after 20 seconds
        setCaptchaStatus('Solved after 20 seconds');
        setTimeTaken(20);
      }
    } else {
      // Wrong selection
      setCaptchaStatus('Wrong');
    }
  };


  // Initialize captcha on component mount
  useEffect(() => {
    initializeCaptcha();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 bg-[url('medieval-background.jpg')]">
      <div className="bg-stone-200 p-6 rounded-xl shadow-2xl border-4 border-stone-400 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-4 text-stone-800">
          Medieval Warrior Challenge
        </h2>
        
        {selectedCategory && (
          <div className="text-center mb-4">
            <p className="text-lg font-semibold text-stone-700">
              {selectedCategory.description}
            </p>
            <p className="text-sm text-stone-600">
              Time Remaining: {seconds} seconds
            </p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-4 mb-4">
          {images.map((image) => (
            <div 
              key={image.index} 
              onClick={() => handleImageSelect(image)}
              className={`
                border-4 cursor-pointer transition-all duration-300
                ${selectedImages.includes(image.index) 
                  ? 'border-green-500' 
                  : 'border-stone-300 hover:border-stone-500'}
              `}
            >
              <img 
                src={image.url} 
                alt={`Image ${image.index}`} 
                className="w-full h-32 object-cover"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center space-x-4">
          <button 
            onClick={verifyCaptcha}
            className="bg-stone-700 text-white px-6 py-2 rounded hover:bg-stone-900 transition"
          >
            Verify Selection
          </button>
          <button 
            onClick={initializeCaptcha}
            className="bg-stone-500 text-white px-6 py-2 rounded hover:bg-stone-600 transition"
          >
            Reset Challenge
          </button>
        </div>

        {captchaStatus && (
          <div className={`
            mt-4 text-center font-bold p-2 rounded
            ${
              captchaStatus.includes('Solved') 
                ? 'bg-green-200 text-green-800' 
                : 'bg-red-200 text-red-800'
            }
          `}>
            {captchaStatus}
          </div>
        )}
      </div>
    </div>
  );
};

export default MedievalCaptcha;