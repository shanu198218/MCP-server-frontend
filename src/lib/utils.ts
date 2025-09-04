import { ResumeSummary } from "@/types/resume-response-type";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isResumeSummary = (
  value: ResumeSummary | string | null,
): value is ResumeSummary => {
  return value !== null && typeof value === "object";
};
