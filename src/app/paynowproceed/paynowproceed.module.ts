import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaynowproceedPageRoutingModule } from './paynowproceed-routing.module';

import { PaynowproceedPage } from './paynowproceed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaynowproceedPageRoutingModule
  ],
  declarations: [PaynowproceedPage]
})
export class PaynowproceedPageModule {}
