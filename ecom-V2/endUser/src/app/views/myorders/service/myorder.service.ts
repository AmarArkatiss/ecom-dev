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
  getSummaryProducts(body): Observable<any> {
    return this.http.post(this.baseURL + 'history', body).pipe(catchError(this.err.handleError));
  }
  getLatestOrders(body): Observable<any> {
    return this.http.post(this.baseURL + 'RecentOrders', body).pipe(catchError(this.err.handleError));
  }
  getAddressDetails(body): Observable<any> {
    return this.http.post(this.baseURL + 'Customer_details', body).pipe(catchError(this.err.handleError));
  }
  cancelOrder(body): Observable<any> {
    return this.http.post(this.baseURL + 'OrderCancel', body).pipe(catchError(this.err.handleError));
  }
}
