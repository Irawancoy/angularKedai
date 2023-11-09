import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RekeningService {
  private apiUrl = environment.apiUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }),
  };

  constructor(private http: HttpClient) {}

  getRekening() {
    return this.http.get(`${this.apiUrl}/admin/rekening`, this.httpOptions);
  }
  postRekening(rekeningData) {
    return this.http.post(
      `${this.apiUrl}/admin/rekening`,
      rekeningData,
      this.httpOptions
    );
  }
  putRekening(rekeningData) {
    return this.http.put(
      `${this.apiUrl}/admin/rekening/${rekeningData.id}`,
      rekeningData,
      this.httpOptions
    );
  }
  deleteRekening(rekeningId) {
    return this.http.delete(
      `${this.apiUrl}/admin/rekening/${rekeningId}`,
      this.httpOptions
    );
  }
  getRekeningById(rekeningId) {
    return this.http.get(
      `${this.apiUrl}/admin/rekening/${rekeningId}`,
      this.httpOptions
    );
  }
}
