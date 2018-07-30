import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Teaching} from "../../models/Teaching";
import {ChatProvider} from "../../providers/chat/chat";
import {User} from "../../models/User";
import {UserProvider} from "../../providers/user/user";
import {AngularFireDatabase} from "angularfire2/database";
import {Message} from "../../models/Message";
import * as firebase from "firebase";


/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  currentUser: User;
  teaching: Teaching;
  msgbody: string = "";
  receiver: string = "public";
  participants: User[] = [];
  messages: Message[] = [];
  msg: Message;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public chatProvider: ChatProvider,
              public userProvider: UserProvider,
              public db: AngularFireDatabase) {

    this.teaching = this.navParams.get('Teaching');
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.db.list('/'+this.teaching.name+'/messages').valueChanges().subscribe(data =>{
      this.messages = JSON.parse(JSON.stringify(data));
      console.log(this.messages);
    });
    this.userProvider.getUsersByTeachingName(this.teaching.name).subscribe(list => {
      list.splice(list.indexOf(this.currentUser),1);
      this.participants = list;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  sendMessage() {
    let type = '';
    if (this.receiver == 'public') {
      type = 'public';
    } else {
      type = 'private';
    }
    console.log('RECEIVER:' +this.receiver);
    console.log('TYPE:' + type);
    this.chatProvider.saveMessage(this.teaching.name, this.msgbody, this.currentUser.email, type, this.receiver);
  }

}
