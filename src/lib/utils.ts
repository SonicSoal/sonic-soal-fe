import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}


export function isActivePath(
  path: string,
  url: string,
  strict: boolean = false,
  basePath: string = '/'
): boolean {
  if (url === basePath) {
    return path === basePath;
  }
  return strict ? path === url : path.startsWith(url);
}


export function getNameInitials(
  name: string,
  length: number = 1,
  uppercase: boolean = true
): string {
  const initials = name
    .split(' ')
    .map((part) => part.at(0))
    .filter(Boolean) // Remove any undefined values if only one name exists
    .slice(0, length) // Take only the first two initials
    .join('');

  return uppercase ? initials.toUpperCase() : initials;
}