interface ISampleQuiz {
  question: string;
  options: string[];
  answer: string;
}

interface IOptions {
  
    text: string
}

interface IExcerciseData {
  image_url: string | undefined;
  title: string;
  material_id: string;
  question: string;
  answer: string;
  options: IOptions[]
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
  sample_quiz: ISampleQuiz;
}

interface IExcerciseHistory {
  materialId: number
  point: number
  created_at: string
}


interface IUserAnswers {
  user_id: string
  answer: Record<number, string>,
  material_id: number
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
  excercises: IExcerciseData[]
  excercise_history: IExcerciseHistory[]
  user_answers: IUserAnswers[]

}

export type { IMaterialForm, IMaterialData, IExcerciseData, IExcercisePayload, IExcerciseHistory }