import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
  Inject,
} from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import {
  MatBottomSheet
} from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Clipboard } from '@angular/cdk/clipboard';
import { SummaryService } from '../views/product-summary/service/summary.service';
import { LandingPageService } from './service/landing-page.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { Router, UrlTree } from '@angular/router';
import { CommonService } from '../helper/common.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { CookieService } from 'ngx-cookie-service';
import { MenuService } from '../layout/service/menu.service';
import { CategoryData, categoryObject } from '../layout/modal/menu-modal';
import { CartService } from '../views/cart/service/cart.service';
import { element } from 'protractor';
import { DOCUMENT } from '@angular/common';
import Swal from 'sweetalert2';
import { GeneralService } from '../helper/general.service';
import { TenantBasedDataService } from '../shared/services/tenant-based-data.service';
type AOA = any[][];

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  @ViewChild('shareDetails') ShareDetails: TemplateRef<any>;
  @ViewChild('widgetsContent', { read: ElementRef })
  public widgetsContent: ElementRef<any>;
  @ViewChild('CouponsContent', { read: ElementRef })
  public CouponsContent: ElementRef<any>;
  @ViewChild('sugContent', { read: ElementRef })
  public sugContent: ElementRef<any>;
  @ViewChild('brandsContent', { read: ElementRef })
  public brandsContent: ElementRef<any>;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  @ViewChild('exclusivContent', { read: ElementRef })
  public exclusivContent: ElementRef<any>;
  @ViewChild('bestseller', { read: ElementRef })
  public bestseller: ElementRef<any>;
  @ViewChild('folderDetails') FolderDetails: TemplateRef<any>;

  CategoryObject: categoryObject = new categoryObject();
  imgUrl;
  currencyId;
  imagesUrl = [];
  weeklyArray = [];
  SuggestionAdsArray = [];
  coupdata = [];
  coupUrlImg;
  imagesUrl1;
  sliderData: any[];
  sData: any[];
  imgcarArray: any[];
  ImageArrCousel: any[];
  ImageCousel;
  imagesWeeklyUrl = [];
  imagescouponDealsUrl = [];
  imagesSuggestionsDealsUrl = [];
  url;
  currentURL;
  logedEmailId;
  searchedKey;
  logedCustomerId;
  logedSeeionId;
  logedUserName;
  carouselIimg;
  storeId;
  storeDetailsArray = [];
  storeadd;
  sugessData: any = [];
  weekdealsAdss = [];
  relatedProductArray = [];
  couponsAdsArray = [];
  asd = [];
  couponsApiArray = [];
  coupondsdetailsArray = [];
  selectedImage = [];
  productDetailsObject = [];
  imagescoenuUrl = [];
  clipcouponcode;
  navUrl: string;
  GuestSessionId;
  cookieValue;
  totCartCount;
  countWish;
  tenantId;
  landingArray;
  landingmenuArrayAds;
  toggleEvent = false;
  totalPages: boolean;
  newdivv: boolean;
  currentRate = 4.6;
  brandsData = [];
  activeTab = 'Weekly Ads';
  foldervisible = false;
  folders = [];
  showwishlistform = true;
  showAddFolder = false;
  parentName: any;
  productSummary;
  folderName;
  folderList;
  formhide = true;
  brandsLabel: any;
  selectedFolderId: any;
  isOver = false;
  tenantCompanyNameStr;

  // BOT Variables //
  mainuser: any;
  heading: any;
  notcurrent: any;
  currentshow: any;
  inputmsg: any;
  msgdata: any = [];
  outputtype: any;
  values: any;
  datamarkviewdata: any;
  valuess = [];
  chatResponse: any[] = [];
  peerResponse = [];
  outputreport = [];
  outputreportt = [];
  historydiv = false;
  showfile = false;
  data: AOA = [
    [1, 2],
    [3, 4],
  ];
  //wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName = 'userchat.xlsx';
  chatbgcolor = false;
  datamarkdata = [];
  suggetions = [];
  datetime: any;
  starthide = true;
  stophide = false;
  bgColor: any;
  json = [];
  chatdatalayouts = [];
  datevalue: any;
  msg: any;
  datamarksdatewise = [];
  showspinner!: boolean;
  timestamp: any;
  activeUsers = [];
  showperson = false;
  showperson2 = true;
  chatname: string | null | undefined;
  userName: any;
  timer = null;
  chatnamedisplay: any;

  lastMsg = false;
  undoMsg = false;
  enterword: string | null | undefined;
  appsshow = 'show';
  enablecontrol = true;
  cnt = 1;
  enterbox = true;
  checkedtoggle = false;
  rcnumber: any;
  rcmsg: any;
  chatbotmode = 'normal';
  supportType: string | null | undefined;
  agentName: any;
  loginuserName = 'Anvesh';
  userNameLtr: any;
  agentShortName: any;
  isTyping = false;
  prevLength = 0;
  title1: any;
  title2: any;
  showchatbot = false;
  showcsbot = false;
  botMsg: string[] | undefined;
  supportPersonBool: boolean | undefined;

  windowurl = window.location.href;
  domainName: any;
  @ViewChild('scrollMe')
  private myScrollContainer!: ElementRef;
  iconBgColor!: string;
  iconBorder!: string;
  imgHeight!: string;
  inputtime!: string | Date;
  isvisible = false;
  botSessionId: any;
  imgurl = environment.imageURL;
  responsiveOptions;
  middleBanner1;
  middleBanner2;
  middleBanner3;
  tenantAddress: any;
  wishlistAdd: any;
  wishlistNone: any;
  orgName: any;
  constructor(
    readonly bottomSheet: MatBottomSheet,
    private ms: MenuService,
    private router: Router,
    private http: HttpClient,
    private clipboard: Clipboard,
    private cart: CartService,
    private summary: SummaryService,
    private cookieService: CookieService,
    private common: CommonService,
    private LPService: LandingPageService,
    readonly dialog: MatDialog,
    private snack: MatSnackBar,
    private spinner: NgxSpinnerService,
    private tenantDataService: TenantBasedDataService,
    @Inject(DOCUMENT) private document: Document,
    private general: GeneralService
  ) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
    this.currentURL = window.location.href;
    this.getmenuLanding();
  }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.getFolders();
    this.totalPages = true;
    this.logedSeeionId = sessionStorage.getItem('sessionId');
    this.GuestSessionId = this.cookieService.get('GuestSessionIDdata');
    if (
      this.logedSeeionId === null &&
      (this.GuestSessionId === null ||
        this.GuestSessionId === undefined ||
        this.GuestSessionId === '')
    ) {
      this.getGuestSession();
    }
    this.logedCustomerId = sessionStorage.getItem('customerId');
    this.logedEmailId = sessionStorage.getItem('userEmail');
    this.logedUserName = sessionStorage.getItem('userdata');
    this.tenantId = sessionStorage.getItem('tenantId');
    this.tenantCompanyNameStr = localStorage.getItem('tenantCompanyName');
    this.logedEmailId = sessionStorage.getItem('userEmail');
    this.storeId = sessionStorage.getItem('StoreId');
    this.getCarouselImage();
    this.weeklyAds();
    this.suggestionAds();
    this.getrelatedproducts();
    this.getCoupons();
    this.getBrandsList();
    this.getExclusiveCategories();
    this.getMiddleBanner();
    /**
     * @remarks Get store onselect event from layout component
     * @author  Devi
     * @version 1.0
     */
    this.common.aClickedEvent.subscribe((data: any) => {
      this.storeId = sessionStorage.getItem('StoreId');
      this.getCarouselImage();
      this.weeklyAds();
      this.suggestionAds();
      this.getrelatedproducts();
      this.getCoupons();
      this.getStoreDetails();
      sessionStorage.removeItem('currencyId');
      sessionStorage.removeItem('currencyName');
      window.scroll(0, 0);
    });
    /**
     * @remarks Get Currency onselect event from layout component
     * @author  Devi
     * @version 1.0
     */
    this.common.currencyClickedEvent.subscribe((data: any) => {
      this.currencyId = sessionStorage.getItem('currencyId');
      this.weeklyAds();
      this.suggestionAds();
      this.getrelatedproducts();
      this.getCoupons();
    });

    /**
     * @remarks Get Toggle onselect event from layout component
     * @author  Devi
     * @version 1.0
     */

    this.toggleEvent = this.common.updatedToggle;
    this.common.toggleContentEvent.subscribe((data: any) => {
      this.toggleEvent = data;
    });

    // BOT INTEGRATION //
    this.getBrowserName();
    let tempUrl = this.windowurl;
    if (tempUrl === 'http://localhost:5000/') {
      tempUrl = 'http://www.arkatiss.com';
    } else {
      tempUrl = this.windowurl;
    }
    const temp = tempUrl.split('://')[1];
    if (temp[temp.length - 1] === '/') {
      this.domainName = temp.substring(0, temp.length - 1);
    } else {
      this.domainName = temp;
    }
    const tempDomain = this.domainName.substring(0, 4);
    if (tempDomain.toLowerCase() !== 'www.') {
      this.domainName = 'www.' + this.domainName;
    }
    this.iconBgColor = '#fff';
    this.iconBorder = 'none';
    this.imgurl = environment.imageUrl;
    this.showchatbot = true;
    this.showcsbot = false;
    this.botMsg = [
      'Hi, I am Intellobot. Let me know how I can help and I’ll do my best to assist you!',
    ];
    this.imgHeight = '';
    const time = new Date();
    this.inputtime = time;
    this.timestamp = this.inputtime;
    let value: any;
    value = sessionStorage.getItem('user');
    if (this.logedSeeionId !== null) {
      this.login();
    }
    this.LPService.getChatData().subscribe((info: any) => {
      if (info.length > 0) {
        this.chatResponse = info;
      }
    });
    const sessionState = this.general.getSessionState();
    if (sessionState !== null) {
      this.chatResponse = sessionState;
    }
  }

  public scrollRight(): void {
    this.widgetsContent.nativeElement.scrollTo({
      left: this.widgetsContent.nativeElement.scrollLeft + 550,
      behavior: 'smooth',
    });
  }
  public scrollLeft(): void {
    this.widgetsContent.nativeElement.scrollTo({
      left: this.widgetsContent.nativeElement.scrollLeft - 550,
      behavior: 'smooth',
    });
  }
  public CouponsContentscrollRight(): void {
    this.CouponsContent.nativeElement.scrollTo({
      left: this.CouponsContent.nativeElement.scrollLeft + 550,
      behavior: 'smooth',
    });
  }
  public CouponsContentscrollLeft(): void {
    this.CouponsContent.nativeElement.scrollTo({
      left: this.CouponsContent.nativeElement.scrollLeft - 550,
      behavior: 'smooth',
    });
  }
  public exclusivscrollRight(): void {
    this.exclusivContent.nativeElement.scrollTo({
      left: this.exclusivContent.nativeElement.scrollLeft + 550,
      behavior: 'smooth',
    });
  }
  public exclusivscrollLeft(): void {
    this.exclusivContent.nativeElement.scrollTo({
      left: this.exclusivContent.nativeElement.scrollLeft - 550,
      behavior: 'smooth',
    });
  }
  public sugesscrollLeft(): void {
    this.sugContent.nativeElement.scrollTo({
      left: this.sugContent.nativeElement.scrollLeft - 550,
      behavior: 'smooth',
    });
  }
  public sugesscrollRight(): void {
    this.sugContent.nativeElement.scrollTo({
      left: this.sugContent.nativeElement.scrollLeft + 550,
      behavior: 'smooth',
    });
  }
  public bestsellerscrollLeft(): void {
    this.bestseller.nativeElement.scrollTo({
      left: this.bestseller.nativeElement.scrollLeft - 550,
      behavior: 'smooth',
    });
  }
  public bestsellerscrollRight(): void {
    this.bestseller.nativeElement.scrollTo({
      left: this.bestseller.nativeElement.scrollLeft + 550,
      behavior: 'smooth',
    });
  }
  public brandScrollLeft(): void {
    this.brandsContent.nativeElement.scrollTo({
      left: this.brandsContent.nativeElement.scrollLeft - 550,
      behavior: 'smooth',
    });
  }
  public brandScrollRight(): void {
    this.brandsContent.nativeElement.scrollTo({
      left: this.brandsContent.nativeElement.scrollLeft + 550,
      behavior: 'smooth',
    });
  }

  /**
   * @remarks Share site Affiliation link
   * @author  Devi
   * @version 1.0
   */
  share() {
    this.spinner.show();
    const body = {
      affiliate_op_type: 'create_affiliate_link',
      data: [
        {
          affiliation_insert_type: 'affiliation',
          affiliation_details: [
            {
              General: {
                type: 'master_site',
                type_related_id: 1,
                created_by: this.logedEmailId,
                tenant_id: this.tenantId,
                type_related_name: 'home',
                customer_id: this.logedCustomerId,
              },
            },
          ],
        },
      ],
    };
    this.summary.getShareLink(body).subscribe((data) => {
      if (data.res_status === true) {
        this.url = data.link;
        this.spinner.hide();
        this.bottomSheet.open(this.ShareDetails);
      }
    });
  }

  closeTemplateSheetMenu() {
    this.bottomSheet.dismiss();
  }
  /**
   * @remarks Copy text to clipboard
   * @author  Devi
   * @version 1.0
   */
  copyText(textToCopy: string) {
    this.clipboard.copy(textToCopy);
    this.snack.open('Copied', 'ok', { duration: 3000 });
  }

  goToProductsView(id): void {
    this.router.navigate(['/productDetail', id]);
  }
  /**
   * @remarks Get Store address
   * @author  Ramana
   * @version 1.1
   */
  getStoreDetails() {
    this.getCarouselImage();
    const settings_store = {
      store_id: this.storeId,
    };
    const success = this.onSuccessStoreDetails.bind(this);
    const error = this.onErrorStoreDetails.bind(this);
    this.common.http.post('StoreAddress', settings_store, success, error);
  }
  onSuccessStoreDetails(data) {
    this.storeDetailsArray = [];
    this.storeDetailsArray.push(data.data);
  }
  onErrorStoreDetails() { }

  getSuggestions() { }
  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  getCarouselImage(): any {
    let param;
    const defaultStore = sessionStorage.getItem('defaultStore')
    if (
      this.storeId === null ||
      this.storeId === 'all' ||
      this.storeId === undefined
    ) {
      param = {
        params: {
          company: this.tenantCompanyNameStr,
          content: 'Carousel',
          storeId: defaultStore,
        },
        observe: 'response',
      };
    } else {
      param = {
        params: {
          company: this.tenantCompanyNameStr,
          content: 'Carousel',
          storeId: this.storeId,
        },
        observe: 'response',
      };
    }

    this.LPService.getUploadDoc(param).subscribe((data) => {
      this.imagesUrl = [];
      this.imgcarArray = data.body;
      this.imgcarArray.map((element) => {
        const jsonObj = JSON.parse(element.content);
        const imageString = 'data:image/png;base64,' + jsonObj[0].base64;
        this.imagesUrl.push({ path: imageString });
      });
    });
  }

  weeklyAds() {
    let body;
    if (this.logedSeeionId == null || this.logedSeeionId == undefined) {
      body = {
        weekly_ads_op_type: 'select',
        login: false,
        tenant_id: this.tenantId,
        limit: 10,
        session_id: this.GuestSessionId,
      };
    } else {
      body = {
        weekly_ads_op_type: 'select',
        customer_id: this.logedCustomerId,
        session_id: this.logedSeeionId,
        login: true,
        user_name: this.logedEmailId,
        limit: 10,
        tenant_id: this.tenantId,
      };
    }
    body = this.common.withoutDataStoreValidation(body);
    const success = this.weeklyAdsOnSuccess.bind(this);
    const error = this.weeklyAdsonError.bind(this);
    this.common.http.post('WeeklyAds', body, success, error);
  }
  weeklyAdsOnSuccess(data) {
    if (data.res_status === true) {
      this.weekdealsAdss = data.data;
      this.weekdealsAdss.map((element, idx) => {
        const imgObj = element.image;
        const image = JSON.parse(imgObj);
        if ('file_data' in image) {
          const imgArr = image.file_data;
          imgArr.map((ele) => {
            if (ele.storage_type === 'db') {
              this.weekdealsAdss[idx].imageUrl =
                'data:image/png;base64,' + ele.media_data;
            } else {
              this.weekdealsAdss[idx].imageUrl = ele.media_data;
            }
          });
        } else {
          this.weekdealsAdss[idx].imageUrl = image.data;
        }
      });
    } else {
      this.weekdealsAdss = [];
    }
  }
  weeklyAdsonError() {
  }
  suggestionAds() {
    let body;
    if (this.logedSeeionId == null || this.logedSeeionId == undefined) {
      body = {
        coupon_applied: false,
        tenant_id: this.tenantId,
        limit: 10,
        session_id: this.GuestSessionId,
      };
    } else {
      body = {
        customer_id: this.logedCustomerId,
        product_id: [],
        session_id: this.logedSeeionId,
        coupon_applied: false,
        tenant_id: this.tenantId,
        limit: 10,
      };
    }
    body = this.common.withoutDataStoreValidation(body);
    const success = this.suggestionOnSuccess.bind(this);
    const error = this.suggestiononError.bind(this);
    this.common.http.post('suggestion', body, success, error);
  }
  suggestionOnSuccess(data) {
    if (data.res_status === true) {
      this.sugessData = data.data;
      this.sugessData.map((element, idx) => {
        const imgObj = element.image;
        const image = JSON.parse(imgObj);
        if ('file_data' in image) {
          const imgArr = image.file_data;
          imgArr.map((ele) => {
            if (ele.storage_type === 'db') {
              this.sugessData[idx].imageUrl =
                'data:image/png;base64,' + ele.media_data;
            } else {
              this.sugessData[idx].imageUrl = ele.media_data;
            }
          });
        } else {
          this.sugessData[idx].imageUrl = image.data;
        }
      });
    } else {
      this.sugessData = [];
    }
  }
  suggestiononError() {
  }

  AddToCartClk(pidd, price) {
    let body;
    if (this.logedCustomerId !== null && this.logedCustomerId !== undefined) {
      body = {
        login: true,
        customer_id: this.logedCustomerId,
        session_id: this.logedSeeionId,
        product_id: pidd,
        recurring_id: 0,
        total_amount: 0,
        quantity: 1,
        option: [],
      };
    } else {
      body = {
        login: false,
        session_id: this.GuestSessionId,
        product_id: pidd,
        recurring_id: 0,
        total_amount: 0,
        quantity: 1,
        option: [],
      };
    }
    const success = this.AddToCartSuccess.bind(this);
    const error = this.onErrorAddToCart.bind(this);
    this.common.http.post('Cart', body, success, error);
  }
  AddToCartSuccess(data) {
    if (data.res_status === true) {
      this.snack.open(data.msg, 'Ok', { duration: 2000 });
      this.ms.passValue(data.cart_count);
    } else {
      this.snack.open(data.msg, 'Ok', { duration: 2000 });
      this.ms.passValue(data.cart_count);
    }
  }
  onErrorAddToCart(data) {
    this.snack.open(data.msg, 'Ok', { duration: 2000 });
  }

  vegitableClk() {
    this.router.navigate(['/product', 126, 'Vegetables']);
  }
  // WeeklyAddToCartClk(proId, productprice) {
  WeeklyAddToCartClk(event) {
    let proId = event.proId ? event.proId : event;
    let body;
    if (this.logedCustomerId !== null && this.logedCustomerId !== undefined) {
      body = {
        login: true,
        customer_id: this.logedCustomerId,
        session_id: this.logedSeeionId,
        product_id: proId,
        recurring_id: 0,
        total_amount: 0,
        quantity: 1,
        option: [],
      };
    } else {
      body = {
        login: false,
        session_id: this.GuestSessionId,
        product_id: proId,
        recurring_id: 0,
        total_amount: 0,
        quantity: 1,
        option: [null, null, null, null, null, null],
      };
    }
    const success = this.weeklyAddToCartSuccess.bind(this);
    const error = this.weeklyonErrorAddToCart.bind(this);
    this.common.http.post('Cart', body, success, error);
  }
  weeklyAddToCartSuccess(data) {
    this.snack.open(data.msg, 'Ok', { duration: 2000 });
    this.ms.passValue(data.cart_count);
  }
  weeklyonErrorAddToCart(data) {
    this.snack.open(data.msg, 'Ok', { duration: 2000 });
  }
  getCoupons() {
    let body;
    if (this.logedSeeionId == null || this.logedSeeionId == undefined) {
      body = {
        limit: 100,
        offset: 0,
        coupon_op_type: 'coupons_landing',
        tenant_id: this.tenantId,
      };
    } else {
      body = {
        customer_id: this.logedCustomerId,
        coupon_op_type: 'user_based_coupons',
        tenant_id: this.tenantId,
      };
    }
    body = this.common.withoutDataStoreValidation(body);
    const success = this.CouponsOnSuccess.bind(this);
    const error = this.CouponsonError.bind(this);
    this.common.http.post('CouponsUi', body, success, error);
  }
  carOnSuccess() {
  }
  carsonError() {
  }

  CouponsOnSuccess(data) {
    this.couponsAdsArray = data.data;
    this.coupdata = [];
    for (let i = 0; i <= this.couponsAdsArray.length; i++) {
      let cdata = [];
      cdata = this.couponsAdsArray[i]?.coupon_deatils;
      this.couponsAdsArray[i]?.coupon_deatils.applicable_products.map(
        (element) => {
          this.coupdata.push(element);
        }
      );
      this.coupondsdetailsArray.push(cdata);
      this.coupdata.map((element, idx) => {
        const imgObj = element.image;
        if ('file_data' in imgObj) {
          const imgArr = imgObj.file_data;
          imgArr.map((ele) => {
            if (ele.storage_type === 'db') {
              this.coupdata[idx].imageUrl =
                'data:image/png;base64,' + ele.media_data;
              let selectedfile = 'data:image/png;base64,' + ele.media_data;
              let imgId = ele.media_id;
            } else {
              this.coupdata[idx].imageUrl = ele.media_data;
              let selectedfile = ele.media_data;
              let imgId = ele.media_id;
            }
          });
        } else {
          this.coupdata[idx].imageUrl = imgObj.data;
        }
      });
    }
  }
  CouponsonError() { }
  CliptoCart(coupPId, couppPrice, Coupcode) {
    this.clipcouponcode = Coupcode;
    let body;
    if (this.logedCustomerId !== null && this.logedCustomerId !== undefined) {
      body = {
        login: true,
        customer_id: this.logedCustomerId,
        session_id: this.logedSeeionId,
        tenant_id: this.tenantId,
        product_id: coupPId,
        recurring_id: 0,
        total_amount: 0,
        quantity: 1,
        option: [],
      };
    } else {
      body = {
        login: false,
        session_id: this.GuestSessionId,
        product_id: coupPId,
        tenant_id: this.tenantId,
        recurring_id: 0,
        total_amount: 0,
        quantity: 1,
        option: [null, null, null, null, null, null],
      };
    }
    const success = this.ClipSuccess.bind(this);
    const error = this.CliponError.bind(this);
    this.common.http.post('Cart', body, success, error);
  }
  ClipSuccess(data) {
    this.router.navigate(['/cart'], {
      queryParams: { UserClipCoupId: this.clipcouponcode },
    });
    this.ms.passValue(data.cart_count);
  }

  CliponError() { }
  shareee() {
    let searchParams = new URLSearchParams();
    searchParams.set(
      'u',
      'https://weekly-ads.us/public/gimg/3/2/3/4/6/1/0/3234610-350-580.jpg'
    );
    this.navUrl = 'https://www.facebook.com/sharer/sharer.php?' + searchParams;
    return window.open(this.navUrl, '_blank');
  }

  getGuestSession() {
    const body = {};
    const success = this.sgetGuestSessionSuccess.bind(this);
    const error = this.getGuestSessionerror.bind(this);
    this.common.http.post('Session', body, success, error);
  }
  sgetGuestSessionSuccess(data) {
    if (data.res_status === true) {
      this.GuestSessionId = data.session_id;
      const GuestSessionIDdata = data.session_id;
      this.cookieService.set('GuestSessionIDdata', GuestSessionIDdata);
      this.sessionInsert();
    }
  }
  getGuestSessionerror() { }
  /**
   * Session Insert Method
   * @author Devi
   * @version 1.0
   */
  sessionInsert() {
    let body;
    const deviceUid = localStorage.getItem('UUID');
    body = {
      guest_session_op_type: 'session_insert',
      session_id: this.GuestSessionId,
      browser_id: deviceUid,
    };
    this.LPService.sessionInsert(body).subscribe((data) => {
    });
  }
  getrelatedproducts() {
    let body;
    if (this.logedSeeionId == null || this.logedSeeionId == undefined) {
      body = {
        login: false,
        session_id: this.GuestSessionId,
        tenant_id: this.tenantId,
      };
    } else {
      body = {
        login: true,
        session_id: this.logedSeeionId,
        customer_id: this.logedCustomerId,
        tenant_id: this.tenantId,
      };
    }
    body = this.common.withoutDataStoreValidation(body);
    const success = this.relatedonSuccess.bind(this);
    const error = this.relatedonerror.bind(this);
    this.common.http.post('recommendations', body, success, error);
  }
  relatedonSuccess(data) {
    if (data.res_status === true) {
      this.relatedProductArray = data.data;
      this.relatedProductArray.map((element, idx) => {
        const imgObj = element.image;
        const image = JSON.parse(imgObj);
        if ('file_data' in image) {
          const imgArr = image.file_data;
          imgArr.map((ele) => {
            if (ele.storage_type === 'db') {
              this.relatedProductArray[idx].imageUrl =
                'data:image/png;base64,' + ele.media_data;
              let selectedfile = 'data:image/png;base64,' + ele.media_data;
              let imgId = ele.media_id;
            } else {
              this.relatedProductArray[idx].imageUrl = ele.media_data;
              let relatedProductArray = ele.media_data;
              let imgId = ele.media_id;
            }
          });
        } else {
          this.relatedProductArray[idx].imageUrl = image.data;
        }
      });
    } else {
      this.relatedProductArray = [];
    }
  }
  relatedonerror() { }
  AddToCartbestsellerClk(bpid, bprice) {
    let body;
    if (this.logedCustomerId !== null && this.logedCustomerId !== undefined) {
      body = {
        login: true,
        customer_id: this.logedCustomerId,
        session_id: this.logedSeeionId,
        product_id: bpid,
        recurring_id: 0,
        total_amount: 0,
        quantity: 1,
        tenant_id: this.tenantId,
        option: [],
      };
    } else {
      body = {
        login: false,
        session_id: this.GuestSessionId,
        product_id: bpid,
        recurring_id: 0,
        total_amount: 0,
        quantity: 1,
        tenant_id: this.tenantId,
        option: [],
      };
    }
    const success = this.BestAddToCartSuccess.bind(this);
    const error = this.bestonErrorAddToCart.bind(this);
    this.common.http.post('Cart', body, success, error);
  }
  BestAddToCartSuccess(data) {
    this.snack.open(data.msg, 'Ok', { duration: 2000 });
    this.ms.passValue(data.cart_count);
  }
  bestonErrorAddToCart(data) {
    this.snack.open(data.msg, 'Ok', { duration: 2000 });
  }

  getmenuLanding() {
    const body = {
      categorymenu_op_type: 'select',
      tenant_id: this.tenantId,
      limit: 'All',
    };
    const success = this.listSuccess.bind(this);
    const error = this.listonError.bind(this);
    this.common.http.post('categorylistui', body, success, error);
  }
  listSuccess(data) {
    this.landingArray = data.data;
    var length = this.landingArray.length;
    for (let i = 0; i <= length; i++) {
      let jsonSuggestionsArrDataObj: any = JSON.parse(
        this.landingArray[i].image
      );
      var LL = jsonSuggestionsArrDataObj.length;
      let imageStrings = jsonSuggestionsArrDataObj.file_data;
      let imageString = imageStrings[0].media_data;
      this.imagescoenuUrl.push({ path: imageString });
    }
  }
  listonError() { }
  getBrandsList() {
    let body = {
      manufacturer_list_op_type: 'select',
      tenant_id: this.tenantId,
    };
    this.LPService.getBrands(body).subscribe((data) => {
      if (data.res_status === true) {
        this.brandsData = data.data;
        this.brandsData.map((element, idx) => {
          const imgObj = element.image;
          const image = JSON.parse(imgObj);
          if ('file_data' in image) {
            const imgArr = image.file_data;
            imgArr.map((ele) => {
              if (ele.storage_type === 'db') {
                this.brandsData[idx].imageUrl =
                  'data:image/png;base64,' + ele.media_data;
              } else {
                this.brandsData[idx].imageUrl = ele.media_data;
              }
            });
          } else {
            this.brandsData[idx].imageUrl = image.data;
          }
        });
      }
    });
  }
  getProductsFromBrand(id, name) {
    this.router.navigate(['/product', id, name], {
      queryParams: { status: 'brands' },
    });
  }
  onTabChanged(event) {
    this.activeTab = event.tab.textLabel;
  }

  removeWishlist(i, wishlistStatusId, data, status): any {
    let findIndexValue: any;
    if (status === 'weekly') {
      const targetId = data.product_id;
      findIndexValue = this.weekdealsAdss.findIndex(
        (obj) => obj.product_id === targetId
      );
    } else if (status === 'related') {
      const targetId = data.product_id;
      findIndexValue = this.relatedProductArray.findIndex(
        (obj) => obj.product_id === targetId
      );
    } else {
      const targetId = data.product_id;
      findIndexValue = this.sugessData.findIndex(
        (obj) => obj.product_id === targetId
      );
    }
    let body;
    this.spinner.show();
    if (this.logedCustomerId !== null && this.logedCustomerId !== undefined) {
      body = {
        wishlist_op_type: 'delete',
        wishlist_id: wishlistStatusId,
        tenant_id: this.tenantId,
        session_id: this.logedSeeionId,
        customer_id: this.logedCustomerId,
      };
    } else {
      body = {
        wishlist_op_type: 'delete',
        wishlist_id: wishlistStatusId,
        tenant_id: this.tenantId,
        session_id: this.GuestSessionId,
      };
    }
    this.summary.deleteWishlist(body).subscribe((data) => {
      this.spinner.hide();
      this.ms.passWishlistValue(data.wishlist_count);
      if (data.res_status === true) {
        this.snack.open(data.msg, 'Ok', { duration: 2000 });
        if (status === 'weekly') {
          this.weekdealsAdss[findIndexValue].wishlist_status = 1;
        } else if (status === 'related') {
          this.relatedProductArray[findIndexValue].wishlist_status = 1;
        } else {
          this.sugessData[findIndexValue].wishlist_status = 1;
        }
        this.snack.open('Item removed from Wishlist', 'Ok', { duration: 2000 });
        this.suggestionAds();
      }
    });
  }
  getFolders(): any {
    this.summary.getFolders().subscribe((data) => {
      if (data.res_status === true) {
        this.folders = data.folders_list;
        this.folderList =
          this.folders.length > 0 ? this.folders[0].folder_id : '';
      }
    });
  }
  addNewFolder(): any {
    this.showwishlistform = false;
    this.showAddFolder = true;
  }
  addFolder(fName: any): any {
    let body;
    //this.folderName = fName;
    if (this.logedCustomerId !== null && this.logedCustomerId !== undefined) {
      body = {
        folder_op_type: 'create',
        parent_folder_id: 0,
        tenant_id: this.tenantId,
        login: true,
        folder_name: this.folderName ? this.folderName : fName,
        customer_id: this.logedCustomerId,
        session_id: this.logedSeeionId,
      };
    } else {
      body = {
        folder_op_type: 'create',
        parent_folder_id: 0,
        login: false,
        tenant_id: this.tenantId,
        folder_name: this.folderName ? this.folderName : fName,
        session_id: this.GuestSessionId,
      };
    }
    this.summary.addFolders(body).subscribe((data) => {
      this.snack.open(data.msg, 'OK', { duration: 1000 });
      if (data.res_status === true) {
        this.foldervisible = false;
        this.formhide = true;
        this.getFolders();
      }
    });
    this.folderName = '';
  }

  addtoWishlist(totData, index, status): void {
    let findIndexValue: any;
    if (status === 'weekly') {
      const targetId = totData.product_id;
      findIndexValue = this.weekdealsAdss.findIndex(
        (obj) => obj.product_id === targetId
      );
    } else if (status === 'related') {
      const targetId = totData.product_id;
      findIndexValue = this.relatedProductArray.findIndex(
        (obj) => obj.product_id === targetId
      );
    } else {
      const targetId = totData.product_id;
      findIndexValue = this.sugessData.findIndex(
        (obj) => obj.product_id === targetId
      );
    }
    this.spinner.show();
    let body;
    if (this.logedCustomerId !== null && this.logedCustomerId !== undefined) {
      body = {
        wishlist_op_type: 'add',
        tenant_id: this.tenantId,
        customer_id: this.logedCustomerId,
        session_id: this.logedSeeionId,
        product_id: totData.product_id,
        folder_id: this.folderList,
      };
    } else {
      body = {
        wishlist_op_type: 'add',
        tenant_id: this.tenantId,
        session_id: this.GuestSessionId,
        product_id: totData.product_id,
        folder_id: this.folderList,
      };
    }
    this.summary.addToWishlist(body).subscribe((data) => {
      this.spinner.hide();
      this.ms.passWishlistValue(data.wishlist_count);
      if (data.res_status === true) {
        this.trigger.closeMenu();
        this.snack.open(data.msg, 'Ok', { duration: 2000 });
        if (status === 'weekly') {
          this.weekdealsAdss[findIndexValue].wishlist_status = 0;
        } else if (status === 'related') {
          this.relatedProductArray[findIndexValue].wishlist_status = 0;
        } else {
          this.sugessData[findIndexValue].wishlist_status = 0;
        }
        this.suggestionAds();
      } else {
        this.snack.open(data.msg + '- Please select folder', 'Ok', {
          duration: 2000,
        });
      }
    });
  }
  showfolder(): any {
    this.foldervisible = true;
    this.formhide = false;
  }
  hidefolder(): any {
    this.foldervisible = false;
    this.formhide = true;
  }
  getExclusiveCategories() {
    const body = { category_id: 238, limit: 7, tenant_id: this.tenantId };
    this.CategoryObject.categoryData = Array<CategoryData>();
    this.LPService.getExclusiveCategories(body).subscribe((data) => {
      if (data.res_status === true) {
        data.data.map((item) => {
          const categoryDataset = new CategoryData();
          categoryDataset.categoryId = item.category_id;
          categoryDataset.description = item.description;
          categoryDataset.parentName = item.parent;
          categoryDataset.childName = item.child;
          const imageParse = JSON.parse(item.image);
          if (imageParse.file_data) {
            imageParse.file_data.map((itemImg) => {
              if (itemImg.storage_type === 'db') {
                categoryDataset.image =
                  'data:image/png;base64,' + itemImg.media_data;
              } else {
                categoryDataset.image = itemImg.media_data;
              }
            });
          } else {
            categoryDataset.image = imageParse.data;
          }
          this.CategoryObject.categoryData.push(categoryDataset);
        });
      }
    });
  }
  /**
   * @remarks get tenant org name from url and change labels & Banners in landing page based on org name
   * @author Devi
   * @version 1.0
   */
  getMiddleBanner() {
    this.middleBanner1 = this.tenantDataService.middileBannerImg1;
    this.middleBanner2 = this.tenantDataService.middileBannerImg2;
    this.middleBanner3 = this.tenantDataService.middileBannerImg3;
    this.wishlistAdd = this.tenantDataService.wishlistImg;
    this.wishlistNone = this.tenantDataService.wishlistNoneImg;
    this.brandsLabel = this.tenantDataService.brandName;
    this.tenantAddress = this.tenantDataService.getTenantAddress();
    this.orgName = this.tenantDataService.orgName;
  }

  /**
   * @remarks Truncate a text
   * @author Devi
   * @version 1.0
   * @param text - text
   * @returns text
   */
  truncateHTML(text): string {
    let charlimit = 150;
    if (!text || text.length == charlimit) {
      return text;
    }
    let without_html = text.replace(/<(?:.|\n)*?>/gm, '');
    let shortened = without_html.substring(0, charlimit) + '...';
    return shortened;
  }
  shopNow(data) {
    this.router.navigate(['/product', data.categoryId, data.childName]);
  }

  // ------------------------ BOT METHODS ------------------------------- //

  login(): void {
    const randomChars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 10; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
    }
    const userName = sessionStorage.getItem('userdata');
    const body = {
      user_name: userName,
      password: '',
      type: 'PTU',
      fcm_token: null,
      appl_name: 'customerportal',
      context: {
        'user-agent': {
          browser: this.getBrowserName(),
          browser_version: this.getBrowserVersion(),
        },
        'user-interface': 'web-ui',
      },
    };
  }
  onSuccessslogin(data: { res_status: boolean; data: any[] }): void {
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
        this.botSessionId = i.session_id;
      }

      const token = JSON.stringify(sessionValue);
      sessionStorage.setItem('user', token);
      const userdata = sessionValue;
      this.loginuserName = userdata[0].user_name;
      this.userName = userdata[0].user_name;
      this.inputmsg = 'help me';
      this.initiateChat();
    } else {
    }
  }
  initiateChat(): void {
    const userName = sessionStorage.getItem('userdata');
    const body = {
      input: this.inputmsg,
      chat_bot_mode: this.chatbotmode,
      context: {
        'user-agent': {
          browser: this.getBrowserName(),
          browser_version: this.getBrowserVersion(),
        },
        'user-interface': 'web-ui',
        app_type: 'chatbot',
      },
      user_name: userName,
      session_id: this.botSessionId,
    };
    this.LPService.sendMessage(body).subscribe(
      (res) => {
        this.onSuccesss(res);
      },
      (err) => {
        this.onErrorr(err);
      }
    );
  }
  Chatclick(): void {
    if (
      this.chatname === undefined ||
      this.chatname === '' ||
      this.chatname === null
    ) {
      if (this.inputmsg.trim() === '' || this.inputmsg === ' undefined') {
        alert('Enter or Say Something');
      } else {
        const time = new Date();
        let inputtime;
        if (this.imgurl.includes('cs') === true) {
        } else {
          inputtime = time;
        }
        if (this.lastMsg === true) {
          this.chatResponse = [];
        } else if (this.undoMsg === true) {
          this.chatResponse.push({
            inputData: '',
            inptimestamp: '',
          });
        } else {
          this.chatResponse.push({
            inputData: this.inputmsg,
            inptimestamp: inputtime,
          });
        }
        this.showspinner = true;
        this.spinner.show();
        this.msgdata = [];
        this.valuess = [];
        this.json = [];
        this.outputreport = [];
        this.chatdatalayouts = [];
        const newArray = this.chatResponse.map((o) => {
          return { name: o.inputData, courseid: o.outputData };
        });
        const arr = [1];
        const newItems = this.chatResponse;
        arr.push(...newItems);
        let body = {};
        const userName = sessionStorage.getItem('userdata');
        if (
          this.enterword !== undefined &&
          this.enterword !== '' &&
          this.enterword !== null
        ) {
          body = {
            input: this.enterword + '@@@' + this.inputmsg,
            chat_bot_mode: this.chatbotmode,
            context: {
              'user-agent': {
                browser: this.getBrowserName(),
                browser_version: this.getBrowserVersion(),
              },
              'user-interface': 'web-ui',
              app_type: 'chatbot',
            },
            user_name: userName,
            session_id: this.botSessionId,
          };
        } else if (this.lastMsg === true) {
          body = {
            input: this.inputmsg,
            chat_bot_mode: this.chatbotmode,
            context: {
              'user-agent': {
                browser: this.getBrowserName(),
                browser_version: this.getBrowserVersion(),
              },
              'user-interface': 'web-ui',
              app_type: 'chatbot',
            },
            user_name: userName,
            session_id: this.botSessionId,
          };
        } else if (this.undoMsg === true) {
          body = {
            input: this.inputmsg,
            chat_bot_mode: this.chatbotmode,
            context: {
              'user-agent': {
                browser: this.getBrowserName(),
                browser_version: this.getBrowserVersion(),
              },
              'user-interface': 'web-ui',
              app_type: 'chatbot',
            },
            user_name: userName,
            session_id: this.botSessionId,
          };
        } else if (
          this.supportType !== undefined &&
          this.supportType !== '' &&
          this.supportType !== null
        ) {
          body = {
            input: 'support' + '####' + this.inputmsg,
            chat_bot_mode: this.chatbotmode,
            context: {
              'user-agent': {
                browser: this.getBrowserName(),
                browser_version: this.getBrowserVersion(),
              },
              'user-interface': 'web-ui',
              app_type: 'chatbot',
            },
            user_name: userName,
            session_id: this.botSessionId,
          };
        } else {
          body = {
            input: this.inputmsg,
            chat_bot_mode: this.chatbotmode,
            context: {
              'user-agent': {
                browser: this.getBrowserName(),
                browser_version: this.getBrowserVersion(),
              },
              'user-interface': 'web-ui',
              app_type: 'chatbot',
            },
            user_name: userName,
            session_id: this.botSessionId,
          };
        }
        this.enterword = '';
        this.undoMsg = false;
        this.supportType = '';
        this.LPService.sendMessage(body).subscribe(
          (res) => {
            this.onSuccesss(res);
          },
          (err) => {
            this.onErrorr(err);
          }
        );
      }
    }
  }
  getBrowserVersion(): any {
    var userAgent = navigator.userAgent,
      tem,
      matchTest =
        userAgent.match(
          /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
        ) || [];
    if (/trident/i.test(matchTest[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(userAgent) || [];
      return 'IE ' + (tem[1] || '');
    }
    if (matchTest[1] === 'Chrome') {
      tem = userAgent.match(/\b(OPR|Edge)\/(\d+)/);
      if (tem != null) {
        return tem.slice(1).join(' ').replace('OPR', 'Opera');
      }
    }
    matchTest = matchTest[2]
      ? [matchTest[1], matchTest[2]]
      : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = userAgent.match(/version\/(\d+)/i)) != null)
      matchTest.splice(1, 1, tem[1]);
    return matchTest.join(' ');
  }
  getBrowserName(): any {
    const agent = window.navigator.userAgent.toLowerCase();
    switch (true) {
      case agent.indexOf('edg') > -1:
        return 'edge';
      case agent.indexOf('opr') > -1 && !!(window as any).opr:
        return 'opera';
      case agent.indexOf('chrome') > -1 && !!(window as any).chrome:
        return 'chrome';
      case agent.indexOf('trident') > -1:
        return 'ie';
      case agent.indexOf('firefox') > -1:
        return 'firefox';
      case agent.indexOf('safari') > -1:
        return 'safari';
      default:
        return 'other';
    }
  }
  onSuccesss(data: {
    res_status: boolean;
    support: any;
    data: { msg: any };
    msg: any;
    pre_link: string | UrlTree;
  }): any {
    if (data.res_status === true) {
      this.showspinner = false;
      this.spinner.hide();
      this.chatbgcolor = true;
      this.showfile = true;
      this.inputmsg = '';
      if (this.lastMsg === true) {
        this.chatResponse = [];
        this.lastMsg = false;
      } else {
        this.msgdata = data.data;
        if (this.msgdata.output.intent === 'navigate') {
          if (this.msgdata.input.data.includes('cart')) {
            this.router.navigate(['/cart']);
          } else if (this.msgdata.input.data.includes('orders')) {
            this.router.navigate(['/myorders']);
          }
        } else if (this.msgdata.output.intent === 'screen') {
          const searchKey = this.msgdata.output.entity.SCREEN_NAME;
          this.common.botSearchKey(searchKey);
        }
        if (this.msgdata.length === 0) {
          const obj = { outputData: [data.data.msg] };
          this.chatResponse.push(obj);
        } else {
          this.general.setData(data);
          const cc = this.msgdata.output.cb_type;
          const dd = this.msgdata.output.type;
          const list = this.msgdata.output.list;
          const outtime = this.msgdata.output.time;
          this.datevalue = outtime;
          const qstns = this.msgdata.output.question;
          const layoutvals = ['yes', 'no'];
          const prompt = this.msgdata.output.prompt;
          let OutputMsgData = this.msgdata.output.data;
          OutputMsgData = String(OutputMsgData);
          OutputMsgData = OutputMsgData.split('@#@#');
          if (cc === 'app_build' && dd === undefined) {
            this.chatResponse.push({
              outputData: OutputMsgData,
              layout: this.msgdata.output.layouts,
              outtimestamp: outtime,
              dateformat: outtime,
              qstn: qstns,
              yn: layoutvals,
              uniqueeid: this.msgdata.output.unique_id,
              promptVal: prompt,
            });
          } else if (list) {
            const removeDuplicatesList = new Set([...this.msgdata.output.list]);
            this.chatResponse.push({
              outputData: OutputMsgData,
              layout: removeDuplicatesList,
              outtimestamp: outtime,
              dateformat: outtime,
              qstn: qstns,
              yn: layoutvals,
              uniqueeid: this.msgdata.output.unique_id,
              promptVal: prompt,
            });
          } else if (cc === 'data_entry' && dd === 'selected') {
            this.chatResponse.push({
              outputData: OutputMsgData,
              layout: this.msgdata.output.entry_forms,
              outtimestamp: outtime,
              dateformat: outtime,
              qstn: qstns,
              yn: layoutvals,
              uniqueeid: this.msgdata.output.unique_id,
              promptVal: prompt,
            });
            const obj = {
              form_type: this.msgdata.output.form_type,
              entry_forms: this.msgdata.output.entry_forms,
            };
            if (this.msgdata.output.form_type === 'form') {
              this.general.setFormData(obj);
              this.outputreportt = [];
            } else if (this.msgdata.output.form_type === 'link') {
              this.general.setFormData(obj);
              window.location.href = this.msgdata.output.entry_forms;
            }
          } else if (dd === 'selected') {
            this.chatResponse.push({
              outputData: OutputMsgData,
              layout: this.msgdata.output.templates,
              outtimestamp: outtime,
              dateformat: outtime,
              qstn: qstns,
              yn: layoutvals,
              uniqueeid: this.msgdata.output.unique_id,
              promptVal: prompt,
            });
          } else if (cc === 'data_entry') {
            const substring = 'Enter';
            if (this.msgdata.output.entry_forms[0].includes(substring)) {
              this.enterword = this.msgdata.output.entry_forms[0];
              this.chatResponse.push({
                outputData: OutputMsgData,
                emailword: this.msgdata.output.entry_forms,
                outtimestamp: outtime,
                dateformat: outtime,
                qstn: qstns,
                yn: layoutvals,
                uniqueeid: this.msgdata.output.unique_id,
                promptVal: prompt,
              });
            } else {
              this.chatResponse.push({
                outputData: OutputMsgData,
                layout: this.msgdata.output.entry_forms,
                outtimestamp: outtime,
                dateformat: outtime,
                qstn: qstns,
                yn: layoutvals,
                uniqueeid: this.msgdata.output.unique_id,
                promptVal: prompt,
              });
            }
          } else {
            this.chatResponse.push({
              outputData: OutputMsgData,
              outtimestamp: outtime,
              dateformat: outtime,
              qstn: qstns,
              yn: layoutvals,
              uniqueeid: this.msgdata.output.unique_id,
              promptVal: prompt,
            });
          }
          this.supportType = this.msgdata.output.support_type;
          this.LPService.setChatData(this.chatResponse);
        }
      }
    } else {
      this.showspinner = false;
      this.spinner.hide();
      this.inputmsg = '';
      if (data.pre_link) {
        const obj = { outputData: [data.msg] };
        this.chatResponse.push(obj);
        this.router.navigateByUrl(data.pre_link);
      } else {
        const obj = { outputData: [data.msg] };
        this.chatResponse.push(obj);
      }
      this.LPService.setChatData(this.chatResponse);
    }
    this.general.setSessionState(this.chatResponse);
  }
  trackByArtNo(index: number, chatResponse: any): string {
    return chatResponse.uniqueeid;
  }
  app_data_get(val: string): any {
    if (this.lastMsg === true) {
      if (val === 'yes') {
        this.inputmsg = 'chat_@reset';
        this.Chatclick();
      } else {
        this.chatResponse.push({
          inputData: 'no',
          outputData: ['Please Continue The Chat'],
        });
        setTimeout(() => {
          this.scrollToElement('');
        }, 1000);
        this.lastMsg = false;
        this.inputmsg = val;
      }
    } else {
      this.inputmsg = val;
      this.Chatclick();
    }
  }

  closewindow(): any {
    this.isvisible = false;
    (document.getElementById('visiblechat') as HTMLFormElement).style.opacity =
      '0';
  }
  openwindw(evt: any): any {
    if (evt.target.checked === true) {
      this.isvisible = true;
      (
        document.getElementById('visiblechat') as HTMLFormElement
      ).style.opacity = '1';
    } else if (evt.target.checked === false) {
      this.isvisible = false;
      (
        document.getElementById('visiblechat') as HTMLFormElement
      ).style.opacity = '0';
    }
  }
  logout(): any {
    const body = {};
    this.LPService.logout(body).subscribe(
      (res) => {
        this.onSuccessslogout(res);
      },
      (err) => {
        this.onErrorr(err);
      }
    );
  }
  onSuccessslogout(data: { res_status: boolean; msg: any }): any {
    if (data.res_status === true) {
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('roles');
      sessionStorage.removeItem('chatData');
      this.router.navigateByUrl('auth/login');
      this.router
        .navigateByUrl('auth/login', { skipLocationChange: true })
        .then(() => {
          this.router.navigate(['auth/login']);
        });
      window.location.reload();
    } else {
      Swal.fire({
        icon: 'error',
        text: data.msg,
      });
    }
  }
  onErrorr(error: any): any {
    this.spinner.hide();
    Swal.fire({
      icon: 'error',
      text: error,
    });
  }
  showBotChat(): any {
    this.showperson2 = true;
    this.showperson = false;
    this.appsshow = 'show';
    this.chatname = '';
    this.peerResponse = [];
    (document.getElementById('shw') as HTMLFormElement).style.display = 'block';
    (document.getElementById('shw2') as HTMLFormElement).style.display =
      'block';
    (document.getElementById('showarrow') as HTMLFormElement).style.display =
      'block';
  }
  resetChat(): any {
    const layouts = ['yes', 'no'];
    const obj = {
      outputData: ['Do you want to reset chat ?'],
      layout: layouts,
    };
    this.chatResponse.push(obj);
    setTimeout(() => {
      this.scrollToElement('');
    }, 1000);
    this.lastMsg = true;
  }
  undoChat(): any {
    this.undoMsg = true;
    this.inputmsg = 'chat_@undo';
    this.Chatclick();
    // chat_@undo
  }
  scrollToElement(el: string): void {
    this.myScrollContainer.nativeElement.scroll({
      top: this.myScrollContainer.nativeElement.scrollHeight,
      left: 0,
      behavior: 'smooth',
    });
  }
  scrollHandler(event: { isTrusted: boolean }, val: string): any {
    if (val === 'show') {
      if (event.isTrusted === true) {
        (
          document.getElementById('showarrow') as HTMLFormElement
        ).style.display = 'block';
      } else {
        (
          document.getElementById('showarrow') as HTMLFormElement
        ).style.display = 'none';
      }
    } else if (val === 'hide') {
      (document.getElementById('showarrow') as HTMLFormElement).style.display =
        'none';
    } else {
      (document.getElementById('showarrow') as HTMLFormElement).style.display =
        'none';
    }
  }
  closedialog(): any {
    this.dialog.closeAll();
  }
}
