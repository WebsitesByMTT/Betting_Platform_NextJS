"use server";
import { config } from "./config";
import { FormData } from "./types";
import { getCookie } from "./utils";

export const login = async (data: FormData) => {
  try {
    const response = await fetch(`${config.server}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
      }),
    });
    if (!response.ok) {
      const error = await response.json();
      return { error: error.message };
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log("error:", error);
  }
};

export const placeBet = async (data: any) => {
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}/api/bets`, {
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `userToken=${token}`,
      },
    });
    if (!response.ok) {
      const error = await response.json();
      return { error: error.message };
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log("error:", error);
  }
};
