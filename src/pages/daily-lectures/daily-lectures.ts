import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {LectureProvider} from "../../providers/lecture/lecture";
import {User} from "../../models/User";
import {Lecture} from "../../models/Lecture";
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';

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
  show: boolean = false;
  map: GoogleMap;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public lectureProvider: LectureProvider,
              public platform: Platform) {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.lectureProvider.getDailyLecturesByDate_IdUser(this.date, this.currentUser).subscribe(data => {
      console.log(data);
      if (this.currentUser.usertype.typeName == 'student') {
        for (const i of data) {
          if (i.teaching.courseYear <= this.currentUser.courseYear) {
            this.lectures.push(i);
          }
        }
      } else {
        this.lectures = data;
      }
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DailyLecturesPage');
  }

  showMap(latitude: number, longitude: number, name: string) {
    this.show = !this.show;
    console.log(latitude + ' ' + longitude);
    if (this.show == true) {
      this.platform.ready().then(() => {
        this.loadMap(latitude, longitude, name);
      });
    }
  }

  loadMap(latitude: number, longitude: number, name: string) {
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: latitude,
          lng: longitude
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    let marker: Marker = this.map.addMarkerSync({
      title: name,
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: latitude,
        lng: longitude
      }
    });
  }

}
