import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from "../../models/User";
import {TeachingProvider} from "../../providers/teaching/teaching";
import {Teaching} from "../../models/Teaching";
import {ChatPage} from "../chat/chat";

/**
 * Generated class for the ChatListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat-list',
  templateUrl: 'chat-list.html',
})
export class ChatListPage {

  currentUser: User;
  teachings: Teaching[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public teachingProvider: TeachingProvider) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.teachingProvider.getTeachingsByIdUser(this.currentUser).subscribe(teachingslist => {
      this.teachings = teachingslist;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatListPage');
  }

  openChat(teaching: Teaching) {
    this.navCtrl.setRoot(ChatPage, {Teaching: teaching})
  }

}
