export interface BugEntry {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: string;  // Use `string` for LocalDateTime
  difficulty: string;
  reward: number;
  deadline: string;  // Use `string` for LocalDate
  gitRepo: string;
  techStack: string;
  zipFilePath: string;
  pdfFilePath: string;
  createdBy: number;
}
