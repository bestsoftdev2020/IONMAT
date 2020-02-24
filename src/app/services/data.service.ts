import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

const API = '../assets/db.json';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiurl = 'api/data';
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
  perfop = {
    headers: this.headers
  };

  constructor(private http: HttpClient) {}

  private handleError(error: any) {
    console.error(error);
    return throwError(error);
  }

  getData(): Observable<any> {
    return this.http.get<any>(this.apiurl).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  deleteItem(id): Observable<any> {
    return this.http.delete(`${this.apiurl}/${id}`);
  }

  addItem(item): Observable<any> {
    return this.http.put(`${this.apiurl}`, item);
  }

}
