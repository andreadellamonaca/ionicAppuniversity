import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Teaching} from "../../models/Teaching";
import {User} from "../../models/User";

/*
  Generated class for the TeachingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TeachingProvider {
  teachingurl = 'http://localhost:8080/Project_university/teaching';

  constructor(public http: HttpClient) {
    console.log('Hello TeachingProvider Provider');
  }

  getTeachingsByIdUser(user: User): Observable<Teaching[]> {
    if (user.usertype.typeName == 'professor') {
      return this.http.get<Teaching[]>(this.teachingurl + '/getTeachingByIdProfessor/' + user.idUser);
    }
  }

}
