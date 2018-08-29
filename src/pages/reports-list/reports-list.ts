import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ReportProvider} from "../../providers/report/report";
import {User} from "../../models/User";
import {Report} from "../../models/Report";

/**
 * Generated class for the ReportsListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reports-list',
  templateUrl: 'reports-list.html',
})
export class ReportsListPage {
  current: User;
  rlist: Report[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public reportService: ReportProvider) {
    this.current = JSON.parse(localStorage.getItem('currentUser'));
    this.reportService.getReportsByIdProfessor(this.current.idUser).subscribe(list => {
      this.rlist = list;
      console.log(this.rlist.length);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportsListPage');
  }

}
