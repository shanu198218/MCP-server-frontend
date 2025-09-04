import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Send } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PromptPill } from "../qa-workspace/prompt-pill";

interface ResumeQACardProps {
  examplePrompts: string[];
  question: string;
  setQuestion: (q: string) => void;
  onSend: () => void;
  qaLoading: boolean;
  qaAnswer: string | null;
  error: string | null;
  uploaded: boolean;
}

export function ResumeQACard({
  examplePrompts,
  question,
  setQuestion,
  onSend,
  qaLoading,
  qaAnswer,
  error,
  uploaded,
}: ResumeQACardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">
          Q&A based on your uploaded CV
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2 font-normal  mt-3">
          {examplePrompts.map((p, i) => (
            <PromptPill key={i} label={p} onClick={() => setQuestion(p)} />
          ))}
        </div>

        <Separator />

        <div className="md:flex items-center gap-2">
          <Textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question..."
            className="min-h-[44px] flex-1 resize-none font-normal"
          />
          <Button
            className="gap-2 self-end"
            onClick={onSend}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSend();
              }
            }}
            disabled={qaLoading}
          >
            <Send className="h-4 w-4" /> {qaLoading ? "Sending..." : "Send"}
          </Button>
        </div>

        {qaAnswer && (
          <div className="rounded-md border bg-muted/30 p-3 text-sm whitespace-pre-wrap">
            {qaAnswer}
          </div>
        )}

        {error && !uploaded && (
          <Alert variant="destructive">
            <AlertTitle>Something went wrong</AlertTitle>
            <AlertDescription className="text-xs">{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
