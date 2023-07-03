export interface IQuestion {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: [];
  question: string;
  type: string;
}
[];

export interface ILoginRequest {
  username: string;
 userId:string|null
}

export interface IUser {
  username: string;
  category: ICourse[];
  _id: string;
  created_at: string|any;
  image: ImgHTMLAttributes<HTMLImageElement>;
  userNo:number
}

export interface ICategory {
  _id: string;
  name: string;
  score: number;
  attempts: number,
  recentScore: number,
  lastPlayedDate: string,
}

export interface IAvatar{
  id: number;
  image: string;
}[]

// there is interface for response and request