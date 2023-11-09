import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProsedurService {
  private apiUrl = environment.apiUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }),
  };

  constructor(private http: HttpClient) {}

  getProsedur() {
    return this.http.get(`${this.apiUrl}/admin/prosedur`, this.httpOptions);
  }
  postProsedur(prosedurData) {
    return this.http.post(
      `${this.apiUrl}/admin/prosedur`,
      prosedurData,
      this.httpOptions
    );
  }
  putProsedur(prosedurData) {
    return this.http.put(
      `${this.apiUrl}/admin/prosedur/${prosedurData.id}`,
      prosedurData,
      this.httpOptions
    );
  }
  deleteProsedur(prosedurId) {
    return this.http.delete(
      `${this.apiUrl}/admin/prosedur/${prosedurId}`,
      this.httpOptions
    );
  }
  getProsedurById(prosedurId) {
    return this.http.get(
      `${this.apiUrl}/admin/prosedur/${prosedurId}`,
      this.httpOptions
    );
  }
}
