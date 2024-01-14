import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { AddBillingComponent } from './components/add-billing/add-billing.component';
import { EditPriceComponent } from './components/edit-price/edit-price.component';



@NgModule({
  declarations: [
    AddBillingComponent,
    EditPriceComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class SharedModule { }
