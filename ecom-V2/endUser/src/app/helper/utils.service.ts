import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  bearerToken: string;
  idmRoles: any;
  firstName: string;
  lastName: string;
  sessionId;
  fna;
  selectedStore: string;
  defaultStore: string;
  appRoles: any[] = [];
  emailId: string;
  userName: string;
  homeWidgetMap: any[] = [];
  appMenu: any[] = [];
  email: string;
  decodedObj;

  constructor(private auth: AuthService, private router: Router) { }
  /**
   * @remarks Decrypt JWT token
   * @author Anudeep Thummalapalli
   * @version 0.1
   * @param token - Encrypted Token
   * @returns Get AccessToken, User info, User roles, Default Store
   */
  decryptJWT(): any {
    const token = sessionStorage.getItem('token');
    if (token !== null && token !== undefined) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      this.decodedObj = JSON.parse(jsonPayload);
      this.validateUserDetails(this.decodedObj);
      this.getSocialDetails(this.decodedObj);
    }
  }

  /**
   * Validates Access token
   * @param roles - Access token from Decoded JSON
   * @returns If Access token does not exists it will navigate to Login page
   */
  validateAccessToken(token): void {
    if (token !== null && token !== undefined) {
      this.bearerToken = token;
    } else {
      this.routeToLogin();
    }
  }

  /**
   * Validates User details like First name and Last name
   * @param roles - User details from Decoded JSON
   * @returns If User details does not exists it will navigate to Login page
   */
  validateUserDetails(data): void {
    if (data.fullName !== null && data.fullName !== undefined) {
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.email = data.email;
      this.sessionId = data.sessionId;
    } else {
      this.routeToLogin();
    }
  }
  routeToLogin(): void {
    sessionStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }

  getBearerToken(): string {
    return this.bearerToken;
  }

  /**
   * Gets user info
   * @author Anudeep Thummalapalli
   * @version 0.1
   * @returns user info includes firstname, lastname, email-id
   */
  getUserInfo(): any {
    const userObj = { firstName: this.firstName, lastName: this.lastName, email: this.email, sessionId: this.sessionId };
    // const userObj = { firstName: 'cust_01', lastName: 'awi', email: 'awi_cust_01@cswg.com', userName: 'awi_cust_01'  };
    return userObj;
  }
  getSocialDetails(data) {
    this.fna = data;
  }
  getsocialinfo(): any {
    const userfirstname = this.fna.firstName
    const socialUserDataObj = { f: userfirstname }
    return socialUserDataObj;
  }
}
