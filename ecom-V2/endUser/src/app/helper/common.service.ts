import { Injectable, EventEmitter, Output } from '@angular/core';
import { UrlConfigService } from './url-config.service';
import { HttpService } from './http.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public urlConfig: any;
  public session: any;
  public http: any;
  public updatedToggle = false;
  public comingSoonText;
  currencyId;
  storeId;
  @Output() aClickedEvent = new EventEmitter<string>();
  @Output() profileEvent = new EventEmitter<string>();
  @Output() currencyClickedEvent = new EventEmitter<string>();
  @Output() drpdwnShowOrHideEvent = new EventEmitter<string>();
  @Output() toggleContentEvent = new EventEmitter<string>();
  @Output() searchEvent = new EventEmitter<string>();
  @Output() searchKeyEvent = new EventEmitter<string>();
  @Output() addressUpdateEvnt = new EventEmitter<string>();
  @Output() viewStoreEvnt = new EventEmitter<string>();
  @Output() botSearchEvnt = new EventEmitter<string>();

  constructor(urlConfig: UrlConfigService, http: HttpService, private router: Router) {
    this.urlConfig = urlConfig;
    this.http = http;
    this.comingSoonText = 'Coming soon';
  }
  AClicked(id: any) {
    this.aClickedEvent.emit(id);

  }
  ProfileNameUpdate(data: any) {
    this.profileEvent.emit(data);
  }
  search(data: any) {
    this.searchEvent.emit(data);
  }
  searchKey(data) {
    this.searchKeyEvent.emit(data);
  }
  botSearchKey(data) {
    this.botSearchEvnt.emit(data);
  }
  currencyClicked(id: any) {
    this.currencyClickedEvent.emit(id);
  }
  cartClicked(id: any) {
    this.drpdwnShowOrHideEvent.emit(id);
  }
  togleClicked(toggle: any) {
    this.updatedToggle = toggle
    this.toggleContentEvent.emit(toggle)
  }
  addressUpdate(data: any) {
    this.addressUpdateEvnt.emit(data)
  }
  viewStore(data: any) {
    this.viewStoreEvnt.emit(data)
  }
  /**
     * @remarks Validating Store and Currency conditions
     * @author  Devi
     * @params body
     * @version 1.0
  */
  withoutDataStoreValidation(body) {
    this.storeId = sessionStorage.getItem('StoreId')
    this.currencyId = sessionStorage.getItem('currencyId')
    if (this.storeId == null || this.storeId === 'all') {
      if (this.currencyId == null || this.currencyId == undefined) {
        return body;
      } else {
        body['currency_id'] = parseInt(this.currencyId);
        return body;
      }
    } else {
      if (this.currencyId == null || this.currencyId == undefined) {
        body['store_id'] = this.storeId;
        return body;
      } else {
        body['currency_id'] = parseInt(this.currencyId);
        body['store_id'] = this.storeId;
        body['store_currency_flag'] = 1
        return body;
      }
    }
  }
  /**
   * @remarks Checking Reference id and tracking id in the url 
   * @author  Devi
   * @version 1.0
  */
  referenceIdValidation(body) {
    const url = sessionStorage.getItem('affiliateUrl')
    if (url !== null && url !== undefined) {
      if (url.includes('ref_id')) {
        const refId = url.split('=')[1]
        body['url'] = url;
        body['ref_id'] = refId;
        body['tracking_id'] = ''
        return body;
      } else if (url.includes('t_id')) {
        const trackId = url.split('=')[1]
        body['url'] = url;
        body['ref_id'] = 0;
        body['tracking_id'] = trackId
        return body;
      }
    } else {
      body['url'] = '';
      body['ref_id'] = 0;
      body['tracking_id'] = '';
      return body;
    }
  }

  /**
 * @remarks checking currency and store validations
 * @param body returns body with store & currency keys 
 * @author  Devi
 * @version 1.0
 */
  //Store validation method
  storeValidation(body) {
    this.storeId = sessionStorage.getItem('StoreId')
    this.currencyId = sessionStorage.getItem('currencyId')
    if (this.storeId == null || this.storeId === 'all') {
      if (this.currencyId == null || this.currencyId == undefined) {
        return body;
      } else {
        body.data[0]['currency_id'] = parseInt(this.currencyId);
        return body;
      }
    } else {
      if (this.currencyId == null || this.currencyId == undefined) {
        body['store_id'] = this.storeId;
        return body;
      } else {
        body.data[0]['currency_id'] = parseInt(this.currencyId);
        body['store_currency_flag'] = 1
        body['store_id'] = this.storeId;
        return body;
      }
    }
  }
  /**
  * @remarks Store Validations with coupon keys
  * @author  Devi
  * @version 1.0
  */
  storeValidationWithCoupon(body, couponFlag, getCoupRes) {
    this.storeId = sessionStorage.getItem('StoreId')
    this.currencyId = sessionStorage.getItem('currencyId')
    if (this.storeId == null || this.storeId === 'all') {
      if (this.currencyId == null || this.currencyId == undefined) {
        if (couponFlag === false) {
          body['coupon_applied'] = false
          return body;
        } else {
          body['coupon_applied'] = true
          body['coupon_details'] = [getCoupRes]
          return body;
        }
      } else {
        if (couponFlag === false) {
          body['currency_id'] = parseInt(this.currencyId);
          body['coupon_applied'] = false
          return body;
        } else {
          body['currency_id'] = parseInt(this.currencyId);
          body['coupon_applied'] = true
          body['coupon_details'] = [getCoupRes]
          return body;
        }
      }
    } else {
      if (this.currencyId == null || this.currencyId == undefined) {
        if (couponFlag === false) {
          body['coupon_applied'] = false
          body['store_id'] = this.storeId;
          return body;
        } else {
          body['store_id'] = this.storeId;
          body['coupon_applied'] = true
          body['coupon_details'] = [getCoupRes]
          return body;
        }
      } else {
        if (couponFlag === false) {
          body['currency_id'] = parseInt(this.currencyId);
          body['store_currency_flag'] = 1
          body['coupon_applied'] = false
          body['store_id'] = this.storeId;
          return body;
        } else {
          body['currency_id'] = parseInt(this.currencyId);
          body['store_currency_flag'] = 1
          body['store_id'] = this.storeId;
          body['coupon_applied'] = true
          body['coupon_details'] = [getCoupRes]
          return body;
        }
      }
    }
  }
}
