import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class KategoriService {
  private apiUrl = environment.apiUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }),
  };

  constructor(private http: HttpClient) {}

  getKategori() {
    return this.http.get(`${this.apiUrl}/kategori-menu`, this.httpOptions);
  }
  postKategori(kategoriData) {
    return this.http.post(
      `${this.apiUrl}/kategori-menu`,
      kategoriData,
      this.httpOptions
    );
  }
  putKategori(kategoriId, kategoriData) {
    return this.http.put(
      `${this.apiUrl}/kategori-menu/${kategoriId}`,
      kategoriData,
      this.httpOptions
    );
  }
  deleteKategori(kategoriId) {
    return this.http.delete(
      `${this.apiUrl}/kategori-menu/${kategoriId}`,
      this.httpOptions
    );
  }
  getKategoriById(kategoriId) {
    return this.http.get(
      `${this.apiUrl}/kategori-menu/${kategoriId}`,
      this.httpOptions
    );
  }
}
