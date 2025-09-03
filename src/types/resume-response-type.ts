export type UploadResponse = {
  fileId?: string;
  summary?: string;
  preview?: string;
  message?: string;
  [k: string]: any;
};

export type ResumeSummary = {
  name?: string;
  skillsCount?: number;
  rolesFound?: string[];
  educationExamples?: string[];
};