import React from 'react'
import level5_1 from "../../assets/level5_1.webp"
import TextDisplayComponent from '../../components/TextDisplayComponent'

const Level5 = () => {

    const level5_texts = [
        "The next level lies where you have to locate the kraken in the trecherous portion of the sea called Sphylossian waters. The kraken's heart is one of the horcruxes and the most hardest to destroy.",
        "Destroying the kraken requires you to not only be vigilant or brave, but shrewd as well. The kraken lives underwater in the stormy sea, however, to defeat him, you have to reach there first.",
        "All you have is a broken compass and 3 hints: ",
        "'A shrewd merchant encoded his secret vault’s location with numbers that sum to 360. The first number is double the second, and the third is the average of the first two. What bearing does the largest number hold?'",
        "'In the forest of echoes, a tree marks its place. It leans not toward the rising sun but to a bearing four-sevenths of a full circle from the east, bending slightly northward. What direction does it call?'",
        "'An old traveler once told me of a landmark forgotten by time, just shy of the western edge. Its bearing lies one and three-sevenths of a degree east of the halfway mark between true west and true north. Seek the balance of its forgotten path.'"
    ] 

    const handleTextComplete = () => window.location.href = "/index.html"

  return (

    <TextDisplayComponent 
          texts={level5_texts}
          images={[level5_1]}
          onTextComplete={handleTextComplete}
    />
  )
}

export default Level5