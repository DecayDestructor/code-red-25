import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LayoutPage from '../interfaces/LayoutPage'
import checkAnswers from '../../../utils/checkAnswers'
const YourComponent = () => {
  const navigate = useNavigate()
  const [answer, setAnswer] = useState('')
  const link =
    'https://docs.google.com/document/d/1sjiGhP8IMtobg1o5iGfNM1JxFcf6kcijlh2LtyCz0B8/edit?usp=sharing'
  window.link = link

  const ans = '!EdocNeddih77@Sna'

  const checkAnswer = async (e) => {
    e.preventDefault() // Prevent form submission from refreshing the page

    if (answer.length === 0) {
      alert('Empty')
      return
    }
    const { correct } = await checkAnswers(answer, '7_3')
    if (answer === ans) {
      alert('correct')
      navigate('/level_7_4') // Navigate to level_7_4 on correct answer
    } else {
      alert('incorrect')
    }
  }

  return (
    <div className="relative flex flex-col items-center justify-center h-screen text-white">
      <img
        src="/src/assets/levels/Level_7_3.png"
        alt="Background"
        className="object-cover w-full h-full absolute z-0"
      />
      <LayoutPage />

      <div className="relative z-10 text-center p-8 rounded-lg m-8">
        <h1 className="text-4xl font-extrabold mb-4 text-white drop-shadow-lg">
          Your Current Page
        </h1>
        <p className="text-lg font-medium mb-8 text-gray-200 drop-shadow-md">
          Welcome! Click below to proceed to the next level.
        </p>

        {
          // Add the clue to the link here
          // Link is a global variable in window object
          // Clue to that is in the anchor tag at line 51
        }

        <form onSubmit={checkAnswer}>
          <input
            type="text"
            placeholder="Enter Your Spell"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
            aria-label="Spell"
            className="w-full pb-2 rounded-none border-b-[1px] border-gray-200 text-white bg-transparent focus:outline-none focus:border-blue-500 tracking-wider placeholder:text-white mb-8"
          />

          <input
            type="submit"
            className="mt-4 px-8 py-3 text-lg font-semibold text-indigo-700 bg-white rounded-lg shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300"
            value="Attack"
          />
        </form>
      </div>
      <a
        href={
          'https://docs.google.com/document/d/1sjiGhP8IMtobg1o5iGfNM1JxFcf6kcijlh2LtyCz0B8/edit?usp=sharing'
        }
        hidden
      />
    </div>
  )
}

export default YourComponent
