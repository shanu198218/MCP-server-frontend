"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, CircleDot, FileText, Link as LinkIcon, Plus, Send, UploadCloud, X } from "lucide-react";
import { Header } from "./common/header";
import { Dropzone } from "./drop-zone";
import { FileChip } from "./file-chip";
import { MetaLine } from "./meta-line";
import { StatusRow } from "./status-row";
import { PromptPill } from "./prompt-pill";
import { uploadResume } from "./services/resume";
import { ResumeSummary } from "@/types/resume-response-type";
import { Question } from "./services/question";
import { Dialog, DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { DialogContent, DialogHeader } from "./ui/dialog";


export function ResumeWorkspace() {
  const [file, setFile] = React.useState<File | null>(null);
  const [progress, setProgress] = React.useState(0);
  const [uploaded, setUploaded] = React.useState(false);
  const [parsedSummary, setParsedSummary] = React.useState<ResumeSummary | string | null>(null);
  const [fileId, setFileId] = React.useState<string | undefined>(undefined);
  const [question, setQuestion] = React.useState("");
  const [qaAnswer, setQaAnswer] = React.useState<string | null>(null);
  const [qaLoading, setQaLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
    const [preview, setPreview] = React.useState<string | null>(null);
    const [previewOpen, setPreviewOpen] = React.useState(false);

  const examplePrompts = React.useMemo(
    () => [
      "Ask a question about your experience, skills, or roles. For example: \"Summarize my leadership experience\".",
      "What are the top 3 strengths highlighted in my resume?",
    ],
    []
  );

  const startUpload = React.useCallback(async () => {
    if (!file) return;
    setError(null);
    setUploaded(false);
    setParsedSummary(null);
    setQaAnswer(null);
    setProgress(0);
        setPreview(null);

    try {
      const res = await uploadResume(file, (p) => setProgress(p));
      setUploaded(true);
      const summary = (res.summary ?? res.preview ?? res.message ?? "Upload complete.") as string;
      setParsedSummary(summary);
      if (res.fileId) setFileId(res.fileId);
          if (res.preview) setPreview(res.preview);
    } catch (e: any) {
      setError(e?.message ?? "Upload failed");
    }
  }, [file]);

  const onSend = React.useCallback(async () => {
    if (!question.trim()) return;
    setQaLoading(true);
    setQaAnswer(null);
    setError(null);
    try {
      const res = await Question(question, fileId);
      const answer = (res.answer ?? res.result ?? res.message ?? JSON.stringify(res, null, 2)) as string;
      setQaAnswer(answer);
    } catch (e: any) {
      setError(e?.message ?? "Query failed");
    } finally {
      setQaLoading(false);
    }
  }, [question, fileId]);

    const onOpenPreview = React.useCallback(() => {
      if (!preview) {
        setError("No preview available yet.");
        return;
      }
      setPreviewOpen(true);
    }, [preview]);

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4 md:p-6">
      <Header title="Resume Upload">
        <Button variant="outline" size="sm" className="gap-2">
          <LinkIcon className="h-4 w-4" /> Direct URL
        </Button>
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" /> New Upload
        </Button>
      </Header>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Upload your resume (PDF)</CardTitle>
          <p className="text-xs text-muted-foreground">We parse key details from your PDF. After upload, proceed as needed.</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {!file ? (
            <Dropzone onFile={setFile} />
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <FileChip name={file.name} onRemove={() => setFile(null)} />
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setFile(null)}>
                    <X className="mr-2 h-4 w-4" /> Clear
                  </Button>
                  <Button size="sm" onClick={startUpload} disabled={progress > 0 && progress < 100}>
                    <UploadCloud className="mr-2 h-4 w-4" /> Upload
                  </Button>
                </div>
              </div>

              {progress > 0 && progress < 100 && (
                <div className="space-y-2">
                  <MetaLine icon={<CircleDot className="h-3.5 w-3.5" />}>Uploading...</MetaLine>
                  <Progress value={progress} className="h-2" />
                </div>
              )}

              {parsedSummary && (
  <Alert className="border-green-600/20 bg-green-600/5">
    <CheckCircle2 className="h-4 w-4" />
    <AlertDescription className="text-xs space-y-1">
      {typeof parsedSummary === "string" ? (
        parsedSummary
      ) : (
        <>
          {"name" in parsedSummary && (
            <div><strong>Name:</strong> {parsedSummary.name}</div>
          )}
          {"skillsCount" in parsedSummary && (
            <div><strong>Skills Count:</strong> {parsedSummary.skillsCount}</div>
          )}
          {"rolesFound" in parsedSummary && Array.isArray(parsedSummary.rolesFound) && (
            <div><strong>Roles Found:</strong> {parsedSummary.rolesFound.join(", ")}</div>
          )}
          {"educationExamples" in parsedSummary && Array.isArray(parsedSummary.educationExamples) && (
            <div><strong>Education:</strong> {parsedSummary.educationExamples.join(", ")}</div>
          )}
        </>
      )}
    </AlertDescription>
  </Alert>
)}


              {uploaded && (
                <StatusRow
                  action={
                    <Button size="sm" variant="secondary" className="gap-2" onClick={onOpenPreview} disabled={!preview} title={!preview ? "Preview not available yet" : undefined}>
                                         <FileText className="h-4 w-4" /> View Preview Mail
                                       </Button>
                  }
                >
                  <MetaLine icon={<CheckCircle2 className="h-3.5 w-3.5 text-green-600" />}>
                    Upload complete. Email preview and Q&A are now available below.
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

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Q&A based on your uploaded CV</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="rounded-full text-[10px]">Active</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {examplePrompts.map((p, i) => (
              <PromptPill key={i} label={p} onClick={() => setQuestion(p)} />
            ))}
          </div>

          <Separator />

          <div className="flex items-center gap-2">
            <Textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question..."
              className="min-h-[44px] flex-1 resize-none"
            />
            <Button size="sm" className="h-[44px] gap-2 self-end" onClick={onSend} disabled={qaLoading}>
              <Send className="h-4 w-4" /> {qaLoading ? "Sending..." : "Send"}
            </Button>
          </div>

          {qaAnswer && (
            <div className="rounded-md border bg-muted/30 p-3 text-sm whitespace-pre-wrap">{qaAnswer}</div>
          )}

          {error && !uploaded && (
            <Alert variant="destructive">
              <AlertTitle>Something went wrong</AlertTitle>
              <AlertDescription className="text-xs">{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
       {/* Preview dialog */}
            <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Email Preview</DialogTitle>
                  <DialogDescription>This is the generated preview from your upload.</DialogDescription>
                </DialogHeader>
                <div className="max-h-[60vh] overflow-auto text-sm">
                  {preview && /<[^>]+>/.test(preview) ? (
                    <div dangerouslySetInnerHTML={{ __html: preview }} />
                  ) : (
                    <pre className="whitespace-pre-wrap">{preview ?? "No preview available."}</pre>
                  )}
                </div>
              </DialogContent>
            </Dialog>
    </div>
  );
}
