import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaynowproceedPage } from './paynowproceed.page';

const routes: Routes = [
  {
    path: '',
    component: PaynowproceedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaynowproceedPageRoutingModule {}
