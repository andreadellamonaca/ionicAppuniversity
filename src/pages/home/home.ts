import {Component, ViewChild} from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";
import {ProfessorPage} from "../professor/professor";
import {StudentPage} from "../student/student";
import {User} from "../../models/User";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('email') email;
  @ViewChild('password') password;
  user: User;
  current: User;

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public userProvider: UserProvider) {
    this.current = JSON.parse(localStorage.getItem('currentUser'));
    if (this.current != null) {
      if (this.current.usertype.typeName == 'professor') {
        console.log('PROFESSOR');
        this.navCtrl.setRoot(ProfessorPage);
      } else if (this.current.usertype.typeName == 'student') {
        console.log('STUDENT');
        this.navCtrl.setRoot(StudentPage);
      }
    }
  }

  LogInUser() {
    this.userProvider.checkUserCredentials(this.email.value, this.password.value).subscribe(data => {
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
    }, err =>{
      this.showAlert('Error! Your credentials are wrong!');
      console.log(err.message);});
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
