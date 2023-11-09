import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LayananService {
  private apiUrl = environment.apiUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }),
  };

  constructor(private http: HttpClient) {}

  getLayanan() {
    return this.http.get(`${this.apiUrl}/admin/layanan`, this.httpOptions);
  }
  postLayanan(layananData) {
    return this.http.post(
      `${this.apiUrl}/admin/layanan`,
      layananData,
      this.httpOptions
    );
  }
  putLayanan(layananData) {
    return this.http.put(
      `${this.apiUrl}/admin/layanan/${layananData.id}`,
      layananData,
      this.httpOptions
    );
  }
  deleteLayanan(layananId) {
    return this.http.delete(
      `${this.apiUrl}/admin/layanan/${layananId}`,
      this.httpOptions
    );
  }
  getLayananById(layananId) {
    return this.http.get(
      `${this.apiUrl}/admin/layanan/${layananId}`,
      this.httpOptions
    );
  }
}
