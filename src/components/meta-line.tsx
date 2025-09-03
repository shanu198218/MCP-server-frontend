
"use client";
import * as React from "react";

export function MetaLine({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-muted/60">
        {icon}
      </span>
      <span>{children}</span>
    </div>
  );
}
