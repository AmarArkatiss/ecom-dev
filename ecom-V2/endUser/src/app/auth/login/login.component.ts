import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { environment } from '../../../environments/environment.prod';
import { CommonService } from 'src/app/helper/common.service';
import { AuthService } from 'src/app/helper/auth.service';
import jwt_decode from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UtilsService } from '../../helper/utils.service';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CookieService } from 'ngx-cookie-service';
import { LandingPageService } from 'src/app/landing-page/service/landing-page.service';
import { LoginService } from '../service/login.service';
import Swal from 'sweetalert2';
import { TenantBasedDataService } from 'src/app/shared/services/tenant-based-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('affiliationDetails') invite: TemplateRef<any>;
  decodeddata;
  loginForm: FormGroup;
  signupForm: FormGroup;
  forgotForm: FormGroup;
  imgurl;
  hide = true;
  newPwdhide = true;
  pswrdhide = true;
  cnfrmhide = true;
  isLoading = false;

  private roledata;
  showloginform = true;
  showsignupform = false;
  logintext = 'Sign In';
  loggingWithGmail;
  registrationtypee;
  storeId;
  settingFlag;

  currencyDropList = [];
  url;
  toggle1: boolean = false;
  guestSessionId;
  tenantId;
  imagesUrl1 = [];
  imagesUrl2 = [];
  imagesUrl3 = [];
  pageRoute;
  buyData: any;
  baseUrl: string;
  forgotFlag = false;
  otpFlag = false;
  newpwdForm = false;
  otpid;
  customerid;
  regionInfo;
  countryInfo;
  imgUrl = environment.imageURL;
  mainLogo: any;
  orgName: any;
  constructor(
    private router: Router,
    public activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    private snack: MatSnackBar,
    private LPService: LandingPageService,
    private lgService: LoginService,
    private common: CommonService,
    private cookieService: CookieService,
    private Maticon: MatIconModule,
    private auth: AuthService,
    private utils: UtilsService,
    private http: HttpClient,
    readonly dialog: MatDialog,
    private tenantDataService: TenantBasedDataService,
  ) {
    this.imgurl = environment.imageURL;
    this.baseUrl = environment.baseUrl;
  }

  ngOnInit(): void {
    const img1 = 'assets/loginImgs/Login-1.png';
    const img2 = 'assets/loginImgs/Login-2.png';
    const img3 = 'assets/loginImgs/Character Product View.png';
    const img4 = 'assets/loginImgs/Login-4.png';
    const img5 = 'assets/loginImgs/Login-5.png';
    const img6 = 'assets/loginImgs/signUp.png';
    const img7 = 'assets/loginImgs/Forgot Password.png';
    this.activatedRoute.queryParams.subscribe((params) => {
      this.pageRoute = params.pageRoute;
      this.buyData = params.buynowData;
    });
    this.imagesUrl1 = [
      { path: img1 },
      { path: img2 },
      { path: img3 },
      { path: img4 },
      { path: img5 },
    ];

    this.imagesUrl2 = [
      { path: img6 },
      { path: img2 },
      { path: img3 },
      { path: img4 },
      { path: img5 },
    ];
    this.imagesUrl3 = [
      { path: img7 },
      { path: img1 },
      { path: img2 },
      { path: img3 },
      { path: img4 },
      { path: img5 },
    ];

    this.guestSessionId = this.cookieService.get('GuestSessionIDdata');
    this.tenantId = sessionStorage.getItem('tenantId');
    this.toggle1 = !this.toggle1;
    this.url = window.location.href;

    if (this.url.includes('code_verifier=true') === true) {
      this.auth.getHomePage();
    } else {
      this.isLoading = false;
      this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
      });
      this.forgotForm = this.formBuilder.group({
        email: ['', Validators.required],
        otp: ['', Validators.required],
        newPassword: ['', Validators.required],
        confrmPassword: ['', Validators.required],
      });
      this.signupForm = this.formBuilder.group({
        registrationtypee: ['', Validators.required],
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        password: ['', Validators.required],
        email: ['', Validators.required],
        mobile_number: ['', Validators.required],
        gender: ['', Validators.required],
        address: ['', Validators.required],
        city: ['', Validators.required],
        postcode: ['', Validators.required],
        country_id: ['', Validators.required],
        zone_id: ['', Validators.required],
        confirm_password: ['', Validators.required],
      });
    }

    this.storeId = localStorage.getItem('storeId');
    this.storeSetup();
    this.handleGetCountries();
    this.getTenantBasedLogo();
  }

  /**
   * @remarks login
   * @AddedBy  Amar
   * @ModifiedBy Devi Added referece id and tracking id conditions
   * @version 1.0
   */
  login(): void {
    this.isLoading = true;
    if (
      this.loginForm.value.username == '' &&
      this.loginForm.value.password == ''
    ) {
      this.isLoading = false;
      this.snack.open('Please enter username and password', 'Ok', {
        duration: 2000,
      });
    } else {
      this.loggingWithGmail = false;
      const url = sessionStorage.getItem('affiliateUrl');
      let body;
      if (this.guestSessionId !== null && this.guestSessionId !== undefined) {
        body = {
          username: this.loginForm.value.username,
          password: this.loginForm.value.password,
          cookie: 1,
          store_id: 0,
          tenant_id: this.tenantId,
          session_id: this.guestSessionId,
          api_name: 'customerlogin',
        };
      } else {
        body = {
          username: this.loginForm.value.username,
          password: this.loginForm.value.password,
          cookie: 1,
          store_id: 0,
          tenant_id: this.tenantId,
          api_name: 'customerlogin',
        };
      }
      body = this.common.referenceIdValidation(body);

      this.lgService.login(body).subscribe({
        next: (data) => {
          this.isLoading = false;
          if (data['res_status'] === true) {
            const userdata = data['data'].customer_name;
            sessionStorage.setItem('userdata', userdata);
            const usersessionId = data['data'].session_id;
            sessionStorage.setItem('sessionId', usersessionId);
            const userCustomerId = data['data'].customer_id;
            sessionStorage.setItem('customerId', userCustomerId);
            const useremaild = data['data'].user_name;
            sessionStorage.setItem('userEmail', useremaild);
            const firstname = data['data'].firstname;
            sessionStorage.setItem('firstname', firstname);
            const lastname = data['data'].lastname;
            sessionStorage.setItem('lastname', lastname);
            const mobileno = data['data'].telephone;
            sessionStorage.setItem('telephone', mobileno);
            this.loggedSessionInsert();
            if (url !== null && url !== undefined) {
              if (url.includes('ref_id') || url.includes('tracking_id')) {
                document.location.href = url;
              }
            } else if (this.pageRoute === 'cart') {
              this.router.navigateByUrl('/cart');
            } else if (this.pageRoute === 'buynow') {
              this.router.navigate(['/placeorder'], {
                queryParams: {
                  couponFlag: false,
                  buynowData: this.buyData,
                  buyNowFlag: true,
                },
              });
            } else {
              this.router.navigateByUrl('/home');
            }
          } else {
            this.isLoading = false;
            this.snack.open(data['msg'], 'Ok', { duration: 2000 });
          }
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            text: error,
          });
        },
      });
    }
  }

  loggedSessionInsert() {
    let body;
    const deviceUid = localStorage.getItem('UUID');
    const userEmail = sessionStorage.getItem('userEmail');
    const userId = sessionStorage.getItem('customerId');
    const sessionId = sessionStorage.getItem('sessionId');
    body = {
      guest_session_op_type: 'session_data',
      session_id: sessionId,
      browser_id: deviceUid,
      email: userEmail,
      customer_id: userId,
    };
    this.LPService.sessionInsert(body).subscribe((data) => {
    });
  }
  getTenantBasedLogo() {
    this.mainLogo = this.tenantDataService.Logo;
    this.orgName = this.tenantDataService.orgName
  }
  onSuccessslogin(data): any {
    if (data.res_status === true) {
      let arr = [];
      arr = data.data;
      const sessionValue = [];
      for (const i of arr) {
        sessionValue.push({
          user_id: i.user_id,
          user_name: i.user_name,
          session_id: i.session_id,
        });
      }
      this.getRoles(sessionValue);
      const token = JSON.stringify(sessionValue);
      sessionStorage.setItem('user', token);
      this.router.navigateByUrl('/home');
    } else {
      this.isLoading = false;
      this.snack.open(data.msg, 'Ok', { duration: 2000 });
    }
  }
  validateAllFields(formGroup: FormGroup): any {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
        this.snack.open(field, 'Ok', { duration: 2000 });
      } else if (control instanceof FormGroup) {
        this.validateAllFields(control);
      }
    });
  }
  onErrorr(error): any {
    this.isLoading = false;
    this.snack.open(error, 'Ok', { duration: 2000 });
  }
  gmaillogin(): any {
    sessionStorage.setItem('social', 'social');
    const url = window.location.href;
    if (url.includes('jwtToken') === true) {
      const str = url.split('?jwtToken=');
      this.decodeddata = jwt_decode(str[1]);
      sessionStorage.setItem('token', this.decodeddata.first_name);
      this.loggingWithGmail = true;
      sessionStorage.setItem('loggingWithGmailFlag', this.loggingWithGmail);
    } else if (url.includes('code_verifier=true') === true) {
      this.auth.getHomePage();
    } else {
      const token = sessionStorage.getItem('token');
      if (token === null || token === undefined) {
        this.auth.getLoginPage();
      } else {
        this.router.navigate(['/home']);
      }
    }
  }

  getRoles(data): any {
    const success = this.onSuccessRoles.bind(this);
    const error = this.onErrorr.bind(this);
    const body = {
      user_name: data[0].user_name,
      session_id: data[0].session_id,
    };
    this.common.http.post('retrieve_user_roles', body, success, error);
  }
  onSuccessRoles(data): any {
    if (data.res_status === true) {
      this.roledata = data.data;
      sessionStorage.setItem('roles', this.roledata);
    }
  }
  forgotClick() {
    this.forgotFlag = true;
    this.showsignupform = false;
    this.showloginform = false;
    this.otpFlag = false;
  }
  fbslogin() {
    this.router.navigate(['/home']);
  }
  logBack() {
    this.forgotFlag = false;
    this.showsignupform = false;
    this.showloginform = true;
    this.otpFlag = false;
  }

  showsignup(): any {
    this.showsignupform = true;
    this.showloginform = false;
    this.forgotFlag = false;
    this.otpFlag = false;
    this.logintext = 'Sign Up';
  }
  showlogin(): any {
    this.showsignupform = false;
    this.showloginform = true;
    this.forgotFlag = false;
    this.otpFlag = false;
    this.logintext = 'Sign In';
  }
  signup(): any {
    const body = {
      customer_register_op_type: 'select',
      registration_type: 'Normal',
      firstname: this.signupForm.value.first_name,
      lastname: this.signupForm.value.last_name,
      email: this.signupForm.value.email,
      telephone: this.signupForm.value.mobile_number,
      password: this.signupForm.value.password,
      newsletter: true,
      session_id: this.guestSessionId,
      gender: this.signupForm.value.gender,
      city: this.signupForm.value.city,
      country_id: this.signupForm.value.country_id,
      zone_id: this.signupForm.value.zone_id,
      address: this.signupForm.value.address,
      postcode: this.signupForm.value.postcode,
      confirm_password: this.signupForm.value.confirm_password,
    };
    const success = this.onSuccessssignup.bind(this);
    const error = this.onErrorr.bind(this);
    this.common.http.post('register', body, success, error);
    this.isLoading = true;
  }
  onSuccessssignup(data): any {
    if (data.res_status === true) {
      this.snack.open(data.msg, 'Ok', { duration: 2000 });
      this.isLoading = false;
      this.signupForm.reset();
      this.showsignupform = false;
      this.showloginform = true;
      this.logintext = 'Sign In';
    } else {
      this.isLoading = false;
      this.snack.open(data.msg, 'Ok', { duration: 2000 });
    }
  }

  storeSetup() {
    const body = { customer_register_op_type: 'store_login' };
    const success = this.onSuccessStoreSetUp.bind(this);
    const error = this.onErrorr.bind(this);
    this.common.http.post('register', body, success, error);
  }
  onSuccessStoreSetUp(response) {
    this.settingFlag = response.data[0].store_login_flag;
  }
  storeSignUp() {
    this.dialog.open(this.invite, { position: { left: '40%' }, width: '50%' });
  }
  storeSignIn() {
    const url = 'http://idsd.arkatiss.com/botcom-tenant/#/login';
    document.location.href = url;
  }

  /**
   * @remarks Forgot passsword
   * @AddedBy  Devi
   * @version 1.0
   */
  myFunc(): any {
    if (!this.forgotForm.value.email) {
      Swal.fire({
        icon: 'error',
        text: 'Please enter valid email',
      });
      return;
    }
    this.isLoading = true;
    const body = {
      customer_op_type: 'forget_password',
      data: this.forgotForm.value.email,
      data_type: 'email',
    };
    this.lgService.passwrdOTP(body).subscribe(
      (data) => {
        this.isLoading = false;
        if (data.res_status === true) {
          Swal.fire({
            icon: 'success',
            text: data.data.msg,
          });
          this.otpFlag = true;
          this.forgotFlag = false;
          this.showsignupform = false;
          this.showloginform = false;
          this.newpwdForm = false;
          this.otpid = data['data'].otp;
          this.customerid = data['data'].customer_id;
        } else {
          Swal.fire({
            icon: 'error',
            text: data.msg,
          });
        }
      },
      (err) => {
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          text: err,
        });
      }
    );
  }

  /**
   * @remarks OTP verification
   * @AddedBy  Devi
   * @version 1.0
   */
  getOtp() {
    this.isLoading = true;
    const body = {
      customer_op_type: 'otp_verification',
      otp: this.forgotForm.value.otp,
      customer_id: this.customerid,
    };
    this.lgService.passwrdOTP(body).subscribe(
      (data) => {
        this.isLoading = false;
        if (data.res_status === true) {
          this.newpwdForm = true;
          this.otpFlag = false;
          this.forgotFlag = false;
          this.showsignupform = false;
          this.showloginform = false;
        } else {
          Swal.fire({
            icon: 'error',
            text: data.msg,
          });
        }
      },
      (err) => {
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          text: err,
        });
      }
    );
  }

  /**
   * @remarks Reset Password
   * @AddedBy  Devi
   * @version 1.0
   */
  setNewPwd() {
    this.isLoading = true;
    const body = {
      customer_op_type: 'reset_password',
      new_password: this.forgotForm.value.newPassword,
      retype_password: this.forgotForm.value.confrmPassword,
      customer_id: this.customerid,
    };
    if (
      this.forgotForm.value.newPassword !== this.forgotForm.value.confrmPassword
    ) {
      this.isLoading = false;
      this.snack.open('Confirm password should match with new password', 'OK', {
        duration: 5000,
      });
    } else {
      this.lgService.passwrdOTP(body).subscribe(
        (data) => {
          this.isLoading = false;
          Swal.fire({
            icon: 'success',
            text: data.msg,
          });
          this.newpwdForm = false;
          this.otpFlag = false;
          this.forgotFlag = false;
          this.showsignupform = false;
          this.showloginform = true;
        },
        (err) => {
          this.isLoading = false;
          Swal.fire({
            icon: 'error',
            text: err,
          });
        }
      );
    }
  }

  /**
   * @remarks handle Get countries
   * @author
   * @version 1.0
   */
  handleGetCountries(): any {
    const body = {
      ordersdropdowns_op_type: 'countries_dropdown',
    };
    const success = this.handleCountrySuccess.bind(this);
    const error = this.onErrorCountry.bind(this);
    this.common.http.post('countryandregionsdropdown', body, success, error);
  }
  handleCountrySuccess(data): any {
    this.countryInfo = data.country;
  }
  onErrorCountry(error): any {
    this.snack.open(error, 'ok', { duration: 3000 });
  }
  /**
   * @remarks Get  regions Based on Countries
   * @param Country Id
   * @author
   * @version 1.0
   */
  handleGetRegionByCountry(cId) {
    const body = {
      ordersdropdowns_op_type: 'zone_dropdown',
      country_id: cId,
    };
    const success = this.handleRegionSuccess.bind(this);
    const error = this.onErrorRegion.bind(this);
    this.common.http.post('countryandregionsdropdown', body, success, error);
  }

  handleRegionSuccess(data): any {
    this.regionInfo = data.zone;
  }
  onErrorRegion(error): any {
    this.snack.open(error, 'ok', { duration: 3000 });
  }
}
