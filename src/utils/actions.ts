"use server";
import { JwtPayload } from "jsonwebtoken";
import { config } from "./config";
import { FormData } from "./types";
import { getCookie, getCurrentUser } from "./utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface Player extends JwtPayload {
  userId: string;
}

export const login = async (data: FormData) => {
  try {
    const response = await fetch(
      `${config.server}/api/auth/login?origin=platform`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      }
    );
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

export const getUser = async () => {
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}/api/auth`, {
      method: "GET",
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

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    redirect("/logout");
  }
};

export const GetPlayerBets = async (status?: string) => {
  const player = (await getCurrentUser()) as Player;
  const token = await getCookie();
  try {
    const response = await fetch(
      `${config.server}/api/bets/${player?.userId}/bets?type=id&status=${status}`,
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

export const GetRedeemInfo = async (betId: string) => {
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}/api/bets/redeem/${betId}`, {
      method: "GET",
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

export const redeemPlayerBet = async (betId: string) => {
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}/api/bets/${betId}`, {
      method: "PUT",
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
    revalidatePath("/mybets");
    return { responseData };
  } catch (error) {
    console.log("error:", error);
  } finally {
    revalidatePath("/mybets");
  }
};

export const getNotifications = async (viewedStatus: boolean) => {
  const token = await getCookie();
  try {
    const response = await fetch(
      `${config.server}/api/notifications?viewedStatus=${viewedStatus}`,
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
    return responseData;
  } catch (error) {
    console.log("error:", error);
  }
};

export const getCategoryBanners = async (category: string) => {
  const token = await getCookie();
  try {
    const response = await fetch(
      `${config.server}/api/banner?category=${category}&status=active`,
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
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

export const markBetAsViewed = async (notificationId: string) => {
  const token = await getCookie();
  try {
    const response = await fetch(
      `${config.server}/api/notifications?notificationId=${notificationId}`,
      {
        method: "PUT",
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
  } catch (error) {
    console.log("error:", error);
  }
};
