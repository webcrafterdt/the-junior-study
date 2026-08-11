import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StafftimetablePageRoutingModule } from './stafftimetable-routing.module';

import { StafftimetablePage } from './stafftimetable.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    StafftimetablePageRoutingModule
  ],
  declarations: [StafftimetablePage]
})
export class StafftimetablePageModule { }
