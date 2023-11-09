import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TentangKamiService {
  private apiUrl = environment.apiUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }),
  };

  constructor(private http: HttpClient) {}

  getTentangKami() {
    return this.http.get(`${this.apiUrl}/admin/tentang-kami`, this.httpOptions);
  }
  postTentangKami(tentangKamiData) {
    return this.http.post(
      `${this.apiUrl}/admin/tentang-kami`,
      tentangKamiData,
      this.httpOptions
    );
  }
  putTentangKami(tentangKamiData) {
    return this.http.put(
      `${this.apiUrl}/admin/tentang-kami/${tentangKamiData.id}`,
      tentangKamiData,
      this.httpOptions
    );
  }
  deleteTentangKami(tentangKamiId) {
    return this.http.delete(
      `${this.apiUrl}/admin/tentang-kami/${tentangKamiId}`,
      this.httpOptions
    );
  }
  getTentangKamiById(tentangKamiId) {
    return this.http.get(
      `${this.apiUrl}/admin/tentang-kami/${tentangKamiId}`,
      this.httpOptions
    );
  }
}
