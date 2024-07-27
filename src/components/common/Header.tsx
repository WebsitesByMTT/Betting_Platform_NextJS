import React from 'react'

const Header = () => {
  return (
    <div>
       <div className='flex items-center justify-end space-x-[1rem] py-[1rem]'>
          <button className='uppercase text-white text-[.9rem] md:text-[1.2rem] px-[.5rem] py-[.5rem] rounded-[2rem]  bg-[#2E3134]'>Sign up</button>
          <button className='uppercase text-white text-[.9rem] md:text-[1.2rem] px-[.5rem] py-[.5rem] rounded-[2rem] bg-gradient-to-tr from-[#FFC400] to-[#D8890A]'>Sign in</button>
       </div>
    </div>
  )
}

export default Header
