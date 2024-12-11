import React, { useState } from 'react';
import './style.css';

const Dialogues = () => {
    const [activeCharacter, setActiveCharacter] = useState(null);

    const handleDialogueChange = (character) => {
        setActiveCharacter(character);
    };

    return (
        <div className="flex flex-col w-full">
            <div className="w-full" onMouseEnter={() => handleDialogueChange('dark_rider')} onMouseLeave={() => handleDialogueChange(null)}>
                <a href="#" className="relative block w-full">
                    <div className={`card w-full ${activeCharacter === 'dark_rider' ? 'hovered' : ''}`}>
                        <div className="wrapper">
                            <img src="./src/assets/interfaces/dark_rider-cover.jpg" className="cover-image" alt="Dark Rider Cover" />
                        </div>
                        <img src="./src/assets/interfaces/dark_rider-title.png" className="title" alt="Dark Rider Title" />
                        <img src="./src/assets/interfaces/dark_rider-character.webp" className="character" alt="Dark Rider Character" />
                    </div>
                </a>
            </div>

            <div className="w-full mt-8" onMouseEnter={() => handleDialogueChange('force_mage')} onMouseLeave={() => handleDialogueChange(null)}>
                <a href="#" className="relative block w-full">
                    <div className={`card w-full ${activeCharacter === 'force_mage' ? 'hovered' : ''}`}>
                        <div className="wrapper">
                            <img src="./src/assets/interfaces/force_mage-cover.jpg" className="cover-image" alt="Force Mage Cover" />
                        </div>
                        <img src="./src/assets/interfaces/force_mage-title.png" className="title" alt="Force Mage Title" />
                        <img src="./src/assets/interfaces/force_mage-character.webp" className="character" alt="Force Mage Character" />
                    </div>
                </a>
            </div>
        </div>
    );
};

export default Dialogues;