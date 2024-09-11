import React from 'react'

const Footer = () => {
    return (
        <div className='pt-12 md:pt-20 pb-20 md:pb-10'>
            <div className='bg-gradient-to-l from-[#ecb90000] via-[#FFE500] to-[#ecb90000] inline-block w-full rounded-3xl h-[1.5px]'></div>
            <div className='py-4 flex space-x-3 md:space-x-4 items-center justify-center'>
                <div className='bg-gradient-to-r from-[#D6A250] rounded-full pl-[2.2px] py-[1.8px] pr-[2px] via-[#FFE500] to-[#ECB800]'>
                    <div className='bg-black  rounded-full'>
                        <div className='p-2 bg-gradient-to-r from-[#D6A250] text-transparent bg-clip-text rounded-full via-[#FFE500] to-[#ECB800]'>18+</div>
                    </div>
                </div>
                <div className='text-white font-normal text-[.9rem]'>Betting Paradise</div>
            </div>
            <div className='text-center text-[.8rem] md:text-[.9rem] font-[200] text-white text-opacity-75'>Gambling can be addictive. Play responsibly. We accept customers over 18 YEARS OF AGE.</div>
            <div className='text-center pt-3 text-[.7rem] md:text-[.8rem] font-[400] text-white text-opacity-75'>2024 &copy; betting paradise All Rights Reserved.</div>
        </div>
    )
}

export default Footer
