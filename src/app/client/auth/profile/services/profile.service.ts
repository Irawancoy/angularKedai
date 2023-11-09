import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = environment.apiUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('ctoken')}`,
    }),
  };
  constructor(private http: HttpClient) {}

  getProfile() {
    return this.http.get(
      `${this.apiUrl}/client/auth/profile`,
      this.httpOptions
    );
  }

  editProfile(data) {
    return this.http.put(
      `${this.apiUrl}/client/user/${data.id}`,
      data,
      this.httpOptions
    );
  }
}
