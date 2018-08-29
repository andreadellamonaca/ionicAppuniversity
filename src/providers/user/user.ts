import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {User} from "../../models/User";
import {Variables} from "../../Variables";

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const headers = new HttpHeaders({'Content-Type' : 'application/json'});

@Injectable()
export class UserProvider {
  loginurl = `${Variables.ServerURL}/user/getUserByMail_Pwd`;
  userurl = `${Variables.ServerURL}/user/`;


  constructor(public http: HttpClient) { }

  checkUserCredentials(mail: string, password: string): Observable<User> {
    return this.http.get<User>(this.loginurl + '/' + mail + '/' + password);
  }

  getUsersByTeachingName(teaching_name: string): Observable<User[]> {
    return this.http.get<User[]>(this.userurl + 'getUsersByTeachingName/' + teaching_name);
  }

  save(u: User): Observable<User> {
    return this.http.post(this.userurl + 'save', u, {headers});
  }

  subscribetoteaching(u: User): Observable<User> {
    return this.http.post(this.userurl + 'subscribetoteaching', u, {headers});
  }
}
