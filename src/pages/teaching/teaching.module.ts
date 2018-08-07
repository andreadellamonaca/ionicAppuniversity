import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeachingPage } from './teaching';

@NgModule({
  declarations: [
    TeachingPage,
  ],
  imports: [
    IonicPageModule.forChild(TeachingPage),
  ],
})
export class TeachingPageModule {}
