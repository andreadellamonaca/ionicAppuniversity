import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {User} from "../../models/User";
import {Observable} from "rxjs/Observable";
import {Lecture} from "../../models/Lecture";
import {Variables} from "../../Variables";

/*
  Generated class for the LectureProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LectureProvider {

  lectureurl = `${Variables.ServerURL}/lecture`;

  constructor(public http: HttpClient) {
    console.log('Hello LectureProvider Provider');
  }

  getDailyLecturesByDate_IdUser(date: string, user: User): Observable<Lecture[]> {
    if (user.usertype.typeName == 'professor') {
      return this.http.get<Lecture[]>(this.lectureurl + '/getDailyLectureByIdProfAndDate/' + user.idUser + '/' + date);
    } else {}
  }
}
