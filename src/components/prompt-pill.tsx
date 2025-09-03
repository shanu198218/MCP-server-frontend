"use client";
import * as React from "react";

export function PromptPill({
  label,
  onClick,
  avatarSrc = "https://avatars.githubusercontent.com/u/9919?v=4",
}: {
  label: string;
  onClick?: () => void;
  avatarSrc?: string;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs hover:bg-muted/60"
    >
      <img src={avatarSrc} alt="avatar" className="h-4 w-4 rounded-full" />
      <span className="truncate">{label}</span>
    </button>
  );
}
