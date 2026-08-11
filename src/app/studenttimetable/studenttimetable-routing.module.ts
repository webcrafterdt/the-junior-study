import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudenttimetablePage } from './studenttimetable.page';

const routes: Routes = [
  {
    path: '',
    component: StudenttimetablePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudenttimetablePageRoutingModule { }
