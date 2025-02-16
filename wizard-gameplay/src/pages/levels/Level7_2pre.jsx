import level7_2 from '../../assets/level7_2pre.webp'; 
import { useNavigate } from "react-router-dom";
import TextDisplayComponent from "../../components/TextDisplayComponent";
import { useDispatch } from 'react-redux'
import { lockLevel } from '../../protectedRoutes/store'

const Level7_2pre = () => {
  const Level7_2pre_texts = [
    "Now that Malevoryx is dead, Eryndor feels his life force ebbing away into a dark state of death. The self-destruction of the kraken had been an explosion of untold magnitudes, and Eryndor had been fortunate enough to not have been killed immediately.",
    "Using Malevoryx’s third eye, an instrument to see at any location within the Fort Argzak, he notices that Gavin is sorely outnumbered and may be ambushed by the Army of Golems, Malakaroth’s vessels from hell.",
    "He decides to use the last of his magical powers to prevent the forces of Azzgardos (led by Gavin) from being defeated by using his remaining power to build multiple catapults and cannons to defeat the golems."
];


  const navigate = useNavigate();
  const dispatch = useDispatch()
  dispatch(lockLevel('level7_1'))
  const handleTextComplete = () => navigate("/Level7_2");

  return (
    <TextDisplayComponent 
      texts={Level7_2pre_texts}
      images={[level7_2]}
      onTextComplete={handleTextComplete}
    />
  );
};

export default Level7_2pre;