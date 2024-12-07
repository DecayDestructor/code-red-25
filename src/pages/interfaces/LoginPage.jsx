import React, { useState } from 'react';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        // Add login logic here
        console.log('Login attempted', { username, password });
    };

    return (
        <div className='flex justify-center items-center h-screen relative'>
            <img
                src="/src/assets/interfaces/Login Background.jpg"
                alt="Background"
                className='object-cover w-full h-full'
            />
            <div className='w-[450px] h-[550px] bottom-16 absolute flex justify-center items-center rounded-3xl bg-slate-[#232B3E] bg-opacity-5 backdrop-filter backdrop-blur-[5px] border-[1px]'>
                <div className='border-b-[1px] top-0 absolute w-full h-20 flex items-center justify-center text-3xl text-white tracking-widest'>
                    Login
                </div>
                <form 
                    onSubmit={handleLogin} 
                    className='flex items-center justify-center flex-col p-6 w-[21rem]'
                >
                    {/* Username input with icon */}
                    <div className='w-full flex items-center relative mb-16'>
                        <input
                            type="text"
                            placeholder="Enter Your Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            aria-label="Username"
                            className='w-full pb-2 rounded-none border-b-[1px] border-gray-200 text-white bg-transparent focus:outline-none focus:border-blue-500 tracking-wider placeholder:text-white'
                        />
                        <img
                            src="/src/assets/interfaces/Users.svg"
                            alt="User Icon"
                            className='absolute pb-2 right-0 w-8 h-8 text-white'
                        />
                    </div>

                    {/* Password input */}
                    <div className='w-full flex items-center relative mb-8'>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Your Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            aria-label="Password"
                            className='w-full pb-2 rounded-none border-b-[1px] border-gray-200 text-white bg-transparent focus:outline-none focus:border-blue-500 tracking-wider placeholder:text-white'
                        />
                        <div 
                            className='absolute pb-2 right-0 w-8 h-8 cursor-pointer'
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            <img
                                src={showPassword 
                                    ? "/src/assets/interfaces/EyeOpen.svg" 
                                    : "/src/assets/interfaces/EyeClose.svg"
                                }
                                alt={showPassword ? "Hide Password" : "Show Password"}
                                className='w-full h-full text-white'
                            />
                        </div>
                    </div>

                    {/* Login Button */}
                    <button 
                        type="submit"
                        className='w-52 h-16 mt-8 top-8 relative flex justify-center items-center rounded-xl text-3xl bg-black text-white bg-opacity-55 backdrop-filter backdrop-blur-[3px] border-[1px] hover:bg-opacity-75 transition-all duration-300'
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;