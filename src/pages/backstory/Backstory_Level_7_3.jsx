import React, { useEffect, useState } from "react";

const Backstory_1 = () => {
    const [text, setText] = useState("");
    const [isTypingComplete, setIsTypingComplete] = useState(false);

    const sourceText = `  Malakaroth's vulnerability is fleeting—he can only be defeated in the brief moment between day and night. As fortune has it, the Ichorfonias is now operational, a powerful artifact brimming with spells designed to exploit the weaknesses of any foe. Each spell, however, requires a unique numerical code to activate.Among its arsenal lies a spell capable of altering time itself, shifting the world into evening. But Malakaroth, cunning as ever, ensured that the code for this critical spell is deeply concealed, hidden away from even the mightiest of demigods.The challenge now is clear: uncover the code, wield the Ichorfonias, and strike at the precise moment when Malakaroth is at his weakest.Time is of the essence.`;
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
                    onClick={() => (window.location.href = "/level_7_3")}
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
