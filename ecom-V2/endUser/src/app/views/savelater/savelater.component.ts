import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../helper/common.service';
import { Router } from '@angular/router';
import { Clipboard } from '@angular/cdk/clipboard';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-savelater',
  templateUrl: './savelater.component.html',
  styleUrls: ['./savelater.component.scss']
})
export class SavelaterComponent implements OnInit {
  couponsArray: any[];
  tenantId: any;
  imgurl;
  constructor(private router: Router,
    private common: CommonService, private clipboard: Clipboard) {
    this.imgurl = environment.imageURL;
  }

  ngOnInit(): void {
    this.common.aClickedEvent
      .subscribe((data: any) => {
        this.getCoupons();
      });
    this.common.currencyClickedEvent
      .subscribe((data: any) => {
        this.getCoupons();
      });
    this.tenantId = sessionStorage.getItem('tenantId');
    this.getCoupons();

  }

  /**
   * @remarks Get Coupons List
   * @AddedBy  Ramana.majeti
   * @ModifiedBy Devi added store validations & changed the payloads
   * @version 1.0
   */
  getCoupons() {
    let body = {
      coupon_op_type: "view", limit: 100, offset: 0, product_id: "all",
      category_id: "all", tenant_id: this.tenantId
    };
    body = this.common.withoutDataStoreValidation(body);
    const success = this.CouponsOnSuccess.bind(this);
    const error = this.CouponsonError.bind(this);
    this.common.http.post('CouponsUi', body, success, error);

  }
  CouponsOnSuccess(data) {
    if (data.res_status === true) {
      this.couponsArray = data.data;
    } else {
      this.couponsArray = []
    }
  }
  CouponsonError() { }

  copyInputMessage(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }
}
