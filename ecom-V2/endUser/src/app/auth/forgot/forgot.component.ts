import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/helper/common.service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
  providers: [MessageService]
})
export class ForgotComponent implements OnInit {
  custmaild;
  imgurl;
  emailid;
  abba;
  forgotForm = true;
  otpForm = false;
  newpwdForm = false;
  otpid;
  customerid;
  email;
  otp;
  newPswrd;
  cnfrmPswrd;
  constructor(private router: Router, private common: CommonService, public formBuilder: FormBuilder, private lgService: LoginService, private messageService: MessageService, private primengConfig: PrimeNGConfig) {
    this.imgurl = environment.imageUrl;
  }
  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  myFunc(): any {
    if (!this.email) {
      Swal.fire({
        icon: 'error',
        text: 'Please enter valid email'
      });
      return
    }
    const body = { customer_op_type: "forget_password", data: this.email, data_type: "email" };
    this.lgService.passwrdOTP(body).subscribe(
      (data) => {
        if (data.res_status === true) {
          Swal.fire({
            icon: 'success',
            text: data.data.msg
          });
          this.forgotForm = false;
          this.otpForm = true;
          this.newpwdForm = false;
          this.otp = data['data'].otp;
          this.customerid = data['data'].customer_id;
        } else {
          Swal.fire({
            icon: 'error',
            text: data.msg
          });
        }
      }, (err) => {
        Swal.fire({
          icon: 'error',
          text: err
        });
      })
  }

  backtologin() {
    this.router.navigate(['/auth/login']);
  }
  myOTP() {
    const body = { customer_op_type: "otp_verification", otp: this.otp, customer_id: this.customerid };
    this.lgService.passwrdOTP(body).subscribe(
      (data) => {
        this.otpForm = false;
        this.newpwdForm = true;
      }, (err) => {
        Swal.fire({
          icon: 'error',
          text: err
        });
      })
  }

  changePassword() {

    const body = { customer_op_type: "reset_password", new_password: this.newPswrd, retype_password: this.cnfrmPswrd, customer_id: this.customerid };
    this.lgService.passwrdOTP(body).subscribe(
      (data) => {
        if (data.res_status === true) {
          Swal.fire({
            icon: 'success',
            text: data.data.msg
          });
          this.router.navigate(['/auth/login']);
        } else {
          Swal.fire({
            icon: 'error',
            text: data.data.msg
          });
        }

      }, (err) => {
        Swal.fire({
          icon: 'error',
          text: err
        });
      })
  }

}
