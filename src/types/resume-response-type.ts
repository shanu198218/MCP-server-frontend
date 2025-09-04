export type UploadResponse = {
  fileId?: string;
  summary?: string;
  preview?: string;
  message?: string;
};

export type ResumeSummary = {
  name?: string;
  skillsCount?: number;
  rolesFound?: string[];
  educationExamples?: string[];
};
