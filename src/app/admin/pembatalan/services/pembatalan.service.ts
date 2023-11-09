import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PembatalanService {
  private apiUrl = environment.apiUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }),
  };

  constructor(private http: HttpClient) {}

  getPembatalan() {
    return this.http.get(`${this.apiUrl}/admin/pembatalan`, this.httpOptions);
  }
  getPembatalanById(id) {
    return this.http.get(
      `${this.apiUrl}/admin/pembatalan/${id}`,
      this.httpOptions
    );
  }
  putPembatalan(data) {
    return this.http.put(
      `${this.apiUrl}/admin/pembatalan/${data.id}`,
      data,
      this.httpOptions
    );
  }

  deletePembatalan(id) {
    return this.http.delete(
      `${this.apiUrl}/admin/pembatalan/${id}`,
      this.httpOptions
    );
  }
}
