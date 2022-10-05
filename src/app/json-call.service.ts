import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { JsonFormData } from './core/models/json-form';

@Injectable({
  providedIn: 'root'
})
export class JsonCallService {

  constructor(private http: HttpClient) { }

  getFormData(): Observable<JsonFormData[]> {
    return this.http
      .get<JsonFormData[]>('/assets/to-render.json')
      .pipe(
        map((formData: JsonFormData[]) => {
          return formData;
        }),
        catchError(() => throwError('Form Data not found'))
      );
  }
}
