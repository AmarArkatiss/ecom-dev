import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../helper/common.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment.prod';
import { TenantBasedDataService } from 'src/app/shared/services/tenant-based-data.service';

@Component({
  selector: 'app-my-vocher-details',
  templateUrl: './my-vocher-details.component.html',
  styleUrls: ['./my-vocher-details.component.scss']
})
export class MyVocherDetailsComponent implements OnInit {
  myVocherDetailsArray = [];
  recieptForm: FormGroup;
  customerId;
  hide = false;
  panelOpenState = false;
  VocherArray = [];
  logedCustomerId;
  logedStoreId;
  imgurl;
  currencyId;
  orgName: any;
  constructor(private common: CommonService, public formBuilder: FormBuilder, private snack: MatSnackBar, private tenantDataService: TenantBasedDataService) { }
  ngOnInit(): void {
    this.getTenantAddress();
    this.logedCustomerId = sessionStorage.getItem('customerId');
    this.logedStoreId = sessionStorage.getItem('StoreId');
    this.imgurl = environment.imageURL;
    this.recieptForm = this.formBuilder.group({
      Amount: ['', Validators.required],
      to: ['', Validators.required],
      emailto: ['', Validators.required],
      from: ['', Validators.required],
      message: ['', Validators.required],
    });
    this.getmyVochersDetails();
    this.getVochers();
    this.common.currencyClickedEvent
      .subscribe((data: any) => {
        this.currencyId = sessionStorage.getItem('currencyId')
        this.getmyVochersDetails();
        this.getVochers();
      });
    this.common.aClickedEvent
      .subscribe((data: any) => {
        this.getmyVochersDetails();
        this.getVochers();
      });
  }
  /**
   * @remarks Get Vocher Details
   * @author  
   * @version 1.0
  */

  getmyVochersDetails() {
    const customerId = sessionStorage.getItem('customerId');
    let body;
    body = { "voucher_op_type": "details", "customer_id": customerId };
    body = this.common.withoutDataStoreValidation(body)
    const success = this.VochersOnSuccess.bind(this);
    const error = this.VochersonError.bind(this);
    this.common.http.post('VoucherUi', body, success, error);
  }
  VochersOnSuccess(data) {
    if (data.res_status === true) {
      this.myVocherDetailsArray = data.details;
      const img1 = "assets/images/Gift-img1.png"
      const img2 = "assets/images/Gift-img2.png"
      const imgArr = [img1, img2];
      const imglength = imgArr.length;
      let finalImgList = []
      const voucherlistLength = this.myVocherDetailsArray.length / imgArr.length;
    } else {
      this.myVocherDetailsArray = [];
    }
  }
  VochersonError(data) { }
  getVochers() {
    const custID2 = sessionStorage.getItem('customerId');
    let body;
    body = { "voucher_op_type": "sent", "customer_id": custID2 };
    body = this.common.withoutDataStoreValidation(body);
    const success = this.getVochersOnSuccess.bind(this);
    const error = this.VochersonError.bind(this);
    this.common.http.post('VoucherUi', body, success, error);
  }
  getVochersOnSuccess(data) {
    if (data.res_status === true) {
      this.VocherArray = data.data;
    } else {
      this.VocherArray = []
    }
  }
  genarateGift() {
    let body;
    const val = this.recieptForm.value;
    const frmMail = sessionStorage.getItem('userEmail')
    if (!val.from || !val.to || !val.emailto || !val.Amount) {
      this.snack.open("please fill the required fields", "Ok", { duration: 2000 });
    } else {
      body = {
        "voucher_op_type": "insert", "from_name": val.from, "from_email": frmMail, "voucher_theme_id": 1,
        "message": val.message, "to_name": val.to, "to_email": val.emailto,
        "amount": val.Amount, "customer_id": this.logedCustomerId
      };
      body = this.common.withoutDataStoreValidation(body);
      const success = this.giftCardOnSuccess.bind(this);
      const error = this.giftCardonError.bind(this);
      this.common.http.post('VoucherUi', body, success, error);
    }
  }
  giftCardOnSuccess(data) {
    if (data.res_status === true) {
      this.snack.open(data.msg, 'ok', { duration: 5000 });
      this.recieptForm.reset;
    } else {
      this.snack.open(data.error, 'ok', { duration: 5000 });
    }
  }
  giftCardonError(data) {
    this.snack.open(data.msg, 'ok', { duration: 2000 });
  }
  send() {
    this.hide = true;
  }
  getTenantAddress() {
    this.orgName = this.tenantDataService.orgName;
  }
}
