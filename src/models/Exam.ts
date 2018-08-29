import {Classroom} from "./Classroom";
import {Teaching} from "./Teaching";

export interface Exam {

  idExam?: number;
  classroom?: Classroom;
  teaching?: Teaching;
  date?: Date;
  hour?: String;
}
