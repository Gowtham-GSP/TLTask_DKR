import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  postUserDetails() {
    throw new Error('Method not implemented.');
  }
  // public signupForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}
  signupForm: any; // form name
  ngOnInit(): void {
    this.signupForm = new FormGroup({
      fullName: new FormControl(null, [
        Validators.required,
        Validators.pattern('[a-zA-Z]*'),
      ]),
      lastName: new FormControl(null, [
        Validators.required,
        Validators.pattern('[a-zA-Z]*'),
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern('[0-9]*'),
        Validators.minLength(10),
      ]),
      userName: new FormControl(null, [
        Validators.required,
        Validators.pattern('[a-zA-Z]*'),
        Validators.minLength(6),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
        ),
        Validators.minLength(8),
      ]),
      creationDate: new FormControl(new Date().toLocaleDateString(), [
        Validators.required,
      ]),
    });
  }

  signup() {
    this.http
      .post<any>('https://localhost:7250/api/user', this.signupForm.value)
      .subscribe((res) => {
        alert('signUp successfully');
        //reset form
        this.signupForm.reset();
        // navigate to login page after complete signup
        this.router.navigate(['login']);
      });
    console.log(this.signupForm.value);
  }

  // for error handling
  get fullname() {
    return this.signupForm.get('fullName');
  }

  get lastname() {
    return this.signupForm.get('lastName');
  }

  get Email() {
    return this.signupForm.get('email');
  }
  get Phone() {
    return this.signupForm.get('phone');
  }
  get Username() {
    return this.signupForm.get('userName');
  }
  get Password() {
    return this.signupForm.get('password');
  }
}
