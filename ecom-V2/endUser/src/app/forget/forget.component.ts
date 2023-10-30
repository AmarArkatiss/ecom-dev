import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/helper/common.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/helper/auth.service';
import { FormBuilder } from '@angular/forms';
import { environment } from '../../environments/environment';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.scss']
})
export class ForgetComponent implements OnInit {
  custmaild;
  imgurl;
  emailid;
  abba;
  forgotForm;
  otpForm;
  newpwdForm;
  otpid;
  customerid;

  constructor(private router: Router, private common: CommonService, public formBuilder: FormBuilder, private auth: AuthService, private http: HttpClient) {
    this.imgurl = environment.imageUrl;
  }

  ngOnInit(): void {
    this.forgotForm = true;
    this.otpForm = false;
    this.newpwdForm = false;
  }

  myFunc(e): any {
    const success = this.passwordonSuccess.bind(this);
    const error = this.passwordonErrorr.bind(this);
    const body = { customer_op_type: "forget_password", data: e, data_type: "email" };
    this.common.http.post('password', body, success, error);
  }
  passwordonSuccess(data) {
    this.forgotForm = false;
    this.otpForm = true;
    this.newpwdForm = false;
    this.otpid = data['data'].otp;
    this.customerid = data['data'].customer_id;
  }
  passwordonErrorr(data) {
    Swal.fire({
      icon: 'error',
      text: data['message']
    });
  }
  backtologin() {
    this.router.navigate(['/auth/login']);
  }
  myOTP(t) {
    const success = this.otponSuccess.bind(this);
    const error = this.otponErrorr.bind(this);
    const body = { customer_op_type: "otp_verification", otp: this.otpid, customer_id: this.customerid };
    this.common.http.post('password', body, success, error);
  }
  otponSuccess(data) {
    this.otpForm = false;
    this.newpwdForm = true;
  }
  otponErrorr(data) {
    Swal.fire({
      icon: 'error',
      text: data['message']
    });
  }
}
