import level6_1 from '../../assets/level6_1.webp'
import level6_3 from '../../assets/level6_3.webp'
import { useNavigate } from 'react-router-dom'
import TextDisplayComponent from '../../components/TextDisplayComponent'
import { useDispatch } from 'react-redux'
import { unlockLevel } from '../../protectedRoutes/store'
import { lockLevel } from '../../protectedRoutes/store'

const level6_texts = [
  'The kraken’s heart is made of metal and you are supposed to take down the kraken by destroying its heart and indirectly destroying Malakaroth’s power.' +
    ' The heart has a self-destruction sequence wherein a code entered properly can cause it to self-destruct. ' +
    " However, the code required here is the same key which is required to enter Malakaroth's armory in his fort encoded to the 64th base.",

  'Since you, Eryndor, have been destroying Malakaroth’s horcruxes, you need the help of a warrior who has broken into Fort Argzak in Azzgardos.' +
    'A warrior who has progressed very far, six times, to be precise, and in the seventh quest of the warrior, you shall find the code you need.',
]
const Level6 = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleTextComplete = () => {
    dispatch(lockLevel('level5'))
    navigate('/level6_puzzle')
  }
  console.log('on level 6')

  return (
    <TextDisplayComponent
      texts={level6_texts}
      images={[level6_1, level6_3]}
      onTextComplete={handleTextComplete}
    />
  )
}

export default Level6
