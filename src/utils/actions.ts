"use server";
import { JwtPayload } from "jsonwebtoken";
import { config } from "./config";
import { FormData } from "./types";
import { getCookie, getCurrentUser } from "./utils";

interface Player extends JwtPayload {
  userId: string;
}
export const GetCaptcha = async () => {
  try {
    const response = await fetch(`${config.server}/api/auth/captcha`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const error = await response.json();
      return { error: error.message };
    }
    const responseData = await response.json();
    return { responseData };
  } catch (error) {
    console.log("error:", error);
  }
};

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
        captchaToken: data.captchaToken,
        captcha: data.captcha,
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

export const GetPlayerBets = async () => {
  const player = (await getCurrentUser()) as Player;
  const token = await getCookie();
  try {
    const response = await fetch(
      `${config.server}/api/bets/player/${player?.userId}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: `userToken=${token}`,
        },
      }
    );
    if (!response.ok) {
      const error = await response.json();
      return { error: error.message };
    }
    const responseData = await response.json();
    return { responseData };
  } catch (error) {
    console.log("error:", error);
  }
};
