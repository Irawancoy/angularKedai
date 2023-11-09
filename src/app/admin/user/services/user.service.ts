import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }),
  };

  constructor(private http: HttpClient) {}

  getUser() {
    return this.http.get(`${this.apiUrl}/admin/user`, this.httpOptions);
  }
  postUser(userData) {
    return this.http.post(
      `${this.apiUrl}/admin/user`,
      userData,
      this.httpOptions
    );
  }
  putUser(userData) {
    return this.http.put(
      `${this.apiUrl}/admin/user/${userData.id}`,
      userData,
      this.httpOptions
    );
  }
  deleteUser(userId) {
    return this.http.delete(
      `${this.apiUrl}/admin/user/${userId}`,
      this.httpOptions
    );
  }
  getUserById(userId) {
    return this.http.get(
      `${this.apiUrl}/admin/user/${userId}`,
      this.httpOptions
    );
  }
}
