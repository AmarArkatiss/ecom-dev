import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UrlConfigService } from 'src/app/helper/url-config.service';
import { ErrorService } from 'src/app/helper/error.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  baseURL: string;
  constructor(private http: HttpClient, private urlService: UrlConfigService, private err: ErrorService) {
    this.baseURL = this.urlService.getBaseUrl();
   }

  getProfileData(): any {
    return this.http.get('./assets/profile.json');
  }
}
