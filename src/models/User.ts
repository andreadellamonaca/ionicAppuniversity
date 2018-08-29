import {StudyCourse} from "./StudyCourse";
import {UserType} from "./UserType";
import {Teaching} from "./Teaching";


export interface User {

  email?: string;
  idUser?: number;
  name?: string;
  password?: string;
  studycourse?: StudyCourse;
  surname?: string;
  usertype?: UserType;
  courseYear?: number;
  teachings?: Teaching[];
}
