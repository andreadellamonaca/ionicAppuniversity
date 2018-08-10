import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Variables} from "../../Variables";
import {Observable} from "rxjs/Observable";
import {LectureSatisfaction} from "../../models/LectureSatisfaction";

/*
  Generated class for the LectureSatisfactionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const headers = new HttpHeaders({'Content-Type' : 'application/json'});

@Injectable()
export class LectureSatisfactionProvider {
  lsurl = `${Variables.ServerURL}/lecturesatisfaction/`;

  constructor(public http: HttpClient) {
    console.log('Hello LectureSatisfactionProvider Provider');
  }

  getAverageRatingByIdLecture(idLecture: number): Observable<number> {
    return this.http.get<number>(this.lsurl + 'getAverageRatingByIdLecture/' + idLecture);
  }

  getLectureSatisfactionByIdUserAndIdLecture(idUser: number, idLecture: number): Observable<LectureSatisfaction> {
    return this.http.get<LectureSatisfaction>(this.lsurl + 'getLectureSatisfactionByIdUserAndIdLecture/' + idUser + '/' + idLecture);
  }

  getLectureSatisfactionByIdLecture(idLecture: number): Observable<LectureSatisfaction[]> {
    return this.http.get<LectureSatisfaction[]>(this.lsurl + 'getLectureSatisfactionsByIdLecture/' + idLecture);
  }

  saveLectureSatisfaction(ls: LectureSatisfaction): Observable<LectureSatisfaction> {
    return this.http.post<LectureSatisfaction>(this.lsurl + 'save', ls ,{headers});
  }
}
