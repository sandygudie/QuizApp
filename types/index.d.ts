export interface IQuestion {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: [];
  question: string;
  type: string;
}
[];

export interface ISignUpRequest {
  username: string;
  category: ICategory[];
  createdDate:string;
  image:string;
}

export interface IUser {
  username: string;
  category: ICourse[];
  _id: string;
  createdDate: string|any;
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