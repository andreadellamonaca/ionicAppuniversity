import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ProfessorPage} from "../pages/professor/professor";
import {StudentPage} from "../pages/student/student";
import { UserProvider } from '../providers/user/user';
import {AngularFireModule} from "angularfire2";
import {HttpClientModule} from "@angular/common/http";
import {AngularFireAuthModule} from "angularfire2/auth";
import { LectureProvider } from '../providers/lecture/lecture';
import {DailyLecturesPage} from "../pages/daily-lectures/daily-lectures";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCQbyB93ekd6kc07TAIznp99C8z2iR3hV4",
  authDomain: "ionicapp-914d5.firebaseapp.com",
  databaseURL: "https://ionicapp-914d5.firebaseio.com",
  projectId: "ionicapp-914d5",
  storageBucket: "",
  messagingSenderId: "960737054102"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProfessorPage,
    StudentPage,
    DailyLecturesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProfessorPage,
    StudentPage,
    DailyLecturesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    LectureProvider
  ]
})
export class AppModule {}
