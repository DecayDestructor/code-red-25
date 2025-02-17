import React, { useEffect, useState } from "react";
import Backstory from "../../assets/backstory/Backstory.png"

const Backstory_1 = () => {
    const [text, setText] = useState("");
    const [isTypingComplete, setIsTypingComplete] = useState(false);

    const sourceText = `The end is near. With each minute, Malakaroth's demise is coming closer and closer. The penultimate challenge before you face the demon lord himself involves finding the hidden link. Look for the 'link' using all the tools in your arsenal. Once you shall find the link, look for the 69th key, find the first object within that, and then move into the array of the first object, and find the second object there. Of the 2nd array key, your answer shall be present in the 75th attribute of the 71st attribute.`;
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
                src={Backstory}
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
