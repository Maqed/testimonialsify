import { clsx, type ClassValue } from "clsx";
import { env } from "@/env";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function getFirstLettersOfWords(str: string | null | undefined) {
  if (!str) return;
  const words = str.split(" ");
  let output = "";
  for (const word of words) {
    if (word) {
      const firstLetter = word[0];
      output += firstLetter;
    }
  }
  return output;
}

export function absoluteURL(url: string) {
  return `${env.NEXT_PUBLIC_WEBSITE_URL}${url}`;
}
