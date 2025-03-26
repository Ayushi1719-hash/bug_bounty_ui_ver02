export interface Bug {
  id?: number;
  title: string;
  description: string;
  status?: string;
  createdAt?: string;
  difficulty: string;
  reward?: number;
  deadline?: string;
  techStack?: string[];
  gitRepo?: string;
  zipFilePath?: File;
  pdfFilePath?: File;
}