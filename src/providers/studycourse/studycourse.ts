import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Variables} from "../../Variables";
import {Observable} from "rxjs/Observable";
import {StudyCourse} from "../../models/StudyCourse";

/*
  Generated class for the StudycourseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StudycourseProvider {

  scurl = `${Variables.ServerURL}/studycourse`;

  constructor(public http: HttpClient) {
    console.log('Hello StudycourseProvider Provider');
  }

  getAll(): Observable<StudyCourse[]> {
    return this.http.get<StudyCourse[]>(this.scurl + '/getAll');
}

}
