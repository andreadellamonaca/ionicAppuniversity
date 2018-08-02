import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import {User} from "../models/User";
import {ProfessorPage} from "../pages/professor/professor";
import {StudentPage} from "../pages/student/student";
import {DailyLecturesPage} from "../pages/daily-lectures/daily-lectures";
import {ChatListPage} from "../pages/chat-list/chat-list";
import {FcmProvider} from "../providers/fcm/fcm";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  currentUser: User;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public fcm: FcmProvider) {

    localStorage.removeItem('currentUser');
    this.initializeApp();

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.currentUser);
    if (this.currentUser != null) {
      console.log('this.currentUser not null');
      if (this.currentUser.usertype.typeName == 'professor') {
        console.log('rootpage for prof');
        this.rootPage = ProfessorPage;
      } else {
        console.log('rootpage for stud');
        this.rootPage = StudentPage;
      }
    }
    this.pages = [
      { title: 'Home', component: this.rootPage },
      { title: 'Daily Lectures', component: DailyLecturesPage },
      { title: 'Chat List', component: ChatListPage },
      { title: 'Teaching List', component: null}
      ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    this.fcm.removeToken().subscribe(data =>{
      console.log('Removed session!');
      localStorage.removeItem('currentUser');
      this.nav.setRoot(HomePage);
    });
  }
}
