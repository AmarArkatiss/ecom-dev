import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs-compat';
import { catchError } from 'rxjs/operators';
import { ErrorService } from 'src/app/helper/error.service';
import { UrlConfigService } from 'src/app/helper/url-config.service';

@Injectable({
  providedIn: 'root'
})
export class MyorderDetailService {
  baseURL: string;
  constructor(private http: HttpClient, private urlService: UrlConfigService, private err: ErrorService) {
    this.baseURL = this.urlService.getBaseUrl();
  }
  getSummaryOrderDetails(body): Observable<any> {
    return this.http.post(this.baseURL + 'history', body).pipe(catchError(this.err.handleError));
  }
  getStoreData(sId): Observable<any> {
    const body = {
      store_id: sId
    }
    return this.http.post(this.baseURL + 'StoreAddress', body).pipe(catchError(this.err.handleError));
  }
  reOrder(body): Observable<any> {
    return this.http.post(this.baseURL + 'history', body).pipe(catchError(this.err.handleError));
  }
  cancelOrder(body): Observable<any> {
    return this.http.post(this.baseURL + 'OrderCancel', body).pipe(catchError(this.err.handleError));
  }
}
