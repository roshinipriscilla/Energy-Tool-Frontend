import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-add-billing',
  templateUrl: './add-billing.component.html',
  styleUrls: ['./add-billing.component.scss'],
})
export class AddBillingComponent implements OnInit {
  public addBillingGroup!: FormGroup;
  public maxDate = new Date();

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddBillingComponent>,
    private httpService: HttpService,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) {}

  ngOnInit(): void {
    this.addBillingGroup = this.fb.group({
      submissionDate: new FormControl(new Date(), [Validators.required]),
      electricityReadingDay: new FormControl('', [Validators.required]),
      electricityReadingNight: new FormControl('', [Validators.required]),
      gasReading: new FormControl('', [Validators.required]),
    });
  }

  addBilling() {
    console.log(this.addBillingGroup.value.submissionDate);
    
    let reqBody = {
      submissionDate: this.addBillingGroup.value.submissionDate,
      userId: localStorage.getItem('userId'),
      electricityReadingDay: this.addBillingGroup.value.electricityReadingDay,
      electricityReadingNight:
        this.addBillingGroup.value.electricityReadingNight,
      gasReading: this.addBillingGroup.value.gasReading,
    };
    this.httpService.post('/user/newReading', reqBody).subscribe((response) => {
      if (response) {
        console.log(response);
        this.dialogRef.close();
      }
    });
  }
}
