"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { UploadCloud } from "lucide-react";

export function Dropzone({
  onFile,
  accept = ".pdf",
}: {
  onFile: (file: File) => void;
  accept?: string;
}) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [dragging, setDragging] = React.useState(false);

  const onDrop = React.useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const f = e.dataTransfer.files?.[0];
      if (f) onFile(f);
    },
    [onFile]
  );

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      className={
        "flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed bg-muted/40 p-6 text-center transition-colors " +
        (dragging ? "border-primary bg-primary/5" : "hover:bg-muted/60")
      }
      onClick={() => inputRef.current?.click()}
    >
      <UploadCloud className="mb-2 h-6 w-6 text-muted-foreground" />
      <p className="text-sm text-muted-foreground">Drag & drop your PDF here</p>
      <div className="mt-3">
        <Button size="sm" variant="secondary">
          Choose file
        </Button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFile(f);
        }}
      />
    </div>
  );
}
