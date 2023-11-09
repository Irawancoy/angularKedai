import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private apiUrl = environment.apiUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }),
  };

  constructor(private http: HttpClient) {}

  getMenu() {
    return this.http.get(`${this.apiUrl}/admin/menu`, this.httpOptions);
  }

  postMenu(menuData) {
    return this.http.post(
      `${this.apiUrl}/admin/menu`,
      menuData,
      this.httpOptions
    );
  }

  putMenu(menuData) {
    return this.http.put(
      `${this.apiUrl}/admin/menu/${menuData.Id}`,
      menuData,
      this.httpOptions
    );
  }

  deleteMenu(menuId) {
    return this.http.delete(
      `${this.apiUrl}/admin/menu/${menuId}`,
      this.httpOptions
    );
  }
  getMenuById(menuId) {
    return this.http.get(
      `${this.apiUrl}/admin/menu/${menuId}`,
      this.httpOptions
    );
  }
}
