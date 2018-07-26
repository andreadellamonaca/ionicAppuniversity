import {User} from "./User";
import {Lecture} from "./Lecture";

export interface TeachingMaterial {

  idTeachingMaterial?: number;
  lecture?: Lecture;
  user?: User;
  name: string;
  type: string;
  link: string;
  av_rating?: number;
}
