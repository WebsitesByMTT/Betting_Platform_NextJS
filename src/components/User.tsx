"use client";
import { useRouter } from "next/navigation";
import React from "react";

const User = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-3">
      <button>My profile</button>
      <button
        onClick={() => {
          router.push("/mybets");
        }}
      >
        My Bets
      </button>
      <button
        onClick={() => {
          router.push("/logout");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default User;
