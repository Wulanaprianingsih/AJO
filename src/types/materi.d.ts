interface ISampleQuiz {
  question: string;
  options: string[];
  answer: string;
}

interface IExcerciseData {
  image_url: string | undefined;
  title: string;
  material_id: string;
  question: string;
  answer: string;
  options: { text: string }[];
  id: number
  created_at: string;
}

interface IExcercisePayload {
  image_url: string | undefined;
  title: string;
  material_id: string;
  question: string;
  answer: string;
  options: string[];
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
  sample_quiz: {
    question: string;
    options: { text: string }[];
    answer: string;
  };
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
  status: "aktif" | "nonaktif";
  excercises: IExcerciseData[]
}

export type { IMaterialForm, IMaterialData, IExcerciseData, IExcercisePayload }