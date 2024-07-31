import React from 'react'

const Header = () => {
  return (
       <div className='flex items-center justify-end space-x-[.6rem] py-[.5rem]'>
          <button className='uppercase text-white text-[.8rem] md:text-[1.1rem] px-[1rem] py-[.5rem] rounded-[2rem]  bg-[#2E3134]'>Sign up</button>
          <button className='uppercase text-white text-[.8rem] md:text-[1.1rem] px-[1rem] py-[.5rem] rounded-[2rem] bg-gradient-to-tr from-[#FFC400] to-[#D8890A]'>Sign in</button>
       </div>
  )
}


export default Header
