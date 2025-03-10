import level4_1 from '../../assets/level4_1.webp'
import { useNavigate } from 'react-router-dom'
import TextDisplayComponent from '../../components/TextDisplayComponent'
import { useDispatch } from 'react-redux'
import { lockLevel, unlockLevel } from '../../protectedRoutes/store'

const Level4 = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const level4_texts = [
    "“To find the Wizard's Legacy, seek the market where ownable digital treasures are traded. The biggest marketplace will reveal the key to unlock the artifact. ‘Cassandra’ , some call the treasure… seek her, chained within the bounds of the Polygon, and give us her address…”",
  ]

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleTextComplete = () => {
    dispatch(lockLevel('level3'))
    dispatch(unlockLevel('level5'))
    navigate('/level4_puzzle')
  }

  return (
    <TextDisplayComponent
      texts={level4_texts}
      images={[level4_1]}
      onTextComplete={handleTextComplete}
    />
  )
}

export default Level4
