import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyLecturesPage } from './daily-lectures';

@NgModule({
  declarations: [
    DailyLecturesPage,
  ],
  imports: [
    IonicPageModule.forChild(DailyLecturesPage),
  ],
})
export class DailyLecturesPageModule {}
