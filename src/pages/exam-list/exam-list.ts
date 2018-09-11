import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {User} from "../../models/User";
import {Exam} from "../../models/Exam";
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapOptions,
  Marker
} from '@ionic-native/google-maps';
import {TeachingProvider} from "../../providers/teaching/teaching";
import {Teaching} from "../../models/Teaching";
import {ExamProvider} from "../../providers/exam/exam";

/**
 * Generated class for the ExamListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-exam-list',
  templateUrl: 'exam-list.html',
})
export class ExamListPage {

  currentUser: User;
  tlist: Teaching[] = [];
  examslist: Exam[] = [];
  show: boolean = false;
  map: GoogleMap;
  currentdate = new Date();

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public platform: Platform, public teachingProvider: TeachingProvider, public examProvider: ExamProvider) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.teachingProvider.getTeachingsByIdUser(this.currentUser).subscribe(list => {
      if (this.currentUser.usertype.typeName == 'student') {
        for (const i of list) {
          if (i.courseYear <= this.currentUser.courseYear) {
            this.tlist.push(i);
          }
        }
      } else {
        this.tlist = list;
      }
      for (let i of this.tlist) {
        this.examProvider.getExamsByIdTeaching(i.idTeaching).subscribe(elist => {
          console.log(elist);
          for (const j of elist) {
            const data = new Date(j.date);
            if (data.getTime() >= this.currentdate.getTime()) {
              this.examslist.push(j);
            }
          }
          this.examslist.sort((a,b) => a.date <= b.date ? -1 : 1 );
        });
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExamListPage');
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
