import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {MaterialSatisfaction} from "../../models/MaterialSatisfaction";
import {Variables} from "../../Variables";

/*
  Generated class for the MaterialSatisfactionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const headers = new HttpHeaders({'Content-Type' : 'application/json'});

@Injectable()
export class MaterialSatisfactionProvider {
  msurl = `${Variables.ServerURL}/materialsatisfaction/`;

  constructor(public http: HttpClient) {
    console.log('Hello MaterialSatisfactionProvider Provider');
  }

  getAverageRatingByIdMaterial(idMaterial: number): Observable<number> {
    return this.http.get<number>(this.msurl + 'getAverageRatingByIdMaterial/' + idMaterial);
  }

  getMaterialSatisfactionByIdUserAndIdMaterial(idUser: number, idMaterial: number): Observable<MaterialSatisfaction> {
    return this.http.get<MaterialSatisfaction>(this.msurl + 'getMaterialSatisfactionByIdUserAndIdMaterial/' + idUser + '/' + idMaterial);
  }

  getMaterialSatisfactionByIdMaterial(idMaterial: number): Observable<MaterialSatisfaction[]> {
    return this.http.get<MaterialSatisfaction[]>(this.msurl + 'getMaterialSatisfactionByIdMaterial/' + idMaterial);
  }

  saveMaterialSatisfaction(ms: MaterialSatisfaction): Observable<MaterialSatisfaction> {
    return this.http.post<MaterialSatisfaction>(this.msurl + 'save', ms ,{headers});
  }
}
