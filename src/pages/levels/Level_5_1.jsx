<<<<<<< HEAD:frontend/src/pages/levels/Level_5_1.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Backstory_1 = () => {
    const [text, setText] = useState("");
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    const navigate = useNavigate();

    // Replace all newline characters with spaces
    const sourceText = `  There lies another torch similar to the ones at the dungeon and Arthur's grave. Gavin holds hands along with the army and touches the torch. They enter the castle of Argzak. Soon they are surrounded by the warlords, gatekeepers, ghasts, piglions and the brutes.`;
    const typingSpeed = 4;

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
                src="src/assets/backstory/Backstory_1.png"
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
                    onClick={() => (window.location.href = "/Level_5_1/Metroidvania.html")}
                        className="absolute bottom-[-4rem] right-0 px-6 py-3 bg-white bg-opacity-50 text-2xl tracking-wide rounded-lg hover:bg-opacity-80 transition-transform transform hover:scale-105"
                    >
                        Next
                    </button>
                )}
=======
import React, { useState, useEffect } from 'react';

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const Hyperplexed = ({ id }) => {
    const [text, setText] = useState("HYPERPLEXED");
    const [showRedirectLink, setShowRedirectLink] = useState(false); 

    useEffect(() => {
        const intervalId = setInterval(() => {
            setText(prevText => 
                prevText.split("").map(() => letters[Math.floor(Math.random() * letters.length)]).join("")
            );
        }, 30);

        const targetNode = document.getElementById(id);  

        const observer = new MutationObserver((mutationsList) => {
            for (let mutation of mutationsList) {
                if (mutation.type === 'attributes' && !targetNode.classList.contains('hyperplexed')) {
                    handleClassRemoval();
                }
            }
        });

        observer.observe(targetNode, { attributes: true });

        return () => {
            clearInterval(intervalId);
            observer.disconnect(); 
        };
    }, [id]);

    const handleClassRemoval = () => {
        setShowRedirectLink(true);  
    };

    return (
        <div id={id} className="my-5">
            {showRedirectLink ? (
                <div className="bg-black/80 text-white p-5 rounded-lg text-center max-w-[80%] mx-auto">
                    <p></p>
                    <a href="https://www.youtube.com/watch?v=lr1L_xUKB1E" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="text-yellow-300 underline">
                        Visit YouTube
                    </a>
                </div>
            ) : (
                <h1 className={`text-white text-2xl font-mono my-5 ${
                    id.endsWith('1') || id.endsWith('3') ? '-translate-y-[10px]' : 'translate-y-[10px]'
                }`}>
                    {text}
                </h1>
            )}
        </div>
    );
};

const App = () => {
    return (
        <div className="min-h-screen bg-black flex justify-center items-center">
            <div className="relative flex flex-col items-center justify-center bg-black rounded-2xl p-16 w-[90vw] max-w-7xl h-[70vh] overflow-hidden shadow-[0_0_30px_rgba(255,255,0,0.8)] text-center">
                <Hyperplexed id="component-1" />
                <Hyperplexed id="component-2" />
                <Hyperplexed id="component-3" />
                <Hyperplexed id="component-4" />
>>>>>>> frontend:src/pages/levels/Level_5_1.jsx
            </div>
        </div>
    );
};

<<<<<<< HEAD:frontend/src/pages/levels/Level_5_1.jsx
export default Backstory_1;
=======
export default App;
>>>>>>> frontend:src/pages/levels/Level_5_1.jsx
