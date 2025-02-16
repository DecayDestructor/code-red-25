const submitBtn = document.querySelector('.ans_btn')
// console.log(submitBtn);
// import axios from '../src/utils/api'
import checkAnswer from '../src/utils/checkAnswer.js'

submitBtn.addEventListener('click', async (e) => {
  const answer1 = document.querySelector('.ans_1')
  const answer2 = document.querySelector('.ans_2')
  const answer3 = document.querySelector('.ans_3')

  /////Sending the post request to the API//////
  //   const id = localStorage.getItem('id') || 1
  //   try {
  //     const response = await fetch(`answers/check-answer/wizard/5`, {
  //       method: 'POST',
  //       body: {
  //         teamId: id,
  //         //The elements of the answer array should be in the same order:
  //         //answer1 , answer2 and then answer3
  //         answer: [answer1, answer2, answer3],
  //       },
  //     })

  //     if (!response.ok) {
  //       throw new Error(`Response status: ${response.status}`)
  //     }

  //     const json = await response.json()

  //     //Routing to next level is answer is correct otherwise not
  try {
    const { correct } = await checkAnswer(
      answer1.append(answer2.append(answer3)),
      '5'
    )
    if (correct) {
      window.location.href = '/level6'
    }
  } catch (e) {
    console.log(`Error while sending request : ${e}`)
  }
})
