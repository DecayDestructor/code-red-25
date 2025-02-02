import React from 'react'

const LayoutPage = () => {
  return (
    <div className='flex items-center justify-center'>
      <div className='flex justify-center items-center'>
        <div className='z-10 absolute w-14 h-14 top-8 left-8 flex justify-center items-center rounded-full text-3xl bg-white text-white bg-opacity-20 backdrop-filter backdrop-blur-[3px] border-[1px]'>
          <img src="./src/assets/interfaces/Leaderboard.svg" alt="" className='w-6' />
        </div>
        <div className='z-10 absolute w-52 h-14 top-8 flex justify-center items-center rounded-full text-3xl bg-white text-white bg-opacity-20 backdrop-filter backdrop-blur-[3px] border-[1px]'>LEVEL 1</div>
        <div className='z-10 absolute w-14 h-14 top-8 right-8 flex justify-center items-center rounded-full bg-white text-white bg-opacity-20 backdrop-filter backdrop-blur-[3px] border-[1px]'>
        <div className='flex items-center justify-center flex-col'>
            <div className='text-xs tracking-wide'>Score</div>
            <div className='text-2xl'>69</div>
          </div>
        </div>
      </div>
      <div className='flex justify-center items-center'>
        <div className='z-10 absolute w-14 h-14 bottom-8 right-8 flex justify-center items-center rounded-full text-3xl bg-white text-white bg-opacity-20 backdrop-filter backdrop-blur-[3px] border-[1px]'>
          <img src="./src/assets/interfaces/Hint.svg" alt="" className='w-5' />
        </div>
        <div className='z-10 absolute w-52 h-14 bottom-8 flex justify-center items-center rounded-full text-3xl bg-white text-white bg-opacity-20 backdrop-filter backdrop-blur-[3px] border-[1px]'>Sigma boy</div>
        <div className='z-10 absolute w-52 h-14 bottom-8 left-8 flex justify-center items-center rounded-full bg-white text-white bg-opacity-20 backdrop-filter backdrop-blur-[3px] border-[1px]'>
          <div className='flex items-center justify-center flex-col'>
            <div className='text-xs tracking-wide'>Time Remaining</div>
            <div className='text-2xl'>69:69:69</div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default LayoutPage