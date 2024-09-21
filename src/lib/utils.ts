import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const generateId = (eventId: string, beton: string, category: string): string => {
  const id = eventId + beton.replace(/\s+/g, "") + category;
  return id
}