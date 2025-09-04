import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2 } from "lucide-react";
import { ResumeSummary } from "@/types/resume-response-type";

interface ResumeSummaryCardProps {
  parsedSummary: string | ResumeSummary;
}

export function ResumeSummaryCard({ parsedSummary }: ResumeSummaryCardProps) {
  if (!parsedSummary) return null;

  return (
    <Alert className="border-green-600/20 bg-green-600/5">
      <CheckCircle2 className="h-4 w-4" />
      <AlertDescription className="text-sm space-y-2">
        {typeof parsedSummary === "string" ? (
          parsedSummary
        ) : (
          <>
            {parsedSummary.name && (
              <div>
                <strong>Name:</strong> {parsedSummary.name}
              </div>
            )}
            {parsedSummary.skillsCount !== undefined && (
              <div>
                <strong>Skills Count:</strong> {parsedSummary.skillsCount}
              </div>
            )}
            {parsedSummary.rolesFound &&
              parsedSummary.rolesFound.length > 0 && (
                <div>
                  <strong>Roles Found:</strong>{" "}
                  {parsedSummary.rolesFound.join(", ")}
                </div>
              )}
            {parsedSummary.educationExamples &&
              parsedSummary.educationExamples.length > 0 && (
                <div>
                  <strong>Education:</strong>{" "}
                  {parsedSummary.educationExamples.join(", ")}
                </div>
              )}
          </>
        )}
      </AlertDescription>
    </Alert>
  );
}
