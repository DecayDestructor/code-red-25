import level4_1 from '../../assets/level4_1.webp'; 
import { useNavigate } from "react-router-dom";
import TextDisplayComponent from "../../components/TextDisplayComponent";

const Level4 = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const level4_texts = [
    "“To find the Wizard's Legacy, seek the market where ownable digital treasures are traded. The biggest marketplace will reveal the key to unlock the artifact. ‘Cassandra’ , some call the treasure… seek his, and give us his address…”"   
  ];

  const navigate = useNavigate();

  const handleTextComplete = () => navigate("/level4_puzzle");

  return (
<TextDisplayComponent 
          texts={level4_texts}
          images={[level4_1]}
          onTextComplete={handleTextComplete}
        />
  );
};

export default Level4;
