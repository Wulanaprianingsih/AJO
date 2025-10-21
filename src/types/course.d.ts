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

export type { ICourse, IOptions, IQuestion, IAnswered, IUserData }