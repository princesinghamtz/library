import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginserService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  myForm = new FormGroup({});
  resetForm = new FormGroup({});
  spinner = false;
  constructor(
    public router: Router,
    private formbuilder: FormBuilder,
    private loginService: LoginserService,
    private toastr: ToastrService,
  ) {}

  viewSignIn = false;
  ngOnInit() {
    this.valiDate();
    this.resetPass();
  }
  // Validation Funcation of Login
  valiDate() {
    this.myForm = this.formbuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  // Validation Funcation of Login
  resetPass() {
    this.resetForm = this.formbuilder.group({
      empCode: ['', Validators.required],
    });
  }

  // asscess control of all Fields
  get m() {
    return this.myForm.controls;
  }
    // asscess control of all Fields
    get n() {
      return this.resetForm.controls;
    }
  // After Login Navigate to Dashboard Page
  dashboard() {
    this.spinner = true;
    const body = this.myForm.value;
    this.loginService.adminLogin(body).subscribe(
      (data) => {
        if (data.message=="Success") {
          this.spinner = false;
          this.toastr.success('Login Successfull');
          setTimeout(() => {
            this.router.navigate(['/books']);
          }, 600);
        } else {
          this.spinner = false;
          this.toastr.error(' Incorrect UserID or Password');
        }
      },
      (err) => {
        this.spinner = false;
        this.toastr.error('Network Error');
      }
    );
  }
 
  signOut = () => {
    this.viewSignIn = false;
    this.myForm.reset();
    this.resetForm.reset();

  }
  library = ()=>{
    this.router.navigate(['/library']);
  }
}
