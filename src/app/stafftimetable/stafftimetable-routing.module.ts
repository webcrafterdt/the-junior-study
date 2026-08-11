import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StafftimetablePage } from './stafftimetable.page';

const routes: Routes = [
  {
    path: '',
    component: StafftimetablePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StafftimetablePageRoutingModule { }
