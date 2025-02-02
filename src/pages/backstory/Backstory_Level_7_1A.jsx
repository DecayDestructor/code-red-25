import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Backstory_1 = () => {
    const [text, setText] = useState("");
    const [isTypingComplete, setIsTypingComplete] = useState(false);

    const sourceText = `  With a resolute breath, Gavin knew hesitation was over. The engineer's pleas lingered, but trusting anyone linked to Malakaroth was too dangerous. Ichorfonias had to be destroyed—its annihilation was the key to ending Malakaroth's reign. Victory was near but required a bomb to obliterate the dark lord's greatest weapon. Yet, one final piece remained: Arthur's sword, which could only strike if the target's name was spoken aloud. Ichorfonias. There was no turning back—solving this would end Malakaroth's reign and shatter his pride.`;
    const typingSpeed = 3;

    useEffect(() => {
        let index = 0;

        const interval = setInterval(() => {
            if (index < sourceText.length) {
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
            <div className="relative bg-white bg-opacity-70 p-6 rounded-lg w-[48%] z-10 h-[66%]">
                <h1 className="text-2xl tracking-wide">
                    {text}
                    {!isTypingComplete && <span className="animate-pulse">|</span>}
                </h1>
                {isTypingComplete && (
                    <button
                    onClick={() => (window.location.href = "/105_99_104_111_114_102_111_110_105_97_115")}
                        className="absolute bottom-[-4rem] right-0 px-6 py-3 bg-white bg-opacity-70 text-2xl tracking-wide rounded-lg hover:bg-opacity-90 transition-transform transform hover:scale-105"
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};

export default Backstory_1;
