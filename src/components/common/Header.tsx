import React from 'react'

const Header = () => {
  return (
    <div>
       <div className='flex items-center justify-end space-x-[1vw] py-[1vw]'>
          <button className='uppercase text-white text-[1vw] px-[.5vw] py-[.4vw] rounded-[1vw]  bg-[#2E3134]'>Signup</button>
          <button className='uppercase text-white px-[.5vw]  text-[1vw] py-[.4vw] rounded-[1vw] bg-gradient-to-tr from-[#FFC400] to-[#D8890A]'>Signup</button>
       </div>
    </div>
  )
}

export default Header
