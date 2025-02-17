import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../../assets/backstory/Backstory.png"

const Backstory_Level_1_1 = () => {
    const [text, setText] = useState("");
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    const navigate = useNavigate();

    // Replace all newline characters with spaces
    const sourceText = `  You rule the hidden citadel of Azgardos, the last palace of the gods, far from Kravaros. Like your ancestors, you seek to continue the war against Lord Malakaroth. In the citadel lies a cursed dungeon, tainted by the essence of Ehmest, as it violated Hades' laws. The dungeon is said to hold the route to Arthur’s sword—a weapon capable of killing demons. Crafted by Hephaestus and restored under a full moon, Arthur's sword was forged from the remnants of the great battle at Azgardos.`;
    const typingSpeed = 3;

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
                src={bg}
                alt="Background"
                className="object-cover w-full h-full absolute z-0"
            />
            {/* Text Container */}
            <div className="relative bg-white bg-opacity-70 p-6 rounded-lg w-[48%] z-10 h-[66%]">
                <h1 className="text-2xl tracking-wide">
                    {text}
                    {!isTypingComplete && <span className="animate-pulse">|</span>}
                </h1>
                {isTypingComplete && (
                    <button
                        onClick={() => navigate("/backstory_level_1_2")}
                        className="absolute bottom-[-4rem] right-0 px-6 py-3 bg-white bg-opacity-70 text-2xl tracking-wide rounded-lg hover:bg-opacity-90 transition-transform transform hover:scale-105"
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};

export default Backstory_Level_1_1;
