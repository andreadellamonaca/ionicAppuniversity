import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Variables} from "../../Variables";
import {Observable} from "rxjs/Observable";
import {Report} from "../../models/Report";

/*
  Generated class for the ReportProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ReportProvider {

  reporturl = `${Variables.ServerURL}/report`;

  constructor(public http: HttpClient) {
    console.log('Hello ReportProvider Provider');
  }

  getReportsByIdProfessor(idprof: number): Observable<Report[]> {
    return this.http.get<Report[]>(this.reporturl + '/getReportsByIdProfessor/' + idprof);
  }

}
