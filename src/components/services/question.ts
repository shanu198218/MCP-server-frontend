import { QueryResponse } from "@/types/query-response-type";

export async function Question(
  question: string,
  fileId?: string
): Promise<QueryResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/resume/query`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fileId ? { question, fileId } : { question }),
  });
  if (!res.ok) throw new Error(`Query failed: ${res.status}`);
  return (await res.json()) as QueryResponse;
}