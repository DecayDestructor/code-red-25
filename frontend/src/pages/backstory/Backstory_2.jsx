import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Backstory_2 = () => {
    const [text, setText] = useState("");
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    const navigate = useNavigate();

    // Replace all newline characters with spaces
    const sourceText = `  Gavin is the prince of a bloodline whose descendants are the last of the gods. In the past 500 years, ever since the demons won against the gods in the War of Azgardos, Gavin’s predecessors (demigods) have always tried to ambush one of the major demon strongholds across the entire continent of Kravaros; the Argzak fort, which initially used to be the Palace of the Gods. Each time his predecessors tried to invade Argzak and defeat the Demon Lord Malakaroth (one of the two strongest demons to ever exist), they were utterly defeated and killed. 5 centuries of efforts later, Gavin is the next in line and the one to invade Argzak now. He has already given birth to an infant who also carries the blood of gods. This way, Gavin can fight fearlessly knowing that the gods’ blood is still preserved if he dies. Demigods are stronger than humans and similarly, Gavin is strongest in his army of the Alfred Clan and the one to fight Malakaroth once they invade fort Argzak.`;
    const typingSpeed = 40;

    useEffect(() => {
        let index = 0;

        const interval = setInterval(() => {
            if (index < sourceText.length) {
                // Append the next character if it exists
                setText((prev) => prev + (sourceText[index] || ""));
                index++;
            } else {
                clearInterval(interval);
                setIsTypingComplete(true);
            }
        }, typingSpeed);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex justify-center items-center flex-col h-screen relative">
            {/* Background Image */}
            <img
                src="src/assets/backstory/Backstory.png"
                alt="Background"
                className="object-cover w-full h-full absolute z-0"
            />
            {/* Text Container */}
            <div className="relative bg-white bg-opacity-50 p-6 rounded-lg max-w-3xl z-10">
                <h1 className="text-2xl tracking-wide">
                    {text}
                    {!isTypingComplete && <span className="animate-pulse">|</span>}
                </h1>
                {isTypingComplete && (
                    <button
                        onClick={() => navigate("/backstory_Level_1_1")}
                        className="absolute bottom-[-4rem] right-0 px-6 py-3 bg-white bg-opacity-50 text-2xl tracking-wide rounded-lg hover:bg-opacity-80 transition-transform transform hover:scale-105"
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};

export default Backstory_2;
