import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlConfigService } from 'src/app/helper/url-config.service';
import { catchError } from 'rxjs/operators';
import { ErrorService } from 'src/app/shared/services/error-handle.service';
import { Subject } from 'rxjs';
 import 'rxjs/add/operator/map';


@Injectable({
  providedIn: 'root'
})
export class MenuService {
  public stringSubject = new Subject<string>();
  public wishListCount = new Subject<string>();
  storeId ;
  baseURL: string;
 

  constructor(private http: HttpClient, private urlService: UrlConfigService, private err: ErrorService ) {
    this.baseURL = this.urlService.getBaseUrl();
  }
  passValue(data) {
    this.stringSubject.next(data);
  }
  passWishlistValue(data){
    this.wishListCount.next(data);
  }
  getMenu(body): Observable<any> {
    this.storeId = localStorage.getItem('storeId')
    return this.http.post(this.baseURL + 'categorylistui', body ).pipe(catchError(this.err.handleError));
  }
  getTenantId(body):Observable<any>{
    return this.http.post(this.baseURL + 'Get_Tenant_id', body ).pipe(catchError(this.err.handleError));
  }
  
}
