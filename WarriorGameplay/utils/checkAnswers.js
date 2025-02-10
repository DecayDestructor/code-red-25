import axios from 'axios'

const checkAnswers = async (answer, level) => {
  const id = localStorage.getItem('id')
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
