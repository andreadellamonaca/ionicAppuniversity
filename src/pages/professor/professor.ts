import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Platform, ToastController} from 'ionic-angular';
import {User} from "../../models/User";
import {FcmProvider} from "../../providers/fcm/fcm";
import {tap} from "rxjs/operators";
import {TeachingProvider} from "../../providers/teaching/teaching";
import {ReportsListPage} from "../reports-list/reports-list";
import {NotificationManager} from "../../NotificationManager";

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
  notifManager: NotificationManager;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public fcm: FcmProvider,
              public platform: Platform,
              public toastCtrl: ToastController,
              public teachingProvider: TeachingProvider) {
    this.current = JSON.parse(localStorage.getItem('currentUser'));
    this.notifManager = new NotificationManager(this.platform,this.navCtrl);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfessorPage');
    if (this.platform.is('cordova')) {
      this.fcm.getToken();
      //Listen to single notification
      this.fcm.listenToNotifications().pipe(
        tap(msg => {
          // show a toast
          const toast = this.toastCtrl.create({
            message: msg.body,
            duration: 3000
          });
          toast.present();
        })
      ).subscribe(data => {
        this.notifManager.handle(data);
      });
      //Listen to topics (its teachings)
      this.teachingProvider.getTeachingsByIdUser(this.current).subscribe(teachingslist => {
        for (let i of teachingslist) {
          this.fcm.subscribeToTopic(i.name.replace(' ', '_')).pipe(
            tap(msg => {
              // show a toast
              const toast = this.toastCtrl.create({
                message: msg.body,
                duration: 3000
              });
              toast.present();
            })
          ).subscribe();
        }
      })
    }
  }

  gotoreports() {
    this.navCtrl.push(ReportsListPage);
  }

}
