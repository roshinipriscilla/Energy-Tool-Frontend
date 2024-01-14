import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpService,
    private httpClient: HttpClient) { }

  public pincode(pincode: number) {
    return this.httpClient.get(`https://api.postalpincode.in/pincode/${pincode}`);
  }

  public isToken() {
    const isToken = !!localStorage.getItem('accessToken');
    return isToken;
  }
}
