import {Classroom} from "./Classroom";
import {User} from "./User";
import {ReportStatus} from "./ReportStatus";

export interface Report {

  idReport?: number;
  classroom?: Classroom;
  reportstatus?: ReportStatus;
  userBySecretaryIdSecretary?: User;
  userByProfessorIdProfessor?: User;
  problemDescription?: string;
  note?: string;
  hide?: boolean;
}
