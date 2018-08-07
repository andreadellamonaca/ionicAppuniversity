import {Lecture} from "./Lecture";
import {User} from "./User";

export interface LectureSatisfaction {

  idlectureSatisfaction?: number;
  lecture?: Lecture;
  user?: User;
  level?: number;
  note?: string;
}
