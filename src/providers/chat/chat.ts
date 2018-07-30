import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database-deprecated";

/*
  Generated class for the ChatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatProvider {

  constructor(public http: HttpClient,
              public db: AngularFireDatabase) {
    console.log('Hello ChatProvider Provider');
  }

  saveMessage() {
    this.db.list('/chats').push({chatname: "Software Engineering", messages: "[]"});
  }

}
