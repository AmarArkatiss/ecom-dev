import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { CommonService } from '../../../helper/common.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UrlConfigService } from 'src/app/helper/url-config.service';
import { catchError } from 'rxjs/operators';
import { ErrorService } from 'src/app/shared/services/error-handle.service';
@Injectable({
  providedIn: 'root'
})

export class PlaceOrderService {
  sampleProductData: any[] = [];
  orderUrl;
  constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder,
    private common: CommonService, private http: HttpClient, private urlService: UrlConfigService, private err: ErrorService) {
    this.orderUrl = this.urlService.getorderBaseUrl();
  }

  getSampleProducts(): Observable<any> {
    return this.http.get('./assets/config/ecom-sample2.json')
  }

  getorderMenu(body): Observable<any> {
    return this.http.post(this.orderUrl + 'order', body).pipe(catchError(this.err.handleError));
  }
}

