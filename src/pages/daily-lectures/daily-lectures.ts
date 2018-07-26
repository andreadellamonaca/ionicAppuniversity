import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";
import {LectureProvider} from "../../providers/lecture/lecture";
import {User} from "../../models/User";
import {Lecture} from "../../models/Lecture";

/**
 * Generated class for the DailyLecturesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-daily-lectures',
  templateUrl: 'daily-lectures.html',
})
export class DailyLecturesPage {

  currentUser: User;
  currentdate = new Date();
  date = this.currentdate.getFullYear() + "-" + (this.currentdate.getMonth()+1)  + "-" + this.currentdate.getDate();
  lectures: Lecture[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public lectureProvider: LectureProvider) {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.lectureProvider.getDailyLecturesByDate_IdUser(this.date, this.currentUser).subscribe(data => {
      console.log(data);
      this.lectures = data;
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DailyLecturesPage');
  }

}
