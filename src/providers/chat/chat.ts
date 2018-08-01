import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import * as firebase from "firebase";

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

  saveMessage(teaching_name: string, msgbody: string, sender: string, type: string, receiver: string) {
    //Take index of messages
    firebase.database().ref('/'+teaching_name+'/').once('value',
      function(snapshot) {
        let index = snapshot.child('messages').numChildren();
        //Prepare data to be stored
        let postData = {
          body: msgbody,
          sender: sender,
          type: type,
          receiver: receiver
        };
        let updates = {};
        updates['/'+teaching_name+'/messages/'+ index] = postData;
        firebase.database().ref().update(updates);
        //Call backend to send push notification
        if ( type == 'private') {
          //send messageto user -> "" -> """ to a particular user
        }
        if ( type == 'public') {
          //send message to topic -> call backend service -> push notification to all participants
        }
      });
  }

}
