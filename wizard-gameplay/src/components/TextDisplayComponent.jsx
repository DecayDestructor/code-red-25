import { useEffect, useState } from "react";

const TextDisplayComponent = ({ texts, images, onTextComplete, levelComplete }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [backgroundImage, setBackgroundImage] = useState(images[0]);

  useEffect(() => {
    if (currentTextIndex < texts.length) {
      setBackgroundImage(images[Math.min(currentTextIndex, images.length - 1)]);
    }

    if (currentIndex < texts[currentTextIndex]?.length) {
      const timeout = setTimeout(() => {
        const char = texts[currentTextIndex][currentIndex];
        setDisplayedText((prev) => prev + char);
        setCurrentIndex(currentIndex + 1);
      }, 20);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, currentTextIndex, texts, images]);

  const handleNext = () => {
    if (currentTextIndex + 1 < texts.length) {
      setDisplayedText("");
      setCurrentIndex(0);
      setCurrentTextIndex(currentTextIndex + 1);
    } else {
      onTextComplete();
    }
  };

  const handleBack = () => {
    if (currentTextIndex > 0) {
      setDisplayedText("");
      setCurrentIndex(0);
      setCurrentTextIndex(currentTextIndex - 1);
    }
  };

  

  return (
    <div
      className="flex justify-center items-center flex-col imageContainer"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        transition: "background-image 0.8s ease-in-out",
      }}
    >
      <div className="boundary">
        <div
          className="font-serif text-container"
          style={{ fontFamily: "'Pirata One', cursive" }}
        >
          {displayedText}
        </div>
      </div>
      <div className="button flex">
        <button
          onClick={handleBack}
          className="btn bg-black hover:bg-gray-700 text-white"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="btn hover:bg-blue-800 text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TextDisplayComponent;
