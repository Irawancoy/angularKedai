import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SliderService {
  private apiUrl = environment.apiUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }),
  };

  constructor(private http: HttpClient) {}

  getSlider() {
    return this.http.get(`${this.apiUrl}/admin/slider`, this.httpOptions);
  }
  putSlider(sliderData) {
    return this.http.put(
      `${this.apiUrl}/admin/slider/${sliderData.Id}`,
      sliderData,
      this.httpOptions
    );
  }
  postSlider(sliderData) {
    return this.http.post(
      `${this.apiUrl}/admin/slider`,
      sliderData,
      this.httpOptions
    );
  }
  deleteSlider(sliderId) {
    return this.http.delete(
      `${this.apiUrl}/admin/slider/${sliderId}`,
      this.httpOptions
    );
  }
  getSliderById(sliderId) {
    return this.http.get(
      `${this.apiUrl}/admin/slider/${sliderId}`,
      this.httpOptions
    );
  }
}
