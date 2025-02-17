import level3_1 from '../../assets/level3_1.webp'
import { useNavigate } from 'react-router-dom'
import TextDisplayComponent from '../../components/TextDisplayComponent'
import { useDispatch } from 'react-redux'
import { lockLevel, unlockLevel } from '../../protectedRoutes/store'

const Level3 = () => {
  const level3_texts = [
    'As you step into the chamber, the air is filled with faint whispers—a symphony of voices merging, overlapping, and fading into silence.' +
      'In the center, a large crystalline sphere hovers, glowing faintly with pulsing light. This is the Core of Echoes, an artifact that preserves fragments of memories from those who have attempted the trial before you.',
    `The Core speaks in riddles, presenting a challenge steeped in logic:
    "Within me lies a fractured sequence, a pattern obscured by noise and repetition. Decode the echoes, and the truth shall be revealed.`,
    `Listen to the soft echoes whispered in this numeric humming... [ 1, 11, 21, 1211, 111221, ___ , ___]`,
  ]

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleTextComplete = () => {
    dispatch(lockLevel('level2'))
    navigate('/level3_puzzle')
  }
  return (
    <TextDisplayComponent
      texts={level3_texts}
      images={[level3_1]}
      onTextComplete={handleTextComplete}
    />
  )
}

export default Level3
