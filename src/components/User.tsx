"use client";
import Link from "next/link";
import React from "react";

const User = () => {
  return (
    <div className="flex flex-col gap-3">
      <Link href="/">My profile</Link>
      <Link href="/mybets">My Bets</Link>
      <Link href="/logout">Logout</Link>
    </div>
  );
};

export default User;
