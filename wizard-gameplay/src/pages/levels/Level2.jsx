import level2_2 from '../../assets/level2_2.webp'
import level2_1 from '../../assets/level2_1.webp'

import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { lockLevel } from '../../protectedRoutes/store'

import TextDisplayComponent from '../../components/TextDisplayComponent'

const Level2 = () => {
  console.log('Hello')

  const level2_texts = [
    'For the next relic you (Eryndor) walk to the catacombs of Ehmest to find the trumpet of war used by Malakaroth as that can be the relic where the second piece of his soul is hidden. Within the ancient catacombs of Ehmest, a soft glow begins to emanate from the intricate carvings on the walls.',
    ' The markings, previously dormant, now hum with power, responding to your presence. As you approach the center of the chamber, you feel an overwhelming force—a melding of magic and divine energy. A towering statue of a hooded figure dominates the space, its eyes hollow yet watching.',
    'Before you can proceed further, the statue speaks, its voice deep and resonant, shaking the very air:' +
      'To claim the legacy of Arthur, you must pass the Trials of Convergence. Only those who understand the resonance between magic and might are worthy.',
    'In the ruined hallways of catacombs the crystalline structure hums with chaotic energy, and an intricate pattern of light and sound begins to emerge across its surface. To proceed, you must identify and amplify the crystal’s natural resonant frequency, harmonizing it with your magical aura.',
  ]

  const navigate = useNavigate()
  const handleTextComplete = () => {
    dispatch(lockLevel('level1'))
    navigate('/level2_puzzle')
  }
  const dispatch = useDispatch()

  return (
    <TextDisplayComponent
      texts={level2_texts}
      images={[level2_1, level2_2]}
      onTextComplete={handleTextComplete}
    />
  )
}

export default Level2
