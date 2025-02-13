import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutPage from '../interfaces/LayoutPage';

const YourComponent = () => {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState("");
  const [resultMessage, setResultMessage] = useState("");
  const link = "https://docs.google.com/document/d/1sjiGhP8IMtobg1o5iGfNM1JxFcf6kcijlh2LtyCz0B8/edit?usp=sharing";
  window.link = link;

  const correctTranslation = '!EDOCNEDDIH77@SNA';

  const handleVerify = () => {
    if (userInput.trim().toUpperCase() === correctTranslation) {
      setResultMessage("Correct! Well done!");
      setTimeout(() => {
        navigate("/level_7_4");
      }, 1500);
    } else {
      setResultMessage("Incorrect. Try again!");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleVerify();
    }
  };

  return (
    <div className="flex justify-center items-center flex-col h-screen relative">
      <img
        src="/src/assets/levels/Level_7_3.png"
        alt="Background"
        className="object-cover w-full h-full absolute z-0"
      />
      <LayoutPage />

      <div className="bg-black bg-opacity-50 backdrop-blur-md shadow-lg rounded-lg p-8 w-11/12 sm:w-2/3 lg:w-1/3 text-white text-center">
        <h1 className="text-2xl font-bold mb-4">Enter Answer</h1>
        <input
          type="text"
          placeholder="Enter Your Answer Here"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className="w-full px-4 py-2 text-black rounded-md border-2 border-gray-300 focus:outline-none focus:border-white focus:ring focus:ring-white"
        />
        <button
          onClick={handleVerify}
          className="mt-4 px-6 py-2 bg-blue-900 hover:bg-blue-700 text-white font-semibold rounded-md"
        >
          Verify
        </button>
        <p id="resultMessage" className="mt-4 text-lg font-medium">
          {resultMessage}
        </p>
        <a href={link} hidden />
      </div>
    </div>
  );
};

export default YourComponent;