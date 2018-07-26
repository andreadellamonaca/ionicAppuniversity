import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
  loginurl = 'http://localhost:8080/Project_university/user/getUserByMail_Pwd';


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
}
