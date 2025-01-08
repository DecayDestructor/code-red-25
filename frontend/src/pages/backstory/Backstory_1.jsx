import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Backstory_Level_1_3 = () => {
    const [text, setText] = useState("");
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    const navigate = useNavigate();

    // First text passage
    const firstPassage = `  A battlefield is staged between the army of Demons and the gods. Malakaroth has set up an ambush that the gods are not aware about; something that the best of the martial texts haven't ever documented as there have been no survivors to this strategy. Gods fall prey to hordes of demon attacking them; as if a hurricane of scythes slashing through the battlefield. Last of the gods die with only few demigods.`;

    // Second text passage
    const secondPassage = `  Gavin, prince of a divine bloodline, descends from the last of the gods. For 500 years since the demons' victory in the War of Azgardos, his predecessors—demigods—have attempted and failed to reclaim Argzak, the former Palace of the Gods, now a demon stronghold ruled by Malakaroth, one of the two mightiest demons. Each effort ended in death. Now, Gavin is next in line. With an infant born to preserve the gods’ bloodline, he fights fearlessly, leading the Alfred Clan as their strongest warrior. You are Gavin, the last hope of the gods. The blood of gods runs through your veins. This is your moment. The war ends with you—victory or nothing. You are Gavin, the one who will shatter the demons' reign and lead your people to glory!`;

    const [currentPassage, setCurrentPassage] = useState(firstPassage);
    const typingSpeed = 3;

    useEffect(() => {
        setText("");
        setIsTypingComplete(false);
        let index = 0;

        const interval = setInterval(() => {
            if (index < currentPassage.length) {
                // Append the next character if it exists
                setText((prev) => prev + (currentPassage[index] || ""));
                index++;
            } else {
                clearInterval(interval);
                setIsTypingComplete(true);
            }
        }, typingSpeed);

        return () => clearInterval(interval);
    }, [currentPassage]);

    const handleNextClick = () => {
        if (currentPassage === firstPassage) {
            // If currently showing the first passage, switch to the second
            setCurrentPassage(secondPassage);
        } else {
            // If showing the second passage, navigate to the next level
            navigate("/backstory_level_1_1");
        }
    };

    return (
        <div className="flex justify-center items-center flex-col h-screen relative">
            {/* Background Image */}
            <img
                src="src/assets/backstory/Backstory_1.png"
                alt="Background"
                className="object-cover w-full h-full absolute z-0"
            />
            {/* Text Container */}
            <div className="relative bg-white bg-opacity-50 p-6 rounded-lg max-w-3xl z-10">
                <h1 className={`text-2xl tracking-wide whitespace-pre-line`}>
                    {text}
                    {!isTypingComplete && <span className="animate-pulse">|</span>}
                </h1>
                {isTypingComplete && (
                    <button
                        onClick={handleNextClick}
                        className="absolute bottom-[-4rem] right-0 px-6 py-3 bg-black text-white bg-opacity-50 text-2xl tracking-wide rounded-lg hover:bg-opacity-80 transition-transform transform hover:scale-105"
                    >
                        {currentPassage === firstPassage ? "Continue" : "Next"}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Backstory_Level_1_3;