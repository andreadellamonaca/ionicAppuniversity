import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Teaching} from "../../models/Teaching";
import {ChatProvider} from "../../providers/chat/chat";
import {User} from "../../models/User";


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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public chatProvider: ChatProvider) {

    this.teaching = this.navParams.get('Teaching');
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  sendMessage() {
    this.chatProvider.saveMessage();
    console.log(this.currentUser.name +'send:' + this.msgbody);
  }

}
