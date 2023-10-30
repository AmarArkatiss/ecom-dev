import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlConfigService } from './url-config.service';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private urls;
  private base_url;
  apiCall;
  private pinUrl;
  constructor(private httpClient: HttpClient, private UrlConfig: UrlConfigService, private errorService: ErrorService) {
    this.urls = this.UrlConfig.getUrls();
    this.pinUrl = this.UrlConfig.pinCodeUrl;
    this.base_url = this.UrlConfig.base_url;
  }
  get(url, callback, error): void;
  get(url, callback, error, options): void;

  get(url, callback, error, options?: any) {
    let headers = {};
    let path = this.getUrl(url);
    if (options !== undefined) {
      if (options.params === undefined) {
        headers = options;
      } else {
        options.params.forEach(each => {
          path += '/' + each;
        });
      }
    }
    this.httpClient.get(path, headers)
      .toPromise().then(callback).catch(error);
  }
  post(url, body, success, error) {
    this.apiCall = this.httpClient.post(this.getUrl(url), body)
      .subscribe(
        response => {
          success(response);
        },
        err => {
          const errorMsg = this.errorService.handleError(err);
          error(errorMsg);
        });
  }

  pin(url, body, success, error) {
    this.apiCall = this.httpClient.get(this.getPinUrl(url), body)
      .subscribe(
        response => {
          success(response);
        },
        err => {
          const errorMsg = this.errorService.handleError(err);
          error(errorMsg);
        });
  }
  put(url, body, callback, error) {
    this.httpClient.put(this.getUrl(url), body)
      .toPromise().then(callback).catch(error);
  }

  delete(url, body, callback, error) {
    this.httpClient.delete(this.getUrl(url), body)
      .toPromise().then(callback).catch(error);
  }

  getUrl(name) {
    return this.base_url + this.urls[name];
  }
  getPinUrl(url) {
    return this.pinUrl + url;
  }
}
