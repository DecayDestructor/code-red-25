/// Backstory_1.js
import { useState, useEffect } from "react";
import backstoryImage1 from './assets/backstory1_1.webp';
import backstoryImage2 from './assets/backstory1_2.webp'; // Ensure the correct image path
import { useNavigate } from "react-router-dom";

const Backstory_1 = () => {
  const backstory1_text1 =
    "Witches and wizards were the most prized soldiers in the army of gods." +
    "In the battle of Azzgardos wizards and wizards led the battlefield…" +
    "but their formation succumbed to the mighty power of Ichorfonias." +
    "Only a few wizards were able to escape the battlefield, but they lost their spells and abilities in the battle.." +
    "One of those wizards was Eryndor...";

  const backstory1_text2 =
    "The last surviving wizard of an ancient and powerful bloodline that once stood beside the gods during the War of Azgardos, has lived for centuries in hiding." +
    "His ancestors were once the protectors of the gods, wielding immense and forbidden magic. But with the fall of the gods and the rise of the demons, Eryndor’s lineage was hunted to extinction.";

  const backstory1_text3 =
    "Now, he is the sole survivor of his kind, burdened with the heavy knowledge of the lost magic that could reshape the fate of the world." +
    "Only way for his to get his family of wizards and wizards back is by defeating Malakaroth…";

  const backstory2_text1 =
    "When Malakaroth won the battle of Azzgardos his son and nephew set out to kill him for the throne." +
    "Soon a battle ensued between Malakaroth and his son and nephews. To save himself from their wrath he seeked help from Malevoryx; the greatest enchanter in the continent of Kravaros." +
    "Malevoryx chanted a spell that fractured Malakaroth’s soul into various pieces… this made Malakaroth totally undefeatable.. " +
    "His fractured pieces of soul are stored in various relics also known as horcruxes.";

  const texts = [backstory1_text1, backstory1_text2, backstory1_text3, backstory2_text1];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [backgroundImage, setBackgroundImage] = useState(backstoryImage1);
  const navigate = useNavigate();

  useEffect(() => {
    // Change background image when displaying backstory2_text1
    if (currentTextIndex === 3) {
      setBackgroundImage(backstoryImage2);
    } else {
      setBackgroundImage(backstoryImage1);
    }

    if (currentIndex < texts[currentTextIndex]?.length) {
      const timeout = setTimeout(() => {
        const char = texts[currentTextIndex][currentIndex];
        setDisplayedText((prev) => prev + char);
        setCurrentIndex(currentIndex + 1);
      }, 20);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, texts, currentTextIndex]);

  const handleNext = () => {
    if (currentTextIndex + 1 < texts.length) {
      setDisplayedText("");
      setCurrentIndex(0);
      setCurrentTextIndex(currentTextIndex + 1);
    } else {
      navigate("/level1");
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
      className="flex justify-center items-center flex-col h-screen imageContainer"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        transition: "background-image 0.8s ease-in-out",
      }}
    >
      <div className="boundary flex justify-center items-center  m-0 bg-no-repeat bg-center bg-cover ">


        <div
          className="font-serif text-container"
          style={{ fontFamily: "'Pirata One', cursive" }}
        >
          {displayedText}
        </div>



      </div>

      <div className=" button flex ">
        <button
          onClick={handleBack}
          className="btn bg-black hover:bg-gray-700 text-white"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="btn  hover:bg-blue-800 text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Backstory_1;
