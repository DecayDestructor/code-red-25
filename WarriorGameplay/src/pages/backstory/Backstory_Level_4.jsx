import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../../assets/backstory/Backstory.png"

const Backstory_1 = () => {
    const [text, setText] = useState("");
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    const navigate = useNavigate();

    const sourceText = `  The last of titans fall prey to the rays of sunlight. Just a step before the land of demons lies the final stronghold. But Gavin’s army just cannot outmatch the sheer strength of the Army of Burning men, Malakaroth's strongest army. To defeat them one enters a room that has a detonator to destroy the fortress or take help from Raven; Raven is a remaining member of the Elitos army who were slained by Malakaroth after they failed to capture Azgardos. You can also approach Raven to burn the whole stronghold using special fuel crafted by the Elitos army when they plundered and torched the civilization after the War of Gods.`;
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
            <img
                src={bg}
                alt="Background"
                className="object-cover w-full h-full absolute z-0"
            />
            <div className="relative bg-white bg-opacity-70 p-6 rounded-lg w-[58%] z-10 h-[75%]">
                <h1 className="text-2xl tracking-wide">
                    {text}
                    {!isTypingComplete && <span className="animate-pulse">|</span>}
                </h1>
                {isTypingComplete && (
                    <button
                        onClick={() => navigate("/options_level_4")}
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
