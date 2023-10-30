import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs-compat';
import { catchError } from 'rxjs/operators';
import { ErrorService } from 'src/app/helper/error.service';
import { UrlConfigService } from 'src/app/helper/url-config.service';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {
  logedCustomerId;
  tenantId;
  baseURL: string;
  guestSessionId: any;
  logedSessionId: any;

  constructor(private http: HttpClient, private urlService: UrlConfigService, private err: ErrorService, private cookieService: CookieService) {
    this.baseURL = this.urlService.getBaseUrl();
  }
  getSummaryProducts(body): Observable<any> {
    return this.http.post(this.baseURL + 'ProductDetailsList', body).pipe(catchError(this.err.handleError));
  }

  getFolders(): Observable<any> {
    this.logedCustomerId = sessionStorage.getItem('customerId');
    this.tenantId = sessionStorage.getItem('tenantId');
    this.logedSessionId = sessionStorage.getItem('sessionId');
    this.guestSessionId = this.cookieService.get('GuestSessionIDdata');
    let body;
    if (this.logedCustomerId !== null) {
      body = { folder_op_type: "view", tenant_id: this.tenantId, customer_id: this.logedCustomerId, status: 0, session_id: this.logedSessionId, login: true, }
    }
    else {
      body = { folder_op_type: "view", status: 0, tenant_id: this.tenantId, session_id: this.guestSessionId, login: false }
    }
    return this.http.post(this.baseURL + 'folders', body).pipe(catchError(this.err.handleError));
  }
  addFolders(body): Observable<any> {
    return this.http.post(this.baseURL + 'folders', body).pipe(catchError(this.err.handleError));
  }

  addToWishlist(body): Observable<any> {
    return this.http.post(this.baseURL + 'wishlist', body).pipe(catchError(this.err.handleError));
  }

  deleteWishlist(body): Observable<any> {
    return this.http.post(this.baseURL + 'wishlist', body).pipe(catchError(this.err.handleError));
  }

  addToCart(body): Observable<any> {
    return this.http.post(this.baseURL + 'Cart', body).pipe(catchError(this.err.handleError));
  }

  filterView(body): Observable<any> {
    return this.http.post(this.baseURL + 'filterui', body).pipe(catchError(this.err.handleError));
  }

  getSummaryRelatedProducts(body): Observable<any> {
    return this.http.post(this.baseURL + 'RelatedProductDetailsList', body).pipe(catchError(this.err.handleError));
  }

  getShareLink(body): Observable<any> {
    return this.http.post(this.baseURL + 'affiliate', body).pipe(catchError(this.err.handleError));
  }

  getRecentProducts(body): Observable<any> {
    return this.http.post(this.baseURL + 'RecentlyViewed', body).pipe(catchError(this.err.handleError));
  }

  getReviewProducts(body): Observable<any> {
    return this.http.post(this.baseURL + 'TopReviewed', body).pipe(catchError(this.err.handleError));
  }

  getSearchData(body): Observable<any> {
    return this.http.post(this.baseURL + 'search', body).pipe(catchError(this.err.handleError));
  }

  BuyNow(body): Observable<any> {
    return this.http.post(this.baseURL + 'BuyItNow', body).pipe(catchError(this.err.handleError));
  }

}