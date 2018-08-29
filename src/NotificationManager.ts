import {NavController, Platform} from "ionic-angular";
import {Teaching} from "./models/Teaching";
import {ChatPage} from "./pages/chat/chat";
import {MaterialListPage, RatingListPage, TeachingPage} from "./pages/teaching/teaching";
import {Lecture} from "./models/Lecture";
import {TeachingMaterial} from "./models/TeachingMaterial";
import {ReportsListPage} from "./pages/reports-list/reports-list";

export class NotificationManager {

  constructor(
    private platform: Platform,
    private navCtrl: NavController
  ) { }

  public handle(msg: any) {
    this.platform.ready().then(() => {
      if (msg.type == 'Chat') {
        let t: Teaching = JSON.parse(msg.extra);
        this.navCtrl.push(ChatPage, {Teaching: t});
      } else if (msg.type == 'LectureRate') {
        let l: Lecture = JSON.parse(msg.extra);
        this.navCtrl.push(RatingListPage, {idobject: l.idLecture, type: 'lecture'});
      } else if (msg.type == 'MaterialRate') {
        let tm: TeachingMaterial = JSON.parse(msg.extra);
        this.navCtrl.push(RatingListPage, {idobject: tm.idTeachingMaterial, type: 'material'})
      } else if (msg.type == 'Teaching Material') {
        let l: Lecture = JSON.parse(msg.extra);
        this.navCtrl.push(MaterialListPage, {lecture: l});
      } else if (msg.type == 'Lecture') {
        let t: Teaching = JSON.parse(msg.extra);
        this.navCtrl.push(TeachingPage, {Teaching: t});
      } else if (msg.type == 'Report') {
        this.navCtrl.push(ReportsListPage);
      }
    });
  }
}
