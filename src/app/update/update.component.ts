import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserModel } from '../model/Employee.model';
import { AuthServiceService } from '../service/auth-service.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  public dataId!: any;
  public user: UserModel = new UserModel();

  constructor(
    private api: AuthServiceService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((param: Params) => {
      this.dataId = param['get']('id');
    });

    this.api.fetchData(this.dataId).subscribe(
      (data: UserModel) => {
        this.user = data;
      },
      (error) => {
        console.log('Error fetching user data', error);
      }
    );
  }

  update() {
    if (this.user) {
      this.api.updateUser(this.dataId, this.user).subscribe(
        (res: UserModel) => {
          this.router.navigate(['/home']);
          alert('Update successful');
          console.log('Update successful', res);
        },
        (error) => {
          console.log('Update error', error);
        }
      );
    } else {
      console.log('User data is undefined or null');
    }
  }
}
