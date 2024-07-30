'use client'
import Image from 'next/image';
import React, { useState } from 'react';

const Sidebar = () => {
  const [index, setIndex] = useState<number[]>([1]);
  const [toggle, setToggle] = useState(false)
  const handeltoggle = () => {
    setToggle(!toggle)
  }
  const handelopen = (ind: number) => {
    setIndex(prevIndices => {
      if (prevIndices.includes(ind)) {
        return prevIndices.filter(i => i !== ind);
      } else {
        return [...prevIndices, ind];
      }
    });
  };
  const sidebar = [
    {
      id: 1,
      title: 'My Bets',
      subTitle: []
    },
    {
      id: 2,
      title: 'Events',
      subTitle: [
        {
          icon: <svg className='my-svg-icon w-[2.2rem]' viewBox="0 0 33 30" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_i_1_808)">
              <path d="M10.782 21.6867C10.6206 21.6867 10.4583 21.6473 10.3104 21.5632C10.1673 21.4808 10.0484 21.3622 9.96568 21.2194C9.8829 21.0766 9.83913 20.9145 9.83876 20.7495V14.0933C9.83947 13.9288 9.88327 13.7673 9.96581 13.625C10.0483 13.4827 10.1667 13.3645 10.3092 13.2822C10.4516 13.1998 10.6131 13.1563 10.7776 13.1558C10.9422 13.1554 11.1039 13.198 11.2468 13.2796L17.0111 16.6076C17.3019 16.7758 17.4827 17.0851 17.4827 17.4214C17.4827 17.7576 17.3019 18.0678 17.0119 18.2359L11.2468 21.5632C11.1048 21.6413 10.9434 21.6867 10.782 21.6867ZM21.4824 19.4053H26.1227C24.8887 25.5638 19.3892 30.1453 12.8945 29.9965C5.61203 29.8351 -0.158097 23.7926 0.00330514 16.5102C0.157969 9.40255 5.91636 3.7476 12.9592 3.63159L16.3008 3.61898L13.1853 8.12311C8.48114 8.12311 4.60414 11.8833 4.50157 16.6136C4.3906 21.4085 8.19699 25.3898 12.9979 25.4923C16.9598 25.5831 20.3585 23.0041 21.4824 19.4053ZM22.0515 15.9806C21.9153 14.3291 21.4052 12.7303 20.5599 11.3051C19.7147 9.87989 18.5563 8.66559 17.1725 7.75409L18.5099 6.0745C21.7027 8.24586 23.8732 11.7992 24.1901 15.8318L22.0515 15.9806ZM26.4329 15.4955C26.09 11.0502 23.7185 7.1337 20.2164 4.71014L21.5539 3.03055C25.5082 5.8223 28.184 10.2877 28.5715 15.3476L26.4329 15.4955ZM30.6462 14.7658C30.2385 9.39585 27.4148 4.65888 23.2276 1.68046L24.565 0C29.2121 3.34744 32.3326 8.63333 32.7848 14.617L30.6462 14.7658Z" />
            </g>
            <defs>
              <filter id="filter0_i_1_808" x="0" y="0" width="32.7848" height="32" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="2" />
                <feGaussianBlur stdDeviation="1" />
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1_808" />
              </filter>
              <linearGradient id="paint0_linear_1_808" x1="16.4612" y1="30.0017" x2="16.4612" y2="0" gradientUnits="userSpaceOnUse">
                <stop stop-color="#D6A250" />
                <stop offset="0.502921" stop-color="#FFE500" />
                <stop offset="1" stop-color="#ECB800" />
              </linearGradient>
            </defs>
          </svg>,
          text: 'Live Events'
        },
        {
          icon: <svg className='my-svg-icon w-[2.2rem]' viewBox="0 0 38 39" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_1_811)">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M16.378 17.6217C17.0584 17.6217 17.615 17.065 17.615 16.3847V5.24365C17.615 4.5633 17.0584 4.00665 16.378 4.00665H5.237C4.55664 4.00665 4 4.5633 4 5.24365V16.3847C4 17.065 4.55664 17.6217 5.237 17.6217H16.378ZM16.378 34.1167C17.0584 34.1167 17.615 33.5601 17.615 32.8797V21.7387C17.615 21.0583 17.0584 20.5017 16.378 20.5017H5.237C4.55664 20.5017 4 21.0583 4 21.7387V32.8797C4 33.5601 4.55664 34.1167 5.237 34.1167H16.378ZM21.2596 11.6888C20.7786 11.2078 20.7786 10.4206 21.2596 9.93949L26.3178 4.88135C26.7988 4.40029 27.5861 4.40029 28.0671 4.88135L33.1253 9.93949C33.6064 10.4206 33.6064 11.2077 33.1253 11.6888L28.0671 16.747C27.5861 17.228 26.7988 17.228 26.3178 16.747L21.2596 11.6888ZM32.378 33.6217C33.0583 33.6217 33.615 33.065 33.615 32.3847V21.2437C33.615 20.5633 33.0583 20.0067 32.378 20.0067H21.237C20.5566 20.0067 20 20.5633 20 21.2437V32.3847C20 33.065 20.5566 33.6217 21.237 33.6217H32.378Z" />
            </g>
            <defs>
              <filter id="filter0_d_1_811" x="0" y="0.00665283" width="37.615" height="38.11" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_811" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_811" result="shape" />
              </filter>
              <linearGradient id="paint0_linear_1_811" x1="18.8075" y1="4.00665" x2="18.8075" y2="34.1167" gradientUnits="userSpaceOnUse">
                <stop stop-color="#D9D9D9" />
                <stop offset="1" stop-color="#5F6368" />
              </linearGradient>
            </defs>
          </svg>
          ,
          text: 'All'
        },
        {
          icon: <svg className='my-svg-icon w-[2.6rem]' viewBox="0 0 38 37" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_1_818)">
              <path d="M29.7638 11.8864C29.7638 11.5668 29.8586 11.2543 30.0362 10.9885C30.2138 10.7227 30.4662 10.5155 30.7615 10.3932C31.0569 10.2708 31.3818 10.2388 31.6954 10.3012C32.0089 10.3636 32.2969 10.5175 32.5229 10.7435C32.749 10.9696 32.9029 11.2576 32.9653 11.5711C33.0276 11.8846 32.9956 12.2096 32.8733 12.505C32.751 12.8003 32.5438 13.0527 32.278 13.2303C32.0122 13.4079 31.6997 13.5027 31.3801 13.5027C30.9514 13.5027 30.5403 13.3324 30.2372 13.0293C29.9341 12.7262 29.7638 12.3151 29.7638 11.8864ZM28.1475 8.65386C28.4672 8.65386 28.7796 8.55907 29.0454 8.38147C29.3112 8.20387 29.5184 7.95144 29.6407 7.6561C29.7631 7.36076 29.7951 7.03578 29.7327 6.72225C29.6703 6.40872 29.5164 6.12073 29.2904 5.89469C29.0643 5.66865 28.7763 5.51471 28.4628 5.45235C28.1493 5.38998 27.8243 5.42199 27.529 5.54432C27.2336 5.66665 26.9812 5.87382 26.8036 6.13961C26.626 6.40541 26.5312 6.7179 26.5312 7.03757C26.5312 7.46624 26.7015 7.87735 27.0046 8.18046C27.3077 8.48357 27.7188 8.65386 28.1475 8.65386ZM32.0077 16.1965C31.723 16.173 31.4407 16.2636 31.2227 16.4482C31.0047 16.6328 30.869 16.8964 30.8453 17.1811C30.6525 19.4337 29.8203 21.5845 28.4466 23.3802C27.0729 25.1759 25.2149 26.5419 23.0913 27.3175C20.9676 28.0931 18.6665 28.246 16.4589 27.7582C14.2513 27.2704 12.2289 26.1622 10.6297 24.564C9.03053 22.9658 7.92107 20.9442 7.43189 18.7368C6.94272 16.5295 7.09416 14.2284 7.86841 12.1042C8.64266 9.98004 10.0075 8.12119 11.8024 6.74639C13.5972 5.37158 15.7474 4.53802 17.9999 4.34377C18.1414 4.33209 18.2792 4.29266 18.4055 4.22773C18.5318 4.16279 18.644 4.07362 18.7358 3.96531C18.8276 3.857 18.8972 3.73166 18.9405 3.59646C18.9839 3.46127 19.0002 3.31885 18.9885 3.17735C18.9769 3.03584 18.9374 2.89803 18.8725 2.77176C18.8076 2.6455 18.7184 2.53326 18.6101 2.44146C18.5018 2.34966 18.3764 2.28009 18.2412 2.23672C18.106 2.19336 17.9636 2.17705 17.8221 2.18872C15.1607 2.41765 12.62 3.40193 10.4989 5.02578C8.37787 6.64963 6.76472 8.84547 5.84926 11.355C4.9338 13.8645 4.7541 16.5833 5.33132 19.1914C5.90854 21.7996 7.21865 24.1887 9.10753 26.0775C10.9964 27.9664 13.3855 29.2765 15.9936 29.8537C18.6018 30.431 21.3206 30.2513 23.8301 29.3358C26.3396 28.4203 28.5354 26.8072 30.1593 24.6861C31.7831 22.5651 32.7674 20.0244 32.9963 17.3629C33.0085 17.2213 32.9925 17.0787 32.9494 16.9433C32.9062 16.8079 32.8367 16.6824 32.7448 16.574C32.6529 16.4656 32.5404 16.3764 32.4139 16.3116C32.2874 16.2468 32.1494 16.2077 32.0077 16.1965ZM18.9885 6.49881C20.9066 6.49881 22.7815 7.06757 24.3763 8.13317C25.9711 9.19877 27.2141 10.7133 27.9481 12.4854C28.682 14.2574 28.8741 16.2073 28.4999 18.0885C28.1257 19.9696 27.2021 21.6976 25.8459 23.0538C24.4896 24.4101 22.7616 25.3337 20.8805 25.7079C18.9993 26.0821 17.0494 25.89 15.2774 25.156C13.5054 24.422 11.9908 23.1791 10.9252 21.5843C9.85959 19.9895 9.29083 18.1145 9.29083 16.1965C9.29368 13.6254 10.3163 11.1604 12.1344 9.34236C13.9524 7.5243 16.4174 6.50166 18.9885 6.49881ZM17.911 16.1965C17.911 16.4823 18.0245 16.7564 18.2266 16.9584C18.4287 17.1605 18.7028 17.274 18.9885 17.274H25.4537C25.7395 17.274 26.0135 17.1605 26.2156 16.9584C26.4177 16.7564 26.5312 16.4823 26.5312 16.1965C26.5312 15.9107 26.4177 15.6367 26.2156 15.4346C26.0135 15.2325 25.7395 15.119 25.4537 15.119H20.0661V9.73138C20.0661 9.44561 19.9525 9.17153 19.7505 8.96946C19.5484 8.76738 19.2743 8.65386 18.9885 8.65386C18.7028 8.65386 18.4287 8.76738 18.2266 8.96946C18.0245 9.17153 17.911 9.44561 17.911 9.73138V16.1965ZM23.2986 5.42129C23.6183 5.42129 23.9308 5.3265 24.1966 5.1489C24.4624 4.9713 24.6695 4.71887 24.7919 4.42353C24.9142 4.12819 24.9462 3.80321 24.8839 3.48968C24.8215 3.17615 24.6676 2.88816 24.4415 2.66212C24.2155 2.43608 23.9275 2.28214 23.614 2.21978C23.3004 2.15741 22.9754 2.18942 22.6801 2.31175C22.3848 2.43408 22.1323 2.64125 21.9547 2.90704C21.7771 3.17284 21.6823 3.48533 21.6823 3.805C21.6823 4.23367 21.8526 4.64478 22.1557 4.94789C22.4589 5.251 22.87 5.42129 23.2986 5.42129Z" />
            </g>
            <defs>
              <filter id="filter0_d_1_818" x="0.689908" y="0.0300124" width="36.6205" height="36.6202" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="2.15505" />
                <feGaussianBlur stdDeviation="2.15505" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_818" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_818" result="shape" />
              </filter>
              <linearGradient id="paint0_linear_1_818" x1="19.0001" y1="2.18506" x2="19.0001" y2="30.1851" gradientUnits="userSpaceOnUse">
                <stop stop-color="#D9D9D9" />
                <stop offset="1" stop-color="#5F6368" />
              </linearGradient>
            </defs>
          </svg>,
          text: 'Upcoming'
        }
      ]
    },
    {
      id: 3,
      title: 'Live Now',
      subTitle: [
        {
          icon: <svg className='my-svg-icon w-[2.2rem]' viewBox="0 0 33 30" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_i_1_808)">
              <path d="M10.782 21.6867C10.6206 21.6867 10.4583 21.6473 10.3104 21.5632C10.1673 21.4808 10.0484 21.3622 9.96568 21.2194C9.8829 21.0766 9.83913 20.9145 9.83876 20.7495V14.0933C9.83947 13.9288 9.88327 13.7673 9.96581 13.625C10.0483 13.4827 10.1667 13.3645 10.3092 13.2822C10.4516 13.1998 10.6131 13.1563 10.7776 13.1558C10.9422 13.1554 11.1039 13.198 11.2468 13.2796L17.0111 16.6076C17.3019 16.7758 17.4827 17.0851 17.4827 17.4214C17.4827 17.7576 17.3019 18.0678 17.0119 18.2359L11.2468 21.5632C11.1048 21.6413 10.9434 21.6867 10.782 21.6867ZM21.4824 19.4053H26.1227C24.8887 25.5638 19.3892 30.1453 12.8945 29.9965C5.61203 29.8351 -0.158097 23.7926 0.00330514 16.5102C0.157969 9.40255 5.91636 3.7476 12.9592 3.63159L16.3008 3.61898L13.1853 8.12311C8.48114 8.12311 4.60414 11.8833 4.50157 16.6136C4.3906 21.4085 8.19699 25.3898 12.9979 25.4923C16.9598 25.5831 20.3585 23.0041 21.4824 19.4053ZM22.0515 15.9806C21.9153 14.3291 21.4052 12.7303 20.5599 11.3051C19.7147 9.87989 18.5563 8.66559 17.1725 7.75409L18.5099 6.0745C21.7027 8.24586 23.8732 11.7992 24.1901 15.8318L22.0515 15.9806ZM26.4329 15.4955C26.09 11.0502 23.7185 7.1337 20.2164 4.71014L21.5539 3.03055C25.5082 5.8223 28.184 10.2877 28.5715 15.3476L26.4329 15.4955ZM30.6462 14.7658C30.2385 9.39585 27.4148 4.65888 23.2276 1.68046L24.565 0C29.2121 3.34744 32.3326 8.63333 32.7848 14.617L30.6462 14.7658Z" />
            </g>
            <defs>
              <filter id="filter0_i_1_808" x="0" y="0" width="32.7848" height="32" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="2" />
                <feGaussianBlur stdDeviation="1" />
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1_808" />
              </filter>
              <linearGradient id="paint0_linear_1_808" x1="16.4612" y1="30.0017" x2="16.4612" y2="0" gradientUnits="userSpaceOnUse">
                <stop stop-color="#D6A250" />
                <stop offset="0.502921" stop-color="#FFE500" />
                <stop offset="1" stop-color="#ECB800" />
              </linearGradient>
            </defs>
          </svg>,
          text: 'Live Betting'
        },
        {
          icon: <svg className='my-svg-icon w-[2.2rem]' viewBox="0 0 38 39" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_1_811)">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M16.378 17.6217C17.0584 17.6217 17.615 17.065 17.615 16.3847V5.24365C17.615 4.5633 17.0584 4.00665 16.378 4.00665H5.237C4.55664 4.00665 4 4.5633 4 5.24365V16.3847C4 17.065 4.55664 17.6217 5.237 17.6217H16.378ZM16.378 34.1167C17.0584 34.1167 17.615 33.5601 17.615 32.8797V21.7387C17.615 21.0583 17.0584 20.5017 16.378 20.5017H5.237C4.55664 20.5017 4 21.0583 4 21.7387V32.8797C4 33.5601 4.55664 34.1167 5.237 34.1167H16.378ZM21.2596 11.6888C20.7786 11.2078 20.7786 10.4206 21.2596 9.93949L26.3178 4.88135C26.7988 4.40029 27.5861 4.40029 28.0671 4.88135L33.1253 9.93949C33.6064 10.4206 33.6064 11.2077 33.1253 11.6888L28.0671 16.747C27.5861 17.228 26.7988 17.228 26.3178 16.747L21.2596 11.6888ZM32.378 33.6217C33.0583 33.6217 33.615 33.065 33.615 32.3847V21.2437C33.615 20.5633 33.0583 20.0067 32.378 20.0067H21.237C20.5566 20.0067 20 20.5633 20 21.2437V32.3847C20 33.065 20.5566 33.6217 21.237 33.6217H32.378Z" />
            </g>
            <defs>
              <filter id="filter0_d_1_811" x="0" y="0.00665283" width="37.615" height="38.11" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_811" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_811" result="shape" />
              </filter>
              <linearGradient id="paint0_linear_1_811" x1="18.8075" y1="4.00665" x2="18.8075" y2="34.1167" gradientUnits="userSpaceOnUse">
                <stop stop-color="#D9D9D9" />
                <stop offset="1" stop-color="#5F6368" />
              </linearGradient>
            </defs>
          </svg>
          ,
          text: 'All games'
        },
        {
          icon: <svg className='my-svg-icon w-[2.2rem]' viewBox="0 0 38 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_1_878)">
              <path d="M25.8181 4.01291C22.971 4.01291 20.4655 5.45817 19 7.64849C17.5345 5.45817 15.029 4.01291 12.1819 4.01291C7.66342 4.01291 4 7.6488 4 12.1333C4 21.6068 14.9091 26.3438 19 29.7272C23.0909 26.3438 34 21.6068 34 12.1333C34 7.6488 30.3366 4.01291 25.8181 4.01291Z" />
            </g>
            <defs>
              <filter id="filter0_d_1_878" x="0.571425" y="0.584334" width="36.8571" height="32.5715" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset />
                <feGaussianBlur stdDeviation="1.71429" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_878" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_878" result="shape" />
              </filter>
              <linearGradient id="paint0_linear_1_878" x1="19" y1="4.01291" x2="19" y2="29.7272" gradientUnits="userSpaceOnUse">
                <stop stop-color="#D9D9D9" />
                <stop offset="1" stop-color="#5F6368" />
              </linearGradient>
            </defs>
          </svg>,
          text: 'Favorite'
        },
        {
          icon: <svg viewBox="0 0 30 31" className='my-svg-icon w-[2.2rem]' fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M29.1495 9.48405C29.032 9.48239 28.9155 9.50538 28.8075 9.55155L16.9155 15.7181H16.908C16.3995 16.033 16.071 16.555 16.071 17.152V29.6005C16.071 30.028 16.446 30.37 16.9215 30.37C17.0635 30.3707 17.2037 30.3384 17.331 30.2755C17.343 30.2695 17.3565 30.2635 17.364 30.256L29.0625 24.049L29.082 24.0415C29.631 23.7415 30 23.191 30 22.5625V10.2536C30 9.82605 29.6175 9.48405 29.1495 9.48405ZM28.2795 6.16305L16.11 0.691056C16.11 0.691056 15.3945 0.370056 15 0.370056C14.6055 0.370056 13.8945 0.691056 13.8945 0.691056L1.7145 6.16305C1.7145 6.16305 1.179 6.38355 1.179 6.79905C1.179 7.24005 1.734 7.56855 1.734 7.56855L14.1555 14.1175C14.4105 14.2315 14.6985 14.2915 15 14.2915C15.3075 14.2915 15.5955 14.2255 15.8505 14.1116L28.266 7.55655C28.266 7.55655 28.7685 7.28655 28.7685 6.78555C28.7745 6.36405 28.2795 6.16305 28.2795 6.16305ZM13.092 15.7181L1.1925 9.54405C1.0837 9.50044 0.96771 9.47754 0.850499 9.47655C0.381 9.47655 0 9.81855 0 10.2476V22.555C0 23.185 0.369 23.734 0.918 24.0355L0.931499 24.0415L12.63 30.25C12.7647 30.3253 12.9167 30.3641 13.071 30.3625C13.5405 30.3625 13.9215 30.0145 13.9215 29.593V17.152C13.929 16.555 13.593 16.0271 13.092 15.7181Z" />
            <defs>
              <linearGradient id="paint0_linear_1_881" x1="15" y1="0.370056" x2="15" y2="30.3701" gradientUnits="userSpaceOnUse">
                <stop stop-color="#D9D9D9" />
                <stop offset="1" stop-color="#5F6368" />
              </linearGradient>
            </defs>
          </svg>
          ,
          text: 'Others'
        },
      ]
    },
    {
      id: 4,
      title: 'Popular',
      subTitle: [
        {
          icon: <svg className='my-svg-icon w-[2.2rem]' viewBox="0 0 38 39" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_1_811)">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M16.378 17.6217C17.0584 17.6217 17.615 17.065 17.615 16.3847V5.24365C17.615 4.5633 17.0584 4.00665 16.378 4.00665H5.237C4.55664 4.00665 4 4.5633 4 5.24365V16.3847C4 17.065 4.55664 17.6217 5.237 17.6217H16.378ZM16.378 34.1167C17.0584 34.1167 17.615 33.5601 17.615 32.8797V21.7387C17.615 21.0583 17.0584 20.5017 16.378 20.5017H5.237C4.55664 20.5017 4 21.0583 4 21.7387V32.8797C4 33.5601 4.55664 34.1167 5.237 34.1167H16.378ZM21.2596 11.6888C20.7786 11.2078 20.7786 10.4206 21.2596 9.93949L26.3178 4.88135C26.7988 4.40029 27.5861 4.40029 28.0671 4.88135L33.1253 9.93949C33.6064 10.4206 33.6064 11.2077 33.1253 11.6888L28.0671 16.747C27.5861 17.228 26.7988 17.228 26.3178 16.747L21.2596 11.6888ZM32.378 33.6217C33.0583 33.6217 33.615 33.065 33.615 32.3847V21.2437C33.615 20.5633 33.0583 20.0067 32.378 20.0067H21.237C20.5566 20.0067 20 20.5633 20 21.2437V32.3847C20 33.065 20.5566 33.6217 21.237 33.6217H32.378Z" />
            </g>
            <defs>
              <filter id="filter0_d_1_811" x="0" y="0.00665283" width="37.615" height="38.11" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_811" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_811" result="shape" />
              </filter>
              <linearGradient id="paint0_linear_1_811" x1="18.8075" y1="4.00665" x2="18.8075" y2="34.1167" gradientUnits="userSpaceOnUse">
                <stop stop-color="#D9D9D9" />
                <stop offset="1" stop-color="#5F6368" />
              </linearGradient>
            </defs>
          </svg>
          ,
          text: 'All games'
        },
        {
          icon: <svg className='my-svg-icon w-[2.2rem]' viewBox="0 0 38 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_1_878)">
              <path d="M25.8181 4.01291C22.971 4.01291 20.4655 5.45817 19 7.64849C17.5345 5.45817 15.029 4.01291 12.1819 4.01291C7.66342 4.01291 4 7.6488 4 12.1333C4 21.6068 14.9091 26.3438 19 29.7272C23.0909 26.3438 34 21.6068 34 12.1333C34 7.6488 30.3366 4.01291 25.8181 4.01291Z" />
            </g>
            <defs>
              <filter id="filter0_d_1_878" x="0.571425" y="0.584334" width="36.8571" height="32.5715" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset />
                <feGaussianBlur stdDeviation="1.71429" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_878" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_878" result="shape" />
              </filter>
              <linearGradient id="paint0_linear_1_878" x1="19" y1="4.01291" x2="19" y2="29.7272" gradientUnits="userSpaceOnUse">
                <stop stop-color="#D9D9D9" />
                <stop offset="1" stop-color="#5F6368" />
              </linearGradient>
            </defs>
          </svg>,
          text: 'Favorite'
        },
        {
          icon: <svg viewBox="0 0 30 31" className='my-svg-icon w-[2.2rem]' fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M29.1495 9.48405C29.032 9.48239 28.9155 9.50538 28.8075 9.55155L16.9155 15.7181H16.908C16.3995 16.033 16.071 16.555 16.071 17.152V29.6005C16.071 30.028 16.446 30.37 16.9215 30.37C17.0635 30.3707 17.2037 30.3384 17.331 30.2755C17.343 30.2695 17.3565 30.2635 17.364 30.256L29.0625 24.049L29.082 24.0415C29.631 23.7415 30 23.191 30 22.5625V10.2536C30 9.82605 29.6175 9.48405 29.1495 9.48405ZM28.2795 6.16305L16.11 0.691056C16.11 0.691056 15.3945 0.370056 15 0.370056C14.6055 0.370056 13.8945 0.691056 13.8945 0.691056L1.7145 6.16305C1.7145 6.16305 1.179 6.38355 1.179 6.79905C1.179 7.24005 1.734 7.56855 1.734 7.56855L14.1555 14.1175C14.4105 14.2315 14.6985 14.2915 15 14.2915C15.3075 14.2915 15.5955 14.2255 15.8505 14.1116L28.266 7.55655C28.266 7.55655 28.7685 7.28655 28.7685 6.78555C28.7745 6.36405 28.2795 6.16305 28.2795 6.16305ZM13.092 15.7181L1.1925 9.54405C1.0837 9.50044 0.96771 9.47754 0.850499 9.47655C0.381 9.47655 0 9.81855 0 10.2476V22.555C0 23.185 0.369 23.734 0.918 24.0355L0.931499 24.0415L12.63 30.25C12.7647 30.3253 12.9167 30.3641 13.071 30.3625C13.5405 30.3625 13.9215 30.0145 13.9215 29.593V17.152C13.929 16.555 13.593 16.0271 13.092 15.7181Z" />
            <defs>
              <linearGradient id="paint0_linear_1_881" x1="15" y1="0.370056" x2="15" y2="30.3701" gradientUnits="userSpaceOnUse">
                <stop stop-color="#D9D9D9" />
                <stop offset="1" stop-color="#5F6368" />
              </linearGradient>
            </defs>
          </svg>
          ,
          text: 'Others'
        },
        {
          icon: <svg className='my-svg-icon w-[2.6rem]' viewBox="0 0 33 30" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_i_1_808)">
              <path d="M10.782 21.6867C10.6206 21.6867 10.4583 21.6473 10.3104 21.5632C10.1673 21.4808 10.0484 21.3622 9.96568 21.2194C9.8829 21.0766 9.83913 20.9145 9.83876 20.7495V14.0933C9.83947 13.9288 9.88327 13.7673 9.96581 13.625C10.0483 13.4827 10.1667 13.3645 10.3092 13.2822C10.4516 13.1998 10.6131 13.1563 10.7776 13.1558C10.9422 13.1554 11.1039 13.198 11.2468 13.2796L17.0111 16.6076C17.3019 16.7758 17.4827 17.0851 17.4827 17.4214C17.4827 17.7576 17.3019 18.0678 17.0119 18.2359L11.2468 21.5632C11.1048 21.6413 10.9434 21.6867 10.782 21.6867ZM21.4824 19.4053H26.1227C24.8887 25.5638 19.3892 30.1453 12.8945 29.9965C5.61203 29.8351 -0.158097 23.7926 0.00330514 16.5102C0.157969 9.40255 5.91636 3.7476 12.9592 3.63159L16.3008 3.61898L13.1853 8.12311C8.48114 8.12311 4.60414 11.8833 4.50157 16.6136C4.3906 21.4085 8.19699 25.3898 12.9979 25.4923C16.9598 25.5831 20.3585 23.0041 21.4824 19.4053ZM22.0515 15.9806C21.9153 14.3291 21.4052 12.7303 20.5599 11.3051C19.7147 9.87989 18.5563 8.66559 17.1725 7.75409L18.5099 6.0745C21.7027 8.24586 23.8732 11.7992 24.1901 15.8318L22.0515 15.9806ZM26.4329 15.4955C26.09 11.0502 23.7185 7.1337 20.2164 4.71014L21.5539 3.03055C25.5082 5.8223 28.184 10.2877 28.5715 15.3476L26.4329 15.4955ZM30.6462 14.7658C30.2385 9.39585 27.4148 4.65888 23.2276 1.68046L24.565 0C29.2121 3.34744 32.3326 8.63333 32.7848 14.617L30.6462 14.7658Z" />
            </g>
            <defs>
              <filter id="filter0_i_1_808" x="0" y="0" width="32.7848" height="32" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="2" />
                <feGaussianBlur stdDeviation="1" />
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1_808" />
              </filter>
              <linearGradient id="paint0_linear_1_808" x1="16.4612" y1="30.0017" x2="16.4612" y2="0" gradientUnits="userSpaceOnUse">
                <stop stop-color="#D6A250" />
                <stop offset="0.502921" stop-color="#FFE500" />
                <stop offset="1" stop-color="#ECB800" />
              </linearGradient>
            </defs>
          </svg>,
          text: 'Live Betting'
        }
      ]
    }
  ]

  return (
    <div className='lg:col-span-3 xl:col-span-2'>
      <div className={`absolute left-5 top-4 lg:hidden cursor-pointer text-white ${toggle ? 'hidden' : 'block'}`} onClick={handeltoggle}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide w-[26px] md:w-[30px] lucide-align-left"><line x1="21" x2="3" y1="6" y2="6" /><line x1="15" x2="3" y1="12" y2="12" /><line x1="17" x2="3" y1="18" y2="18" /></svg></div>
      <div className={`${toggle ? 'transition-all left-0' : 'transition-all left-[-200%]'} text-white  z-50 lg:z-0  bg-primary h-screen overflow-y-scroll fixed lg:top-[-0px] lg:sticky w-[60%] md:w-[30%] lg:w-auto col-span-2 p-[1rem] md:p-[1rem]`}>
        <div className={`absolute left-3 top-2 lg:hidden cursor-pointer text-white text-opacity-60 ${toggle ? 'block' : 'hidden'}`} onClick={handeltoggle}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-x  w-[24px] md:w-[30px]"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg></div>
        <div>
          <Image src="/assets/image/Logo.png" height={500} width={500} quality={100} className='w-[100px] md:w-[120px] lg:w-[170px] mx-auto' alt="logo" />
        </div>
        <div className='py-[1rem] space-y-[1rem]'>
          {
            sidebar?.map((item, ind) => (
              <div key={ind} className={`bg-[#202124] px-[.5rem] rounded-[.5rem] ${index.includes(ind)?'pb-[1rem]':'pb-[.4rem]'} pt-[.4rem]`}>
                <div onClick={() => handelopen(ind)} className='flex items-center cursor-pointer py-[.2rem] md:py-2 justify-between '>
                  <div className='text-[.9rem] md:text-[1rem] uppercase'>{item.title}</div>
                  <svg xmlns="http://www.w3.org/2000/svg"  width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className={`lucide border-white border-opacity-50 ${index.includes(ind)?'rotate-180':''} transition-all md:w-[23px] md:h-[23px] bg-black rounded-md border-[.2px] lucide-chevron-down`}><path d="m6 9 6 6 6-6"/></svg>
                </div>
                {item?.subTitle?.length > 0 && <div className={`${index.includes(ind) ? 'space-y-2 max-h-[500px] transition-all duration-300 ease-in-out overflow-hidden' : 'max-h-0 transition-all duration-300 ease-in-out overflow-hidden'}`} style={{ opacity: index.includes(ind) ? 1 : 0 }}>
                  {item?.subTitle?.map((subitem, subind) => (
                    index.includes(ind) && <div key={subind} className='from-[#D6A250] shadow-inner via-[#FFE500] parant to-[#ECB800] hover:bg-gradient-to-r transition-all cursor-pointer rounded-[.5rem] p-[2px]'>
                      <div className='bg-[#2E3134] flex items-center justify-normal px-[.6rem] py-[.5rem] rounded-[.5rem]'>
                        {subitem.icon}
                        <svg className='w-[1.8rem]' viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <linearGradient id="paint0_linear_1_881" x1="15" y1="0.370056" x2="15" y2="30.3701" gradientUnits="userSpaceOnUse">
                              <stop stop-color="#D9D9D9" />
                              <stop offset="1" stop-color="#5F6368" />
                            </linearGradient  >
                          </defs>
                        </svg>
                        <div className='text-[.8rem] md:text-[.9rem] text-start w-[100%]'>{subitem.text}</div>
                      </div>
                    </div>
                  ))}
                </div>}
              </div>
            ))
          }
        </div>
      </div>
      {/* Blur Screen */}
      <div onClick={handeltoggle} className={`${toggle?'block':'hidden'} lg:hidden cursor-pointer transition w-full h-full backdrop-blur-sm z-30 fixed top-0 left-0`}></div>
    </div>
  );
};

export default Sidebar;