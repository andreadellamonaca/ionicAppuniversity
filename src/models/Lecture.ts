import {Classroom} from "./Classroom";
import {Teaching} from "./Teaching";
import {TeachingMaterial} from "./TeachingMaterial";

export interface Lecture {

  idLecture: number;
  classroom?: Classroom;
  teaching?: Teaching;
  date?: Date;
  starttime?: string;
  endtime?: string;
  description?: string;
  tmaterials?: TeachingMaterial[];
  hide_material?: boolean;
  av_rating?: number;
}
