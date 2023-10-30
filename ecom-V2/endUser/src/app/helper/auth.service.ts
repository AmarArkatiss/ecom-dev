import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../environments/environment';

function _window(): any {
  return window;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  get nativeWindow(): any {
    return _window();
  }
  oauthAccessResourceUrl;
  abcd
  constructor() {
    this.oauthAccessResourceUrl = 'https://demoapps.arkatiss.com/idm/SSOAuthenticationController/SSOAuthentication'
  }
  private strRandom(length: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  generateCodeChallenge(): string {
    const codeVerifier = '2b536e835d834afbadbc2d3daeb2acc114d855c9d52147e79f7adc4c1ff916c7';
    sessionStorage.setItem('codeVerifier', codeVerifier);
    const codeVerifierHash = CryptoJS.SHA256(codeVerifier).toString(CryptoJS.enc.Base64);
    const codeChallenge = codeVerifierHash.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    return codeChallenge;
  }

  getLoginPage(): void {
    const windowUrl = environment.windowUrl;
    const str = windowUrl.split('#/');
    const callBackURL = str[0];
    const codeChallenge = this.generateCodeChallenge();
    this.abcd = "google&";
    const params = ['from=' + this.abcd + 'code_challenge=' + codeChallenge + '&' + 'redirect_url= ' + callBackURL + '#/home' + '&' + 'reset=' + true];
    const url = this.oauthAccessResourceUrl + '?' + params.join('&');
    window.location.href = url;
  }

  getHomePage(): void {
    const codeVerifier = sessionStorage.getItem('codeVerifier');
    const params = [
      'code_verifier=' + codeVerifier,
    ];
    const url = this.oauthAccessResourceUrl + '?' + params.join('&');
    window.location.href = url;
  }
}
