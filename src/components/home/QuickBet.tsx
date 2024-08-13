// "use client";
// import { updateCurrentBet } from "@/lib/store/features/bet/betSlice";
// import { useAppSelector } from "@/lib/store/hooks";
// import { placeBet } from "@/utils/actions";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { BetSlipCardProps } from "@/utils/types";

// const QuickBet = () => {
//   const [isBet, setIsBet] = useState(false);
//   const [open, setOpen] = useState(false);
//   const dispatch = useDispatch();

//   const handleBet = () => {
//     setIsBet(!isBet);
//   };

//   const handelOpen = () => {
//     setOpen(!open);
//   };

//   const bets = useAppSelector((state) => state?.bet.bets) as unknown as Array<{
//     data: any;
//     item: any;
//   }>;

//   const betAmount = [50, 100, 200, 500];

//   const handleAmount = (currentAmount: number) => {
//     dispatch(updateCurrentBet({ amount: currentAmount }));
//   };

//   const handleSubmit = async () => {
//     console.log(bets);
//     const betData = {
//       matchId: bets[0].data.matchId,
//       betAmount: bets[0].data.currentBet,
//       betOdds: bets[0].item.odds,
//       teamId: bets[0].item.teamId,
//     };
//     const response = await placeBet(betData);
//     if (response?.error) {
//       return alert(response.error);
//     }
//     alert(response.message);
//   };

//   useEffect(() => {
//     setOpen(true);
//   }, [bets]);

//   return (
//     <div
//       className={`transition-all text-white  ${
//         open ? "bottom-0" : "-bottom-[2rem] md:-bottom-[4rem]"
//       }  fixed  z-[20] mx-[5%] left-0 md:left-auto md:right-20 w-[90%] md:w-[45%] xl:w-[20%]`}
//     >
//       <div
//         onClick={handelOpen}
//         className="from-[#FFC400] rounded-tr-xl md:rounded-tr-3xl md:rounded-tl-3xl rounded-tl-xl cursor-pointer px-4 py-2 md:py-3 to-[#D8890A]  bg-gradient-to-tr"
//       >
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-2 cursor-pointer">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="30"
//               height="40"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               className="lucide md:w-[35px] w-[20px] lucide-square-menu"
//             >
//               <rect width="18" height="18" x="3" y="3" rx="2" />
//               <path d="M7 8h10" />
//               <path d="M7 12h10" />
//               <path d="M7 16h10" />
//             </svg>
//             <div className="text-[.9rem] md:text-[1.1rem]">Betslip</div>
//             <svg
//               width="15"
//               height="10"
//               viewBox="0 0 15 10"
//               className={
//                 open
//                   ? "-rotate-180 transition-all md:w-[25px] w-[10px]"
//                   : " md:w-[25px] w-[10px] transition-all"
//               }
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M14.948 1.33C14.8964 1.2054 14.809 1.09891 14.6969 1.02397C14.5848 0.949029 14.453 0.909017 14.3182 0.908989H0.682328C0.547405 0.908882 0.415483 0.948812 0.303264 1.02372C0.191046 1.09863 0.103576 1.20515 0.0519286 1.3298C0.000281235 1.45444 -0.0132214 1.59161 0.0131301 1.72394C0.0394816 1.85626 0.104502 1.9778 0.199961 2.07315L7.01787 8.89106C7.08119 8.95445 7.15639 9.00474 7.23915 9.03905C7.32192 9.07336 7.41064 9.09102 7.50024 9.09102C7.58984 9.09102 7.67856 9.07336 7.76132 9.03905C7.84409 9.00474 7.91929 8.95445 7.98261 8.89106L14.8005 2.07315C14.8958 1.97775 14.9607 1.85622 14.987 1.72394C15.0132 1.59165 14.9996 1.45456 14.948 1.33Z"
//                 fill="white"
//                 fillOpacity="0.5"
//               />
//             </svg>
//           </div>
//           <div className="flex items-center space-x-3">
//             <div className="text-white text-[.9rem] md:text-[1rem]">
//               QUICK BET
//             </div>
//             <label className="flex items-center scale-75 md:scale-100 cursor-pointer">
//               <div className="relative">
//                 <input
//                   type="checkbox"
//                   id="dark-mode-toggle"
//                   className="sr-only"
//                   checked={isBet}
//                   onChange={handleBet}
//                 />
//                 <div className="block  border border-white dark:bg-gray-600 w-14 h-7 rounded-full">
//                   <svg
//                     width="22"
//                     height="22"
//                     className={`${
//                       isBet ? "translate-x-[1.9rem] transition-all" : "left-1"
//                     } transition-all absolute top-[3px]`}
//                     viewBox="0 0 18 18"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       clipRule="evenodd"
//                       d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18ZM10.5949 1.87115L5.25761 10.2564C5.1561 10.4159 5.31209 10.6141 5.491 10.553L8.85386 9.40407C9.01048 9.35056 9.16061 9.49958 9.10825 9.65659L7.12489 15.6046C7.04829 15.8343 7.36964 15.9771 7.48876 15.7663L12.8284 6.31479C12.9188 6.15473 12.7635 5.96772 12.5896 6.02716L9.21796 7.17909C9.05559 7.23456 8.90334 7.07325 8.96809 6.91435L10.9488 2.05402C11.0408 1.82833 10.7257 1.66556 10.5949 1.87115Z"
//                       fill="#A40508"
//                     />
//                   </svg>
//                 </div>
//               </div>
//             </label>
//           </div>
//         </div>
//       </div>
//       <div
//         className={`bg-[#0E0F11] ${
//           open
//             ? "space-y-2 max-h-[500px] transition-all duration-300 ease-in-out overflow-hidden"
//             : "max-h-0  transition-all duration-300 ease-in-out overflow-hidden"
//         } px-2 md:px-6 py-4 md:py-8`}
//       >
//         {bets?.length <= 0 ? (
//           <>
//             <div className="flex items-center justify-around md:justify-center space-x-5">
//               <Image
//                 alt="betImage"
//                 src={"/assets/image/betimage.png"}
//                 width={300}
//                 height={300}
//                 quality={100}
//                 className="w-[50px] md:w-[60px]"
//               />
//               <div>
//                 <div className="text-white text-[1rem] md:text-[1.2rem] font-semibold">
//                   Place Your Bets
//                 </div>
//                 <div className="text-[.9rem] md:text-[1rem] text-opacity-70">
//                   Your selection will appear in this area
//                 </div>
//               </div>
//             </div>
//             <div className="pt-8 pb-6">
//               <input
//                 type="text"
//                 placeholder="Enter Booking Code"
//                 className="outline-none w-[80%] p-3 rounded-lg bg-[#1C1E22] placeholder:text-white mx-[10%]"
//               />
//             </div>
//             <div className="bg-black w-[90%] mx-auto py-2 border rounded-xl flex justify-center space-x-2 cursor-pointer items-center border-opacity-50 border-gray-200">
//               <svg
//                 width="22"
//                 height="21"
//                 viewBox="0 0 22 21"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M21.5042 8.53205C21.4831 8.42545 21.4393 8.32463 21.3758 8.23645C21.3123 8.14828 21.2305 8.07481 21.1361 8.02104L18.3132 6.4123L18.3019 3.23078C18.3015 3.12121 18.2774 3.01302 18.2312 2.91369C18.1849 2.81435 18.1177 2.72623 18.0341 2.65542C17.0101 1.78926 15.8309 1.12548 14.5592 0.699386C14.4591 0.665489 14.3529 0.652945 14.2476 0.662561C14.1423 0.672177 14.0402 0.703741 13.9479 0.755219L11.1004 2.34692L8.2501 0.75238C8.1577 0.700612 8.05546 0.66881 7.94999 0.65903C7.84453 0.649249 7.73819 0.661708 7.63784 0.695601C6.3669 1.12443 5.189 1.79078 4.16675 2.65921C4.08325 2.72992 4.01607 2.81788 3.96984 2.91704C3.92361 3.01621 3.89942 3.12421 3.89894 3.23362L3.88474 6.41798L1.06188 8.02672C0.967437 8.08049 0.885679 8.15395 0.822159 8.24213C0.758639 8.33031 0.714848 8.43112 0.693761 8.53773C0.435413 9.83597 0.435413 11.1724 0.693761 12.4706C0.714848 12.5772 0.758639 12.6781 0.822159 12.7662C0.885679 12.8544 0.967437 12.9279 1.06188 12.9816L3.88474 14.5904L3.8961 17.7728C3.89644 17.8824 3.92056 17.9906 3.9668 18.0899C4.01304 18.1893 4.08029 18.2774 4.16391 18.3482C5.18789 19.2144 6.36708 19.8781 7.63878 20.3042C7.73893 20.3381 7.84507 20.3507 7.95036 20.3411C8.05565 20.3315 8.15775 20.2999 8.2501 20.2484L11.1004 18.652L13.9507 20.2465C14.0635 20.3094 14.1907 20.342 14.3198 20.3411C14.4025 20.3411 14.4846 20.3277 14.563 20.3014C15.8336 19.8728 17.0114 19.2071 18.0341 18.3397C18.1176 18.269 18.1848 18.181 18.231 18.0819C18.2772 17.9827 18.3014 17.8747 18.3019 17.7653L18.3161 14.5809L21.1389 12.9722C21.2334 12.9184 21.3151 12.8449 21.3787 12.7568C21.4422 12.6686 21.486 12.5678 21.5071 12.4612C21.764 11.164 21.763 9.82888 21.5042 8.53205ZM11.1004 14.2847C10.3518 14.2847 9.61991 14.0627 8.99743 13.6468C8.37494 13.2309 7.88978 12.6397 7.60328 11.948C7.31678 11.2563 7.24182 10.4952 7.38788 9.76098C7.53393 9.02671 7.89444 8.35224 8.42382 7.82286C8.9532 7.29348 9.62767 6.93297 10.3619 6.78691C11.0962 6.64086 11.8573 6.71582 12.549 7.00232C13.2406 7.28881 13.8318 7.77398 14.2477 8.39647C14.6637 9.01895 14.8857 9.75079 14.8857 10.4994C14.8857 11.5034 14.4869 12.4662 13.777 13.176C13.0671 13.8859 12.1043 14.2847 11.1004 14.2847Z"
//                   fill="url(#paint0_radial_40_802)"
//                 />
//                 <defs>
//                   <radialGradient
//                     id="paint0_radial_40_802"
//                     cx="0"
//                     cy="0"
//                     r="1"
//                     gradientUnits="userSpaceOnUse"
//                     gradientTransform="translate(11.144 10.5006) rotate(-87.8539) scale(9.50723 10.8082)"
//                   >
//                     <stop stopColor="#D6A250" />
//                     <stop offset="0.502921" stopColor="#FFE500" />
//                     <stop offset="1" stopColor="#ECB800" />
//                   </radialGradient>
//                 </defs>
//               </svg>
//               <div className="text-white text-[1rem]">Odds Settings</div>
//             </div>
//           </>
//         ) : (
//           <div className="w-full flex flex-col gap-2">
//             {bets?.map((item, index) => (
//               <BetSlipCard
//                 key={index}
//                 matchData={item.data}
//                 betData={item.item}
//               />
//             ))}
//             <div className="w-full flex justify-between gap-2 px-2 py-4">
//               {betAmount.map((item, index) => (
//                 <button
//                   onClick={() => handleAmount(item)}
//                   key={index}
//                   className="rounded-full w-[20%] flex items-center justify-center bg-slate-800 py-2"
//                 >
//                   {item}
//                 </button>
//               ))}
//             </div>
//             <button
//               onClick={handleSubmit}
//               className="w-full py-4 bg-[#5c4b4b41] text-[#FFE500] border-[#FFE500] border-[1px] rounded-md"
//             >
//               Place Bet
//             </button>
//           </div>
//         )}
//       </div>

//       <div
//         onClick={handelOpen}
//         className={`${
//           open ? "block" : "hidden"
//         } cursor-pointer md:hidden transition w-full h-full -z-[2] fixed top-0 left-0`}
//       ></div>
//     </div>
//   );
// };

// const BetSlipCard: React.FC<BetSlipCardProps> = ({ matchData, betData }) => {
//   return (
//     <div className="bg-[#32282892] border-[1px] border-[#dfdfdf34] rounded-md px-4 py-2">
//       <div className="flex gap-2 text-sm font-medium text-[#ffffff]">
//         <Image
//           src={matchData.categoryIcon}
//           alt="game"
//           className="w-[18px] mr-[5px]"
//           width={100}
//           height={100}
//           quality={100}
//         />
//         <p>{betData.name}</p>
//       </div>
//       <p className="text-[#dfdfdf9a] font-light text-sm">
//         {matchData.matchDetails}
//       </p>
//       <p className="text-[#dfdfdf9a] font-light text-sm">1X2</p>
//       <div className="flex justify-between items-center">
//         <p className="text-md font-semibold">{betData.odds}</p>
//         <p className="px-6 py-1 text-md bg-gray-700 rounded-md">
//           {matchData.currentBet}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default QuickBet;
