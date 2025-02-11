import axios from 'axios'
const checkAnswers = async (answer, level) => {
  const id = localStorage.getItem('id')
  console.log(id)

  if (id === null) {
    // throw new Error('User not logged in')
    alert('User not logged in')
    setTimeout(() => {
      window.location.href = '/login' // Redirect to login page if user not logged in for 3 seconds
    }, 3000)
    return false
  }
  console.log(id)

  try {
    const response = await axios.post(`answers/check-answer/warrior/${level}`, {
      teamId: id,
      answer,
    })
    return response.data
  } catch (error) {
    console.error('Error checking answer:', error)
    throw error
  }
}

export default checkAnswers
