import { config } from '@/utils/config';
import { cookies } from 'next/headers';
import React from 'react'

async function getUser() {
  "use server";
  const token = cookies().get("token")?.value;
  try {
    const response = await fetch(
      `${config.server}/api/users`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: `userToken=${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
   
  }
}
const Header = async() => {
  const user = await getUser();
  return (
    <div className="flex items-end justify-end space-x-[.6rem] py-[.5rem] flex-col">
      <div className='flex flex-col items-center justify-center'>
        <p className="text-white font-semibold text-xl capitalize">{user?.username}</p>
        <p className="text-white font-semibold text-xl">$ {user?.credits}</p>
      </div>
    </div>
  );
}


export default Header
