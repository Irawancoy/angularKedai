import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RuanganService {
  private apiUrl = environment.apiUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('ctoken')}`,
    }),
  };

  constructor(private http: HttpClient) {}

  getRuangan() {
    return this.http.get(`${this.apiUrl}/client/layanan`, this.httpOptions);
  }

  getRuanganById(id: any) {
    return this.http.get(
      `${this.apiUrl}/client/layanan/${id}`,
      this.httpOptions
    );
  }
  getProsedur() {
    return this.http.get(`${this.apiUrl}/client/prosedur`, this.httpOptions);
  }

  postKeranjang(data) {
    return this.http.post(
      `${this.apiUrl}/client/keranjang`,
      data,
      this.httpOptions
    );
  }

  getKeranjang() {
    return this.http.get(`${this.apiUrl}/client/keranjang`, this.httpOptions);
  }

  deleteKeranjang(id: any) {
    return this.http.delete(
      `${this.apiUrl}/client/keranjang/${id}`,
      this.httpOptions
    );
  }

  putKeranjang(data: any) {
    return this.http.put(
      `${this.apiUrl}/client/keranjang/${data.id}`,
      data,
      this.httpOptions
    );
  }
  getKeranjangById(id: any) {
    return this.http.get(
      `${this.apiUrl}/client/keranjang/${id}`,
      this.httpOptions
    );
  }

  getKeranjangByCustomer(id) {
    return this.http.get(
      `${this.apiUrl}/client/keranjang-customer/${id}`,
      this.httpOptions
    );
  }
}
