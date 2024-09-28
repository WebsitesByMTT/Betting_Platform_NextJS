"use client";
import Link from "next/link";
import React from "react";

const User = ({userName}:any) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="capitalize md:hidden">{userName}</div>
      <Link href="/mybets">My Bets</Link>
      <Link href="/logout">Logout</Link>
    </div>
  );
};

export default User;
