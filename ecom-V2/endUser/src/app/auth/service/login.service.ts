import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlConfigService } from 'src/app/helper/url-config.service';
import { catchError } from 'rxjs/operators';
import { ErrorService } from 'src/app/shared/services/error-handle.service';
import 'rxjs/add/operator/map';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseURL: string;
 
  constructor(private http: HttpClient, private urlService: UrlConfigService, private err: ErrorService ) {
    this.baseURL = this.urlService.getBaseUrl();
  }
 
  passwrdOTP(body): Observable<any> {
    return this.http.post(this.baseURL + 'password', body ).pipe(catchError(this.err.handleError));
  }
  login(body): Observable<any> {
    return this.http.post(this.baseURL + 'customerlogin', body ).pipe(catchError(this.err.handleError));
  }
  
}
