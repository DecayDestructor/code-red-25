const submitBtn = document.querySelector('.ans_btn')
// console.log(submitBtn)
console.log('hello')

//log a message after 420 seconds

setTimeout(() => {
  console.log(
    'If none is displayed in CSS then that element in site is broken!'
  )
}, 420000) // 420 seconds

// import axios from '../src/utils/api'
// import axios from '../src/utils/api'
// import checkAnswer from '../src/utils/checkAnswer.js'
// import CryptoJS from '../src/utils/crpyto.js'

const SECRET_KEY = 'default-secret-key' // Same key as in store.js

submitBtn.addEventListener('click', async (e) => {
  e.preventDefault() // Prevents unwanted form submission

  // Get text values and concatenate them
  const answer1 = document.querySelector('.ans_1').value.trim()
  const answer2 = document.querySelector('.ans_2').value.trim()
  const answer3 = document.querySelector('.ans_3').value.trim()

  const concatenatedAnswer = answer1 + answer2 + answer3

  try {
    // Pass concatenated string
    const response = await fetch(
      'https://code-red-25.onrender.com/answers/check-answer/wizard/5',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answer: concatenatedAnswer }),
      }
    )

    // Wait for the response to be converted to JSON
    const data = await response.json()

    // Access the 'correct' attribute from the response
    console.log(data.correct)

    if (data.correct) {
      // Redirect to the next level if the answer is correct
      window.location.href = '/level6'
      // console.log(data.correct)
    }
  } catch (e) {
    console.log(`Error while sending request: ${e}`)
  }
})
