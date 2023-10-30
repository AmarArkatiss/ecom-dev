import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  constructor() { }
  public handleError(err: HttpErrorResponse): Observable<any> {
    let errorMessage = '';
    if (err.error instanceof Error) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = err.status === 413 ? err.statusText : `Server returned code: ${err.status}, error message is: ${err.statusText}`;
      errorMessage = err.status === 304 ? err.statusText : `Server returned code: ${err.status}, error message is: ${err.statusText}`;
      errorMessage = err.status === 400 ? err.statusText : `Server returned code: ${err.status}, error message is: ${err.statusText}`;
      errorMessage = err.status === 401 ? err.statusText : `Server returned code: ${err.status}, error message is: ${err.statusText}`;
      errorMessage = err.status === 403 ? err.statusText : `Server returned code: ${err.status}, error message is: ${err.statusText}`;
      errorMessage = err.status === 404 ? err.statusText : `Server returned code: ${err.status}, error message is: ${err.statusText}`;
      errorMessage = err.status === 409 ? err.statusText : `Server returned code: ${err.status}, error message is: ${err.statusText}`;
      errorMessage = err.status === 500 ? err.statusText : `Server returned code: ${err.status}, error message is: ${err.statusText}`;
      errorMessage = err.status === 502 ? err.statusText : `Server returned code: ${err.status}, error message is: ${err.statusText}`;
      errorMessage = err.status === 503 ? err.statusText : `Server returned code: ${err.status}, error message is: ${err.statusText}`;
      errorMessage = err.status === 511 ? err.statusText : `Server returned code: ${err.status}, error message is: ${err.statusText}`;
      errorMessage = err.status === 599 ? err.statusText : `Server returned code: ${err.status}, error message is: ${err.statusText}`;
    }
    return Observable.throw(errorMessage);
  }
}
