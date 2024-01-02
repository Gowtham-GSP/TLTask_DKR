import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { UserModel } from '../model/Employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private http: HttpClient) {}
  baseUrl = 'https://localhost:7250/api/user';
  postUser(data: any) {
    return this.http.post<any>(this.baseUrl, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getUser() {
    return this.http.get<any>(this.baseUrl).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getDate(id: number) {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<any>(url);
  }

  updateUser(id: any, data: any): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<any>(url, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  fetchData(id: any) {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<UserModel>(url);
  }

  deleteData(id: any): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<any>(url).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
