import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Firebase} from "@ionic-native/firebase";
import {AngularFirestore} from "angularfire2/firestore";
import {Platform} from "ionic-angular";
import {TokenForm} from "../../models/TokenForm";
import {User} from "../../models/User";

/*
  Generated class for the FcmProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const headers = new HttpHeaders({'Content-Type' : 'application/json'});

@Injectable()
export class FcmProvider {
  tokenurl: "http://localhost:8080/Project_university/user/setToken";
  FCMForm: TokenForm;
  current: User;

  constructor(public http: HttpClient,
              public firebaseNative: Firebase,
              public afs: AngularFirestore,
              private platform: Platform) {
  }

  async getToken() {
    let token;

    if (this.platform.is('android')) {
      token = await this.firebaseNative.getToken()
    }
    if (this.platform.is('ios')) {
      token = await this.firebaseNative.getToken();
      await this.firebaseNative.grantPermission();
    }
    return this.saveToken(token)
  }

  // Save the token to firestore
  private saveToken(token) {
    if (!token) return;
    this.current = JSON.parse(localStorage.getItem('currentUser'));
    this.FCMForm.idUser = this.current.idUser;
    this.FCMForm.token = token;
    console.log(this.FCMForm);
    return this.http.post(this.tokenurl, this.FCMForm , {headers});
  }

  // Listen to incoming FCM messages
  listenToNotifications() {
    return this.firebaseNative.onNotificationOpen();
  }
}
