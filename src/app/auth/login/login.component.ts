import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public hide = true;
  public userForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private httpService: HttpService,
    private snackBar: MatSnackBar,

  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,4}'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('^(?=.*?[a-z]).{8,}$'),
      ]),
    });
  }

  public onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.touched;
      return;
    } else {
      let reqBody = {
        userId: this.userForm.value.email,
        password: this.userForm.value.password,
      };
      this.httpService
        .post('/auth/userLogin', reqBody)
        .subscribe((response) => {
          if (response) {
            localStorage.setItem('accessToken', response?.accessToken);
            localStorage.setItem('refreshToken', response?.refreshToken);
            localStorage.setItem('userId', response?.userId);
            localStorage.setItem('role',response.role);
            response.role == 'admin' ? this.route.navigateByUrl("/admin") : this.route.navigateByUrl("/customer")

          } else {
            const msg = 'Invalid userId/password';
            this.openSnackBar(msg);
          }
        },err=>{
          console.log(err);
          
          const msg = err.error.error ?err.error.error :"Invalid userId / Password";
          this.openSnackBar(msg);
        });
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
