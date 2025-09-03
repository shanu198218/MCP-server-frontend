"use client";
import * as React from "react";

export function StatusRow({
  children,
  action,
}: {
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between rounded-md border bg-muted/40 px-3 py-2 text-xs">
      <div className="flex items-center gap-2">{children}</div>
      {action}
    </div>
  );
}
