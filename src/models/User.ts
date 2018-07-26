import {StudyCourse} from "./StudyCourse";
import {UserType} from "./UserType";


export interface User {

  email?: string;
  idUser?: number;
  name?: string;
  password?: string;
  studycourse?: StudyCourse;
  surname?: string;
  usertype?: UserType;
}
