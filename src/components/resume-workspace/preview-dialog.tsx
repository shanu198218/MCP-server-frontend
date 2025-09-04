import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface PreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preview: string | null;
}

export function PreviewDialog({
  open,
  onOpenChange,
  preview,
}: PreviewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Email Preview</DialogTitle>
          <DialogDescription>
            This is the generated preview from your upload.
          </DialogDescription>
        </DialogHeader>

        <div className="border rounded-2xl bg-white shadow-sm p-4 max-h-[60vh] overflow-y-auto text-sm leading-relaxed">
          {preview && /<[^>]+>/.test(preview) ? (
            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: preview }}
            />
          ) : (
            <pre className="whitespace-pre-wrap font-mono text-gray-700">
              {preview ?? (
                <span className="text-gray-400 italic">
                  No preview available.
                </span>
              )}
            </pre>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
