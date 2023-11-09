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
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }),
  };

  constructor(private http: HttpClient) {}

  getTransaksi() {
    return this.http.get(`${this.apiUrl}/admin/transaksi`, this.httpOptions);
  }

  putTransaksi(transaksiData) {
    return this.http.put(
      `${this.apiUrl}/admin/transaksi/${transaksiData.Id_transaksi}`,
      transaksiData,
      this.httpOptions
    );
  }

  deleteTransaksi(transaksiId) {
    return this.http.delete(
      `${this.apiUrl}/admin/transaksi/${transaksiId}`,
      this.httpOptions
    );
  }
}
