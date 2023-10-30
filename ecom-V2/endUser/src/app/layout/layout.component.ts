import {
  EventEmitter,
  OnChanges,
  OnDestroy,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  Component,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../views/services/shared.service';
import {
  CategoryDetail,
  MenuData,
  MenuObject
} from './modal/menu-modal';
import { MenuService } from './service/menu.service';
import { environment } from 'src/environments/environment.prod';
import { CommonService } from '../helper/common.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UtilsService } from '../helper/utils.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Clipboard } from '@angular/cdk/clipboard';
import { CookieService } from 'ngx-cookie-service';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { LandingPageService } from '../landing-page/service/landing-page.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import * as uuid from 'uuid';
import { TenantBasedDataService } from '../shared/services/tenant-based-data.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LayoutComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('shareDetails') ShareDetails: TemplateRef<any>;
  @ViewChild('affiliationDetails') invite: TemplateRef<any>;
  @ViewChild('categoryDetails') CategoryDetails: TemplateRef<any>;

  menu = [];
  myMenuList = [];
  count;
  menuObj: MenuObject = new MenuObject();
  imgurl;
  imgurl1;

  totCartCount;
  totWishCount;
  username;
  sessionIdLoged;
  logedEmailId;
  searchedKey = '';
  logedCustomerId;
  loggingWithGmailFlag;
  valuedeclare;
  url;
  currentURL;
  storeList = [];
  currencyDropList = [];
  storeName: string;
  logo: any;
  storeId;
  storeDetailsArray;
  searched;
  currencyName: string;
  dropFlag: boolean;
  defaultCurrencyName: string;
  profileDw = true;
  loginBtnUp = false;
  guestSessionId;
  tenantId;
  value = false;
  value1;
  toggleflag: boolean;
  toggleflag2: boolean;
  // botView : boolean;
  botView = false;
  createform: FormGroup;
  currentRate = 4.5;
  changeText = false;
  showIndex;
  activeMenu = false;
  @Output() categoryId = new EventEmitter();
  logedSeeionId: any;
  categoryList = [];
  frstName: string;
  lastName: string;
  parentId: any;
  botEnable: any;
  isMobileLogin: boolean;
  deviceUID;
  searchFlag = false;
  company: any;
  mainLogo: any;
  phoneNum: any;
  tabselected: any;
  tabUnSelected: any;
  traditionSelected: any;
  traditionUnSelected: any;
  orgName: any;
  constructor(
    private ms: MenuService,
    private router: Router,
    private shared: SharedService,
    private LPService: LandingPageService,
    private common: CommonService,
    private cookieService: CookieService,
    private snack: MatSnackBar,
    private utils: UtilsService,
    private spinner: NgxSpinnerService,
    readonly bottomSheet: MatBottomSheet,
    private clipboard: Clipboard,
    private deviceService: DeviceDetectorService,
    readonly dialog: MatDialog,
    public formBuilder: FormBuilder,
    private tenantDataService: TenantBasedDataService
  ) {
    this.genarateId();
    this.getOrgId();
    const token = sessionStorage.getItem('token');
    this.username = sessionStorage.getItem('userdata');
    this.lastName = sessionStorage.getItem('lastname');
    this.frstName = sessionStorage.getItem('firstname');
    this.guestSessionId = this.cookieService.get('GuestSessionIDdata');
    this.logedSeeionId = sessionStorage.getItem('sessionId');
    this.username = sessionStorage.getItem('userdata');
    this.sessionIdLoged = sessionStorage.getItem('sessionId');
    this.logedEmailId = sessionStorage.getItem('userEmail');
    this.deviceUID = localStorage.getItem('UUID');
    this.tenantId = sessionStorage.getItem('tenantId');
    this.epicFunction();
    if (
      (token === null || token === undefined) &&
      (this.username === null || this.username === undefined) &&
      (this.guestSessionId === null || this.guestSessionId === undefined)
    ) {
      this.router.navigate(['/home']);
    } else {
      this.utils.decryptJWT();
    }
    this.imgurl = environment.imageURL;
    this.imgurl1 = environment.imageSvgURL;
    this.common.searchKeyEvent.subscribe((data) => {
      this.searchedKey = '';
    });
  }

  ngOnInit(): void {
    this.createform = this.formBuilder.group({
      name: ['', Validators.required],
      mail: ['', Validators.required],
      num: ['', Validators.required],
      note: [''],
    });
    this.toggleflag = false;
    this.toggleflag2 = true;
    this.currentURL = window.location.href;
    if (this.currentURL.includes('USID')) {
      var splitUrl = this.currentURL.split('=')[1];
      sessionStorage.setItem('StoreId', splitUrl);
    }
    this.currencyName = sessionStorage.getItem('currencyName');
    this.valuedeclare = sessionStorage.getItem('social');
    if (this.valuedeclare == 'social' && this.username == null) {
      this.sociallogin();
    }

    if (this.sessionIdLoged == null) {
      this.profileDw = false;
      this.loginBtnUp = true;
    } else {
      this.profileDw = true;
      this.loginBtnUp = false;
    }

    this.common.profileEvent.subscribe((data: any) => {
      this.lastName = sessionStorage.getItem('lastname');
      this.frstName = sessionStorage.getItem('firstname');
    });

    this.common.aClickedEvent.subscribe((data: any) => {
      this.storeId = sessionStorage.getItem('StoreId');
      this.currencyList();
      if (
        this.tenantId !== undefined ||
        this.tenantId !== null ||
        this.tenantId !== ''
      ) {
        this.getCategories(this.tenantId);
      }
      const currentURL = window.location.href;
      if (currentURL.includes('search')) {
        this.searchedKey = sessionStorage.getItem('searchedValue');
      }
    });
    this.common.currencyClickedEvent.subscribe((data: any) => {
      const currentURL = window.location.href;
      if (currentURL.includes('search')) {
        this.searchedKey = sessionStorage.getItem('searchedValue');
        this.handleSearch();
      }
    });
    this.common.botSearchEvnt.subscribe((data: any) => {
      const currentURL = window.location.href;
      this.searchedKey = data;
      this.handleSearch();
    });
    const botView = this.common.updatedToggle;
    this.storeId = sessionStorage.getItem('StoreId');
    this.storeName = sessionStorage.getItem('storeName');
    this.logo = sessionStorage.getItem('storeLogo');
    this.logedCustomerId = sessionStorage.getItem('customerId');
    this.loggingWithGmailFlag = sessionStorage.getItem('loggingWithGmailFlag');
    const info = this.utils.getUserInfo();
    const fName = info.firstName;
    this.viewCart();
    this.viewSettings();
    this.getTenantBasedLogo();
    this.ms.stringSubject.subscribe((data) => {
      this.totCartCount = data;
    });
    this.ms.wishListCount.subscribe((data) => {
      this.totWishCount = data;
    });
    // Add by Devi for disable a button based on routing page
    this.botEnable = this.currentURL.split('#')[1];
    if (this.username == null) {
      this.username = fName;
    }
  }

  ngOnChanges(change: SimpleChanges): void {
  }

  mouseEnter(text, idx) {
    this.showIndex = idx;
  }
  parentCatClick(obj, text) {
    this.categoryList = obj.categoryDetails;
    this.parentId = obj.parentId;
    this.activeMenu = !obj.active;
  }

  getCategories(tenantId): any {
    let body;
    if (this.storeId === null || this.storeId === 'all') {
      body = {
        categorymenu_op_type: 'select',
        tenant_id: tenantId,
        limit: 20,
      };
    } else {
      body = {
        categorymenu_op_type: 'select',
        store_id: this.storeId,
        tenant_id: this.tenantId,
        limit: 20,
      };
    }
    this.ms.getMenu(body).subscribe(
      (data) => {
        if (data.res_status === true) {
          this.menuObj.menuData = Array<MenuData>();
          const dataset = data.data;
          this.menuObj.menuData = []
          dataset.map((item, idx) => {
            const imgObj = item.image;
            const image = JSON.parse(imgObj);
            if ('file_data' in image) {
              const imgArr = image.file_data;
              imgArr.map((ele) => {
                if (ele.storage_type === 'db') {
                  dataset[idx].imageUrl =
                    'data:image/png;base64,' + ele.media_data;
                  let selectedfile = 'data:image/png;base64,' + ele.media_data;
                  let imgId = ele.media_id;
                } else {
                  dataset[idx].imageUrl = ele.media_data;
                  let weekdealsAdss = ele.media_data;
                  let imgId = ele.media_id;
                }
              });
            } else {
              dataset[idx].imageUrl = image.data;
            }
            const menuDataSet = new MenuData();
            menuDataSet.parentId = item.parent_id;
            menuDataSet.parentName = item.parent_name;
            menuDataSet.active = false;
            menuDataSet.parentImg = item.imageUrl;
            menuDataSet.categoryDetails = Array<CategoryDetail>();
            const categoryData = item.child_details;
            categoryData.map((subItem) => {
              const categoryDataSet = new CategoryDetail();
              categoryDataSet.childId = subItem.child_id;
              categoryDataSet.childName = subItem.child_name;
              categoryDataSet.childParentId = subItem.parent_id;
              menuDataSet.categoryDetails.push(categoryDataSet);
            });
            this.menuObj.menuData.push(menuDataSet);
          });
          this.categoryList = [];
          this.parentId = '';
          this.categoryList = this.menuObj.menuData[0].categoryDetails;
          this.parentId = this.menuObj.menuData[0].parentId;
        } else {
        }
      },
      (err) => {
      }
    );
  }
  getTenantBasedLogo() {
    this.mainLogo = this.tenantDataService.Logo;
    this.phoneNum = this.tenantDataService.phoneNum;
    this.tabselected = this.tenantDataService.tabSelectedImg;
    this.tabUnSelected = this.tenantDataService.tabUnSelectedImg;
    this.traditionSelected = this.tenantDataService.traditionalSelectedImg;
    this.traditionUnSelected = this.tenantDataService.traditionalUnSelectedImg;
    this.orgName = this.tenantDataService.orgName;
  }

  goToProducts(id, name): void {
    document.querySelector('body').scrollTo(0, 0);
    this.categoryId.emit(id);
    this.router.navigate(['/product', id, name]);
    this.dialog.closeAll();
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 100); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }

  viewCart(): any {
    let body;
    if (this.sessionIdLoged === null) {
      body = {
        preview_op_type: 'view_cart',
        currency_id: 4,
        login: false,
        session_id: this.guestSessionId,
        tenant_id: this.tenantId,
        coupon_applied: false,
        voucher_applied: false,
      };
    } else {
      body = {
        preview_op_type: 'view_cart',
        user_name: this.logedEmailId,
        currency_id: 4,
        tenant_id: this.tenantId,
        login: true,
        session_id: this.sessionIdLoged,
        coupon_applied: false,
        voucher_applied: false,
      };
    }
    const success = this.ViewCartSuccess.bind(this);
    const error = this.onError.bind(this);
    this.common.http.post('Preview', body, success, error);
  }
  ViewCartSuccess(data): any {
    if (data.res_status === true) {
      this.totCartCount = data.Data.cart_count;
      this.totWishCount = data.Data.wishlist_count;
    } else {
      this.totCartCount = data.Data.cart_count;
      this.totWishCount = data.Data.wishlist_count;
    }
  }
  onError(data) { }

  handleNoInfo(): any {
    this.router.navigate(['/savelater']);
  }
  ngOnDestroy(): void { }
  handleLogOut() {
    const body = {
      session_id: this.sessionIdLoged,
      user_name: this.logedEmailId,
      tenant_id: this.tenantId,
    };
    const success = this.LogoutSuccess.bind(this);
    const error = this.onErrorLogout.bind(this);
    this.common.http.post('EcommLogout', body, success, error);
  }
  LogoutSuccess(data): any {
    if (data.res_status) {
      sessionStorage.removeItem('userdata');
      sessionStorage.removeItem('sessionId');
      sessionStorage.removeItem('userEmail');
      sessionStorage.removeItem('customerId');
      sessionStorage.removeItem('loggingWithGmailFlag');
      sessionStorage.removeItem('firstname');
      sessionStorage.removeItem('lastname');
      sessionStorage.removeItem('telephone');
      sessionStorage.removeItem('social');
      sessionStorage.removeItem('profileimagess');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('affiliateUrl');
      sessionStorage.removeItem('StoreId');
      localStorage.removeItem('rzp_device_id');
      sessionStorage.removeItem('codeVerifier');
      this.cookieService.deleteAll('../');
      localStorage.removeItem('affiliateUrl');
      sessionStorage.removeItem('currencyId');
      sessionStorage.removeItem('storeLogo');
      sessionStorage.removeItem('storeName');
      sessionStorage.removeItem('currencyName');
      sessionStorage.removeItem('searchedValue');
      this.router.navigate(['/home']);
      this.profileDw = false;
      this.loginBtnUp = true;
      window.location.reload();
    } else {
      this.snack.open(data.msg, 'Ok', { duration: 2000 });
    }
  }
  onErrorLogout(data) { }
  search(e) {
    sessionStorage.setItem('searchedValue', e);
    this.searchedKey = sessionStorage.getItem('searchedValue');
    this.handleSearch();
  }

  handleSearch() {
    this.searchFlag = true;
    window.scroll(0, 0);
    let body;
    this.spinner.show();
    this.searched = '';
    if (this.searchedKey === '') {
      this.spinner.hide();
      this.snack.open('Enter something to search', 'Ok', { duration: 2000 });
    } else if (this.logedCustomerId !== null) {
      body = {
        product_type: this.searchedKey,
        customer_id: this.logedCustomerId,
        tenant_id: this.tenantId,
        session_id: this.logedSeeionId,
      };
    } else if (this.logedCustomerId == null) {
      body = {
        product_type: this.searchedKey,
        tenant_id: this.tenantId,
        session_id: this.guestSessionId,
      };
    }
    body = this.common.withoutDataStoreValidation(body);
    const success = this.searchSuccess.bind(this);
    const error = this.onErrorSearch.bind(this);
    this.common.http.post('search', body, success, error);
  }
  searchSuccess(data): any {
    if (data.res_status === true) {
      this.spinner.hide();
      this.searched = JSON.stringify(data.data);
      const encodedSearch = encodeURI(this.searched);
      this.common.search(data.data);
      this.router.navigate(['/search', encodedSearch]);
    } else {
      const falseData = [];
      this.common.search(falseData);
      this.spinner.hide();
      this.snack.open(data.msg, 'Ok', { duration: 2000 });
      this.searchedKey = '';
    }
  }
  onErrorSearch(data) { }
  asdfgg() {
    this.toggleflag2 = true;
    this.toggleflag = false;
  }

  togEvent(ef) {
    const togVar = ef.target.checked;
    this.common.togleClicked(togVar);
  }

  offclicked(status) {
    this.botView = status === 'bot' ? true : false;
    this.common.togleClicked(this.botView);
    this.router.navigate(['/home']);
  }

  changed() {
    this.value1 = this.value;
  }
  sociallogin(): any {
    const infoo = this.utils.getUserInfo();
    const fName = infoo.firstName;
    const lName = infoo.lastName;
    const fullName = infoo.firstName + infoo.lastName;
    const useEmail = infoo.email;
    const body = {
      login_type: 'social',
      firstname: fName,
      lastname: lName,
      username: useEmail,
      password: '',
      cookie: 1,
      telephone: '',
    };
    const success = this.socialloginSuccess.bind(this);
    const error = this.socialloginerror.bind(this);
    this.common.http.post('customerlogin', body, success, error);
  }
  socialloginSuccess(data) {
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
    this.router.navigate(['/home']);
  }
  socialloginerror(data) { }

  viewSettings(): void {
    let settings_store;
    const url = sessionStorage.getItem('orgName');
    settings_store = {
      org_name: url,
      limit: 'All',
      offset: 0,
      tenant_id: this.tenantId,
    };
    const success = this.onSuccessStoreList.bind(this);
    const error = this.onErrorStoreList.bind(this);
    this.common.http.post('storelistui', settings_store, success, error);
  }
  onSuccessStoreList(data): any {
    if (data?.res_status === true) {
      this.storeList = data.data;
      sessionStorage.setItem('defaultStore', this.storeList[0].default_store)
    } else {
      this.storeList = []
    }
  }
  onErrorStoreList(error): any { }

  select(sId: string, data: any) {
    sessionStorage.setItem('StoreId', sId);
    this.currencyList();
    this.common.AClicked(sId);
    this.router.navigate(['/home'], { queryParams: { USID: sId } });
    this.spinner.show();
    let settings_store: any;
    let storeLogo;
    const storeName = data.name;
    sessionStorage.setItem('storeName', storeName);
    this.storeName = sessionStorage.getItem('storeName');
    const storelogo = data.image;
    if (storelogo !== '') {
      const image = JSON.parse(storelogo);
      if ('file_data' in image) {
        const imgArr = image.file_data;
        imgArr.map((ele) => {
          if (ele.storage_type === 'db') {
            storeLogo = 'data:image/png;base64,' + ele.media_data;
          } else {
            storeLogo = ele.media_data;
          }
        });
      } else {
        storeLogo = image.data;
      }
      sessionStorage.setItem('storeLogo', storeLogo);
    } else {
      sessionStorage.setItem('storeLogo', storelogo);
    }
    this.logo = sessionStorage.getItem('storeLogo');
    if (sId === 'all') {
      this.spinner.hide();
      this.currencyName = sessionStorage.getItem('currencyName');
    } else {
      this.spinner.hide();
      if (this.storeId === null) {
        settings_store = {
          setting_op_type: 'view',
          store_id: sId,
        };
      } else {
        settings_store = {
          setting_op_type: 'view',
          store_id: this.storeId,
        };
      }
      const success = this.onSuccessStoreView.bind(this);
      const error = this.onErrorStoreView.bind(this);
      this.common.http.post('setting', settings_store, success, error);
    }
    this.spinner.hide();
  }
  onSuccessStoreView(res) {
    this.spinner.hide();
    this.common.viewStore('data');
    this.logo = sessionStorage.getItem('storeLogo');
    this.storeName = sessionStorage.getItem('storeName');
    if (
      res.data[2].local.currency !== '' &&
      res.data[2].local.currency !== null &&
      res.data[2].local.currency !== 'undefined'
    ) {
      sessionStorage.setItem('currencyName', res.data[2].local.code);
      this.currencyName = sessionStorage.getItem('currencyName');
    } else {
      sessionStorage.setItem('currencyName', this.defaultCurrencyName);
      this.currencyName = sessionStorage.getItem('currencyName');
    }
  }
  onErrorStoreView() { }

  currencyList(): void {
    const body = { tenant_id: this.tenantId };
    const success = this.onSuccessCurrencyList.bind(this);
    const error = this.onErrorCurrencyList.bind(this);
    this.common.http.post('currency', body, success, error);
  }
  onSuccessCurrencyList(data): any {
    this.currencyDropList = data.data;
    this.currencyDropList.map((element) => {
      if (element.default_currency === 1 && this.currencyName === null) {
        sessionStorage.setItem('currencyName', element.code);
        this.currencyName = sessionStorage.getItem('currencyName');
        this.defaultCurrencyName = element.code;
      }
    });
  }
  onErrorCurrencyList(error): any { }
  onSelectCurrency(data) {
    sessionStorage.setItem('currencyName', data.code);
    sessionStorage.setItem('currencyId', data.currency_id);
    this.common.currencyClicked(data.currency_id);
    this.currencyName = sessionStorage.getItem('currencyName');
  }
  handlegiftCard() {
    this.router.navigate(['/MyVocherDetails']);
  }
  cart() {
    this.dropFlag = false;
    this.common.cartClicked(this.dropFlag);
    this.router.navigate(['/cart']);
  }
  wishList() {
    if (this.logedSeeionId == null) {
      this.router.navigate(['/auth/login']);
    } else {
      this.router.navigate(['/wishlist']);
    }
  }

  onKey(Event) { }
  loginCknSplash() {
    this.router.navigate(['/auth/login']);
  }
  clearCookies() {
    this.cookieService.deleteAll('../');
  }
  storeSignUp() {
    this.dialog.open(this.invite, { position: { left: '30%' }, width: '50%' });
  }
  submit() {
    const formVal = this.createform.value;
    if (!formVal.name || !formVal.mail || !formVal.num) {
      this.snack.open('please fill the required fields', 'Ok', {
        duration: 2000,
      });
    } else {
      let body = {
        store_enquiry_op_type: 'insert',
        name: formVal.name,
        email: formVal.mail,
        phone_number: formVal.num,
        short_note: formVal.note,
        user_details: this.orgName.toLowerCase(),
        tenant_name: this.orgName.toLowerCase(),
      };
      const success = this.onSuccessStoreSignUp.bind(this);
      this.common.http.post('inquiry', body, success);
    }
  }
  onSuccessStoreSignUp(response) {
    if (response.res_status === true) {
      this.snack.open(
        'Your enquiry has been submitted, Onboarding team will get in touch with you further details.',
        'Ok',
        { duration: 10000 }
      );
      this.categoryList = [];
      this.dialog.closeAll();
    } else {
      this.snack.open(response.msg, 'Ok', { duration: 2000 });
    }
  }
  categoriesFlag = false;
  viewCategory(event: MouseEvent) {
    this.categoriesFlag = true;
    this.categoryList = [];
    this.categoryList = this.menuObj.menuData[0].categoryDetails;
    this.parentId = this.menuObj.menuData[0].parentId;
  }

  hideCard(event: MouseEvent) {
    const categoryDetails: any = document.getElementById('categoryDetails');
    if (categoryDetails) {
      const isMouseInsidePopup = categoryDetails.contains(event.relatedTarget);
      // Hide the popup only if the mouse is not inside it
      if (!isMouseInsidePopup) {
        categoryDetails.style.display = 'none';
        this.categoriesFlag = false;
      }
    }
  }
  categoryView(event) {
    this.categoryList = [];
    this.goToProducts(event.parentId, event.parentName);
  }
  leave() {
    this.dialog.closeAll();
  }
  /**
   * Get tenantId from organization name in url
   * @author Devi
   * @version 1.0
   */

  getOrgId() {
    let url;
    // const samUrl = 'https://botcomm.arkatiss.com/Arkatiss/#/home';
    // const samUrl = 'https://botcomm.arkatiss.com/veterneo/#/home';
    // const samUrl = 'https://shop.veterneo.com/login';
    // const samUrl = window.location.href;
    url = sessionStorage.getItem('orgName');
    let body = { org_name: url };
    this.ms.getTenantId(body).subscribe((data) => {
      if (data.res_status === true) {
        this.getCategories(data.tenant_id);
        sessionStorage.setItem('tenantId', data.tenant_id);
        localStorage.setItem('tenantCompanyName', data.company);
        this.tenantId = sessionStorage.getItem('tenantId');
        this.viewSettings();
        this.currencyList();
      }
    });
  }
  /**
   * Get Device Info
   * @author Devi
   * @version 1.0
   */
  epicFunction() {
    const deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
  }

  /**
   * Generate Random Id
   * @author Devi
   * @version 1.0
   */
  genarateId() {
    const deviceId = localStorage.getItem('UUID');
    if (deviceId === null || deviceId === undefined) {
      localStorage.setItem('UUID', uuid.v4());
      this.deviceUID = localStorage.getItem('UUID');
    }
  }
}
