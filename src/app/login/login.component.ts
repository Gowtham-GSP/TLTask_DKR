import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public loginForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  login() {
    this.http.get<any>('https://localhost:7250/api/user').subscribe(
      (res) => {
        const user = res.find((a: any) => {
          return (
            a.userName === this.loginForm.value.userName &&
            a.password === this.loginForm.value.password
          );
        });
        if (user) {
          alert('Login Successfully');
          this.loginForm.reset();
          this.router.navigate(['home']);
        } else {
          alert('user not found');
        }
      },
      (err) => {
        alert('something went wrong');
      }
    );
  }
}
