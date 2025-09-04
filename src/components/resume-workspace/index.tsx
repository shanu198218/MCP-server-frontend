"use client";

import { ResumeSummary } from "@/types/resume-response-type";
import { ResumeQACard } from "./resume-qa-card";
import { ResumeUploadCard } from "./resume-upload-card";
import { uploadResume } from "../services/resume";
import { Question } from "../services/question";
import { Header } from "../common/header";
import { examplePrompts } from "@/lib/data";
import { PreviewDialog } from "./preview-dialog";
import React, { useState } from "react";
import { isResumeSummary } from "@/lib/utils";

export function ResumeWorkspace() {
  const [file, setFile] = React.useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploaded, setUploaded] = React.useState(false);
  const [parsedSummary, setParsedSummary] = React.useState<
    ResumeSummary | string | null
  >(null);
  const [fileId, setFileId] = React.useState<string | undefined>(undefined);
  const [question, setQuestion] = React.useState("");
  const [qaAnswer, setQaAnswer] = React.useState<string | null>(null);
  const [qaLoading, setQaLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = React.useState(false);

  const startUpload = React.useCallback(async () => {
    if (!file) return;

    setError(null);
    setUploaded(false);
    setParsedSummary(null);
    setQaAnswer(null);
    setPreview(null);
    setIsUploading(true);

    try {
      const res = await uploadResume(file);
      setUploaded(true);
      if (res.fileId) setFileId(res.fileId);
      const summary =
        res.summary ?? res.preview ?? res.message ?? "Upload complete.";
      setParsedSummary(summary);
      if (res.preview) setPreview(res.preview);
      setIsUploading(false);
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : "Upload failed";
      setError(errorMessage);

      setIsUploading(false);
    }
  }, [file]);

  const onSend = React.useCallback(async () => {
    if (!question.trim()) return;
    setQaLoading(true);
    setQaAnswer(null);
    setError(null);
    try {
      const res = await Question(question, fileId);
      const answer = (res.answer ??
        res.result ??
        res.message ??
        JSON.stringify(res, null, 2)) as string;
      setQaAnswer(answer);
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : "Upload failed";
      setError(errorMessage);
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
  const validParsedSummary = isResumeSummary(parsedSummary)
    ? parsedSummary
    : null;
  return (
    <div className="mx-auto max-w-4xl space-y-6 p-2 md:p-6">
      <Header title="Resume Upload" />

      <ResumeUploadCard
        file={file}
        setFile={setFile}
        isUploading={isUploading}
        uploaded={uploaded}
        parsedSummary={validParsedSummary}
        error={error}
        startUpload={startUpload}
        onOpenPreview={onOpenPreview}
        preview={preview}
      />

      <ResumeQACard
        examplePrompts={examplePrompts}
        question={question}
        setQuestion={setQuestion}
        onSend={onSend}
        qaLoading={qaLoading}
        qaAnswer={qaAnswer}
        error={error}
        uploaded={uploaded}
      />

      <PreviewDialog
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        preview={preview}
      />
    </div>
  );
}
