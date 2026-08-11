import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudenttimetablePageRoutingModule } from './studenttimetable-routing.module';

import { StudenttimetablePage } from './studenttimetable.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    StudenttimetablePageRoutingModule
  ],
  declarations: [StudenttimetablePage]
})
export class StudenttimetablePageModule { }
