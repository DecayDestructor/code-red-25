import level1_2 from '../../assets/level1_2.webp';
import level1_1 from '../../assets/level1_1.webp'; 
import level1_3 from '../../assets/level1_3.webp'; 
import { useNavigate } from "react-router-dom";
import TextDisplayComponent from "../../components/TextDisplayComponent";

const level1_texts = [
  "Eryndor has to find all of the pieces of Malakaroth’s soul to disable Malakaroth’s invincibility once and for all." + 
  "Eryndor’s first mission is to seek the Infernal Blade, the relic representing Wrath." + 
  "Mount Draemora, a dormant volcano reawakened by Malevoryx's dark powers, is now a chaotic inferno of molten rivers, ash storms, and unpredictable eruptions." + 
  "The Infernal Blade lies embedded in the Obsidian Altar, deep within the volcano’s core, radiating anger and violence.",

  "To reach the Obsidian Altar where the Infernal Blade resides, Eryndor encounters a massive Magma Flow Regulator, an ancient mechanical system designed by the Fire-Kin engineers to stabilize Mount Draemora." + 
  "The Regulator is corrupted by Malevoryx's influence, causing a chaotic magma surge that blocks access to the altar and threatens to collapse the entire structure.",

  "The system must be repaired and optimized to control the magma flow, opening a safe path to the altar." +
  "However, the system's logic is highly complex, designed to test both intelligence and composure under pressure.",

  "“Ah, a challenger approaches! If you seek passage through these hallowed gates, you must solve a riddle of transformation and balance. Only those with keen minds and steady resolve may proceed.”",
      "First, take this phrase and let it dance forward through the cycles of letters, shifting each one forward with the rhythm of seven steps. The spaces between words are sacred and shall remain untouched. When you have completed this transformation, you will hold a phrase of power in your grasp.",
      "But your task is not yet done. Each symbol in this new phrase carries its own weight, a value intrinsic to its nature. Ignore the voids between words, and instead, focus on the letters and convert them to numbers in the most obvious way possible. Find the balance—the average weight—of the entire phrase you have crafted."   

];

const Level1 = () => {
  
  const navigate = useNavigate();

  const handleTextComplete = () => navigate("/level1_puzzle");



  return (
<TextDisplayComponent 
          texts={level1_texts}
          images={[level1_1, level1_2, level1_3]}
          onTextComplete={handleTextComplete}
        />
  );
};

export default Level1;
