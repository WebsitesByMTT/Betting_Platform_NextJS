import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useAppSelector } from "./store/hooks";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateId = (
  eventId: string,
  beton: string,
  category: string
): string => {
  const id = eventId + beton?.replace(/\s+/g, "") + category;
  return id;
};

export const getOutright = (sportsCategories: any, sport_title: string) => {
  const matchedEvent: any = sportsCategories.flatMap((category: any) =>
    category.events.filter((event: any) => event.title === sport_title)
  )[0];
  return matchedEvent?.has_outrights;
};
