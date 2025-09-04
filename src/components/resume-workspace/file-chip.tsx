import { Button } from "@/components/ui/button";
import { FileText, X } from "lucide-react";

export function FileChip({
  name,
  onRemove,
}: {
  name: string;
  onRemove?: () => void;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-md border bg-background px-2.5 py-1 text-xs">
      <FileText className="h-4 w-4" />
      <span className="max-w-[220px] truncate">{name}</span>
      {onRemove && (
        <Button
          size="icon"
          variant="ghost"
          className="h-5 w-5"
          onClick={onRemove}
        >
          <X className="h-3.5 w-3.5" />
        </Button>
      )}
    </div>
  );
}
