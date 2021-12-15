import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const request = 'http://localhost:1234/api/alumni';

@Injectable({
  providedIn: 'root'
})
export class FetchAlumniService {

  constructor(private httpClient:HttpClient) { }

  public fetchAlumni(){
    return this.httpClient.get<any>(request);
  }
}
