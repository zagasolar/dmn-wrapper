import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {
  private apiUrl = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  createProject(payload:any) {
    const url = `${this.apiUrl}/createProject`;
    return this.http.post(url, payload);
  }

  openFile(payload:any){
    const url = `${this.apiUrl}/getDmnFile`;
    return this.http.post(url,payload);
  }

  saveFile(payload:any){
    const url = `${this.apiUrl}/saveFile`;
    return this.http.post(url,payload);
  }

  buildProject(payload:any){
    const url = `${this.apiUrl}/buildProject`;
    return this.http.post(url,payload);
  }
}
