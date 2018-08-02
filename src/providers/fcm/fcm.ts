import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Firebase} from "@ionic-native/firebase";
import {AngularFirestore} from "angularfire2/firestore";
import {Platform} from "ionic-angular";
import {TokenForm} from "../../models/TokenForm";
import {User} from "../../models/User";
import {Variables} from "../../Variables";
import {Observable} from "rxjs/Observable";
import {from} from "rxjs/internal/observable/from";

/*
  Generated class for the FcmProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class FcmProvider {
  tokenurl = `${Variables.ServerURL}/user/setToken`;
  FCMForm: TokenForm = {
    idUser: null,
    token: ''
  };
  current: User;

  constructor(public http: HttpClient,
              public firebaseNative: Firebase,
              public afs: AngularFirestore,
              private platform: Platform) {
  }

  async getToken() {
    let token;
    if (this.platform.is('android')) {
      console.log('Android device');
      token = await this.firebaseNative.getToken()
    }
    if (this.platform.is('ios')) {
      console.log('iOS device');
      token = await this.firebaseNative.getToken();
      await this.firebaseNative.grantPermission();
    }
    this.saveToken(token).subscribe(data => {
      console.log(data);
    })
  }

  // Save the token in database
  private saveToken(token): Observable<User> {
    if (!token) return;
    this.current = JSON.parse(localStorage.getItem('currentUser'));
    this.FCMForm.idUser = this.current.idUser;
    this.FCMForm.token = token;
    console.log(this.FCMForm);
    return this.http.post<User>(this.tokenurl, this.FCMForm);
  }

  removeToken(): Observable<User> {
    this.current = JSON.parse(localStorage.getItem('currentUser'));
    this.FCMForm.idUser = this.current.idUser;
    this.FCMForm.token = null;
    console.log(this.FCMForm);
    return this.http.post<User>(this.tokenurl, this.FCMForm);
  }

  // Listen to incoming FCM messages
  listenToNotifications() {
    return this.firebaseNative.onNotificationOpen();
  }

  public subscribeToTopic(topic: string) {
    return from(this.firebaseNative.subscribe(topic));
  }
}
