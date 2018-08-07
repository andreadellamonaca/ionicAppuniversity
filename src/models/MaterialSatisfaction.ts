import {User} from "./User";
import {TeachingMaterial} from "./TeachingMaterial";

export interface MaterialSatisfaction {

  idMaterialSatisfaction?: number;
  teachingmaterial?: TeachingMaterial;
  user?: User;
  level?: number;
  note?: string;
}
