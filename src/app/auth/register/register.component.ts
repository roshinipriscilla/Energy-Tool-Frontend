import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public hide = true;
  public userForm!: FormGroup;
  public propertyType = ['Detached', 'Semi-detached', 'Terraced', 'Flat', 'Cottage', 'bungalow', 'Mansion'];
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private httpService: HttpService,
    private snackBar: MatSnackBar,

  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      address: new FormControl('', [Validators.required]),
      property: new FormControl('', [Validators.required]),
      bedrooms: new FormControl('', [Validators.required]),
      voucherCode: new FormControl('', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]),
      email: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,4}')]),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[a-z]).{8,}$')]),
    });
  }

  public onSubmit() {
    console.log(this.userForm);

    if (this.userForm.invalid) {
      this.userForm.touched
      return;
    }else{
      let reqBody = {
        "userId": this.userForm.value.email,
        "password": this.userForm.value.password,
        "address": this.userForm.value.address,
        "propertyType": this.userForm.value.property,
        "numberOfBedrooms": this.userForm.value.bedrooms,
        "voucherCode": this.userForm.value.voucherCode
      }
      this.httpService.post("/auth/userSignup",reqBody).subscribe(response =>{
        console.log(response);
        if(response){
          this.route.navigateByUrl("/auth/login");
        }
      },err=>{
        console.log(err);
        const msg= err.error.error ? err.error.error : "Failed to create user";
        this.openSnackBar(msg);
      })
    }
  }

  openSnackBar(msg: any) {
    this.snackBar.open(msg, 'x', {
      duration: 10 * 1000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }
}
