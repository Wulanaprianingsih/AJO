interface ICourse {
    id: string;
    title: string;
    subtitle: string;
    content_text: string;
    logo: string;
    level: number;
    question: IQuestion[];
}

interface IOptions {
    text: string
    label: string
    isCorrect: boolean
}

interface IQuestion {
    id: number;
    image_url: string;
    number: number;
    options: IOptions[];
    question: string;
    title: string;
}

interface IAnswered {
    id: number;
    answer: IOptions
}

interface IUserData {
  name: string
  email: string
  point: number
  level: number
}

interface ISubmitExcercise {
  point: number,
  material_id: number,
}

export interface IDetailCourse {
  id: number;
  title: string;         
  description: string;   
  media_url?: string;    
  media_type?: "image" | "video"; 
  content_text: string;  
  quiz?: IQuiz;         
}

export interface IQuiz {
  question: string;       
  options: string[];      
  correctAnswer: string; 
}


export type { ICourse, IOptions, IQuestion, IAnswered, IUserData, IDetailCourse, IQuiz, ISubmitExcercise }