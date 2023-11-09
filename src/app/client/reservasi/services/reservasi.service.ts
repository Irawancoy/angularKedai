import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReservasiService {
  private apiUrl = environment.apiUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('ctoken')}`,
    }),
  };

  constructor(private http: HttpClient) {}

  getTransaksiByCustomer(id) {
    return this.http.get(
      `${this.apiUrl}/client/transaksi-customer/${id}`,
      this.httpOptions
    );
  }
  getRekening() {
    return this.http.get(`${this.apiUrl}/client/rekening`, this.httpOptions);
  }

  postPembatalan(data) {
    return this.http.post(
      `${this.apiUrl}/client/pembatalan`,
      data,
      this.httpOptions
    );
  }
}
