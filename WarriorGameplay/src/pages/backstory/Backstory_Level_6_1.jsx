import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { unlockLevel  } from '../../protectedRoutes/store';

const Backstory_Level_1_3 = () => {
    const [text, setText] = useState("");
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    const navigate = useNavigate();
  const dispatch = useDispatch();

    // First text passage
    const firstPassage = `  Malakaroth was not only known for his ruthless cunning but also for his terrifying creations—devices that could confine the enemies with deadly precision. These instruments weren't just tools, but cursed mechanisms that trapped their victims in webs of black magic, leaving no way out. His war room, hidden deep within the palace, held the answers to how these mysterious traps were set in motion, and Gavin's mission was to uncover the mystery and find the coordinates to reach it before it was too late. But with each step deeper into the palace, the danger grew, and he couldn't shake the feeling that something—or someone—was watching him. What could help him in this endeavor? Perhaps the answer lies in an ancient riddle.`;

    // Second text passage
    const secondPassage = `  In steel halls, echoes of logic I weave,
    A blue-framed window where coders achieve.
    From timeless roots, now swift and complete,
    A turbocharged forge where brilliance meets.
    Menus, compilers, and shortcuts extend,
    An endless IDE where long nights transcend.
    What was my age? Before my unfortunate end...`;

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
            dispatch(unlockLevel("level_6_1"));
            navigate("/level_6_1");
        }
    };

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
                <h1 className={`text-2xl tracking-wide whitespace-pre-line ${currentPassage === secondPassage ? 'text-center' : ''}`}>
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

export default Backstory_Level_1_3;