/// Backstory_1.js
import backstoryImage1 from '../../assets/backstory1_1.webp';
import backstoryImage2 from '../../assets/backstory1_2.webp'; // Ensure the correct image path
import { useNavigate } from "react-router-dom";
import TextDisplayComponent from "../../components/TextDisplayComponent";
const backstory1_texts = [
  "Witches and wizards were the most prized soldiers in the army of gods." +
  " In the War of Gods Gods, warriors and wizards led the battlefield…" +
  "but their formation succumbed to the mighty power of Ichorfonias." +
  " Only one wizard was able to escape the battlefield, taking his solemn oath that one day he would avenge his kin and defeat the demon lord Malakaroth." +
  " His name was Eryndor...",

  "The last surviving wizard of an ancient and powerful bloodline that once stood beside the gods during the War of Azgardos, has lived for centuries in hiding." +
  "His ancestors were once the protectors of the gods, wielding immense and forbidden magic. But with the fall of the gods and the rise of the demons, Eryndor’s lineage was hunted to extinction.",
  "Now, he is the sole survivor of his kind, burdened with the heavy knowledge of the lost magic that could reshape the fate of the world." +
  "Only way for him to get his revenge is by defeating Malakaroth…",
  "When Malakaroth won the battle of Azzgardos and became the solemn Lord of the land, his son and nephew set out to kill him for the throne." +
  "Soon a battle ensued between Malakaroth and his son and nephews. To save himself from their wrath he seeked help from Malevoryx; the greatest enchanter in the continent of Kravaros." +
  "Malevoryx chanted a spell that fractured Malakaroth’s soul into various pieces… this made Malakaroth totally undefeatable.. " +
  "His fractured pieces of soul are stored in various relics hidden across Kravaros, known as horcruxes."


]
const Backstory_1 = () => {


  
  const navigate = useNavigate();

  const handleTextComplete = () => navigate("/level1");


  return (
<TextDisplayComponent 
          texts={backstory1_texts}
          images={[backstoryImage1, backstoryImage2]}
          onTextComplete={handleTextComplete}
        />
  );
};

export default Backstory_1;
