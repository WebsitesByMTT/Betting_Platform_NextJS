import Image from 'next/image'
import React from 'react'

const Categorys = () => {

    const data = [
        {
            icon: '/assets/image/categoryicon1.png',
            hovericon: '/assets/image/categoryhovericon1.png',
            text: 'All'
        },
        {
            icon: '/assets/image/categoryicon2.png',
            hovericon: '/assets/image/categoryhovericon2.png',
            text: 'Cricket'
        },
        {
            icon: '/assets/image/categoryicon3.png',
            hovericon: '/assets/image/categoryhovericon3.png',
            text: 'Football'
        },
        {
            icon: '/assets/image/categoryicon4.png',
            hovericon: '/assets/image/categoryhovericon4.png',
            text: 'Basketball'
        },
        {
            icon: '/assets/image/categoryicon6.png',
            hovericon: '/assets/image/categoryhovericon6.png',
            text: 'Table tennis'
        },
        {
            icon: '/assets/image/categoryicon7.png',
            hovericon: '/assets/image/categoryhovericon7.png',
            text: 'Volleyball'
        },
        {
            icon: '/assets/image/categoryicon8.png',
            hovericon: '/assets/image/categoryhovericon8.png',
            text: 'Fifa'
        },
        {
            icon: '/assets/image/categoryicon9.png',
            hovericon: '/assets/image/categoryhovericon9.png',
            text: 'Ice Hockey'
        },
        {
            icon: '/assets/image/categoryicon10.png',
            hovericon: '/assets/image/categoryhovericon10.png',
            text: 'Horse Racing'
        },
        {
            icon: '/assets/image/categoryicon11.png',
            hovericon: '/assets/image/categoryhovericon11.png',
            text: 'Badminton'
        },
        {
            icon: '/assets/image/categoryicon12.png',
            hovericon: '/assets/image/categoryhovericon12.png',
            text: 'Baseball'
        }
    ]

    return (
        <div className='pt-6'>
            <div className='bg-gradient-to-tr p-[1px] rounded-2xl from-[#D6A250] via-[#FFE500] to-[#ECB800] '>
                <div className='rounded-2xl bg-[#232323] p-3 md:p-5'>
                    <div className='w-full  lg:w-[85%] flex flex-wrap lg:flex-auto lg:mx-auto  justify-between'>
                        {
                            data?.map((item, ind) => (
                                <div key={ind} className='cursor-pointer m-3 md:m-1 w-[80px] md:w-auto'>
                                    <div className='hover:bg-gradient-to-tr mx-auto from-[#D6A250] via-[#FFE500] to-[#ECB800] w-[50px] p-[1px] rounded-xl'>
                                        <div className='bg-[#343434]  group  hover:p-[.60rem] p-[.8rem] rounded-xl shadow-inner shadow-[#232323]'>
                                            <Image src={item.hovericon} alt='category' className='group-hover:block hidden' width={100} height={100} quality={100} />
                                            <Image src={item.icon} alt='category' className='group-hover:hidden'  width={100} height={100} quality={100} />
                                        </div>
                                    </div>
                                    <div className='text-center text-white text-[.85rem] pt-1'>{item.text}</div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            {/* Top 5 Bets Ui Starts Here */}
            <div className='bg-[#323232] flex items-center justify-between px-3 md:px-6 mt-6 py-2 rounded-[1rem] shadow-inner shadow-[#232323]'>
                <div className='flex items-center space-x-3 md:space-x-6'>
                    <Image src={'/assets/image/topbets.svg'} alt='category' className='w-[45px]' width={100} height={100} quality={100} />
                    <span className='text-[1rem] md:text-[1.5rem] text-white'>Top Bets</span>
                </div>
                <div className='flex items-center space-x-3'>
                    <div className='bg-[#0E1013] flex items-center space-x-2 rounded-full p-2'>
                        <div className='parant rotate-180 cursor-pointer transition-all'>
                            <svg width="24" className='my-arrow-svg' height="24" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.0011 0.483246C10.4299 0.483246 7.91653 1.24568 5.77869 2.67414C3.64085 4.1026 1.97461 6.13292 0.990671 8.50836C0.00673133 10.8838 -0.250712 13.4977 0.250896 16.0194C0.752504 18.5412 1.99063 20.8576 3.80872 22.6756C5.6268 24.4937 7.94318 25.7318 10.4649 26.2335C12.9867 26.7351 15.6005 26.4776 17.976 25.4937C20.3514 24.5097 22.3818 22.8435 23.8102 20.7057C25.2387 18.5678 26.0011 16.0544 26.0011 13.4832C25.9975 10.0365 24.6267 6.73206 22.1895 4.29488C19.7523 1.85769 16.4478 0.486886 13.0011 0.483246ZM13.0011 24.4832C10.8255 24.4832 8.69877 23.8381 6.88983 22.6294C5.08089 21.4207 3.67099 19.7028 2.83843 17.6928C2.00587 15.6828 1.78803 13.471 2.21247 11.3373C2.6369 9.20346 3.68455 7.24345 5.22293 5.70507C6.76131 4.16669 8.72132 3.11905 10.8551 2.69461C12.9889 2.27017 15.2006 2.48801 17.2106 3.32057C19.2206 4.15313 20.9386 5.56303 22.1473 7.37197C23.356 9.18091 24.0011 11.3077 24.0011 13.4832C23.9978 16.3996 22.8378 19.1956 20.7756 21.2578C18.7134 23.32 15.9175 24.4799 13.0011 24.4832ZM18.7086 12.7757C18.8016 12.8686 18.8753 12.9789 18.9257 13.1003C18.976 13.2217 19.0019 13.3518 19.0019 13.4832C19.0019 13.6147 18.976 13.7448 18.9257 13.8662C18.8753 13.9876 18.8016 14.0979 18.7086 14.1907L14.7086 18.1907C14.521 18.3784 14.2665 18.4838 14.0011 18.4838C13.7357 18.4838 13.4812 18.3784 13.2936 18.1907C13.106 18.0031 13.0005 17.7486 13.0005 17.4832C13.0005 17.2179 13.106 16.9634 13.2936 16.7757L15.5874 14.4832H8.0011C7.73589 14.4832 7.48153 14.3779 7.294 14.1904C7.10646 14.0028 7.0011 13.7485 7.0011 13.4832C7.0011 13.218 7.10646 12.9637 7.294 12.7761C7.48153 12.5886 7.73589 12.4832 8.0011 12.4832H15.5874L13.2936 10.1907C13.106 10.0031 13.0005 9.74861 13.0005 9.48325C13.0005 9.21788 13.106 8.96339 13.2936 8.77575C13.4812 8.5881 13.7357 8.48269 14.0011 8.48269C14.2665 8.48269 14.521 8.5881 14.7086 8.77575L18.7086 12.7757Z"  />
                                <defs>
                                    <linearGradient id="paint0_linear_41_897" x1="13.0556" y1="26.4848" x2="13.0556" y2="0.483246" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#D6A250" />
                                        <stop offset="0.502921" stop-color="#FFE500" />
                                        <stop offset="1" stop-color="#ECB800" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                        <div className='parant cursor-pointer transition-all'>
                            <svg width="24" className='my-arrow-svg' height="24" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.0011 0.483246C10.4299 0.483246 7.91653 1.24568 5.77869 2.67414C3.64085 4.1026 1.97461 6.13292 0.990671 8.50836C0.00673133 10.8838 -0.250712 13.4977 0.250896 16.0194C0.752504 18.5412 1.99063 20.8576 3.80872 22.6756C5.6268 24.4937 7.94318 25.7318 10.4649 26.2335C12.9867 26.7351 15.6005 26.4776 17.976 25.4937C20.3514 24.5097 22.3818 22.8435 23.8102 20.7057C25.2387 18.5678 26.0011 16.0544 26.0011 13.4832C25.9975 10.0365 24.6267 6.73206 22.1895 4.29488C19.7523 1.85769 16.4478 0.486886 13.0011 0.483246ZM13.0011 24.4832C10.8255 24.4832 8.69877 23.8381 6.88983 22.6294C5.08089 21.4207 3.67099 19.7028 2.83843 17.6928C2.00587 15.6828 1.78803 13.471 2.21247 11.3373C2.6369 9.20346 3.68455 7.24345 5.22293 5.70507C6.76131 4.16669 8.72132 3.11905 10.8551 2.69461C12.9889 2.27017 15.2006 2.48801 17.2106 3.32057C19.2206 4.15313 20.9386 5.56303 22.1473 7.37197C23.356 9.18091 24.0011 11.3077 24.0011 13.4832C23.9978 16.3996 22.8378 19.1956 20.7756 21.2578C18.7134 23.32 15.9175 24.4799 13.0011 24.4832ZM18.7086 12.7757C18.8016 12.8686 18.8753 12.9789 18.9257 13.1003C18.976 13.2217 19.0019 13.3518 19.0019 13.4832C19.0019 13.6147 18.976 13.7448 18.9257 13.8662C18.8753 13.9876 18.8016 14.0979 18.7086 14.1907L14.7086 18.1907C14.521 18.3784 14.2665 18.4838 14.0011 18.4838C13.7357 18.4838 13.4812 18.3784 13.2936 18.1907C13.106 18.0031 13.0005 17.7486 13.0005 17.4832C13.0005 17.2179 13.106 16.9634 13.2936 16.7757L15.5874 14.4832H8.0011C7.73589 14.4832 7.48153 14.3779 7.294 14.1904C7.10646 14.0028 7.0011 13.7485 7.0011 13.4832C7.0011 13.218 7.10646 12.9637 7.294 12.7761C7.48153 12.5886 7.73589 12.4832 8.0011 12.4832H15.5874L13.2936 10.1907C13.106 10.0031 13.0005 9.74861 13.0005 9.48325C13.0005 9.21788 13.106 8.96339 13.2936 8.77575C13.4812 8.5881 13.7357 8.48269 14.0011 8.48269C14.2665 8.48269 14.521 8.5881 14.7086 8.77575L18.7086 12.7757Z"  />
                                <defs> 
                                    <linearGradient id="paint0_linear_41_897" x1="13.0556" y1="26.4848" x2="13.0556" y2="0.483246" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#D6A250" />
                                        <stop offset="0.502921" stop-color="#FFE500" />
                                        <stop offset="1" stop-color="#ECB800" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                    </div>
                    <div className='flex items-center space-x-1'>
                        <div className='uppercase text-white text-[.8rem] md:text-[1rem]'>See All</div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" className="lucide cursor-pointer text-white lucide-chevrons-right"><path d="m6 17 5-5-5-5"/><path d="m13 17 5-5-5-5"/></svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Categorys
