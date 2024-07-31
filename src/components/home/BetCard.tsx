'use client'
import Image from 'next/image'
import React, { useState } from 'react'

const BetCard = () => {
    const [index, setIndex] = useState<number[]>([]);
    const handelopen = (ind: number) => {
        setIndex(prevIndices => {
          if (prevIndices.includes(ind)) {
            return prevIndices.filter(i => i !== ind);
          } else {
            return [...prevIndices, ind];
          }
        });
      };
    const data = [1, 2, 3]
    return (
        <>
            <div className='pt-5 cursor-pointer flex space-x-2 items-center'>
                <svg width="23" height="23" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.0011 5.70501C10.0011 6.19931 9.85452 6.68252 9.5799 7.09352C9.30527 7.50452 8.91494 7.82486 8.45826 8.01402C8.00158 8.20319 7.49906 8.25268 7.01426 8.15624C6.52945 8.05981 6.08412 7.82178 5.73459 7.47225C5.38507 7.12272 5.14704 6.6774 5.0506 6.19259C4.95417 5.70778 5.00366 5.20526 5.19282 4.74858C5.38199 4.2919 5.70232 3.90157 6.11332 3.62695C6.52432 3.35233 7.00753 3.20575 7.50184 3.20575C8.16468 3.20575 8.80038 3.46906 9.26908 3.93777C9.73778 4.40647 10.0011 5.04216 10.0011 5.70501ZM12.5004 5.70501C12.5019 4.47529 12.0485 3.28845 11.2276 2.37287C11.1842 2.32277 11.1312 2.28181 11.0718 2.25237C11.0124 2.22294 10.9477 2.20563 10.8815 2.20144C10.8153 2.19725 10.749 2.20627 10.6863 2.22797C10.6237 2.24967 10.5659 2.28363 10.5165 2.32785C10.4671 2.37208 10.427 2.42569 10.3985 2.48557C10.37 2.54545 10.3538 2.6104 10.3506 2.67664C10.3475 2.74288 10.3576 2.80907 10.3803 2.87138C10.403 2.93368 10.4378 2.99085 10.4828 3.03955C11.1385 3.77268 11.501 4.72175 11.501 5.70532C11.501 6.68889 11.1385 7.63796 10.4828 8.37109C10.3969 8.47022 10.3534 8.59916 10.3617 8.73009C10.37 8.86102 10.4294 8.98345 10.5271 9.07095C10.6249 9.15845 10.7531 9.20401 10.8842 9.1978C11.0152 9.1916 11.1386 9.13412 11.2276 9.03777C12.0484 8.12187 12.5017 6.93489 12.5004 5.70501ZM4.52085 3.03955C4.56585 2.99085 4.60072 2.93368 4.62342 2.87138C4.64611 2.80907 4.65619 2.74288 4.65305 2.67664C4.64991 2.6104 4.63363 2.54545 4.60514 2.48557C4.57666 2.42569 4.53654 2.37208 4.48714 2.32785C4.43773 2.28363 4.38002 2.24967 4.31736 2.22797C4.2547 2.20627 4.18835 2.19725 4.12217 2.20144C4.056 2.20563 3.99131 2.22294 3.93189 2.25237C3.87247 2.28181 3.8195 2.32277 3.77607 2.37287C2.95556 3.28894 2.50185 4.47552 2.50185 5.70532C2.50185 6.93513 2.95556 8.1217 3.77607 9.03777C3.86511 9.13412 3.98846 9.1916 4.11951 9.1978C4.25055 9.20401 4.37879 9.15845 4.47654 9.07095C4.57429 8.98345 4.63372 8.86102 4.64201 8.73009C4.6503 8.59916 4.60678 8.47022 4.52085 8.37109C3.86452 7.63827 3.5016 6.68909 3.5016 5.70532C3.5016 4.72156 3.86452 3.77237 4.52085 3.03955ZM14.4104 2.78962C14.0446 1.92084 13.5175 1.12921 12.8571 0.456564C12.8116 0.407897 12.7568 0.368822 12.696 0.341638C12.6351 0.314454 12.5695 0.29971 12.5028 0.298273C12.4362 0.296836 12.37 0.308734 12.308 0.333269C12.2461 0.357804 12.1896 0.39448 12.1421 0.441139C12.0945 0.487799 12.0567 0.5435 12.031 0.604968C12.0053 0.666436 11.9921 0.732429 11.9922 0.799067C11.9924 0.865705 12.0058 0.931641 12.0318 0.993C12.0578 1.05436 12.0958 1.1099 12.1436 1.15636C13.3349 2.37015 14.0024 4.00299 14.0024 5.70376C14.0024 7.40453 13.3349 9.03737 12.1436 10.2512C12.0975 10.298 12.061 10.3535 12.0364 10.4144C12.0117 10.4754 11.9993 10.5405 11.9998 10.6063C12.0003 10.672 12.0138 10.737 12.0394 10.7975C12.065 10.8581 12.1024 10.913 12.1492 10.9591C12.1961 11.0052 12.2515 11.0416 12.3125 11.0663C12.3734 11.091 12.4386 11.1034 12.5043 11.1029C12.5701 11.1024 12.6351 11.0889 12.6956 11.0633C12.7561 11.0376 12.811 11.0003 12.8571 10.9535C13.892 9.89668 14.5915 8.5577 14.8678 7.10468C15.1442 5.65166 14.985 4.14938 14.4104 2.7865V2.78962ZM1.51424 8.23426C1.01479 7.05361 0.876073 5.75151 1.11558 4.49214C1.35509 3.23276 1.96211 2.07249 2.86009 1.15761C2.95305 1.06299 3.00462 0.93531 3.00345 0.802667C3.00228 0.670025 2.94846 0.54328 2.85384 0.450316C2.75922 0.357352 2.63154 0.305784 2.4989 0.306956C2.36626 0.308128 2.23951 0.361943 2.14655 0.456564C0.770823 1.8571 0 3.74181 0 5.70501C0 7.6682 0.770823 9.55291 2.14655 10.9535C2.19207 11.0021 2.24686 11.0412 2.3077 11.0684C2.36854 11.0956 2.43421 11.1103 2.50083 11.1117C2.56745 11.1132 2.63369 11.1013 2.69565 11.0767C2.7576 11.0522 2.81403 11.0155 2.8616 10.9689C2.90918 10.9222 2.94695 10.8665 2.97268 10.805C2.99842 10.7436 3.0116 10.6776 3.01146 10.611C3.01132 10.5443 2.99785 10.4784 2.97186 10.417C2.94586 10.3557 2.90786 10.3001 2.86009 10.2537C2.28819 9.67138 1.83155 8.98621 1.51424 8.23426Z" fill="#FF6060" />
                </svg>
                <div className='text-[1.1rem] md:text-[1.3rem] text-white'>Live</div>
                <svg width="13" height="7" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.80497 0.900406L14.4712 7.56664C14.5645 7.65987 14.6281 7.77869 14.6538 7.90808C14.6796 8.03746 14.6664 8.17157 14.6159 8.29345C14.5654 8.41532 14.4799 8.51947 14.3702 8.59272C14.2604 8.66596 14.1314 8.705 13.9995 8.70489H0.667144C0.535223 8.705 0.406237 8.66596 0.296516 8.59272C0.186794 8.51947 0.101271 8.41532 0.050773 8.29345C0.000274976 8.17157 -0.0129272 8.03746 0.0128379 7.90808C0.038603 7.77869 0.102177 7.65987 0.195511 7.56664L6.8617 0.900406C6.92361 0.838426 6.99713 0.789256 7.07806 0.755709C7.15898 0.722161 7.24573 0.704895 7.33333 0.704895C7.42094 0.704895 7.50768 0.722161 7.58861 0.755709C7.66954 0.789256 7.74306 0.838426 7.80497 0.900406Z" fill="#FF6060" />
                </svg>
            </div>
            <div className='pt-3 grid grid-cols-12 items-start gap-3'>
                {
                    data?.map((_, ind) => (
                        <div key={ind} className='bg-[#292D2E] shadow-xl  p-2 rounded-lg col-span-12 md:col-span-6 xl:col-span-3'>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center space-x-[.5px]'>
                                    <Image src={'/assets/image/categoryicon6.svg'} alt='game' className='w-[10px] mr-[5px]' width={100} height={100} quality={100} />
                                    <div className='text-white text-opacity-60 text-[.7rem] md:text-[.9rem]'>International</div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide text-gray-400 lucide-chevron-right"><path d="m9 18 6-6-6-6" /></svg>
                                    <div className='text-white  text-[.7rem] md:text-[.8rem]'>TT Elite Series</div>
                                </div>
                                <svg width="16" height="16" className='cursor-pointer' viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.23196 1.51577C5.47408 0.772452 6.52571 0.772452 6.76703 1.51577L7.63061 4.17269C7.68337 4.3345 7.78593 4.47549 7.92363 4.5755C8.06134 4.67552 8.22714 4.72945 8.39733 4.72957H11.1914C11.9735 4.72957 12.298 5.73035 11.666 6.19039L9.40618 7.83199C9.2682 7.93209 9.16545 8.07332 9.11268 8.23541C9.0599 8.39751 9.05981 8.57216 9.11241 8.73431L9.97598 11.3912C10.2181 12.1345 9.36664 12.7536 8.73308 12.2935L6.47325 10.6519C6.33541 10.5519 6.16943 10.498 5.99909 10.498C5.82875 10.498 5.66277 10.5519 5.52493 10.6519L3.2651 12.2935C2.63235 12.7536 1.78169 12.1345 2.023 11.3912L2.88658 8.73431C2.93918 8.57216 2.93909 8.39751 2.88631 8.23541C2.83354 8.07332 2.73079 7.93209 2.5928 7.83199L0.333783 6.1912C-0.298162 5.73116 0.0270921 4.73038 0.808347 4.73038H3.60166C3.77199 4.73042 3.93797 4.67658 4.07583 4.57655C4.2137 4.47652 4.31639 4.33543 4.36919 4.17349L5.23277 1.51658L5.23196 1.51577Z" fill="white" fill-opacity="0.5" />
                                </svg> 
                            </div>        
                            <div className='flex py-1 items-center justify-between'>
                                <div className='text-[#67FFFF] text-[.8rem] md:text-[.9rem]'>1st set</div>
                                <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.0011 5.70501C10.0011 6.19931 9.85452 6.68252 9.5799 7.09352C9.30527 7.50452 8.91494 7.82486 8.45826 8.01402C8.00158 8.20319 7.49906 8.25268 7.01426 8.15624C6.52945 8.05981 6.08412 7.82178 5.73459 7.47225C5.38507 7.12272 5.14704 6.6774 5.0506 6.19259C4.95417 5.70778 5.00366 5.20526 5.19282 4.74858C5.38199 4.2919 5.70232 3.90157 6.11332 3.62695C6.52432 3.35233 7.00753 3.20575 7.50184 3.20575C8.16468 3.20575 8.80038 3.46906 9.26908 3.93777C9.73778 4.40647 10.0011 5.04216 10.0011 5.70501ZM12.5004 5.70501C12.5019 4.47529 12.0485 3.28845 11.2276 2.37287C11.1842 2.32277 11.1312 2.28181 11.0718 2.25237C11.0124 2.22294 10.9477 2.20563 10.8815 2.20144C10.8153 2.19725 10.749 2.20627 10.6863 2.22797C10.6237 2.24967 10.5659 2.28363 10.5165 2.32785C10.4671 2.37208 10.427 2.42569 10.3985 2.48557C10.37 2.54545 10.3538 2.6104 10.3506 2.67664C10.3475 2.74288 10.3576 2.80907 10.3803 2.87138C10.403 2.93368 10.4378 2.99085 10.4828 3.03955C11.1385 3.77268 11.501 4.72175 11.501 5.70532C11.501 6.68889 11.1385 7.63796 10.4828 8.37109C10.3969 8.47022 10.3534 8.59916 10.3617 8.73009C10.37 8.86102 10.4294 8.98345 10.5271 9.07095C10.6249 9.15845 10.7531 9.20401 10.8842 9.1978C11.0152 9.1916 11.1386 9.13412 11.2276 9.03777C12.0484 8.12187 12.5017 6.93489 12.5004 5.70501ZM4.52085 3.03955C4.56585 2.99085 4.60072 2.93368 4.62342 2.87138C4.64611 2.80907 4.65619 2.74288 4.65305 2.67664C4.64991 2.6104 4.63363 2.54545 4.60514 2.48557C4.57666 2.42569 4.53654 2.37208 4.48714 2.32785C4.43773 2.28363 4.38002 2.24967 4.31736 2.22797C4.2547 2.20627 4.18835 2.19725 4.12217 2.20144C4.056 2.20563 3.99131 2.22294 3.93189 2.25237C3.87247 2.28181 3.8195 2.32277 3.77607 2.37287C2.95556 3.28894 2.50185 4.47552 2.50185 5.70532C2.50185 6.93513 2.95556 8.1217 3.77607 9.03777C3.86511 9.13412 3.98846 9.1916 4.11951 9.1978C4.25055 9.20401 4.37879 9.15845 4.47654 9.07095C4.57429 8.98345 4.63372 8.86102 4.64201 8.73009C4.6503 8.59916 4.60678 8.47022 4.52085 8.37109C3.86452 7.63827 3.5016 6.68909 3.5016 5.70532C3.5016 4.72156 3.86452 3.77237 4.52085 3.03955ZM14.4104 2.78962C14.0446 1.92084 13.5175 1.12921 12.8571 0.456564C12.8116 0.407897 12.7568 0.368822 12.696 0.341638C12.6351 0.314454 12.5695 0.29971 12.5028 0.298273C12.4362 0.296836 12.37 0.308734 12.308 0.333269C12.2461 0.357804 12.1896 0.39448 12.1421 0.441139C12.0945 0.487799 12.0567 0.5435 12.031 0.604968C12.0053 0.666436 11.9921 0.732429 11.9922 0.799067C11.9924 0.865705 12.0058 0.931641 12.0318 0.993C12.0578 1.05436 12.0958 1.1099 12.1436 1.15636C13.3349 2.37015 14.0024 4.00299 14.0024 5.70376C14.0024 7.40453 13.3349 9.03737 12.1436 10.2512C12.0975 10.298 12.061 10.3535 12.0364 10.4144C12.0117 10.4754 11.9993 10.5405 11.9998 10.6063C12.0003 10.672 12.0138 10.737 12.0394 10.7975C12.065 10.8581 12.1024 10.913 12.1492 10.9591C12.1961 11.0052 12.2515 11.0416 12.3125 11.0663C12.3734 11.091 12.4386 11.1034 12.5043 11.1029C12.5701 11.1024 12.6351 11.0889 12.6956 11.0633C12.7561 11.0376 12.811 11.0003 12.8571 10.9535C13.892 9.89668 14.5915 8.5577 14.8678 7.10468C15.1442 5.65166 14.985 4.14938 14.4104 2.7865V2.78962ZM1.51424 8.23426C1.01479 7.05361 0.876073 5.75151 1.11558 4.49214C1.35509 3.23276 1.96211 2.07249 2.86009 1.15761C2.95305 1.06299 3.00462 0.93531 3.00345 0.802667C3.00228 0.670025 2.94846 0.54328 2.85384 0.450316C2.75922 0.357352 2.63154 0.305784 2.4989 0.306956C2.36626 0.308128 2.23951 0.361943 2.14655 0.456564C0.770823 1.8571 0 3.74181 0 5.70501C0 7.6682 0.770823 9.55291 2.14655 10.9535C2.19207 11.0021 2.24686 11.0412 2.3077 11.0684C2.36854 11.0956 2.43421 11.1103 2.50083 11.1117C2.56745 11.1132 2.63369 11.1013 2.69565 11.0767C2.7576 11.0522 2.81403 11.0155 2.8616 10.9689C2.90918 10.9222 2.94695 10.8665 2.97268 10.805C2.99842 10.7436 3.0116 10.6776 3.01146 10.611C3.01132 10.5443 2.99785 10.4784 2.97186 10.417C2.94586 10.3557 2.90786 10.3001 2.86009 10.2537C2.28819 9.67138 1.83155 8.98621 1.51424 8.23426Z" fill="#FF6060" />
                                </svg>
                            </div>
                            <div className='flex items-center py-1.5 justify-between'>
                                <div className='flex items-center space-x-2'>
                                    <Image src={'/assets/image/plus.svg'} alt='icon' width={100} height={100} quality={100} className='w-[20px]' />
                                    <div className='text-white text-[.8rem] md:text-[.9rem]'>Alfonso,Switzerland</div>
                                </div>
                                <div className='flex items-center space-x-4'>
                                    <div className='text-white text-[.8rem] md:text-[.9rem]'>4</div>
                                    <div className='text-white text-opacity-60 text-[.8rem] md:text-[.9rem] px-3 border border-opacity-45 border-white bg-[#1A1A1A] rounded-md'>0</div>
                                </div>
                            </div>
                            <div className='flex items-center py-1.5 justify-between'>
                                <div className='flex items-center space-x-2'>
                                    <Image src={'/assets/image/flag.png'} alt='icon' width={100} height={100} quality={100} className='w-[20px]' />
                                    <div className='text-white text-[.8rem] md:text-[.9rem]'>Zain,Algeria</div>
                                </div>
                                <div className='flex items-center space-x-4'>
                                    <div className='text-white text-[.8rem] md:text-[.9rem]'>4</div>
                                    <div className='text-white text-opacity-60 text-[.8rem] md:text-[.9rem] px-3 border border-opacity-45 border-white bg-[#1A1A1A] rounded-md'>0</div>
                                </div>
                            </div>
                            <div className='pt-1'>
                                <div className='text-white text-[.8rem] md:text-[.9rem]'>Winner</div>
                                <div className='flex items-center justify-between pt-2'>
                                    <div className='w-[38%] bg-[#1A1A1A] relative p-2 rounded-md flex items-center justify-between'>
                                        <div className='text-white text-opacity-60'>1</div>
                                        <div className='text-white text-[.8rem] md:text-[.9rem]'>1.9</div>
                                        <svg width="8" height="8" className='absolute top-0 right-0' viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5 0.704895H1.20711C0.761654 0.704895 0.53857 1.24346 0.853552 1.55845L7.14645 7.85134C7.46143 8.16632 8 7.94324 8 7.49779V3.7049C8 2.04804 6.65685 0.704895 5 0.704895Z" fill="#82FF60" />
                                        </svg>
                                    </div>
                                    <div className='w-[38%] bg-[#1A1A1A] relative p-2 rounded-md flex items-center justify-between'>
                                        <div className='text-white text-opacity-60'>2</div>
                                        <div className='text-white text-[.8rem] md:text-[.9rem]'>1.8</div>
                                        <svg width="8" height="8" className='absolute bottom-0 right-0' viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5 7.7049H1.20711C0.761654 7.7049 0.53857 7.16633 0.853552 6.85134L7.14645 0.558448C7.46143 0.243466 8 0.466549 8 0.912002V4.7049C8 6.36175 6.65685 7.7049 5 7.7049Z" fill="#FF6060" />
                                        </svg>
                                    </div>
                                    <div onClick={()=>handelopen(ind)} className='w-[18%] bg-[#1A1A1A] relative p-2 cursor-pointer rounded-md flex items-center justify-between'>
                                        <div className='text-white text-opacity-60 mx-auto'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6" /></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {<div className={`${index.includes(ind)? 'space-y-2 max-h-[500px] transition-all duration-300 ease-in-out overflow-hidden' : 'max-h-0 transition-all duration-300 ease-in-out overflow-hidden'}`}>
                                <div className='pt-4'>
                                    <div className='text-white text-[.8rem] md:text-[.9rem]'>Point handicap</div>
                                    <div className='flex items-center justify-between pt-2'>
                                        <div className='w-[49%] bg-[#0A053B] relative p-2 rounded-md flex items-center justify-between'>
                                            <div className='text-white text-[.7rem] text-opacity-40 overflow-hidden text-overflow-ellipsis whitespace-nowrap max-w-[80%] fade-text'>
                                                <div className='relative z-10'>{`(1.4) Alfonso, Switzerland`}</div> {/* Text with shadow */}
                                            </div>
                                            <div className='text-white text-[.9rem]'>1.9</div>
                                            <svg width="8" height="8" className='absolute top-0 right-0' viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5 0.704895H1.20711C0.761654 0.704895 0.53857 1.24346 0.853552 1.55845L7.14645 7.85134C7.46143 8.16632 8 7.94324 8 7.49779V3.7049C8 2.04804 6.65685 0.704895 5 0.704895Z" fill="#82FF60" />
                                            </svg>
                                        </div>
                                        <div className='w-[49%] bg-[#0A053B] relative p-2 rounded-md flex items-center justify-between'>
                                            <div className='text-white text-[.7rem] text-opacity-40 overflow-hidden text-overflow-ellipsis whitespace-nowrap max-w-[80%] fade-text'>
                                                <div className='relative z-10'>{`(-1.5) Zain,Algeria`}</div>
                                            </div>
                                            <div className='text-white text-[.9rem]'>1.8</div>
                                            <svg width="8" height="8" className='absolute bottom-0 right-0' viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5 7.7049H1.20711C0.761654 7.7049 0.53857 7.16633 0.853552 6.85134L7.14645 0.558448C7.46143 0.243466 8 0.466549 8 0.912002V4.7049C8 6.36175 6.65685 7.7049 5 7.7049Z" fill="#FF6060" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className='pt-2'>
                                    <div className='text-white text-[.8rem] md:text-[.9rem]'>Total point</div>
                                    <div className='flex items-center justify-between pt-2'>
                                        <div className='w-[49%] bg-[#0A053B] relative p-2 rounded-md flex items-center justify-between'>
                                            <div className='text-white text-[.7rem] text-opacity-40 overflow-hidden text-overflow-ellipsis whitespace-nowrap max-w-[80%] fade-text'>
                                                <div className='relative z-10'>{`over 80.5`}</div> {/* Text with shadow */}
                                            </div>
                                            <div className='text-white text-[.8rem] md:text-[.9rem]'>2.9</div>
                                            <svg width="8" height="8" className='absolute top-0 right-0' viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5 0.704895H1.20711C0.761654 0.704895 0.53857 1.24346 0.853552 1.55845L7.14645 7.85134C7.46143 8.16632 8 7.94324 8 7.49779V3.7049C8 2.04804 6.65685 0.704895 5 0.704895Z" fill="#82FF60" />
                                            </svg>
                                        </div>
                                        <div className='w-[49%] bg-[#0A053B] relative p-2 rounded-md flex items-center justify-between'>
                                            <div className='text-white text-[.7rem] text-opacity-40 overflow-hidden text-overflow-ellipsis whitespace-nowrap max-w-[80%] fade-text'>
                                                <div className='relative z-10'>{`under 80.5`}</div>
                                            </div>
                                            <div className='text-white text-[.8rem] md:text-[.9rem]'>1.8</div>
                                            <svg width="8" height="8" className='absolute bottom-0 right-0' viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5 7.7049H1.20711C0.761654 7.7049 0.53857 7.16633 0.853552 6.85134L7.14645 0.558448C7.46143 0.243466 8 0.466549 8 0.912002V4.7049C8 6.36175 6.65685 7.7049 5 7.7049Z" fill="#FF6060" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default BetCard