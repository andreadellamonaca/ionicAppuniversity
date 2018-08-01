import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {User} from "../../models/User";
import {Variables} from "../../Variables";

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
  loginurl = `${Variables.ServerURL}/user/getUserByMail_Pwd`;
  userurl = `${Variables.ServerURL}/user/`;


  constructor(public http: HttpClient) { }

  checkUserCredentials(mail: string, password: string) {
    return new Promise(resolve => {
      this.http.get(this.loginurl + '/' + mail + '/' + password).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      })
    })
  }

  getUsersByTeachingName(teaching_name: string): Observable<User[]> {
    return this.http.get<User[]>(this.userurl + 'getUsersByTeachingName/' + teaching_name);
  }
}
