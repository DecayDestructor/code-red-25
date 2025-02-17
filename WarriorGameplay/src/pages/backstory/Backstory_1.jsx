import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../../assets/backstory/Backstory_1.png"

const Backstory_Level_1_3 = () => {
  const [text, setText] = useState('')
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const navigate = useNavigate()

  // First text passage
  const firstPassage = `  A battlefield is staged between the army of Demons and the gods. Malakaroth has set up an ambush that the gods are not aware about; something that the best of the martial texts haven't ever documented as there have been no survivors to this strategy. Gods fall prey to hordes of demon attacking them; as if a hurricane of scythes slashing through the battlefield. Last of the gods die with only few demigods surviving.`

  // Second text passage
  const secondPassage = `  Gavin, prince of a divine bloodline, descends from the last of the gods. For 500 years since the demon's victory in the War of Gods, his predecessors- who bore the blood of the demigods- have attempted to attack demon strongholds before but died in vain. Each of his predecessors have died by the hand of the demon lord, Malakaroth and his trechearous ally, the dark sorcerer Malevoryx.. Every effort ended in death. Now, Gavin is next in line. With an infant born to preserve the gods’ bloodline, he fights fearlessly, leading the Alfred Clan as their strongest warrior. You are Gavin, the last hope of the gods. The blood of gods runs through your veins. The war ends with you—victory or nothing. Lend your strength to shatter the demons' reign and lead your people to glory!`

  const [currentPassage, setCurrentPassage] = useState(firstPassage)
  const typingSpeed = 3

  useEffect(() => {
    setText('')
    setIsTypingComplete(false)
    let index = 0

    const interval = setInterval(() => {
      if (index < currentPassage.length) {
        // Append the next character if it exists
        setText((prev) => prev + (currentPassage[index] || ''))
        index++
      } else {
        clearInterval(interval)
        setIsTypingComplete(true)
      }
    }, typingSpeed)

    return () => clearInterval(interval)
  }, [currentPassage])

  const handleNextClick = () => {
    if (currentPassage === firstPassage) {
      // If currently showing the first passage, switch to the second
      setCurrentPassage(secondPassage)
    } else {
      // If showing the second passage, navigate to the next level
      navigate('/backstory_level_1_1')
    }
  }

    return (
        <div className="flex justify-center items-center flex-col h-screen relative">
            {/* Background Image */}
            <img
                src={bg}
                alt="Background"
                className="object-cover w-full h-full absolute z-0"
            />
            {/* Text Container */}
            <div className="relative bg-white bg-opacity-70 p-6 rounded-lg w-[58%] z-10 h-[76%]">
                <h1 className={`text-2xl tracking-wide whitespace-pre-line`}>
                    {text}
                    {!isTypingComplete && <span className="animate-pulse">|</span>}
                </h1>
                {isTypingComplete && (
                    <button
                        onClick={handleNextClick}
                        className="absolute bottom-[-4rem] right-0 px-6 py-3 bg-white bg-opacity-70 text-2xl tracking-wide rounded-lg hover:bg-opacity-90 transition-transform transform hover:scale-105"
                    >
                        {currentPassage === firstPassage ? "Continue" : "Next"}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Backstory_Level_1_3
