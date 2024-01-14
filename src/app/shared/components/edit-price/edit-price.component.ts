import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from 'src/app/core/services/http.service';
import { AddBillingComponent } from '../add-billing/add-billing.component';

@Component({
  selector: 'app-edit-price',
  templateUrl: './edit-price.component.html',
  styleUrls: ['./edit-price.component.scss'],
})
export class EditPriceComponent implements OnInit {
  public editBillingGroup!: FormGroup;
  public maxDate = new Date();

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddBillingComponent>,
    private httpService: HttpService,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) {}

  ngOnInit(): void {
    this.editBillingGroup = this.fb.group({
      electricityDayPerkWh: new FormControl('', [Validators.required]),
      electricityNightPerkWh: new FormControl('', [Validators.required]),
      gasPerkWh: new FormControl('', [Validators.required]),
      standingChargePerDay: new FormControl('', [Validators.required]),
    });
  }

  updatePrice() {
    if (this.editBillingGroup.invalid) {
      this.editBillingGroup.touched;
    } else {
      let reqBody = {
        electricityDayPerkWh: this.editBillingGroup.value.electricityDayPerkWh,
        electricityNightkWh: this.editBillingGroup.value.electricityNightPerkWh,
        gasPerkWh: this.editBillingGroup.value.gasPerkWh,
        standingChargePerDay: this.editBillingGroup.value.standingChargePerDay,
      };
      this.httpService
        .post('/admin/setPrice', reqBody)
        .subscribe((response) => {
          if (response) {
            this.dialogRef.close();
          }
        });
    }
  }
}
