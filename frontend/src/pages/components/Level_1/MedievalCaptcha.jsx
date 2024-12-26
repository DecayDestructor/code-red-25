import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTimer } from 'react-timer-hook';
import { useNavigate } from 'react-router-dom';

const MedievalCaptcha = () => {
  const navigate = useNavigate();
  // Define medieval equipment categories with specific keywords
  const equipmentCategories = [
    {
      "name": "Defensive Equipment",
      "keywords": ["medieval shield", 'visor', "medieval helmet", "chainmail", "greaves", "Battle Ready"],
      "description": "Identify medieval defensive gear"
    },
    {
      "name": "Weapons",
      "keywords": ["katana", "battle axe", "armor design", "hammer", "blade", "dagger", "roman battle"],
      "description": "Authentic medieval combat weapons"
    }

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
    // console.log(correctIdxs);
    setCorrectIndexes(correctIdxs);

    // Keep track of used keyword indices to avoid repetition
    const usedKeywordIndices = new Set();

    // Fetch images for all grid positions
    const finalImages = await Promise.all(
      Array(9).fill().map(async (_, index) => {
        if (correctIdxs.includes(index + 1)) {
          // Find a unique medieval keyword
          let rand;
          do {
            rand = Math.floor(Math.random() * category.keywords.length);
          } while (usedKeywordIndices.has(rand));
          usedKeywordIndices.add(rand);

          const medievalKeyword = category.keywords[rand];
          const medievalImages = await fetchPexelsImages(medievalKeyword);
          // console.log("Checking", index + 1, medievalKeyword, rand);
          return {
            url: medievalImages[0]?.src.medium || '',
            index: index + 1,
            isCorrect: true
          };
        } else {
          const wrongKeyword = wrongKeywords[Math.floor(Math.random() * wrongKeywords.length)];
          const wrongImages = await fetchPexelsImages(wrongKeyword);
          return {
            url: wrongImages[Math.floor(Math.random() * wrongImages.length)]?.src.medium || '',
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
      const timeElapsed = 20 - seconds;
      pause(); // Pause the timer

      if (timeElapsed >= 19 && timeElapsed <= 21) {
        setCaptchaStatus('Solved within target timeframe');
        setTimeout(() => {
          navigate("/page1");
        }, 1500);
      } else {
        setCaptchaStatus('Solved outside target timeframe');
        setTimeout(() => {
          navigate("/page2");
        }, 1500);
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
    <div className="flex justify-center items-center flex-col h-screen relative">
      {/* Background Image */}
      <img
        src="src/assets/levels/Level_1A.png"
        alt="Background"
        className="object-cover w-full h-full absolute z-0"
      />
      <div className="relative bg-gradient-to-b from-stone-800 to-stone-900 p-6 rounded-2xl shadow-[0_0_50px_rgba(255,69,0,0.3)] border-4 border-amber-700 max-w-sm w-full ">
        {selectedCategory && (
          <div className="text-center mb-4">
            <p className="text-lg font-medieval text-amber-500 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
              {selectedCategory.description}
            </p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-4 mb-4">
          {images.map((image) => (
            <div
              key={image.index}
              onClick={() => handleImageSelect(image)}
              className={`
          border-4 cursor-pointer transition-all duration-300 transform hover:scale-105
          rounded-lg overflow-hidden
          ${selectedImages.includes(image.index)
                  ? 'border-amber-500 shadow-[0_0_20px_rgba(255,69,0,0.4)]'
                  : 'border-stone-600 hover:border-amber-400'}
        `}
            >
              <img
                src={image.url}
                alt={`Image ${image.index}`}
                className="w-full h-24 object-cover"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={verifyCaptcha}
            className="bg-gradient-to-r from-amber-700 to-amber-900 text-amber-100 px-6 py-2 rounded-lg 
      hover:from-amber-600 hover:to-amber-800 transition-all duration-300 
      shadow-lg hover:shadow-amber-900/50 font-medieval tracking-wide text-sm"
          >
            Verify Selection
          </button>
          <button
            onClick={initializeCaptcha}
            className="bg-gradient-to-r from-stone-700 to-stone-800 text-stone-200 px-6 py-2 rounded-lg 
      hover:from-stone-600 hover:to-stone-700 transition-all duration-300 
      shadow-lg hover:shadow-stone-900/50 font-medieval tracking-wide text-sm"
          >
            Reset Challenge
          </button>
        </div>

        {captchaStatus && (
          <div className={`
      mt-4 text-center font-medieval p-2 rounded-lg text-sm
      ${captchaStatus.includes('Solved')
              ? 'bg-green-900/60 text-green-300 border-2 border-green-600'
              : 'bg-red-900/60 text-red-300 border-2 border-red-600'
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