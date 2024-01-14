import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  private baseUrl: string | undefined = environment.baseUrl;
  // POST API CALL
  public post(endUrl: string, reqBody: any) {
    const url: string = this.baseUrl + endUrl;
    console.log("BASE ", this.baseUrl);
    return this.http.post<any>(url, reqBody);
  }
  

  // GET API CALL
  get(endUrl: string, params: any) {
    const url: string = this.baseUrl + endUrl;
    return this.http.get<any>(url, { params: params });
  }

  // PUT API CALL
  put(endUrl: string, reqBody: any) {
    const url: string = this.baseUrl + endUrl;
    return this.http.get<any>(url, reqBody);
  }
}
