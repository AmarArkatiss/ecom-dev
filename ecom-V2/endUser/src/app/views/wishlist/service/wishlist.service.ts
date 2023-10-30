import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UrlConfigService } from 'src/app/helper/url-config.service';
import { ErrorService } from 'src/app/helper/error.service';
import { catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  baseURL: string;
  logedCustomerId;
  tenantId;
  guestSessionId;
  logedSeeionId;
  constructor(private http: HttpClient, private urlService: UrlConfigService, private err: ErrorService, private cookieService: CookieService) {
    this.baseURL = this.urlService.getBaseUrl();
  }

  getWishList(body): Observable<any> {
    return this.http.post(this.baseURL + 'wishlist', body).pipe(catchError(this.err.handleError));
  }

  getFolders(): Observable<any> {
    this.logedCustomerId = sessionStorage.getItem('customerId');
    this.tenantId = sessionStorage.getItem('tenantId');
    this.logedSeeionId = sessionStorage.getItem('sessionId');
    this.guestSessionId = this.cookieService.get('GuestSessionIDdata');
    let body;
    if (this.logedCustomerId !== null) {
      body = { folder_op_type: "view", tenant_id: this.tenantId, customer_id: this.logedCustomerId, status: 0, session_id: this.logedSeeionId, login: true, }
    } else {
      body = { folder_op_type: "view", tenant_id: this.tenantId, session_id: this.guestSessionId, status: 0, login: false, }
    }
    return this.http.post(this.baseURL + 'folders', body).pipe(catchError(this.err.handleError));
  }

  deleteWishlist(body): Observable<any> {
    return this.http.post(this.baseURL + 'wishlist', body).pipe(catchError(this.err.handleError));
  }
}
