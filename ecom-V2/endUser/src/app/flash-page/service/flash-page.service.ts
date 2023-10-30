import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { param } from 'jquery';
import { Observable } from 'rxjs-compat';
import { catchError } from 'rxjs/operators';
import { ErrorService } from 'src/app/helper/error.service';
import { UrlConfigService } from 'src/app/helper/url-config.service';

@Injectable({
  providedIn: 'root'
})
export class FlashPageService {
  CBaseUrl: string;
  constructor(private http: HttpClient, private urlService: UrlConfigService, private err: ErrorService) { 
    this.CBaseUrl = this.urlService.getCarouselBaseUrl();
  }
  getUploadDoc(param): Observable<any> {
    return this.http.get(this.CBaseUrl + 'getContentFromNestedFolder',param).pipe(catchError(this.err.handleError));
  }
}
