import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExamListPage } from './exam-list';

@NgModule({
  declarations: [
    ExamListPage,
  ],
  imports: [
    IonicPageModule.forChild(ExamListPage),
  ],
})
export class ExamListPageModule {}
