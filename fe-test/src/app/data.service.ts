import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {RootObject} from '../interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _jsonURL = '../assets/data/transactions.json';
  constructor(private http: HttpClient) {
    
  }
  public getData(): Observable<any> {
    return this.http.get<any>(this._jsonURL);
  }
}