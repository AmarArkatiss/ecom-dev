import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { param } from 'jquery';
import { EMPTY } from 'rxjs';
import { Observable, BehaviorSubject } from 'rxjs-compat';
import { catchError } from 'rxjs/operators';
import { ErrorService } from 'src/app/helper/error.service';
import { GeneralService } from 'src/app/helper/general.service';
import { UrlConfigService } from 'src/app/helper/url-config.service';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class LandingPageService {
  private chatData = new BehaviorSubject<any>({
  });
  logedCustomerId;
  CBaseUrl: string;
  baseURL: string;
  botURL: string;
  constructor(private http: HttpClient, private urlService: UrlConfigService, private err: ErrorService, public gs: GeneralService) {
    this.CBaseUrl = this.urlService.getCarouselBaseUrl();
    this.baseURL = this.urlService.getBaseUrl();
    this.botURL = environment.botApiUrl
  }
  getUploadDoc(param): Observable<any> {
    return this.http.get(this.CBaseUrl + 'getContent', param).pipe(catchError(this.err.handleError));
  }

  getBrands(body): Observable<any> {
    return this.http.post(this.baseURL + 'ManufacturerList', body).pipe(catchError(this.err.handleError));
  }
  getExclusiveCategories(body): Observable<any> {
    return this.http.post(this.baseURL + 'ExclusiveCategory', body).pipe(catchError(this.err.handleError));
  }
  sessionInsert(body): Observable<any> {
    return this.http.post(this.baseURL + 'APISession', body).pipe(catchError(this.err.handleError));
  }


  // BOT APIS //

  sendMessage(body: {}): Observable<any> {
    return this.http.post(this.botURL + 'chat_bot_api', body).pipe(catchError(this.err.handleError));
  }
  logout(body: {}): Observable<any> {
    return this.http.post(this.botURL + 'chat_bot_logout', body).pipe(catchError(this.err.handleError));
  }
  setChatData(data: any[]): any {
    this.chatData.next(EMPTY);
    this.chatData.next(data);
  }
  getChatData(): any {
    return this.chatData.asObservable();
  }
  login(body: {
    user_name: string; password: string; type: any;
    context: { 'user-agent': { browser: any; browser_version: any; }; 'user-interface': string; };
  }): Observable<any> {
    return this.http.post(this.botURL + 'chat_bot_login', body).pipe(catchError(this.err.handleError));
  }
}
