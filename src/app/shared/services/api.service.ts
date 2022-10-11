import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Meal } from '../models/meal.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string = 'http://localhost:3001/';

  constructor(private http: HttpClient) {}

  private getUrl(url: string): string {
    return this.baseUrl + url;
  }

  get(url: string): Observable<any> {
    return this.http.get(this.getUrl(url));
  }

  post(url: string, data: object): Observable<any> {
    return this.http.post(this.getUrl(url), data);
  }

  put(url: string, data: any): Observable<any> {
    return this.http.put(`${this.getUrl(url)}/${data.id}`, data);
  }
}
