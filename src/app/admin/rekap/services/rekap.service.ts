import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class RekapService {
  private apiUrl = environment.apiUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }),
  };
  constructor(private http: HttpClient) {}

  // getRekap() {
  //   return this.http.get(
  //     `${this.apiUrl}/admin/rekap-transaksi`,
  //     this.httpOptions
  //   );
  // }

  getRekapAll() {
    return this.http.get(`${this.apiUrl}/admin/rekapAll`, this.httpOptions);
  }
}
