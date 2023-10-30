import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonService } from '../../helper/common.service';
import { Router } from '@angular/router';
import { UtilsService } from '../../helper/utils.service';
import { AuthService } from 'src/app/helper/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-gift-card',
  templateUrl: './gift-card.component.html',
  styleUrls: ['./gift-card.component.scss']
})

export class GiftCardComponent implements OnInit {
  recieptForm: FormGroup;
  hide = true;
  logedCustomerId;
  logedStoreId;
  imgurl;
  imagesUrl1;

  constructor(public formBuilder: FormBuilder, public picker: MatDatepickerModule, private router: Router,
    private snack: MatSnackBar,
    private common: CommonService, private auth: AuthService, private utils: UtilsService, private http: HttpClient) {
    this.imgurl = environment.imageURL;
  }

  ngOnInit(): void {
    this.logedCustomerId = sessionStorage.getItem('customerId');
    this.logedStoreId = sessionStorage.getItem('StoreId');
    this.recieptForm = this.formBuilder.group({
      Amount: ['', Validators.required],
      to: ['', Validators.required],
      emailto: ['', Validators.required],
      from: ['', Validators.required],
      fromemail: ['', Validators.required],
      message: ['', Validators.required],
      quality: ['', Validators.required],
    });
    const img1 = 'assets/images/home_puma_d1642511457.jfif';
    const img2 = 'assets/images/Shopsy_updated_banner-03.png';
    const img3 = 'assets/images/zero_commission_banne.png';
    const img4 = 'assets/images/home_sonyliv_desktop_banner1643130223.jfif';
    const img5 = 'assets/images/zero_commission_banne.png';
    const img6 = 'assets/images/Shopsy_updated_banner-03.png';
    const img7 = 'assets/images/LGC-Jan-2022-banners-1440-x-274.jpg';
    this.imagesUrl1 = [{ path: img1 }, { path: img2 }, { path: img3 }, { path: img4 }, { path: img5 }, { path: img6 },
    { path: img7 }];
  }
  myOTP() { }
  /**
         * @remarks Genarate Gift Card
         * @author  Ramana.majeti
         * @version 1.0
         */
  genarateGift() {
    const val = this.recieptForm.value;
    if (this.logedStoreId === "all" || this.logedStoreId == null) {
      this.logedStoreId = "0";
    }
    const body = {
      "voucher_op_type": "insert", "from_name": val.from, "from_email": val.fromemail, "voucher_theme_id": 1,
      "message": val.message, "to_name": val.to, "to_email": val.emailto,
      "amount": val.Amount, "store_id": this.logedStoreId, "customer_id": this.logedCustomerId
    };
    const success = this.giftCardOnSuccess.bind(this);
    const error = this.giftCardonError.bind(this);
    this.common.http.post('VoucherUi', body, success, error);
  }
  giftCardOnSuccess(data) {
    this.snack.open(data.msg, 'ok', { duration: 2000 });
  }
  giftCardonError(data) {
    this.snack.open(data.msg, 'ok', { duration: 2000 });
  }
}