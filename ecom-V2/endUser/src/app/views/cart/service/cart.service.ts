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
export class CartService {
  baseURL: string;
  logedSeeionId;
  logedCustomerId;
  guestSessionId: string;
  tenantId;
  constructor(private http: HttpClient, private urlService: UrlConfigService, private err: ErrorService, private cookieService: CookieService) {
    this.baseURL = this.urlService.getBaseUrl();
    this.logedSeeionId = sessionStorage.getItem('sessionId');
    this.logedCustomerId = sessionStorage.getItem('customerId');
    this.guestSessionId = this.cookieService.get('GuestSessionIDdata');
    this.tenantId = sessionStorage.getItem('tenantId');
  }
  getCartProducts(body): Observable<any> {
    return this.http.post(this.baseURL + 'Preview', body).pipe(catchError(this.err.handleError));
  }
  getFolders(): Observable<any> {
    let body;
    if (this.logedCustomerId !== null) {
      body = { folder_op_type: "view", customer_id: this.logedCustomerId, status: 0, tenant_id: this.tenantId, session_id: this.logedSeeionId, login: true, }
    } else {
      body = { folder_op_type: "view", session_id: this.guestSessionId, status: 0, tenant_id: this.tenantId, login: false }
    }
    return this.http.post(this.baseURL + 'folders', body).pipe(catchError(this.err.handleError));
  }
  addFolders(body): Observable<any> {
    return this.http.post(this.baseURL + 'folders', body).pipe(catchError(this.err.handleError));
  }
  deleteFolders(body): Observable<any> {
    return this.http.post(this.baseURL + 'folders', body).pipe(catchError(this.err.handleError));
  }
  updateFolders(body): Observable<any> {
    return this.http.post(this.baseURL + 'folders', body).pipe(catchError(this.err.handleError));
  }
  addToWishlist(body): Observable<any> {
    return this.http.post(this.baseURL + 'wishlist', body).pipe(catchError(this.err.handleError));
  }
  deleteWishlist(body): Observable<any> {
    return this.http.post(this.baseURL + 'wishlist', body).pipe(catchError(this.err.handleError));
  }

  getCartRelatedProducts(body): Observable<any> {
    return this.http.post(this.baseURL + 'RelatedProductDetailsList', body).pipe(catchError(this.err.handleError));
  }
  getCartSuggetionProducts(body): Observable<any> {
    return this.http.post(this.baseURL + 'suggestion', body).pipe(catchError(this.err.handleError));
  }
}
