"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const User = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-3">
      <button>My profile</button>
      <Link href="/mybets">My Bets</Link>
      <Link href="/logout">Logout</Link>
    </div>
  );
};

export default User;
