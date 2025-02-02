import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignupPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const navigate = useNavigate()
  const handleSignup = (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Validate input
    if (!username.trim()) {
      setError('Username is required')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }

    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')
    const userExists = existingUsers.some((user) => user.username === username)

    if (userExists) {
      setError('Username already exists')
      return
    }

    // Save new user
    const newUser = { username, password }
    const updatedUsers = [...existingUsers, newUser]

    try {
      localStorage.setItem('users', JSON.stringify(updatedUsers))
      setSuccess('User successfully registered!')

      setUsername('')
      setPassword('')

      // Redirect to backstory_1
      navigate('/backstory_1')
    } catch (err) {
      setError('Failed to save user. Please try again.')
      console.error('Signup error:', err)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen relative">
      <img
        src="/src/assets/interfaces/LoginPage Background.jpg"
        alt="Background"
        className="object-cover w-full h-full absolute z-0"
      />
      <div className="w-[450px] h-[65%] bottom-16 absolute z-10 flex justify-center items-center rounded-3xl bg-slate-[#232B3E] bg-opacity-5 backdrop-filter backdrop-blur-[5px] border-[1px]">
        <div className="border-b-[1px] top-0 absolute w-full h-20 flex items-center justify-center text-3xl text-white tracking-widest">
          Signup
        </div>
        <form
          onSubmit={handleSignup}
          className="flex items-center justify-center flex-col p-6 w-[21rem]"
        >
          {error && (
            <div className="w-full text-red-500 text-center mb-4">{error}</div>
          )}
          {success && (
            <div className="w-full text-green-500 text-center mb-4">
              {success}
            </div>
          )}

          <div className="w-full flex items-center relative mb-16">
            <input
              type="text"
              placeholder="Enter Your Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              aria-label="Username"
              className="w-full pb-2 rounded-none border-b-[1px] border-gray-200 text-white bg-transparent focus:outline-none focus:border-blue-500 tracking-wider placeholder:text-white"
            />
            <img
              src="/src/assets/interfaces/Users.svg"
              alt="User Icon"
              className="absolute pb-2 right-0 w-8 h-8 text-white"
            />
          </div>

          <div className="w-full flex items-center relative mb-2">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-label="Password"
              className="w-full pb-2 rounded-none border-b-[1px] border-gray-200 text-white bg-transparent focus:outline-none focus:border-blue-500 tracking-wider placeholder:text-white"
            />
            <div
              className="absolute pb-2 right-0 w-8 h-8 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              <img
                src={
                  showPassword
                    ? '/src/assets/interfaces/EyeOpen.svg'
                    : '/src/assets/interfaces/EyeClose.svg'
                }
                alt={showPassword ? 'Hide Password' : 'Show Password'}
                className="w-full h-full text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-52 h-16 mt-5 top-8 relative flex justify-center items-center rounded-xl text-3xl bg-black text-white bg-opacity-55 backdrop-filter backdrop-blur-[3px] border-[1px] hover:bg-opacity-75 transition-all duration-300"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignupPage
