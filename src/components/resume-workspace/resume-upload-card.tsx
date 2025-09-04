import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { CheckCircle2, FileText, UploadCloud } from "lucide-react";
import { Dropzone } from "./drop-zone";
import { FileChip } from "./file-chip";
import { MetaLine } from "./meta-line";
import { StatusRow } from "./status-row";
import { ResumeSummaryCard } from "./resume-summary-card";
import { ResumeSummary } from "@/types/resume-response-type";

interface ResumeUploadCardProps {
  file: File | null;
  setFile: (file: File | null) => void;
  isUploading: boolean;
  uploaded: boolean;
  parsedSummary: ResumeSummary | null;
  error: string | null;
  startUpload: () => void;
  onOpenPreview: () => void;
  preview?: string | null;
}

export function ResumeUploadCard({
  file,
  setFile,
  isUploading,
  uploaded,
  parsedSummary,
  error,
  startUpload,
  onOpenPreview,
  preview,
}: ResumeUploadCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">
          Upload your resume (PDF)
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          We parse key details from your PDF. After upload, proceed as needed.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {!file ? (
          <Dropzone onFile={setFile} />
        ) : (
          <div className="space-y-3">
            <div className="md:flex items-center justify-between ">
              <FileChip name={file.name} onRemove={() => setFile(null)} />
              <div className="flex items-center gap-2 md:mt-0 mt-3">
                <Button
                  disabled={isUploading}
                  variant="destructive"
                  onClick={() => setFile(null)}
                >
                  <RiDeleteBin2Fill size={18} /> Clear
                </Button>
                <Button
                  size="sm"
                  onClick={startUpload}
                  disabled={isUploading}
                  title={isUploading === true ? "Uploading" : "Upload"}
                >
                  <UploadCloud className="h-5 w-5" />{" "}
                  {isUploading === true ? "Uploading..." : "Upload"}
                </Button>
              </div>
            </div>

            {parsedSummary && (
              <ResumeSummaryCard parsedSummary={parsedSummary} />
            )}

            {uploaded && (
              <StatusRow
                action={
                  <Button
                    size="sm"
                    variant="secondary"
                    className="gap-2"
                    onClick={onOpenPreview}
                    disabled={!preview}
                    title={!preview ? "Preview not available yet" : undefined}
                  >
                    <FileText className="h-4 w-4" /> View Preview Mail
                  </Button>
                }
              >
                <MetaLine
                  icon={<CheckCircle2 className="h-3.5 w-3.5 text-green-600" />}
                >
                  Upload complete. Email preview and Q&A are now available
                  below.
                </MetaLine>
              </StatusRow>
            )}

            {error && (
              <Alert variant="destructive">
                <AlertTitle>Something went wrong</AlertTitle>
                <AlertDescription className="text-xs">{error}</AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
