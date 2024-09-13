"use cleint"
import React, { useEffect, useState } from 'react'
import Alert from './svg/Alert'
import { GetNotifications } from '@/utils/actions'
import Message from './svg/Message'
import { setNotification, setOpenNotification } from '@/lib/store/features/notification/notificationSlice'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/lib/store/hooks'
import CrossIcon from './svg/CrossIcon'
import Info from './svg/Info'

const Notification_bell = () => {
  const dispatch = useDispatch()
  const notification = useAppSelector((state) => state.notification.notification)
  const handelNotifications = async () => {
    try {
      const response = await GetNotifications()
      if (response) {
        dispatch(setNotification(response))
      }
    } catch (error) {
      // Handle error
    }
  }
  useEffect(() => {
    handelNotifications()
  }, [])
  return (
    <div className={`w-[96vw] transition-all md:w-[400px] bg-[#2b2831]`}>
      <div className='bg-gradient-to-b w-full relative from-[#D71B21] to-[#780005]  rounded-tr-md rounded-tl-md px-4 py-2'>
        <span className='bg-gradient-to-b w-[20px] h-[20px] right-1.5 top-[-19%] md:inline-block hidden rounded-br-md -z-[10] -rotate-[40deg] absolute  from-[#D71B21] to-[#D71B21]'></span>
        <div className='flex items-center justify-between'>
          <div className='text-white font-extralight tracking-wide'>Notification</div>
          <button className='text-white w-7' onClick={()=>dispatch(setOpenNotification(false))}><CrossIcon /></button>
        </div>
      </div>
      <div className='p-3 space-y-2 max-h-[600px] md:max-h-[500px] scrollbar overflow-y-auto'>
        {
          notification?.map((item: any, index: number) => (
            <div key={index} className={`p-3 shadow-sm ${item.viewed?'bg-gray-600':'bg-black'} shadow-black `}>
              <div className='flex items-center space-x-3'>
                {item.type==='alert'?<Alert />:item.type==='message'?<Message/>:<Info />}
                <div className='text-white text-opacity-70 tracking-wide font-light text-sm'>{item?.data.message}</div>
              </div>
              <div className='text-[.6rem] text-right text-white text-opacity-70 pt-1'>{new Date(item?.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })} At <span className="text-right">{new Date(item.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span></div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Notification_bell