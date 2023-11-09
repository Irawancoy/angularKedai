import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class TransaksiService {
  private apiUrl = environment.apiUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('ctoken')}`,
    }),
  };

  constructor(private http: HttpClient) {}

  postTransaksi(data) {
    return this.http.post(
      `${this.apiUrl}/client/transaksi`,
      data,
      this.httpOptions
    );
  }
  getAllTransaksi() {
    return this.http.get(`${this.apiUrl}/client/transaksi`, this.httpOptions);
  }
  getTransaksiByCustomer(id) {
    return this.http.get(
      `${this.apiUrl}/client/transaksi-customer/${id}`,
      this.httpOptions
    );
  }
}
