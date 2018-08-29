import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Teaching} from "../../models/Teaching";
import {User} from "../../models/User";
import {TeachingProvider} from "../../providers/teaching/teaching";
import {TeachingPage} from '../teaching/teaching';

/**
 * Generated class for the TeachingListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teaching-list',
  templateUrl: 'teaching-list.html',
})
export class TeachingListPage {

  currentUser: User;
  teachings: Teaching[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public teachingProvider: TeachingProvider) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.teachingProvider.getTeachingsByIdUser(this.currentUser).subscribe(teachingslist => {
      if (this.currentUser.usertype.typeName == 'student') {
        for (const i of teachingslist) {
          if (i.courseYear <= this.currentUser.courseYear) {
            this.teachings.push(i);
          }
        }
      } else {
        this.teachings = teachingslist;
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeachingListPage');
  }

  openTeaching(teaching: Teaching) {
    this.navCtrl.setRoot(TeachingPage, {Teaching: teaching})
  }

}
