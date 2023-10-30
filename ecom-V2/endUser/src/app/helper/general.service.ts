import { Injectable } from '@angular/core';
import { UrlTree } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  storedFormData = [];
  private newMail = new BehaviorSubject<any>({
  });
  private storedData = new BehaviorSubject<any>({
  });
  private httpUrl = new BehaviorSubject<any>({
  });
  public sessionStorage: any;
  constructor() {
    this.sessionStorage = window.sessionStorage;
  }
  setData(data: { res_status: boolean; support: any; data: { msg: any; }; msg: any; pre_link: string | UrlTree; }): any {
    this.storedData.next(data);
  }
  getData(): any {
    return this.storedData.asObservable();
  }
  setFormData(data: { form_type: any; entry_forms: any; }): any {
    this.newMail.next(data);
  }

  setSessionState(data: any[]): any {
    this.sessionStorage.setItem('chatData', JSON.stringify(data));
  }
  getSessionState(): any {
    return JSON.parse(this.sessionStorage.getItem('chatData'));
  }

  setPropertiesUrl(url: Object): void {
    this.sessionStorage.setItem('assetsurl', JSON.stringify(url));
    this.httpUrl.next(url);
  }
  getPropertiesUrl(): any {
    return this.httpUrl.asObservable();
  }
  getHttpUrl(serviceName: string): any {
    const httpUrl = JSON.parse(this.sessionStorage.getItem('assetsurl'));
    const url = httpUrl[serviceName];
    return url;
  }
  getCssUrl(cssName: string | number): any {
    const cssurl = JSON.parse(this.sessionStorage.getItem('assetsurl'));
    const url = cssurl[cssName];
    return url;
  }
}