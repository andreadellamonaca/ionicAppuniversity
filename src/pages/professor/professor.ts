import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from "../../models/User";
import {FcmProvider} from "../../providers/fcm/fcm";

/**
 * Generated class for the ProfessorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-professor',
  templateUrl: 'professor.html',
})
export class ProfessorPage {

  current: User = {};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public fcm: FcmProvider) {
    this.current = JSON.parse(localStorage.getItem('currentUser'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfessorPage');
    this.fcm.getToken();
  }

}
