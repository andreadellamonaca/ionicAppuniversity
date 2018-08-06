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
import {AngularFireDatabaseModule} from "angularfire2/database";
import { LectureProvider } from '../providers/lecture/lecture';
import {DailyLecturesPage} from "../pages/daily-lectures/daily-lectures";
import {ChatListPage} from "../pages/chat-list/chat-list";
import { TeachingProvider } from '../providers/teaching/teaching';
import {ChatPage} from "../pages/chat/chat";
import { ChatProvider } from '../providers/chat/chat';
import {AngularFireDatabase} from "angularfire2/database-deprecated";
import {Firebase} from "@ionic-native/firebase";
import { FcmProvider } from '../providers/fcm/fcm';
import {AngularFirestore, AngularFirestoreModule} from "angularfire2/firestore";
import {TeachingListPage} from "../pages/teaching-list/teaching-list";
import {TeachingPage} from "../pages/teaching/teaching";
import { LectureSatisfactionProvider } from '../providers/lecture-satisfaction/lecture-satisfaction';
import { Ionic2RatingModule } from 'ionic2-rating';

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
    DailyLecturesPage,
    ChatListPage,
    ChatPage,
    TeachingListPage,
    TeachingPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFirestoreModule,
    HttpClientModule,
    AngularFireDatabaseModule,
    Ionic2RatingModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProfessorPage,
    StudentPage,
    DailyLecturesPage,
    ChatListPage,
    ChatPage,
    TeachingListPage,
    TeachingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    LectureProvider,
    TeachingProvider,
    ChatProvider,
    AngularFireDatabase,
    Firebase,
    AngularFirestore,
    FcmProvider,
    LectureSatisfactionProvider
  ]
})
export class AppModule {}
