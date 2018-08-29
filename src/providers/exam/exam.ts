import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Exam} from "../../models/Exam";
import {Variables} from "../../Variables";

/*
  Generated class for the ExamProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ExamProvider {
  examurl = `${Variables.ServerURL}/exam`;

  constructor(public http: HttpClient) {
    console.log('Hello ExamProvider Provider');
  }

  getExamsByIdTeaching(idteaching: number): Observable<Exam[]> {
    return this.http.get<Exam[]>(this.examurl + '/getExamsByIdTeaching/' + idteaching);
  }

}
