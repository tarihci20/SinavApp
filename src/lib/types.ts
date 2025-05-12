export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
  points: number;
}

export interface Prize {
  id: string;
  name: string;
  imageSrc: string;
  imageHint: string;
  condition: string; // e.g., "80+ Puan"
  minScore?: number;
  maxScore?: number; // Used for explicit ranges if needed, otherwise minScore is enough for thresholds
}

export interface QuizResult {
  id: string; // Unique ID for the result
  teacherName: string;
  score: number;
  prizeName: string;
  date: string; // ISO string date
}

export interface TeacherFeedback {
  id: string; // Unique ID for the feedback
  teacherName: string;
  feedbackText: string;
  sentiment: "positive" | "negative" | "neutral" | "mixed";
  sentimentExplanation?: string;
  date: string; // ISO string date
}
