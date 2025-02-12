import level7_1 from '../../assets/level7_1.webp';
import { useNavigate } from "react-router-dom";


import TextDisplayComponent from "../../components/TextDisplayComponent";

const Level7_1 = () => {

  const level7_1_texts = [
   
    "As Eryndor reaches the shore, a huge thunderbolt cracks right in front of him, revealing the most strongest and oldest wizard of the land, the man who sold his soul to the devil and betrayed his kin, Malevoryx himself...",
    "Malevoryx is here to end Eryndor's quest once and for all. He is sent by Malakaroth to stop Eryndor from destructing the horcruxes of Malevoryx. Eryndor realizes that the challenge ahead may not be easy and gears up for what may be his last battle.",
    "A hidden spell shall guide you to defeating the most strongest human alive. Once you shall unlock the hidden spell, another secret command must be chanted so that you can finally SET Malevoryx to die.",
    "Mind you, the challenge is not easy, do not be fooled by the obvious. Always stay sharp and shrewd. And beware... as the time is running out. Go find the hidden spell!!"
  ];

  const navigate = useNavigate();
  const handleTextComplete = () => navigate("/level7_1_puzzle");



  return (
    <TextDisplayComponent
          texts={level7_1_texts}
          images={[level7_1]}
          onTextComplete={handleTextComplete}
        />
  );
};

export default Level7_1;