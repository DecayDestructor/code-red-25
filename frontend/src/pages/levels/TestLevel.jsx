import React from 'react';
import LayoutPage from '../interfaces/LayoutPage';

const TestLevel = () => {
    return (
        <div className='flex justify-center items-center h-screen relative'>
            <LayoutPage />
            <img
                src="/src/assets/interfaces/TestLevel.png"
                alt="Background"
                className='object-cover w-full h-full absolute z-0'
            />
            <div className='absolute'>
                
            </div>
        </div>
    )
}

export default TestLevel