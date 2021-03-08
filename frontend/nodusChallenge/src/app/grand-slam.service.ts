import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GrandSlamService {

  constructor(private httpClient: HttpClient) {
  }

  public getPrueba(){
    return this.httpClient.post('http://localhost:3000/prueba',{});
  }
}
