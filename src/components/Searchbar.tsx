'use client'
import React from 'react'
import { useSocket } from './SocketProvider'
import { setLoading } from '@/lib/store/features/sports/sportsSlice'
import { useAppDispatch } from '@/lib/store/hooks'
import { Search } from 'lucide-react'

const Searchbar = ({ sportkey }: { sportkey: string }) => {
    const dispatch = useAppDispatch()
    const { socket } = useSocket()
    const handelChange = async (value: string) => {
        console.log(value,"value")
        if (socket && (!value||value)) {
            dispatch(setLoading(true));
            socket.emit("data", {
                action: "SEARCH EVENT",
                payload: { sport:sportkey || "", query: value, },
            });
        }
    }
        return (
            <form className="flex items-center max-w-4xl mr-auto">
                <label className="sr-only">Search</label>
                <div className="flex  bg-[#1E1C22] items-center  focus:ring-yellow-500  p-2 md:p-2.5  focus:border-yellow-500 border border-gray-600  rounded-md w-full">
                    <div className="inset-y-0 text-gray-400 start-0 flex  items-center ps-3 pointer-events-none">
                       <Search />
                    </div>
                    <input onChange={(e) => handelChange(e.target.value)} type="text" id="simple-search" className="outline-none   text-sm rounded-lg block w-full bg-transparent ps-4 dark:placeholder-gray-400 text-white" placeholder="Search By Team..." required />
                </div>
            </form>
        )
    };

    export default Searchbar;
