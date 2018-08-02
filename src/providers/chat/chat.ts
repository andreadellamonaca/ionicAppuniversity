import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import * as firebase from "firebase";
import {Variables} from "../../Variables";
import {Notification} from "../../models/Notification";
import {Observable} from "rxjs/Observable";
import {map} from "rxjs/operators";

/*
  Generated class for the ChatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const headers = new HttpHeaders({'Content-Type' : 'application/json'});

@Injectable()
export class ChatProvider {

  notificationurl = `${Variables.ServerURL}/notification`;

  constructor(public http: HttpClient,
              public db: AngularFireDatabase) {
    console.log('Hello ChatProvider Provider');
  }

  saveMessage(teaching_name: string, msgbody: string, sender: string, type: string, receiver: string) {
    //Take index of messages
    let protocol = this.http;
    let url = this.notificationurl;
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
          console.log('Creo notifica privata');
          let notification: Notification = {
            head: teaching_name + ' [Private]',
            body: sender + ': ' + msgbody,
            token_topic: receiver,
          };
          console.log(notification);
          protocol.post<Notification>(url +'/toUser', notification, {headers}).subscribe(data => {
            console.log('returned: '+ data);
          })
        }
        if ( type == 'public') {
          console.log('Creo notifica pubblica');
          let notification: Notification = {
            head: teaching_name,
            body: sender + ': ' + msgbody,
            token_topic: teaching_name,
          };
          console.log(notification);
          protocol.post<Notification>(url +'/toTopic', notification, {headers}).subscribe(data => {
            console.log('returned: '+ data);
          });
        }
      });
  }

}
