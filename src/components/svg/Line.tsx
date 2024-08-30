import React from "react";

const Line = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1535"
      height="2"
      viewBox="0 0 1535 2"
      fill="none"
      className="w-full h-auto"
    >
      <path
        d="M0 1H1535"
        stroke="url(#paint0_linear_400_2193)"
        strokeWidth="2"
      />
      <defs>
        <linearGradient
          id="paint0_linear_400_2193"
          x1="0"
          y1="1.5"
          x2="1535"
          y2="1.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8C8998" stopOpacity="0" />
          <stop offset="0.5" stopColor="#2E2D32" />
          <stop offset="1" stopColor="#8C8998" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Line;
