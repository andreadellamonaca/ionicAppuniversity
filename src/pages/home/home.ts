import {Component, ViewChild} from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {UserProvider} from "../../providers/user/user";
import {ProfessorPage} from "../professor/professor";
import {StudentPage} from "../student/student";
import {User} from "../../models/User";
import {FcmProvider} from "../../providers/fcm/fcm";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('email') email;
  @ViewChild('password') password;
  user: User;

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public userProvider: UserProvider) { }

  LogInUser() {
    this.userProvider.checkUserCredentials(this.email.value, this.password.value).then(data => {
      console.log(data);
      this.user = data;
      localStorage.setItem('currentUser', JSON.stringify(this.user));
      if (this.user.usertype.typeName == 'professor') {
        console.log('PROFESSOR');
        this.navCtrl.setRoot(ProfessorPage);
      } else if (this.user.usertype.typeName == 'student') {
        console.log('STUDENT');
        this.navCtrl.setRoot(StudentPage);
      } else {this.showAlert('You are not sign up!');}
    }).catch(err => { console.log(err.message);});

    /*
        this.fireAuth.auth.signInWithEmailAndPassword(this.email.value, this.password.value).then(data => {
            console.log(data);
            data.user.getIdTokenResult(true).then(result => {
              console.log(result);

            });
            //this.navCtrl.push(null, {param: data.user.email});
            this.showAlert('Successful logged in!');
        })
          .catch(err => {
            console.log(err.message);
            this.showAlert(err.message);
          });
    */
  }

  showAlert(message: string) {
    let alert = this.alertCtrl.create({
      title: 'Login!',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }
}
