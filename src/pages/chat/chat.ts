import {Component, ElementRef, ViewChild} from '@angular/core';
import {Content, IonicPage, NavController, NavParams} from 'ionic-angular';
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
  @ViewChild('content') content: Content;
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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
    this.userProvider.getUsersByIdTeaching(this.teaching.idTeaching).subscribe(list => {
      for (let i of list) {
        if (i.idUser != this.currentUser.idUser) {
          this.participants.push(i);
        }
      }
    })
  }

  goBottom() {
    this.content.scrollToBottom(0);
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
    this.chatProvider.saveMessage(this.teaching, this.msgbody, this.currentUser.email, type, this.receiver);
    this.msgbody = "";
  }

}
