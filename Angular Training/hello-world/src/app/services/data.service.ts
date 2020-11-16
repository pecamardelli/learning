import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private url: string, private http: HttpClient) { }

  private errorHandler(error: HttpErrorResponse) {
    //return throwError(new Error(`Error ${error.status}: ${error.message}` || 'Unexpected error.'));
    return throwError(error);
  }

  getAll() {
    return this.http.get(this.url)
      .pipe(catchError(this.errorHandler));
  }

  create(resource) {
    return this.http.post(this.url, resource)
      .pipe(catchError(this.errorHandler));;
  }

  patch(resource) {
    return this.http.patch(`${this.url}/${resource.id}`, { title: `${resource.title} (Updated)`})
      .pipe(catchError(this.errorHandler));;
  }

  update(resource) {
    return this.http.patch(`${this.url}/${resource.id}`, resource)
      .pipe(catchError(this.errorHandler));;
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`)
      .pipe(catchError(this.errorHandler));
  }
}
