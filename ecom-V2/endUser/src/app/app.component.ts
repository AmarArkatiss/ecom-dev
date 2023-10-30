import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from './helper/auth.service';

import jwt_decode from 'jwt-decode';
import { UtilsService } from './helper/utils.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ProductSearch';
  decodeddata;
  val;
  username;
  guestSessionId;

  constructor(
    public router: Router,
    private auth: AuthService,
    private utils: UtilsService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.guestSessionId = this.cookieService.get('GuestSessionIDdata');
    const url = window.location.href;
    // const samurl = 'https://shop.veterneo.com/login';
    const samurl = 'https://demoapps.arkatiss.com/botcom/#/home';
    // const samurl = window.location.href;

    const orgName = samurl.split('.')[1];
    sessionStorage.setItem('orgName', orgName);
    const colorCode = orgName === 'veterneo' ? '#fe8d21' : '#00a99e'; //#05b0b0
    document.documentElement.style.setProperty('--theme-color', colorCode);
    sessionStorage.setItem('botUrl', url);

    if (url.includes('ref_id') || url.includes('tracking_id')) {
      sessionStorage.setItem('affiliateUrl', url);
    }

    if (url.includes('code_verifier=true') === true) {
      //debugger
      // this.auth.sociallogin();
      this.auth.getHomePage();
    }
    if (url.includes('jwtToken') === true) {
      const str = url.split('?jwtToken=');
      const JWTtoken = str[1];
      //debugger

      sessionStorage.setItem('token', JWTtoken);
      this.val = sessionStorage.getItem('token');

      this.router.navigate(['/home']);
      // } else if (url.includes('/?code_verifier=true') === true) {
      //   this.auth.getHomePage();
    } else {
      // this.router.navigate(['/auth/login']);
      const token = sessionStorage.getItem('token');
      this.username = sessionStorage.getItem('userdata');

      if (
        (token === null || token === undefined) &&
        (this.username === null || this.username === undefined)
      ) {
        // this.router.navigate(['/auth/login']);
        // this.auth.getLoginPage();
        // this.router.navigate(['/auth/splashLanding']);

        this.router.navigate(['/home']);
      } else {
        // this.router.navigate(['/home']);
      }
    }
  }
}
