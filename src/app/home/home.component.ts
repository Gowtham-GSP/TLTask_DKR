import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthServiceService } from '../service/auth-service.service';
import { UserModel } from '../model/Employee.model';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  formValue!: FormGroup;

  userModelObj: UserModel = new UserModel();
  userData!: any;
  userModel: UserModel[] = [];
  // fullname!: any;
  searchTxt: any;

  constructor(
    private formBuilder: FormBuilder,
    private api: AuthServiceService
  ) {
    this.getAllUser();
  }

  getAllUser() {
    this.api.getUser().subscribe((res) => {
      this.userData = res;
    });
  }

  DeleteUser(data: any) {
    this.api.deleteData(data.id).subscribe({
      next: (v) => {
        console.log(v);
      },
      error: (e) => {
        console.log(e);
        alert('error');
      },
      complete: () => {
        console.log('user record deleted');
        alert('user deleted');
        this.getAllUser();
      },
    });
  }
  // Search() {
  //   this.userModel = this.userModel.filter((res) => {
  //     return res.fullName
  //       .toLocaleLowerCase()
  //       .match(this.fullname.toLocaleUpperCase());
  //   });
  // }
  // editUser(data: any) {
  //   this.userModelObj.id = data.id;
  //   this.formValue.controls['fullName'].setValue(data.fullName);
  //   this.formValue.controls['lastName'].setValue(data.lastName);
  //   this.formValue.controls['email'].setValue(data.email);
  //   this.formValue.controls['phone'].setValue(data.phone);
  //   this.formValue.controls['userName'].setValue(data.userName);
  //   this.formValue.controls['password'].setValue(data.password);
  // }
  // displayedColumns : string[] = ['firstname','lastName','email','phone','userName','password']
  // postUserDetails() {
  //   this.userModelObj.firstName = this.formValue.value.firstName;
  //   this.userModelObj.lastName = this.formValue.value.lastName;
  //   this.userModelObj.email = this.formValue.value.email;
  //   this.userModelObj.phone = this.formValue.value.phone;
  //   this.userModelObj.userName = this.formValue.value.userName;
  //   this.userModelObj.password = this.formValue.value.password;

  //   this.api.postUser(this.userModelObj).subscribe(
  //     (res) => {
  //       console.log(res);
  //       alert('Created Successfully');
  //       let ref = document.getElementById('cancel');
  //       ref?.click();
  //       this.formValue.reset();
  //       this.getAllUser();
  //     },
  //     (err) => {
  //       alert('something went wrong');
  //     }
  //   );
  // }
}
