import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = environment.apiUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }),
  };

  constructor(private http: HttpClient) {}
  getProfile() {
    return this.http.get(`${this.apiUrl}/admin/auth/profile`, this.httpOptions);
  }
  putProfile(data) {
    return this.http.put(
      `${this.apiUrl}/admin/user/${data.id}`,
      data,
      this.httpOptions
    );
  }
}
