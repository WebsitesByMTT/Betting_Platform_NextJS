'use client'
import React from 'react'
import { useSocket } from './SocketProvider'
import { setLoading } from '@/lib/store/features/sports/sportsSlice'
import { useAppDispatch } from '@/lib/store/hooks'

const Searchbar = ({ sportkey }: { sportkey: string }) => {
    const dispatch = useAppDispatch()
    const { socket } = useSocket()
    const handelChange = async (value: string) => {
        if (socket && value) {
            dispatch(setLoading(true));
            socket.emit("data", {
                action: "SEARCH EVENT",
                payload: { sport:sportkey || "", query: value, },
            });
        }
    }
        return (
            <form className="flex items-center max-w-3xl mx-auto">
                <label className="sr-only">Search</label>
                <div className="flex  bg-gray-700 items-center  focus:ring-yellow-500  p-2 md:p-2.5  focus:border-yellow-500 border border-gray-600  rounded-md w-full">
                    <div className="inset-y-0 start-0 flex  items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2" />
                        </svg>
                    </div>
                    <input onChange={(e) => handelChange(e.target.value)} type="text" id="simple-search" className="outline-none   text-sm rounded-lg block w-full bg-transparent ps-4 dark:placeholder-gray-400 text-white" placeholder="Search By Team..." required />
                </div>
            </form>
        )
    };

    export default Searchbar;
