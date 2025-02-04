import level3_1 from '../../assets/level3_1.webp'; 
import { useNavigate } from "react-router-dom";
import TextDisplayComponent from "../../components/TextDisplayComponent";

const Level3 = () => {
  const level3_texts = [
    "As you step into the chamber, the air is filled with faint whispers—a symphony of voices merging, overlapping, and fading into silence." +
    "In the center, a large crystalline sphere hovers, glowing faintly with pulsing light. This is the Core of Echoes, an artifact that preserves fragments of memories from those who have attempted the trial before you.",
     
  ];

  const navigate = useNavigate();

  const handleTextComplete = () => navigate("/level3_puzzle");
  return (
<TextDisplayComponent 
          texts={level3_texts}
          images={[level3_1]}
          onTextComplete={handleTextComplete}
        />
  );
};

export default Level3;
