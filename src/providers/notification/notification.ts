import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Variables} from "../../Variables";
import {Notification} from "../../models/Notification";
import {Lecture} from "../../models/Lecture";
import {Observable} from "rxjs/Observable";
import {TeachingMaterial} from "../../models/TeachingMaterial";

/*
  Generated class for the NotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const headers = new HttpHeaders({'Content-Type' : 'application/json'});

@Injectable()
export class NotificationProvider {

  notificationurl = `${Variables.ServerURL}/notification`;

  constructor(public http: HttpClient) {
    console.log('Hello NotificationProvider Provider');
  }

  LectureRateNotification(lecture: Lecture): Observable<Notification> {
    let notification: Notification = {
      head: 'New Rating on your lesson!',
      body: 'A student has evaluated the lesson: ' + lecture.date,
      token_topic: lecture.teaching.user.email,
    };
    return this.http.post<Notification>(this.notificationurl +'/toUser', notification, {headers});
  }

  MaterialRateNotification(tm: TeachingMaterial): Observable<Notification> {
    let notification: Notification = {
      head: 'New Rating on your material!',
      body: 'A student has evaluated the material: ' + tm.name,
      token_topic: tm.user.email,
    };
    return this.http.post<Notification>(this.notificationurl +'/toUser', notification, {headers});
  }

}
