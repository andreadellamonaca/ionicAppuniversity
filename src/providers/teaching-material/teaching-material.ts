import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Variables} from "../../Variables";
import {Observable} from "rxjs/Observable";
import {TeachingMaterial} from "../../models/TeachingMaterial";

/*
  Generated class for the TeachingMaterialProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TeachingMaterialProvider {
  tmurl = `${Variables.ServerURL}/teachingmaterial/`;

  constructor(public http: HttpClient) {
    console.log('Hello TeachingMaterialProvider Provider');
  }

  getTeachingMaterialByIdLecture(idLecture: number): Observable<TeachingMaterial[]> {
    return this.http.get<TeachingMaterial[]>(this.tmurl + 'getTeachingMaterialByIdLecture/' + idLecture);

  }


  download(tm: TeachingMaterial): Observable<any> {
    return this.http.post(this.tmurl + 'downloadFile', tm.link, { responseType: 'blob' as 'json', observe: 'response' });
  }

}
