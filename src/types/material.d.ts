interface ISampleQuiz {
  question: string;
  options: string[];
  answer: string;
}


interface IMaterialForm {
  level: string;
  sequence: number;
  title: string;
  description: string;
  thumbnail_file?: {
    file: File
  };
  thumbnail?: string;
  media_type: "video" | "image";
  media_url?: string;
  content_text: string;
  sample_quiz: ISampleQuiz;
}

interface IMaterialData {
  id: number
  level: string;
  sequence: number;
  title: string;
  description: string;
  thumbnail?: string;
  media_type: "video" | "image";
  media_url?: string;
  content_text: string;
  sample_quiz: ISampleQuiz;
  updated_date: string;
  created_at: string;
  status: "aktif" | "nonaktif"
}

export type { IMaterialForm, IMaterialData }