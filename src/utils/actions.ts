"use server";
import { config } from "./config";
import { getCookie } from "./utils";

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
    console.log(responseData.message)
    return responseData;
  } catch (error) {
    console.log("error:", error);
  }
};
