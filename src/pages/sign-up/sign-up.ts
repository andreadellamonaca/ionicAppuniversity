import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {StudycourseProvider} from "../../providers/studycourse/studycourse";
import {StudyCourse} from "../../models/StudyCourse";
import {UserProvider} from "../../providers/user/user";
import {User} from "../../models/User";
import {UserType} from "../../models/UserType";
import {TeachingProvider} from "../../providers/teaching/teaching";
import {Teaching} from "../../models/Teaching";
import {HomePage} from "../home/home";

/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  sclist: StudyCourse[] = [];
  selectedsc: number;
  @ViewChild('email') email;
  @ViewChild('pwd') password;
  @ViewChild('name') name;
  @ViewChild('surname') surname;
  usermodel: User = {};
  tlist: Teaching[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public scService: StudycourseProvider, public userService: UserProvider,
              public alertCtrl: AlertController, public teachingService: TeachingProvider) {
    this.scService.getAll().subscribe(list => {
      this.sclist = list;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  showConfirm() {
    const confirm = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Do you want to subscribe with these data?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.register();
          }
        }
      ]
    });
    confirm.present();
  }

  register() {
    console.log('registro');
    if (/^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test(this.email.value)) {
      this.usermodel.name = this.name.value;
      this.usermodel.surname = this.surname.value;
      this.usermodel.email = this.email.value;
      this.usermodel.password = this.password.value;
      this.usermodel.courseYear = 1;
      let sc: StudyCourse = {idStudyCourse: this.selectedsc};
      this.usermodel.studycourse = sc;
      let ut: UserType = {idUserType: 1, typeName: 'student'};
      this.usermodel.usertype = ut;
      this.userService.save(this.usermodel).subscribe(data => {
        console.log(data);
        this.usermodel = data;
        this.teachingService.getTeachingsByIdStudyCourse(this.selectedsc).subscribe(list => {
          console.log(list);
          this.usermodel.teachings = list;
          this.userService.subscribetoteaching(this.usermodel).subscribe(data => {
            console.log(data);
            this.navCtrl.setRoot(HomePage);
          });
        })
      },error1 => {this.showAlert('Error! Email already used or form is not completed!')});
    } else {
      this.showAlert('Error! Bad email!');
    }
  }

  showAlert(message: string) {
    let alert = this.alertCtrl.create({
      title: 'Sign In!',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

}
