import {Component} from '@angular/core';
import {
  AlertController,
  IonicPage,
  ModalController,
  NavController,
  NavParams,
  Platform, ToastController,
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
import {NotificationProvider} from "../../providers/notification/notification";
import {InAppBrowser} from "@ionic-native/in-app-browser";

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
  rating: LectureSatisfaction = {};

  constructor(public navParams: NavParams,
              public lectureProvider: LectureProvider,
              public lsProvider: LectureSatisfactionProvider,
              public modalCtrl: ModalController,
              public file: File,
              public alertctrl: AlertController) {

    this.teaching = this.navParams.get('Teaching');

    this.lectureProvider.getLecturesByIdTeaching(this.teaching.idTeaching).subscribe(lectureslist => {
      this.lectures = lectureslist;
      for (let i of this.lectures) {
        i.hide_material = false;
        this.lsProvider.getAverageRatingByIdLecture(i.idLecture).subscribe(rate =>{
          i.av_rating = rate;
        });
      }
      console.log(this.lectures);
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
    },error1 => {
      let modal = this.modalCtrl.create(LectureRatingPage, {sat: null, lecture: l});
      modal.present();
    });
  }

  showMaterial(l: Lecture) {
    let modal = this.modalCtrl.create(MaterialListPage, {lecture: l});
    modal.present();
  }

  showAllRatings(id: number, sattype: string) {
    let modal = this.modalCtrl.create(RatingListPage, {idobject: id, type: sattype});
    modal.present();
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
    <button class="confirmbtn" ion-button [disabled]="ratingnote == '' || ratingnote == null" (click)="saveRating()" round>Confirm rating!</button>
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
    public lsProvider: LectureSatisfactionProvider,
    public notProvider: NotificationProvider) {

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
        this.notProvider.LectureRateNotification(lectsat.lecture).subscribe(data => {
          console.log('returned: '+ data);
        });
        this.dismiss();
      });
    } else {
      this.ls.level = this.rate;
      this.ls.note = this.ratingnote;
      this.ls.user.idUser = this.current.idUser;
      this.ls.lecture.idLecture = this.lecture.idLecture;
      this.lsProvider.saveLectureSatisfaction(this.ls).subscribe(data => {
        console.log(data);
        this.notProvider.LectureRateNotification(this.lecture).subscribe(data => {
          console.log('returned: '+ data);
        });
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
    public msProvider: MaterialSatisfactionProvider,
    public notProvider: NotificationProvider) {

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
        this.notProvider.MaterialRateNotification(msat.teachingmaterial).subscribe(data => {
          console.log(data);
        });
        this.dismiss();
      });
    } else {
      this.ms.level = this.rate;
      this.ms.note = this.ratingnote;
      this.ms.user.idUser = this.current.idUser;
      this.ms.teachingmaterial.idTeachingMaterial = this.tm.idTeachingMaterial;
      this.msProvider.saveMaterialSatisfaction(this.ms).subscribe(data => {
        console.log(data);
        this.notProvider.MaterialRateNotification(this.ms.teachingmaterial).subscribe(data => {
          console.log(data);
        });
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
      Rating list
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
  <ion-grid>
    <ion-row>
      <ion-col>#</ion-col>
      <ion-col>Level</ion-col>
      <ion-col>Note</ion-col>
    </ion-row>
    <ion-row *ngFor="let i of lectlist; let num = index">
      <ion-col>{{ num+1 }}</ion-col>
      <ion-col>{{ i.level }}</ion-col>
      <ion-col>{{ i.note }}</ion-col>
    </ion-row>
    <ion-row *ngFor="let i of matlist; let num = index">
      <ion-col>{{ num+1 }}</ion-col>
      <ion-col>{{ i.level }}</ion-col>
      <ion-col>{{ i.note }}</ion-col>
    </ion-row>
  </ion-grid>
</ion-content>
`
})
export class RatingListPage {

  lectlist: LectureSatisfaction[] = [];
  matlist: MaterialSatisfaction[] = [];

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public lsProvider: LectureSatisfactionProvider,
    public msProvider: MaterialSatisfactionProvider) {

    if (this.params.get('type') == 'lecture') {
      this.lsProvider.getLectureSatisfactionByIdLecture(this.params.get('idobject')).subscribe(list => {
        this.lectlist = list;
      })
    } else {
      this.msProvider.getMaterialSatisfactionByIdMaterial(this.params.get('idobject')).subscribe(list => {
        this.matlist = list;
      })
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}

@Component({
  template: `
<ion-header>
  <ion-toolbar>
    <ion-title>
      Teaching Material list
    </ion-title>
    <ion-buttons start>
      <button ion-button (click)="dismiss()">
        <span ion-text color="primary" showWhen="ios">Cancel</span>
        <ion-icon name="md-undo" showWhen="android, windows"></ion-icon>
      </button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>
<ion-content>
  <ion-card *ngFor="let tm of l.tmaterials">
    <ion-item>
      <h2>{{ tm.name }}</h2>
      <p>{{ tm.type }}</p>
      <p *ngIf="current.usertype.typeName == 'professor'">Average Rating: <rating class="ratingelem" [(ngModel)]="tm.av_rating" readOnly="true" 
        max="5" emptyStarIconName="star-outline" halfStarIconName="star-half" starIconName="star" nullable="false"></rating></p>
    </ion-item>
    <ion-row>
      <ion-col>
        <button ion-button icon-start clear small *ngIf="tm.type != 'link'" (click)="downloadMaterial(tm)">
          <ion-icon name="download"></ion-icon>
          <div>Download</div>
        </button>
        <button ion-button icon-start clear small *ngIf="tm.type == 'link'" (click)="openLink(tm)">
          <ion-icon name="open"></ion-icon>
          <div>Open</div>
        </button>
      </ion-col>
      <ion-col>
        <button ion-button icon-start clear small (click)="RateMaterial(tm)" *ngIf="current.usertype.typeName != 'professor'">
          <ion-icon name="text"></ion-icon>
          <div>Rate</div>
        </button>
        <button ion-button icon-start clear small (click)="showAllRatings(tm.idTeachingMaterial, 'material')" *ngIf="current.usertype.typeName == 'professor'">
        <ion-icon name="text"></ion-icon>
        <div>Ratings List</div>
      </button>
      </ion-col>
      <ion-col center text-center>
        <ion-note>
          #{{ l.tmaterials.indexOf(tm)+1 }}
        </ion-note>
      </ion-col>
    </ion-row>

  </ion-card>
</ion-content>
`
})
export class MaterialListPage {
  l: Lecture;
  current: User;
  materialrating: MaterialSatisfaction;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public tmProvider: TeachingMaterialProvider,
    public msProvider: MaterialSatisfactionProvider,
    public alertctrl: AlertController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public file: File,
    public localnotif: LocalNotifications,
    private iab: InAppBrowser) {

    this.l = this.params.get('lecture');
    this.current = JSON.parse(localStorage.getItem('currentUser'));
    this.tmProvider.getTeachingMaterialByIdLecture(this.l.idLecture).subscribe(data => {
      this.l.tmaterials = data;
      this.l.hide_material = !this.l.hide_material;
      for (let i of this.l.tmaterials) {
        this.msProvider.getAverageRatingByIdMaterial(i.idTeachingMaterial).subscribe(rate =>{
          i.av_rating = rate;
        });
      }
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  RateMaterial(tm: TeachingMaterial) {
    this.msProvider.getMaterialSatisfactionByIdUserAndIdMaterial(this.current.idUser, tm.idTeachingMaterial).subscribe(getrating => {
      this.materialrating = getrating;
      let modal = this.modalCtrl.create(MaterialRatingPage, {msat: this.materialrating, tmaterial: tm});
      modal.present();
    },error1 => {
      let modal = this.modalCtrl.create(MaterialRatingPage, {msat: null, tmaterial: tm});
      modal.present();
    })
  }

  downloadMaterial(tm: TeachingMaterial) {
    if (tm.type != "link") {
      this.tmProvider.download(tm).subscribe((res: HttpResponse<Object>) => {
        const contentType = res.headers.get('Content-Type');
        const blob: Blob = new Blob([res.body], { type: contentType });
        this.file.writeFile(cordova.file.externalRootDirectory + '/Download/', tm.name, blob, {replace: true})
          .then((entry: FileEntry) => {
            const toast = this.toastCtrl.create({
              message: 'Download completed in Download folder',
              duration: 7000
            });
            toast.present();
            /*this.localnotif.schedule({
              title: 'Downloaded ' + tm.name,
              text: 'Download completed in Download folder.'
            });*/
          }).catch(err =>  this.showAlert("Error: " + err))
      }, error => this.showAlert("Error: " + error));
    }
  }

  openLink(tm: TeachingMaterial) {
    const browser = this.iab.create(tm.link);
    browser.show();
  }

  showAlert(message: string) {
    let alert = this.alertctrl.create({
      title: 'Download Error!',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  showAllRatings(id: number, sattype: string) {
    let modal = this.modalCtrl.create(RatingListPage, {idobject: id, type: sattype});
    modal.present();
  }

}
