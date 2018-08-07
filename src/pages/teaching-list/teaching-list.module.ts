import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeachingListPage } from './teaching-list';

@NgModule({
  declarations: [
    TeachingListPage,
  ],
  imports: [
    IonicPageModule.forChild(TeachingListPage),
  ],
})
export class TeachingListPageModule {}
