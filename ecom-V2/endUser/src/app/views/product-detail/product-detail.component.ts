import {
  Component,
  Input,
  OnChanges,
  ElementRef,
  OnInit,
  SimpleChanges,
  ViewChild,
  TemplateRef,
  Renderer2,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { CommonService } from '../../helper/common.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ProductDetailObject,
  ProductDetails,
  productHighlights,
  ProductImage,
  productReview,
  recentlyViewedDetails,
  recentProductData,
} from './config/product-detail-modal';
import { DatePipe } from '@angular/common';
import {
  ProductDetail,
  SummaryData,
} from '../product-summary/modal/summary-modal';
import { SummaryService } from '../product-summary/service/summary.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuService } from 'src/app/layout/service/menu.service';
import { UtilsService } from '../../helper/utils.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { TenantBasedDataService } from 'src/app/shared/services/tenant-based-data.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  providers: [DatePipe],
})
export class ProductDetailComponent implements OnInit, OnChanges {
  [x: string]: any;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  @ViewChild('shareDetails') ShareDetails: TemplateRef<any>;
  @ViewChild('subDetails') SubDetails: TemplateRef<any>;
  @ViewChild('chartDetails') ChartDetails: TemplateRef<any>;
  @ViewChild('widgetsContent', { read: ElementRef })
  public widgetsContent: ElementRef<any>;
  @ViewChild('multiImgContent', { read: ElementRef })
  public multiImgContent: ElementRef<any>;
  @ViewChild('relatedContent', { read: ElementRef })
  public relatedContent: ElementRef<any>;
  @ViewChild('RatingContent', { read: ElementRef })
  public ratingContent: ElementRef<any>;

  @ViewChild('categoryDetails') CategoryDetails: TemplateRef<any>;
  @ViewChild('affiliationDetails') invite: TemplateRef<any>;
  @ViewChild('prodetailSDiv') prodetailSDiv: ElementRef;
  @ViewChild('magnifier') magnifier: ElementRef;
  products;
  productshow = false;
  @Input() productInfo: any;
  rating: any;
  recurringId = 0;
  totalAmnt = 0;
  qty = 1;
  subscribeFlag = false;
  apiRecurringFlag: any;
  recurringObject: any;
  recurringFlag = false;
  textboxInfo: any;
  radioButtonInfo: any;
  SelectOptionInfo: any;
  textareaInfo: any;
  dateInfo: any;
  modalRef: BsModalRef;
  checkboxInfo: any;
  finalOptionsObject = [];
  radioRequired = false;
  subscribePriceFlag = false;
  errorMsg: string;
  recurringSelectFlag = false;
  productId: any;
  form = new FormGroup({
    textboxControl: new FormControl(),
    radioButtonControl: new FormControl(),
    selectOptionControl: new FormControl(),
    textareaControl: new FormControl(),
    dateControl: new FormControl(),
    checkboxControl: new FormControl(),
  });

  subscriptionForm = new FormGroup({
    cycle: new FormControl('', [Validators.minLength(1), Validators.required]),
    qty: new FormControl(),
    period: new FormControl(),
    frmDate: new FormControl(),
    endDate: new FormControl(),
    priceFlag: new FormControl(),
  });
  durationList = ['Days', 'Weeks', 'Months', 'Year'];
  purchaseOptions = ['One-time purchase', 'Subscribe & save'];
  productList = [];
  productName = '';
  AddToCartStatus: any;
  mainImage;
  productDetailObj: ProductDetailObject = new ProductDetailObject();
  closeResult: string;
  imageInModel: any;
  productSpecifications: any[] = [];
  subscriptionSlabs: any[] = [];
  tenantSlabs: any[] = [];
  currentRate = 0;
  customerId: any;
  customerName: any;
  customerreviewtext: any;
  author = '';
  title = '';
  showRatingForm = false;
  otherFeatures: any[] = [];
  productMainImage: any;
  selectedImage: any;
  productOverView: any;
  showwishlistform = true;
  showAddFolder = false;
  wishfolders = [{ folder: 'Default' }];
  folderName;
  folderList;
  folders = [];
  foldervisible = false;
  formhide = true;
  logedSeeionId;
  logedCustomerId;
  logedEmailId;
  logedUserName;
  url;
  currentURL;
  subscriptionId: any;
  subscrptnTotalAmt: any;
  subObj: any;
  discountFlag: any;
  numDelivery: any;
  priceDiscountFlag: boolean;
  deliveryStatus: any;
  summaryData: SummaryData = new SummaryData();
  RecentProductData: recentProductData = new recentProductData();
  currencyId;
  storeId;
  guestSessionId;
  tenantId;
  isReadMore = true;
  showMoreIndx;
  reviewFlag;
  logedUserLastName;
  logedUserFrstName;
  tabIndex;
  pincodeFlag = false;
  disableFlag = true;
  productWishlistFlag: any;
  wishlistData: any;
  wishIndx: any;
  orgName: any;
  testingImgs = [
    'assets/images/add3.jpg',
    'assets/images/add4.jpg',
    'assets/images/add5.jpg',
    'assets/images/add6.jpg',
    'assets/images/add7.jpg',
  ];
  productMultiImgs = [];
  constructor(
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private router: Router,
    private snack: MatSnackBar,
    private common: CommonService,
    private modalService: NgbModal,
    private datePipe: DatePipe,
    private summary: SummaryService,
    private spinner: NgxSpinnerService,
    private menu: MenuService,
    private utils: UtilsService,
    private modal: BsModalService,
    readonly bottomSheet: MatBottomSheet,
    private clipboard: Clipboard,
    readonly dialog: MatDialog,
    private tenantDataService: TenantBasedDataService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.currentURL = window.location.href;
    const id = this.route.snapshot.paramMap.get('id');
    this.logedSeeionId = sessionStorage.getItem('sessionId');
    this.guestSessionId = this.cookieService.get('GuestSessionIDdata');
    this.logedCustomerId = sessionStorage.getItem('customerId');
    this.logedEmailId = sessionStorage.getItem('userEmail');
    this.logedUserName = sessionStorage.getItem('userdata');
    this.storeId = sessionStorage.getItem('StoreId');
    this.currencyId = sessionStorage.getItem('currencyId');
    this.tenantId = sessionStorage.getItem('tenantId');
    this.logedUserFrstName = sessionStorage.getItem('firstname');
    this.logedUserLastName = sessionStorage.getItem('lastname');
    this.author = this.logedUserFrstName + ' ' + this.logedUserLastName;
    this.getTenantAddress();
    this.route.params.subscribe((params) => {
      this.getProducts(params.id);
      this.productId = params.id;
      this.getRelatedProducts(params.id);
      this.getRecentlyViewedProducts();
      this.getFolders();
    });
    this.common.aClickedEvent.subscribe((data: any) => {
      this.storeId = sessionStorage.getItem('StoreId');
      this.getProducts(this.productId);
      this.getRecentlyViewedProducts();
      this.getRelatedProducts(this.productId);
      sessionStorage.removeItem('currencyId');
      sessionStorage.removeItem('currencyName');
    });
    this.common.currencyClickedEvent.subscribe((data: any) => {
      this.currencyId = sessionStorage.getItem('currencyId');
      this.getProducts(this.productId);
      this.getRecentlyViewedProducts();
      this.getRelatedProducts(this.productId);
    });
  }
  /**
  * @remarks Checks the input field empty or filled and if it is filled means enable confirm button
  * @author
  * @version 0.1
  */
  checkIfDirty(event) {
    this.disableFlag = false;
    this.pincodeFlag = false;
  }

  /**
  * @remarks For open dialog box
  * @author
  * @version 0.1
  */
  SubView() {
    this.dialog.open(this.CategoryDetails, {
      position: { left: '20%' },
      width: '50%',
    });
  }
  /**
  * @remarks Scrolling the data in between the container 
  * @author
  * @version 0.1
  */
  public scrollLeft(): void {
    this.widgetsContent.nativeElement.scrollTo({
      left: this.widgetsContent.nativeElement.scrollLeft - 250,
      behavior: 'smooth',
    });
  }
  public scrollRight(): void {
    this.widgetsContent.nativeElement.scrollTo({
      left: this.widgetsContent.nativeElement.scrollLeft + 250,
      behavior: 'smooth',
    });
  }
  public relatedScrollLeft(): void {
    this.relatedContent.nativeElement.scrollTo({
      left: this.relatedContent.nativeElement.scrollLeft - 250,
      behavior: 'smooth',
    });
  }
  public relatedScrollRight(): void {
    this.relatedContent.nativeElement.scrollTo({
      left: this.relatedContent.nativeElement.scrollLeft + 250,
      behavior: 'smooth',
    });
  }

  public scrollRatingContentLeft(): void {
    this.ratingContent.nativeElement.scrollTo({
      left: this.ratingContent.nativeElement.scrollLeft - 250,
      behavior: 'smooth',
    });
  }
  public scrollRatingContentRight(): void {
    this.ratingContent.nativeElement.scrollTo({
      left: this.ratingContent.nativeElement.scrollLeft + 250,
      behavior: 'smooth',
    });
  }
  ngOnChanges(change: SimpleChanges): void { }

  /**
  * @remarks Store validation method
  * @author
  * @version 0.1
  */
  storeValidation(body) {
    const storeId = sessionStorage.getItem('StoreId');
    if (this.storeId == null || this.storeId === 'all') {
      if (this.currencyId == null) {
        return body;
      } else {
        body['currency_id'] = parseInt(this.currencyId);
        return body;
      }
    } else {
      if (this.currencyId == null) {
        body['store_id'] = this.storeId;
        return body;
      } else {
        body['currency_id'] = parseInt(this.currencyId);
        body['store_id'] = this.storeId;
        body['store_currency_flag'] = 1;
        return body;
      }
    }
  }

  getProducts(id): void {
    this.spinner.show();
    const url = sessionStorage.getItem('affiliateUrl');
    let body;
    if (this.logedSeeionId == null) {
      body = {
        product_id: +id,
        tenant_id: this.tenantId,
        api_name: 'ProductDetailsUI',
        login: false,
        session_id: this.guestSessionId,
      };
      body = this.common.withoutDataStoreValidation(body);
    } else {
      body = {
        product_id: +id,
        tenant_id: this.tenantId,
        api_name: 'ProductDetailsUI',
        login: true,
        session_id: this.logedSeeionId,
        user_name: this.logedEmailId,
      };
      body = this.common.withoutDataStoreValidation(body);
    }
    body = this.common.referenceIdValidation(body);
    const success = this.onProductSuccess.bind(this);
    const error = this.onError.bind(this);
    this.common.http.post('ProductDetailsUI', body, success, error);
  }
  onProductSuccess(data): any {
    this.spinner.hide();
    this.productshow = true;
    this.productOverView = data.data;
    const productDetail = data.data.Product_Details;
    this.recurringId =
      this.productOverView.payment_profile.length === 0 ? 0 : 0;
    this.mainImage = data.data.Product_images;
    const productImages = data.data.Product_images;
    const productRatings = data.data.product_reviews;
    const specifications = data.data.specifications;
    const otherFeatures = data.data.product_availability_Options;
    this.tenantSlabs = data.data.Tenant_subscription_slabs;
    this.bindProductDetails(productDetail);
    this.bindProductImages(productImages);
    this.bindReviews(productRatings);
    this.bindProductSpecifications(specifications);
    this.bindOtherFeaturs(otherFeatures);
    const productHighlight = data.data.product_highlights.product_highlight;
    this.bindproductHighlights(productHighlight);
  }

  bindProductDetails(productDetail): void {
    this.spinner.hide();
    this.productDetailObj.productDetails = new Array<ProductDetails>();
    productDetail.map((item: any, i: any) => {
      const dataset = new ProductDetails();
      dataset.productId = item.product_id;
      dataset.productName = item.product_name;
      dataset.description = item.description;
      dataset.productCode = item.product_code;
      const imageParse = JSON.parse(item.main_image);
      this.apiRecurringFlag = item.recurring_flag;
      this.reviewFlag = item.review_flag;
      if (imageParse.file_data) {
        imageParse.file_data.map((itemImg) => {
          this.productMainImage = itemImg.media_data;
        });
      } else {
        this.productMainImage = imageParse.data;
      }
      dataset.originalprice = item.original_price;
      this.productWishlistFlag = item.wishlist_status;
      dataset.metaTitle = item.meta_title;
      dataset.metaDescription = item.meta_description;
      dataset.metaKeyword = item.meta_keyword;
      dataset.rewardPoints = item.reward_points;
      dataset.availability = item.availability;
      dataset.ratingAvg = item.rating_avg;
      dataset.reviewCount = item.review_count;
      dataset.ratingCount = item.rating_count;
      dataset.productDiscountPrice = item.product_discount_price;
      dataset.currencyIndicator = item.currency_indicator;
      dataset.priceInRewardPoints = item.price_in_rewardpoints;
      dataset.brands = item.brands;
      dataset.quantity = item.qty;
      dataset.categoryId = item.category_id;
      dataset.wishlistStatusId = item.wishlist_status_id;
      dataset.wishlistflag = item.wishlist_status;
      dataset.categoryName = item.category_name;
      dataset.offPrice = item.product_discount_off_price;
      this.wishlistData = dataset;
      this.wishIndx = i;
      this.productDetailObj.productDetails.push(dataset);
    });
  }

  bindProductImages(productImages): void {
    this.productDetailObj.productImages = new Array<ProductImage>();
    productImages.map((item) => {
      const dataset = new ProductImage();
      const parsedImages = JSON.parse(item.sub_images);
      if ('file_data' in parsedImages) {
        const imgArr = parsedImages.file_data;
        imgArr.map((ele) => {
          if (ele.storage_type === 'db') {
            dataset.image = 'data:image/png;base64,' + ele.media_data;
          } else {
            dataset.image = ele.media_data;
          }
        });
      } else {
        dataset.image = parsedImages.data;
      }
      dataset.sort = item.sort_order;
      this.productDetailObj.productImages.push(dataset);
    });
  }

  bindproductHighlights(productHighlight): void {
    this.productDetailObj.productHighlight = new Array<productHighlights>();
    productHighlight.map((item) => {
      const dataset = new productHighlights();
      dataset.producthighlightName = item.product_highlight;
      this.productDetailObj.productHighlight.push(dataset);
    });
  }

  bindReviews(reviews): void {
    this.productDetailObj.productReviews = new Array<productReview>();
    reviews.product_review.map((item) => {
      const dataset = new productReview();
      dataset.author = item.author;
      dataset.dateAdded = item.date_added;
      dataset.title = item.title;
      dataset.rating = item.rating;
      dataset.text = item.text;
      this.productDetailObj.productReviews.push(dataset);
    });
  }

  bindProductSpecifications(specifications): void {
    this.productSpecifications = specifications;
  }

  bindOtherFeaturs(otherFeatures): void {
    this.otherFeatures = otherFeatures;
  }
  changeImage(image): void {
    this.selectedImage = this.productMainImage;
    this.productMainImage = image;
  }

  changeImageOut() {
    this.productMainImage = this.selectedImage;
  }

  /* productMainImage changes on 21-7-21 */
  ratingCount(e) {
    this.rating = e.target.value;
  }
  /**
   * @remarks Submit Review
   * @author
   * @version 0.1
   */
  handleSubmitReview() {
    const body = {
      data: {
        author: this.author,
        customer_id: this.logedCustomerId,
        product_id: this.productId,
        text: this.customerreviewtext,
        rating: this.currentRate,
        title: this.title,
      },
    };
    const success = this.handleSubmitReviewSuccess.bind(this);
    const error = this.onError.bind(this);
    if (this.author === '' || this.author === undefined) {
      this.snack.open('Please enter customer Name', 'ok', { duration: 3000 });
    } else if (
      this.customerreviewtext === '' ||
      this.customerreviewtext === undefined
    ) {
      this.snack.open('Please enter Comment', 'ok', { duration: 3000 });
    } else if (this.currentRate === 0) {
      this.snack.open('Please give rating', 'ok', { duration: 3000 });
    } else {
      this.common.http.post('review', body, success, error);
    }
  }
  handleSubmitReviewSuccess(data): any {
    if (data.status === 200 || data.res_status === true) {
      this.snack.open('Thanks for reviewed', 'ok', { duration: 3000 });
      this.dialog.closeAll();
      this.showRatingForm = false;
      this.getProducts(this.productId);
    }
  }
  rateProduct() {
    if (this.logedSeeionId === null) {
      this.router.navigate(['/auth/login']);
    } else {
      this.showRatingForm = true;
      this.dialog.open(this.invite, {
        position: { left: '30%' },
        width: '40%',
      });
    }
  }
  onError(error) {
    this.snack.open(error, 'ok', { duration: 3000 });
  }

  /* Add to cart starts*/

  handlePaymentProfile(e) {
    this.recurringId = parseInt(e.target.value);
    this.recurringSelectFlag = true;
    const paymentIndex = this.productOverView.payment_profile.findIndex(
      (x) => x.recurring_id === this.recurringId
    );
    this.recurringObject = this.productOverView.payment_profile[paymentIndex];
    this.recurringFlag = true;
    this.totalAmnt = this.recurringObject.price;
  }

  handleChangeQty(e) {
    this.qty = parseInt(e.target.value);
  }

  handleTextBox(e) {
    this.textboxInfo = {
      option_id: e.target.attributes[6].value,
      product_option_id: e.target.attributes[7].value,
      product_option_value_id: 0,
      name: 'Text',
      value: e.target.value,
    };
  }

  handleChangeRadio(e) {
    let radioInfo = e.target.attributes[8].value;
    radioInfo = radioInfo ? radioInfo.split('&') : '';
    this.radioButtonInfo = {
      option_id: radioInfo[2],
      product_option_id: radioInfo[3],
      product_option_value_id: radioInfo[0],
      name: 'Radio',
      sub_name: radioInfo[1],
    };
  }

  handleSelect(e) {
    let selectInfo = e.target.value;
    selectInfo = selectInfo ? selectInfo.split('&') : '';
    this.SelectOptionInfo = {
      option_id: selectInfo[2],
      product_option_id: selectInfo[3],
      product_option_value_id: selectInfo[0],
      name: 'Select',
      sub_name: selectInfo[1],
    };
  }
  handleTeaxtarea(e) {
    let textareaData = e.target.id;
    textareaData = textareaData ? textareaData.split('&') : '';
    this.textareaInfo = {
      option_id: textareaData[0],
      product_option_id: textareaData[1],
      product_option_value_id: 0,
      name: 'Textarea',
      value: e.target.value,
    };
  }

  handleChangeDate(e) {
    let dateData = e.target.id;
    dateData = dateData ? dateData.split('&') : '';
    this.dateInfo = {
      option_id: dateData[0],
      product_option_id: dateData[1],
      product_option_value_id: 0,
      name: 'Textarea',
      value: e.target.value,
    };
  }
  handleChangeCheckbox(e) {
    let checkboxInfo = e.target.attributes[6].value;
    checkboxInfo = checkboxInfo ? checkboxInfo.split('&') : '';
    this.checkboxInfo = {
      option_id: checkboxInfo[2],
      product_option_id: checkboxInfo[3],
      product_option_value_id: checkboxInfo[0],
      name: 'Checkbox',
      sub_name: checkboxInfo[1],
    };
  }
  /**
   * @remarks Submit review and rating
   * @author
   * @version 0.1
   */

  submitReviewAndRatings() {
    this.customerId = this.logedCustomerId;
    this.customerName = this.logedUserName;
    const body = {
      review_op_type: 'insert',
      data: {
        author: this.customerName,
        customer_id: this.customerId,
        product_id: 135,
        text: 'Nice',
        rating: 4.5,
        date_added: 'now()',
        status: true,
      },
    };
  }
  onSubmit() {
    this.finalOptionsObject = [
      this.textboxInfo,
      this.radioButtonInfo,
      this.SelectOptionInfo,
      this.textareaInfo,
      this.dateInfo,
      this.checkboxInfo,
    ];
    if (this.textboxInfo === undefined) {
      delete this.finalOptionsObject[0];
    }
    if (this.radioButtonInfo === undefined) {
      delete this.finalOptionsObject[1];
    }
    if (this.SelectOptionInfo === undefined) {
      delete this.finalOptionsObject[2];
    }
    if (this.textareaInfo === undefined) {
      delete this.finalOptionsObject[3];
    }
    if (this.dateInfo === undefined) {
      delete this.finalOptionsObject[4];
    }
    if (this.checkboxInfo === undefined) {
      delete this.finalOptionsObject[5];
    }

    let body: any;
    const formValue = this.subscriptionForm.value;
    const frm_date = this.datePipe.transform(formValue.frmDate, 'yyyy-MM-dd');
    const end_date = this.datePipe.transform(formValue.endDate, 'yyyy-MM-dd');
    let subId;
    this.totalAmnt = this.recurringId > 0 ? this.totalAmnt : 0;
    subId =
      this.subscriptionId === '' ||
        this.subscriptionId === undefined ||
        this.subscriptionId === null
        ? 0
        : this.subscriptionId;
    if (this.subscribeFlag === true) {
      body = {
        product_id: this.productId,
        recurring_id: this.recurringId,
        subscription_id: subId,
        total_amount: this.subscrptnTotalAmt,
        duration: +formValue.cycle,
        quantity: +formValue.qty,
        duration_range: formValue.period,
        from_date: frm_date,
        to_date: end_date,
        total_flag: formValue.priceFlag,
        option: this.finalOptionsObject,
        num_of_delivery: this.numDelivery,
      };
      if (this.logedSeeionId == null) {
        body['login'] = false;
        body['session_id'] = this.guestSessionId;
      } else {
        body['login'] = true;
        (body['session_id'] = this.logedSeeionId),
          (body['customer_id'] = this.logedCustomerId);
      }
    } else {
      body = {
        product_id: this.productId,
        recurring_id: this.recurringId,
        total_amount: this.totalAmnt,
        quantity: this.qty,
        option: this.finalOptionsObject,
      };
      if (this.logedSeeionId == null) {
        body['login'] = false;
        body['session_id'] = this.guestSessionId;
      } else {
        body['login'] = true;
        body['user_name'] = this.logedEmailId;
        body['session_id'] = this.logedSeeionId;
        body['customer_id'] = this.logedCustomerId;
      }
    }
    const success = this.getAddToCartSuccess.bind(this);
    const error = this.onErrorAddToCart.bind(this);
    this.common.http.post('Cart', body, success, error);
  }
  getAddToCartSuccess(data): any {
    this.snack.open(data.msg, 'Ok', { duration: 2000 });
    this.menu.passValue(data.cart_count);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.subscribeFlag = false;
    this.subscriptionForm.reset();
    this.subscriptionSlabs = [];
  }
  onErrorAddToCart(data) {
    this.snack.open(data, 'Ok', { duration: 2000 });
  }
  /* Add to cart ends */

  /**
   * @remarks Buy now api
   * @author  Devi
   * @version 1.0
   */

  buyNow() {
    this.finalOptionsObject = [
      this.textboxInfo,
      this.radioButtonInfo,
      this.SelectOptionInfo,
      this.textareaInfo,
      this.dateInfo,
      this.checkboxInfo,
    ];
    if (this.textboxInfo === undefined) {
      delete this.finalOptionsObject[0];
    }
    if (this.radioButtonInfo === undefined) {
      delete this.finalOptionsObject[1];
    }
    if (this.SelectOptionInfo === undefined) {
      delete this.finalOptionsObject[2];
    }
    if (this.textareaInfo === undefined) {
      delete this.finalOptionsObject[3];
    }
    if (this.dateInfo === undefined) {
      delete this.finalOptionsObject[4];
    }
    if (this.checkboxInfo === undefined) {
      delete this.finalOptionsObject[5];
    }

    let body: any;
    const formValue = this.subscriptionForm.value;
    const frm_date = this.datePipe.transform(formValue.frmDate, 'yyyy-MM-dd');
    const end_date = this.datePipe.transform(formValue.endDate, 'yyyy-MM-dd');
    let subId;
    subId =
      this.subscriptionId === '' ||
        this.subscriptionId === undefined ||
        this.subscriptionId === null
        ? 0
        : this.subscriptionId;
    if (this.subscribeFlag === true) {
      body = {
        product_id: this.productId,
        recurring_id: this.recurringId,
        subscription_id: subId,
        total_amount: this.subscrptnTotalAmt,
        duration: +formValue.cycle,
        quantity: +formValue.qty,
        duration_range: formValue.period,
        from_date: frm_date,
        to_date: end_date,
        total_flag: formValue.priceFlag,
        option: this.finalOptionsObject,
        num_of_delivery: this.numDelivery,
        buy_it_now: true,
      };
      if (this.logedSeeionId == null) {
        body['login'] = false;
        body['session_id'] = this.guestSessionId;
      } else {
        body['login'] = true;
        (body['session_id'] = this.logedSeeionId),
          (body['customer_id'] = this.logedCustomerId);
      }
    } else {
      body = {
        product_id: this.productId,
        recurring_id: this.recurringId,
        total_amount: this.totalAmnt,
        quantity: this.qty,
        option: this.finalOptionsObject,
        buy_it_now: true,
      };
      if (this.logedSeeionId == null) {
        body['login'] = false;
        body['session_id'] = this.guestSessionId;
      } else {
        body['login'] = true;
        body['user_name'] = this.logedEmailId;
        body['session_id'] = this.logedSeeionId;
        body['customer_id'] = this.logedCustomerId;
      }
    }
    this.summary.BuyNow(body).subscribe((data) => {
      if (data.res_status === true) {
        this.menu.passValue(data.cart_count);
        const oderInfo = JSON.stringify(data.data[0]);
        const encoded = encodeURI(oderInfo);
        if (this.logedSeeionId == null) {
          this.router.navigate(['/auth/login'], {
            queryParams: { pageRoute: 'buynow', buynowData: encoded },
          });
        } else {
          this.router.navigate(['/placeorder'], {
            queryParams: {
              couponFlag: false,
              buynowData: encoded,
              buyNowFlag: true,
            },
          });
        }
      } else {
        this.snack.open(data.msg, 'Ok', { duration: 2000 });
      }
    });
  }

  open(content, imageUrl) {
    this.imageInModel = imageUrl;
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  /**
   * @remarks Get Related Products List
   * @author  Devi
   * @version 1.0
   */

  getRelatedProducts(id): any {
    let body;
    if (this.logedSeeionId == null) {
      body = {
        login: false,
        tenant_id: this.tenantId,
        session_id: this.guestSessionId,
        product_id: +id,
        offset: 0,
        limit: 10,
      };
    } else {
      body = {
        login: true,
        tenant_id: this.tenantId,
        user_name: this.logedEmailId,
        session_id: this.logedSeeionId,
        product_id: +id,
        offset: 0,
        limit: 10,
      };
    }
    body = this.common.withoutDataStoreValidation(body);
    this.summaryData.productDetails = Array<ProductDetail>();
    this.summary.getSummaryRelatedProducts(body).subscribe(
      (data) => {
        if (data.res_status === true) {
          data.data.Product_Details.map((item) => {
            const productDataset = new ProductDetail();
            productDataset.categoryId = item.category_id;
            productDataset.description = item.description;
            productDataset.discountPrice = item.discount_price;
            productDataset.offPrice = item.discount_off_price;
            productDataset.averageRating = item.average_rating;
            productDataset.reviewCount = item.review_count;
            productDataset.ratingCount = item.rating_count;
            const imageParse = JSON.parse(item.image);
            if (imageParse.file_data) {
              imageParse.file_data.map((itemImg) => {
                if (itemImg.storage_type === 'db') {
                  productDataset.image =
                    'data:image/png;base64,' + itemImg.media_data;
                } else {
                  productDataset.image = itemImg.media_data;
                }
              });
            } else {
              productDataset.image = imageParse.data;
            }
            productDataset.name = item.name;
            productDataset.price = item.price;
            productDataset.productId = item.product_id;
            productDataset.sortOrder = item.sort_order;
            productDataset.symbolLeft = item.symbol_left;
            productDataset.wishlistflag = item.wishlist_status;
            productDataset.currencyIndicator = item.currency_indicator;
            productDataset.wishlistStatusId = item.wishlist_status_id;
            productDataset.priceType = item.price_type;
            productDataset.symbol = item.type_symbol;
            this.summaryData.productDetails.push(productDataset);
          });
        } else { }
      },
      (err) => { }
    );
  }
  /**
   * @remarks Get Recently Viewd Products List
   * @author  Devi
   * @version 1.0
   */
  getRecentlyViewedProducts() {
    let body;
    if (this.logedSeeionId == null) {
      body = {
        recently_viewed_op_type: 'select',
        login: false,
        session_id: this.guestSessionId,
        tenant_id: this.tenantId,
      };
    } else {
      body = {
        recently_viewed_op_type: 'select',
        login: true,
        tenant_id: this.tenantId,
        user_name: this.logedEmailId,
        session_id: this.logedSeeionId,
      };
    }
    body = this.common.withoutDataStoreValidation(body);
    this.RecentProductData.recentViewDetails = Array<recentlyViewedDetails>();
    this.summary.getRecentProducts(body).subscribe(
      (data) => {
        if (data.res_status === true) {
          data.data.map((item) => {
            const productDataset = new recentlyViewedDetails();
            productDataset.discountPrice = item.discount_price;
            productDataset.offPrice = item.discount_off_price;
            productDataset.averageRating = item.rating;
            productDataset.reviewCount = item.review_count;
            productDataset.wishlistflag = item.wishlist_status;
            productDataset.wishlistStatusId = item.wishlist_status_id;
            productDataset.symbol = item.type_symbol;
            productDataset.priceType = item.price_type;
            const imageParse = JSON.parse(item.image);
            if (imageParse.file_data) {
              imageParse.file_data.map((itemImg) => {
                if (itemImg.storage_type === 'db') {
                  productDataset.image =
                    'data:image/png;base64,' + itemImg.media_data;
                } else {
                  productDataset.image = itemImg.media_data;
                }
              });
            } else {
              productDataset.image = imageParse.data;
            }
            productDataset.name = item.product_name;
            productDataset.price = item.price;
            productDataset.productId = item.product_id;
            productDataset.currencyIndicator = item.currency_indicator;
            this.RecentProductData.recentViewDetails.push(productDataset);
          });
        } else { }
      },
      (err) => { }
    );
  }
  getProductsSuccess(data): any {
    this.productList = data.data;
  }
  addNewFolder(): any {
    this.showwishlistform = false;
    this.showAddFolder = true;
  }
  addFolder(): any {
    let body;
    if (this.logedCustomerId !== null) {
      body = {
        folder_op_type: 'create',
        parent_folder_id: 0,
        tenant_id: this.tenantId,
        login: true,
        folder_name: this.folderName,
        customer_id: this.logedCustomerId,
        session_id: this.logedSeeionId,
      };
    } else {
      body = {
        folder_op_type: 'create',
        parent_folder_id: 0,
        login: false,
        tenant_id: this.tenantId,
        folder_name: this.folderName,
        session_id: this.guestSessionId,
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
  getFolders(): any {
    this.summary.getFolders().subscribe((data) => {
      if (data.res_status === true) {
        this.folders = data.folders_list;
        this.folderList =
          this.folders.length > 0 ? this.folders[0].folder_id : '';
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
  /**
   * @remarks Item Add to WishList
   * @author
   * @version 1.0
   */

  addtoWishlist(totData, index, status): void {
    let body;
    let findIndexValue: any;
    if (status === 'related') {
      const targetId = totData.productId;
      findIndexValue = this.summaryData.productDetails.findIndex(
        (obj) => obj.productId === targetId
      );
    } else if (status === 'mainProduct') {
      const targetId = totData.productId;
      findIndexValue = this.productDetailObj.productDetails.findIndex(
        (obj) => obj.productId === targetId
      );
    } else {
      const targetId = totData.productId;
      findIndexValue = this.RecentProductData.recentViewDetails.findIndex(
        (obj) => obj.productId === targetId
      );
    }
    if (this.logedCustomerId !== null) {
      body = {
        wishlist_op_type: 'add',
        tenant_id: this.tenantId,
        customer_id: this.logedCustomerId,
        product_id: totData.productId,
        folder_id: this.folderList,
        session_id: this.logedSeeionId,
      };
    } else {
      body = {
        wishlist_op_type: 'add',
        product_id: totData.productId,
        folder_id: this.folderList,
        session_id: this.guestSessionId,
      };
    }
    this.summary.addToWishlist(body).subscribe((data) => {
      this.menu.passWishlistValue(data.wishlist_count);
      if (data.res_status === true) {
        this.trigger.closeMenu();
        this.snack.open(data.msg, 'Ok');
        if (status === 'related') {
          this.summaryData.productDetails[findIndexValue].wishlistflag = 0;
        } else if (status === 'mainProduct') {
          this.productWishlistFlag = 0;
          this.productDetailObj.productDetails[findIndexValue].wishlistflag = 0;
        } else {
          this.RecentProductData.recentViewDetails[
            findIndexValue
          ].wishlistflag = 0;
        }
      }
    });
  }
  /**
   * @remarks Item remove from Wishlist
   * @author
   * @version 0.1
   */
  // Item remove from wishlist
  removeWishlist(i, wishlistStatusId, data, status): any {
    let body;
    let findIndexValue: any;
    if (status === 'related') {
      const targetId = data.productId;
      findIndexValue = this.summaryData.productDetails.findIndex(
        (obj) => obj.productId === targetId
      );
    } else if (status === 'mainProduct') {
      const targetId = data.productId;
      findIndexValue = this.productDetailObj.productDetails.findIndex(
        (obj) => obj.productId === targetId
      );
    } else {
      const targetId = data.productId;
      findIndexValue = this.RecentProductData.recentViewDetails.findIndex(
        (obj) => obj.productId === targetId
      );
    }
    if (this.logedCustomerId !== null) {
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
        session_id: this.guestSessionId,
      };
    }
    this.summary.deleteWishlist(body).subscribe((data) => {
      this.menu.passWishlistValue(data.wishlist_count);
      if (data.res_status === true) {
        this.snack.open(data.msg, 'Ok');
        if (status === 'related') {
          this.summaryData.productDetails[findIndexValue].wishlistflag = 1;
        } else if (status === 'mainProduct') {
          this.productWishlistFlag = 1;
          this.productDetailObj.productDetails[findIndexValue].wishlistflag = 1;
        } else {
          this.RecentProductData.recentViewDetails[
            findIndexValue
          ].wishlistflag = 1;
        }
        this.snack.open('Item removed from Wishlist', 'Ok', { duration: 3000 });
      }
    });
  }

  getProductsFromRelated(pid) {
    this.router.navigate(['/productDetail', pid]);
    this.getProducts(pid);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.tabIndex = 0;
  }
  /**
   * @remarks Share the item
   * @author  Devi
   * @version 0.1
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
                type: 'product',
                type_related_id: parseInt(this.productId),
                created_by: this.logedEmailId,
                tenant_id: this.tenantId,
                type_related_name: 'product',
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
   * @remarks Copy the data
   * @author
   * @version 0.1
   */

  copyText(textToCopy: string) {
    this.clipboard.copy(textToCopy);
    this.snack.open('Copied', 'ok', { duration: 3000 });
  }

  prodSubscribe() {
    this.dialog.open(this.SubDetails, {
      position: { left: '20%' },
      width: '45%',
    });
  }

  getErrorMessage() {
    return 'You must enter a value';
  }

  submitSubscription() {
    const formValue = this.subscriptionForm.value;
    this.subscriptionSlabs = [];
    let body;
    const url = sessionStorage.getItem('affiliateUrl');
    this.errorMsg = '';
    const frm_date = this.datePipe.transform(formValue.frmDate, 'dd-MM-yyyy');
    const end_date = this.datePipe.transform(formValue.endDate, 'dd-MM-yyyy');
    this.spinner.show();
    if (this.logedSeeionId == null) {
      body = {
        product_id: parseInt(this.productId),
        login: false,
        session_id: this.guestSessionId,
        cycle: parseInt(formValue.cycle),
        quantity: parseInt(formValue.qty),
        period: formValue.period,
        from_date: frm_date,
        to_date: end_date,
        tenant_id: this.tenantId,
        api_name: 'ProductDetailsUI',
      };
      body = this.common.withoutDataStoreValidation(body);
    } else {
      body = {
        product_id: parseInt(this.productId),
        login: true,
        session_id: this.logedSeeionId,
        user_name: this.logedEmailId,
        cycle: parseInt(formValue.cycle),
        quantity: parseInt(formValue.qty),
        period: formValue.period,
        from_date: frm_date,
        to_date: end_date,
        tenant_id: this.tenantId,
        api_name: 'ProductDetailsUI',
      };
      body = this.common.withoutDataStoreValidation(body);
    }
    body = this.common.referenceIdValidation(body);
    if (this.subscriptionForm.invalid) {
      this.spinner.hide();
      this.errorMsg = 'Please fill all required fields';
    } else if (formValue.cycle === 0 || formValue.qty === 0) {
      this.spinner.hide();
      this.errorMsg = 'Please enter valid value';
    } else {
      const success = this.onSubscribeSuccess.bind(this);
      const error = this.onSubscribeError.bind(this);
      this.common.http.post('ProductDetailsUI', body, success, error);
    }
  }
  onSubscribeSuccess(data) {
    this.spinner.hide();
    if (data.status_code === 200 || data.res_status === true) {
      this.subscriptionSlabs = data.data.subscription_slabs;
      this.subscribePriceFlag = true;
      this.subscriptionId = this.subscriptionSlabs[0].subscription_id;
      this.subscrptnTotalAmt = this.subscriptionSlabs[0].sub_total;
      this.subObj = data.data.user_sub_plan;
      this.numDelivery = this.subscriptionSlabs[0].no_of_sub;
      this.discountFlag = this.subscriptionSlabs[0].apply_discount;
      if (this.discountFlag === 0 && this.subscribeFlag === true) {
        this.priceDiscountFlag = true;
      } else {
        this.priceDiscountFlag = false;
      }
    } else {
      this.errorMsg = data.msg;
    }
  }

  onSubscribeError(error) { }

  radioSelect(data) {
    this.dialog.open(this.CategoryDetails, {
      position: { left: '10%' },
      width: '70%',
    });
    if (data === 'subscribe') {
      this.subscribeFlag = true;
    } else {
      this.subscribeFlag = false;
    }
  }

  subScribeChart() {
    this.dialog.open(this.ChartDetails, {
      position: { left: '15%' },
      width: '100%',
    });
  }

  back(catId, name) {
    this.router.navigate(['/product', catId, name]);
  }

  radioClk(e) {
    this.dialog.closeAll();
  }

  closeeve() {
    this.dialog.closeAll();
    this.subscribeFlag = false;
  }

  /**
   * @remarks input text numbers validation
   * * @author  ramana
   * @version 0.1
   */
  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  /**
   * @remarks Pincode avalibility check
   * @author  Ramana
   * @version 1.0
   */

  pincodeClk() {
    this.spinner.show();
    if (
      this.shipPinCode === null ||
      this.shipPinCode === undefined ||
      this.shipPinCode === ''
    ) {
      this.spinner.hide();
      this.snack.open("Pincode can't be empty", 'OK', { duration: 5000 });
    } else if (this.shipPinCode.length <= 5) {
      this.spinner.hide();
      this.snack.open('Pincode should be minimum 6 digits', 'OK', {
        duration: 5000,
      });
    } else {
      let body = {
        delivery_dates_op_type: 'select',
        zip_code: this.shipPinCode,
      };
      const success = this.pincodeOnSuccess.bind(this);
      const error = this.pincodeonError.bind(this);
      this.common.http.post('DeliveryDates', body, success, error);
    }
  }
  pincodeOnSuccess(data) {
    this.pincodeFlag = true;
    this.spinner.hide();
    const pindeliArray = data?.data?.[0];
    if (data?.res_status === true) {
      this.deliveryStatus = pindeliArray.est_delivery_date;
    } else {
      this.deliveryStatus = data?.msg;
    }
  }
  pincodeonError(data) {
    this.pincodeFlag = true;
  }

  scroll() {
    setTimeout(() => {
      this.prodetailSDiv.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }, 500 - 50);
  }

  onTabChanged(event) {
    this.tabIndex = event;
  }

  showText() {
    this.isReadMore = !this.isReadMore;
  }

  public scrollBottom(): void {
    this.multiImgContent.nativeElement.scrollTo({
      top: this.multiImgContent.nativeElement.scrollBottom + 550,
      behavior: 'smooth',
    });
  }

  public scrollTop(): void {
    this.multiImgContent.nativeElement.scrollTo({
      top: this.multiImgContent.nativeElement.scrollTop - 550,
      behavior: 'smooth',
    });
  }

  getTenantAddress() {
    this.orgName = this.tenantDataService.orgName;
  }

  /**
   * @remarks Zoom image and show it on dialog on mouseover 
   * @author
   * @version 0.1
   */

  zoomImage(event: MouseEvent): void {
    const image: any = document.getElementById('image');
    const lens: any = document.getElementById('lens');
    const magnifier = this.magnifier.nativeElement;
    if (image && magnifier) {
      const scale = 6;
      const offsetX = event.offsetX;
      const offsetY = event.offsetY;
      magnifier.style.backgroundImage = `url(${image.src})`;
      magnifier.style.backgroundSize = `${image.width * scale}px ${image.height * scale
        }px`;
      const bgPosX = -offsetX * scale + magnifier.offsetWidth / 6;
      const bgPosY = -offsetY * scale + magnifier.offsetHeight / 6;
      const lensX = offsetX - lens.offsetWidth / 6;
      const lensY = offsetY - lens.offsetHeight / 6;
      lens.style.display = 'block';
      lens.style.left = `${lensX}px`;
      lens.style.top = `${lensY}px`;
      magnifier.style.backgroundPosition = `${bgPosX}px ${bgPosY}px`;
      magnifier.style.display = 'block';
    }
  }

  /**
    * @remarks Hide the lens and dialog when mouseout  
    * @author
    * @version 0.1
    */

  hideMagnifier(): void {
    const lens: any = document.getElementById('lens');
    const magnifier = this.magnifier.nativeElement;
    if (magnifier) {
      magnifier.style.display = 'none';
      lens.style.display = 'none';
    }
  }
}
