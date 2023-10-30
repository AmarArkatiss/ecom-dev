import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs-compat';
import { catchError } from 'rxjs/operators';
import { ErrorService } from 'src/app/helper/error.service';
import { UrlConfigService } from 'src/app/helper/url-config.service';

@Injectable({
  providedIn: 'root'
})
export class MyorderService {
  baseURL: string;
  constructor(private http: HttpClient, private urlService: UrlConfigService, private err: ErrorService) {
  this.baseURL = this.urlService.getBaseUrl();
  }
  getAffiliateDetails(body): Observable<any> {
    return this.http.post(this.baseURL + 'affiliate', body).pipe(catchError(this.err.handleError));
  }
}
