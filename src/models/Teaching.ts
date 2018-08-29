import {User} from "./User";

export interface Teaching {

  idTeaching: number;
  user: User;
  name: string;
  cfu: number;
  courseYear?: number;
}
