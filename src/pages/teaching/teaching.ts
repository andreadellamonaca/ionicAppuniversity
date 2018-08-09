import {Component} from '@angular/core';
import {
  AlertController,
  IonicPage,
  ModalController,
  NavController,
  NavParams,
  Platform,
  ViewController
} from 'ionic-angular';
import {Teaching} from "../../models/Teaching";
import {Lecture} from "../../models/Lecture";
import {LectureProvider} from "../../providers/lecture/lecture";
import {LectureSatisfactionProvider} from "../../providers/lecture-satisfaction/lecture-satisfaction";
import {User} from "../../models/User";
import {LectureSatisfaction} from "../../models/LectureSatisfaction";
import {TeachingMaterialProvider} from "../../providers/teaching-material/teaching-material";
import {TeachingMaterial} from "../../models/TeachingMaterial";
import {MaterialSatisfactionProvider} from "../../providers/material-satisfaction/material-satisfaction";
import {MaterialSatisfaction} from "../../models/MaterialSatisfaction";
import {File, FileEntry} from '@ionic-native/file';
import {HttpResponse} from "@angular/common/http";
import {LocalNotifications} from "@ionic-native/local-notifications";

declare var cordova: any;

/**
 * Generated class for the TeachingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teaching',
  templateUrl: 'teaching.html',
})
export class TeachingPage {
  current: User;
  teaching: Teaching;
  lectures: Lecture[] = [];
  rating: LectureSatisfaction;
  materialrating: MaterialSatisfaction;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public lectureProvider: LectureProvider,
              public lsProvider: LectureSatisfactionProvider,
              public modalCtrl: ModalController,
              public tmProvider: TeachingMaterialProvider,
              public msProvider: MaterialSatisfactionProvider,
              public file: File,
              public alertctrl: AlertController,
              public localnotif: LocalNotifications) {

    this.teaching = this.navParams.get('Teaching');

    this.lectureProvider.getLecturesByIdTeaching(this.teaching.idTeaching).subscribe(lectureslist => {
      this.lectures = lectureslist;
      for (let i of this.lectures) {
        i.hide_material = false;
      }
    });
    this.current = JSON.parse(localStorage.getItem('currentUser'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeachingPage');
  }

  RateLecture(l: Lecture) {
    this.lsProvider.getLectureSatisfactionByIdUserAndIdLecture(this.current.idUser, l.idLecture).subscribe(getrating => {
      this.rating = getrating;
      let modal = this.modalCtrl.create(LectureRatingPage, {sat: this.rating, lecture: l});
      modal.present();
    });
  }

  showMaterial(l: Lecture) {
    this.tmProvider.getTeachingMaterialByIdLecture(l.idLecture).subscribe(data => {
      l.tmaterials = data;
      l.hide_material = !l.hide_material;
    });
  }

  RateMaterial(tm: TeachingMaterial) {
    this.msProvider.getMaterialSatisfactionByIdUserAndIdMaterial(this.current.idUser, tm.idTeachingMaterial).subscribe(getrating => {
      this.materialrating = getrating;
      let modal = this.modalCtrl.create(MaterialRatingPage, {msat: this.materialrating, tmaterial: tm});
      modal.present();
    })
  }

  downloadMaterial(tm: TeachingMaterial) {
    if (tm.type != "link") {
      this.tmProvider.download(tm).subscribe((res: HttpResponse<Object>) => {
        console.log(res);
        const contentType = res.headers.get('Content-Type');
        const blob: Blob = new Blob([res.body], {
          type: contentType
        });
        console.log(cordova.file.dataDirectory);
        this.file.writeFile(cordova.file.externalRootDirectory + '/Download/', tm.name, blob, {replace: true})
          .then((fileEntry: FileEntry) => {
            this.localnotif.schedule({
              title: 'Downloaded ' + tm.name,
              text: 'Download completed at' + fileEntry.toURL()
            });
          }).catch(err =>  this.showAlert("Error: " + err))
      }, error => this.showAlert("Error: " + error));
    }
  }

  showAlert(message: string) {
    let alert = this.alertctrl.create({
      title: 'Download Error!',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }
}

@Component({
  template: `
<ion-header>
  <ion-toolbar>
    <ion-title>
      Rate the lecture
    </ion-title>
    <ion-buttons start>
      <button ion-button (click)="dismiss()">
        <span ion-text color="primary" showWhen="ios">Cancel</span>
        <ion-icon name="md-close" showWhen="android, windows"></ion-icon>
      </button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>
<ion-content>
  <ion-card text-center>
    <ion-item>
      <ion-input class="note" type="textarea" [(ngModel)]="ratingnote" placeholder="Insert a note:"></ion-input>
    </ion-item>
    <ion-item>
      <rating class="ratingelem" [(ngModel)]="rate" readOnly="false" max="5" emptyStarIconName="star-outline" halfStarIconName="star-half"
      starIconName="star" nullable="false"></rating>
    </ion-item>
    <button class="confirmbtn" ion-button [disabled]="ratingnote == ''" (click)="saveRating()" round>Confirm rating!</button>
  </ion-card>
</ion-content>
`
})
export class LectureRatingPage {
  rate: number;
  ratingnote: string;
  ls: LectureSatisfaction = {};
  current: User;
  lecture: Lecture;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public lsProvider: LectureSatisfactionProvider) {
    this.current = JSON.parse(localStorage.getItem('currentUser'));
    if (this.params.get('sat') != null) {
      this.ls = this.params.get('sat');
      this.rate = this.ls.level;
      this.ratingnote = this.ls.note;
    } else {
      this.rate = 3;
      this.ratingnote = '';
    }
    this.lecture = this.params.get('lecture');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  saveRating() {
    if (this.params.get('sat') == null) {
      let lectsat: LectureSatisfaction = {
        level: this.rate,
        note: this.ratingnote,
        user: this.current,
        lecture: this.lecture
      };
      this.lsProvider.saveLectureSatisfaction(lectsat).subscribe(data => {
        console.log(data);
        this.dismiss();
      });
    } else {
      this.ls.level = this.rate;
      this.ls.note = this.ratingnote;
      this.ls.user.idUser = this.current.idUser;
      this.ls.lecture.idLecture = this.lecture.idLecture;
      this.lsProvider.saveLectureSatisfaction(this.ls).subscribe(data => {
        console.log(data);
        this.dismiss();
      });
    }
  }
}

@Component({
  template: `
<ion-header>
  <ion-toolbar>
    <ion-title>
      Rate the Material
    </ion-title>
    <ion-buttons start>
      <button ion-button (click)="dismiss()">
        <span ion-text color="primary" showWhen="ios">Cancel</span>
        <ion-icon name="md-close" showWhen="android, windows"></ion-icon>
      </button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>
<ion-content>
  <ion-card text-center>
    <ion-item>
      <ion-input class="note" type="textarea" [(ngModel)]="ratingnote" placeholder="Insert a note:"></ion-input>
    </ion-item>
    <ion-item>
      <rating class="ratingelem" [(ngModel)]="rate" readOnly="false" max="5" emptyStarIconName="star-outline" halfStarIconName="star-half"
      starIconName="star" nullable="false"></rating>
    </ion-item>
    <button class="confirmbtn" ion-button [disabled]="ratingnote == ''" (click)="saveRating()" round>Confirm rating!</button>
  </ion-card>
</ion-content>
`
})
export class MaterialRatingPage {
  rate: number;
  ratingnote: string;
  ms: MaterialSatisfaction = {};
  current: User;
  tm: TeachingMaterial;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public msProvider: MaterialSatisfactionProvider) {
    this.current = JSON.parse(localStorage.getItem('currentUser'));
    if (this.params.get('msat') != null) {
      this.ms = this.params.get('msat');
      this.rate = this.ms.level;
      this.ratingnote = this.ms.note;
    } else {
      this.rate = 3;
      this.ratingnote = '';
    }
    this.tm = this.params.get('tmaterial');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  saveRating() {
    if (this.params.get('msat') == null) {
      let msat: MaterialSatisfaction = {
        level: this.rate,
        note: this.ratingnote,
        user: this.current,
        teachingmaterial: this.tm
      };
      this.msProvider.saveMaterialSatisfaction(msat).subscribe(data => {
        console.log(data);
        this.dismiss();
      });
    } else {
      this.ms.level = this.rate;
      this.ms.note = this.ratingnote;
      this.ms.user.idUser = this.current.idUser;
      this.ms.teachingmaterial.idTeachingMaterial = this.tm.idTeachingMaterial;
      this.msProvider.saveMaterialSatisfaction(this.ms).subscribe(data => {
        console.log(data);
        this.dismiss();
      });
    }
  }
}
