import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from "../../models/User";
import {FcmProvider} from "../../providers/fcm/fcm";

/**
 * Generated class for the StudentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-student',
  templateUrl: 'student.html',
})
export class StudentPage {

  current: User;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public fcm: FcmProvider) {
    this.current = JSON.parse(localStorage.getItem('currentUser'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudentPage');
    this.fcm.getToken();
  }

}
