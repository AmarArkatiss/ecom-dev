import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CommonService } from 'src/app/helper/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { CartService } from './service/cart.service';
import { cartModalData, productData, cartProductData, relatedProductData, suggestionProductData } from './modal/cart-modal';
import { ProductDetail, SummaryData } from '../product-summary/modal/summary-modal';
import { MatMenuTrigger } from '@angular/material/menu';
import { SummaryService } from '../product-summary/service/summary.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuService } from 'src/app/layout/service/menu.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog, } from '@angular/material/dialog';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  @ViewChild('couponDetails') CouponDetails: TemplateRef<any>;

  myCart: any[] = [];
  cartData = [];
  itemimage;
  imgurl;
  couponFlag;
  couponRes;
  totalPrice: number;
  totaldummyPrice: number;
  jsonCartData;
  totCartCount;
  cartModal: cartModalData = new cartModalData();
  relatedProd: cartProductData = new cartProductData();
  suggetionProd: cartProductData = new cartProductData();
  showwishlistform = true;
  showAddFolder = false;
  parentName: any;
  productSummary;
  wishfolders = [{ folder: 'Default' }];
  folderName;
  folderList;
  folders = [];
  foldervisible = false;
  formhide = true;
  disableminus = true;
  cartIDForDelete: any;
  noCarts = false;
  noRelatedItems = false;
  shippingRate: any;
  countryInfo: [];
  regionInfo: [];
  taxesInfo: any;
  noTaxes: boolean;
  taxLabel: boolean;
  productIdArray = [];
  nosuggetionItems;
  logedSeeionId;
  logedCustomerId;
  logedEmailId;
  productCouponsArray: [];
  logedUserName;
  productIdsArray: [];
  couponsaddress = [];
  selectedindex;
  couponPromoCode;
  totalSavePrice: number;
  gcoupresString;
  coupontag = false;
  currencyId;
  currencyIndicator: string;
  storeId;
  productclipcoupId;
  guestSessionId;
  tenantId;
  summaryData: SummaryData = new SummaryData();
  optionTypeList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
  timedOutCloser: any;
  totalTax: any;
  totalCartPrice: any;
  totalDiscount: any;
  couponDiscount: any;
  couponMsg: string;
  panelOpenState = false;
  constructor(private common: CommonService, private cookieService: CookieService, private shared: SharedService, private cart: CartService,
    private summary: SummaryService, private snack: MatSnackBar, private spinner: NgxSpinnerService, readonly dialog: MatDialog,
    private menu: MenuService, private route: ActivatedRoute, private router: Router, private http: HttpClient) {
    this.imgurl = environment.imageURL;
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.couponFlag = false;
    this.route.queryParams.subscribe(params => {
      this.productclipcoupId = params.UserClipCoupId;
      this.couponPromoCode = params.UserClipCoupId
    })
    if (this.couponPromoCode) {
      this.coupontag = true;
      this.couponFlag = true;
      this.applyCouponClks();
    }
    this.logedSeeionId = sessionStorage.getItem('sessionId');
    this.logedCustomerId = sessionStorage.getItem('customerId');
    this.logedEmailId = sessionStorage.getItem('userEmail');
    this.logedUserName = sessionStorage.getItem('userdata');
    this.currencyId = sessionStorage.getItem('currencyId');
    this.storeId = sessionStorage.getItem('StoreId');
    this.guestSessionId = this.cookieService.get('GuestSessionIDdata');
    this.tenantId = sessionStorage.getItem('tenantId');
    this.viewCart();
    this.relatedProducts();
    this.suggestionProducts();
    this.getFolders();
    this.handleGetCountries();
    this.common.drpdwnShowOrHideEvent
      .subscribe((data: any) => {
      });
    this.common.aClickedEvent
      .subscribe((data: any) => {
        this.storeId = sessionStorage.getItem('StoreId')
        this.viewCart();
        this.getProductCoupons();
      });
    this.common.currencyClickedEvent
      .subscribe((data: any) => {
        this.currencyId = sessionStorage.getItem('currencyId')
        this.viewCart();
        this.getProductCoupons();
      });
  }

  /**
   * @remarks view cart product list
   * @AddedBy  Amar
   * @ModifiedBy Devi added store validations & changed the payloads
   * @version 1.0
  */
  viewCart(): any {
    this.spinner.show();
    let body;
    if (this.logedSeeionId == null) {
      body = {
        preview_op_type: "view_cart",
        login: false,
        session_id: this.guestSessionId,
        tenant_id: this.tenantId,
        voucher_applied: false
      }
      body = this.common.storeValidationWithCoupon(body, this.couponFlag, this.couponRes)
    } else {
      body = {
        preview_op_type: "view_cart",
        login: true,
        session_id: this.logedSeeionId,
        customer_id: this.logedCustomerId,
        user_name: this.logedEmailId,
        tenant_id: this.tenantId,
        voucher_applied: false
      }
      body = this.common.storeValidationWithCoupon(body, this.couponFlag, this.couponRes)
    }
    body = this.common.referenceIdValidation(body)
    this.cartModal.productData = Array<productData>();
    this.cart.getCartProducts(body).subscribe((data) => {
      this.spinner.hide();
      this.cartModal.productData = [];
      this.menu.passValue(data.Data.cart_count)
      if (this.cartModal.productData.length === 0) {
        this.noCarts = true;
      }
      if (data.Data.cart_count == 0) {
        this.noCarts = true;
      }
      if (data.res_status === true) {
        this.noCarts = false;
        if (data.Data.tax_names !== undefined) {
          if (data.Data.tax_names.res_status === false) {
            this.noTaxes = true;
          }
          else {
            this.noTaxes = false;
            this.taxesInfo = data.Data.tax_names;
            this.taxLabel = true;
          }
        }
        const resp = data.Data.cart_details;
        resp.map((item) => {
          const dataset = new productData();
          dataset.cartId = item.cart_id;
          dataset.customerId = item.customer_id;
          dataset.productId = item.product_id;
          dataset.productName = item.product_name;
          dataset.quantity = item.quantity;
          dataset.rate = item.rate;
          dataset.recurringId = item.recurring_id;
          dataset.recurringPaymentFrequency = item.recurring_payment_frequency;
          dataset.recurringName = item.recurring_name;
          dataset.subscriptionToDate = item.subscription_to_date;
          dataset.subscriptionFromDate = item.subscription_from_date;
          dataset.cycle = item.subscription_cycle;
          dataset.period = item.subscription_period;
          dataset.finalAmount = item.recurring_subs_total_price;
          dataset.totalPrice = item.recurring_sub_price;
          dataset.totalTax = item.recurring_sub_total_tax;
          dataset.subTotal = item.sub_total;
          dataset.couponAfterprice = item.unit_price_after_coupon;
          dataset.taxAmount = item.tax;
          dataset.netAmount = item.unit_price;
          dataset.taxName = item.org_price;
          dataset.wishlistStatus = item.wishlist_status;
          dataset.wishlistStatusId = item.wishlist_status_id;
          dataset.currencyIndicator = item.currency_indicator;
          dataset.totalFlag = item.total_flag;
          dataset.numOfDeliveries = item.num_of_delivery;
          dataset.PriceAfterCoupon = item.price_after_coupon;
          dataset.inadequateQty = item.inadequate_qty
          const imageParse = JSON.parse(item.image);
          if (imageParse.file_data) {
            imageParse.file_data.map((itemImg => {
              dataset.image = itemImg.media_data;
            }));
          }
          else {
            dataset.image = imageParse.data;
          }
          dataset.price = item.price;
          dataset.discountPrice = item.discount_price;
          dataset.offPrice = item.discount_off_price;
          dataset.subscriptionDiscount = item.discount
          dataset.subscriptionTotal = item.subscription_total
          dataset.model = item.model;
          dataset.option = item.option;
          dataset.prodEstTime = item.delivery_est;
          this.cartModal.productData.push(dataset);
        });
        this.productIdArray = [];
        this.cartModal.productData.map((item) => {
          this.productIdArray.push(item.productId);
        });
        this.totalSavePrice = data.Data.saved_price;
        this.totalPrice = data.Data.total;
        this.couponMsg = data.Data.coupon_msg;
        this.totCartCount = data.Data.cart_count;
        this.myCart = data.Data.cart_details;
        this.currencyIndicator = data.Data.currency_indicator;
        this.shippingRate = data.Data.shipping_rate;
        this.currencyIndicator = data.Data.currency_indicator;
        this.totalTax = data.Data.total_tax;
        this.totalCartPrice = data.Data.total_cart_price
        this.totalDiscount = data.Data.total_discount_price
        this.couponDiscount = data.Data.coupon_discount;
        this.getProductCoupons();
        this.suggestionProducts();
        this.relatedProducts();
      }
      else {
        this.noCarts = true;
      }
    });
  }

  onError(data): any { }
  /**
   * @remarks StoreValidation
   * @author  Devi
   * @version 1.0
   */
  storeValidation(body) {
    const storeId = sessionStorage.getItem('StoreId');
    if (this.storeId == null || this.storeId === 'all') {
      if (this.currencyId == null) {
        if (this.coupontag === false) {
          body['coupon_applied'] = false
          return body;
        } else {
          body['coupon_applied'] = true
          body['coupon_details'] = this.couponRes
          return body;
        }
      } else {
        if (this.coupontag === false) {
          body['currency_id'] = parseInt(this.currencyId);
          body['coupon_applied'] = false
          return body;
        } else {
          body['currency_id'] = parseInt(this.currencyId);
          body['coupon_applied'] = true
          body['coupon_details'] = this.couponRes
          return body;
        }
      }
    } else {
      if (this.currencyId == null) {
        if (this.coupontag === false) {
          body['coupon_applied'] = false
          body['store_id'] = this.storeId;
          return body;
        } else {
          body['store_id'] = this.storeId;
          body['coupon_applied'] = true
          body['coupon_details'] = this.couponRes
          return body;
        }
      } else {
        if (this.coupontag === false) {
          body['currency_id'] = parseInt(this.currencyId);
          body['store_currency_flag'] = 1
          body['coupon_applied'] = false
          body['store_id'] = this.storeId;
          return body;
        } else {
          body['currency_id'] = parseInt(this.currencyId);
          body['store_currency_flag'] = 1
          body['store_id'] = this.storeId;
          body['coupon_applied'] = true
          body['coupon_details'] = this.couponRes
          return body;
        }
      }
    }
  }

  /**
   * @remarks Change Cart Quantity
   * @author  Devi
   * @version 1.0
  */
  minus(data): any {
    if (data.quantity == 1) {
      this.snack.open('No action found', 'Ok', { duration: 1000 });
    }
    else if (data.quantity == 0) {
      this.itemDelete(data.cartId);
    }
    else {
      const body = { preview_op_type: "update", cart_id: data.cartId, quantity: +data.quantity - 1 };
      const success = this.ViewCartqtySuccessIncrementOrDecrement.bind(this);
      const error = this.onError.bind(this);
      this.common.http.post('Preview', body, success, error);
    }
  }

  /**
   * @remarks Change Cart Quantity
   * @author  Devi
   * @version 1.0
  */

  plus(event, data): any {
    let body;
    if (this.logedCustomerId !== null) {
      body = { preview_op_type: "update", cart_id: data.cartId, quantity: +event, session_id: this.logedSeeionId, "login": true, customer_id: this.logedCustomerId };
    } else {
      body = { preview_op_type: "update", cart_id: data.cartId, quantity: +event, session_id: this.guestSessionId, login: false, };
    }
    const success = this.ViewCartqtySuccessIncrementOrDecrement.bind(this);
    const error = this.onError.bind(this);
    this.common.http.post('Preview', body, success, error);
  }
  ViewCartqtySuccessIncrementOrDecrement(data): any {
    this.menu.passValue(this.totCartCount);
    this.viewCart();
    this.snack.open(data.msg, "OK", { duration: 5000 })
    const msg = data.msg;
  }
  ViewCartqtySuccess(data): any {
    this.menu.passValue(data.cart_count);
    this.viewCart();
    this.relatedProducts();
    const msg = data.msg;
  }

  //Item delete from Cart menu
  /**
   * @remarks Item Delete From Cart 
   * @author  Devi
   * @version 1.0
   */
  itemDelete(id): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success btn-sm',
        cancelButton: 'btn btn-default btn-sm'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      text: 'Are you sure want to delete the item from the cart',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: '#ff7f27',
      cancelButtonText: 'No',
      width: '400px',

    }).then((result) => {
      if (result.value) {
        let body;
        if (this.logedCustomerId === null && this.logedCustomerId === undefined) {
          body = { preview_op_type: "delete", cart_id: id, session_id: this.guestSessionId };
        } else {
          body = { preview_op_type: "delete", cart_id: id, session_id: this.logedSeeionId };
        }
        const success = this.ViewCartqtySuccess.bind(this);
        const error = this.onError.bind(this);
        this.common.http.post('Preview', body, success, error);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

  addNewFolder(): any {
    this.showwishlistform = false;
    this.showAddFolder = true;
  }
  /**
           * @remarks Add Folder
           * @author  
           * @version 1.0
           */
  addFolder(): any {
    let body;
    if (this.logedCustomerId !== null) {
      body = { folder_op_type: 'create', parent_folder_id: 0, folder_name: this.folderName, customer_id: this.logedCustomerId, session_id: this.logedSeeionId, login: true, tenant_id: this.tenantId };
    } else {
      body = { folder_op_type: 'create', parent_folder_id: 0, folder_name: this.folderName, session_id: this.guestSessionId, login: false, tenant_id: this.tenantId, };
    }
    this.summary.addFolders(body).subscribe((data) => {
      this.snack.open(data.msg, "OK", { duration: 1000 });
      if (data.res_status === true) {
        this.foldervisible = false;
        this.formhide = true;
        this.getFolders();
      }
    });
    this.folderName = '';
  }
  /**
           * @remarks Get Folders List
           * @author  Devi
           * @version 1.0
           */
  getFolders(): any {
    this.summary.getFolders().subscribe((data) => {
      if (data.res_status === true) {
        this.folders = data.folders_list;
        this.folderList = this.folders.length > 0 ? this.folders[0].folder_id : ''
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
  // Item add to WishList
  /**
           * @remarks Item Add to WishList
           * @param index , ProductId
           * @author  Devi
           * @version 1.0
           */
  addtoWishlist(totData, index): void {
    this.cartIDForDelete = totData.cartId;
    let body;
    if (this.logedCustomerId !== null) {
      body = {
        wishlist_op_type: 'add', customer_id: this.logedCustomerId, tenant_id: this.tenantId, session_id: this.logedSeeionId,

        product_id: totData.productId, folder_id: this.folderList
      };
    } else {
      body = {
        wishlist_op_type: 'add', tenant_id: this.tenantId, session_id: this.guestSessionId,
        product_id: totData.productId, folder_id: this.folderList
      };
    }
    this.summary.addToWishlist(body).subscribe((data) => {
      this.menu.passWishlistValue(data.wishlist_count)
      if (data.res_status === true) {
        this.trigger.closeMenu();
        this.cartModal.productData[index].wishlistStatus = 0;
        this.viewCart();
      }
    });
  }
  // Item remove from WishList
  /**
   * @remarks remove Item from wishList
   * @param index , WishListstatusId 
   * @author  Devi
   * @version 1.0
  */
  removeWishlist(wishlistStatusId, i): any {
    let body;
    if (this.logedCustomerId !== null) {
      body = { wishlist_op_type: 'delete', wishlist_id: wishlistStatusId, tenant_id: this.tenantId, session_id: this.logedSeeionId, customer_id: this.logedCustomerId };
    } else {
      body = { wishlist_op_type: 'delete', wishlist_id: wishlistStatusId, tenant_id: this.tenantId, session_id: this.guestSessionId };
    }
    this.summary.deleteWishlist(body).subscribe((data) => {
      this.menu.passWishlistValue(data.wishlist_count)
      if (data.res_status === true) {
        this.snack.open(data.msg, 'Ok');
        this.cartModal.productData[i].wishlistStatus = 1;
      }
    });
  }
  /**
   * @remarks Related Products List
   * @author  Devi
   * @version 1.0
  */
  relatedProducts(): any {
    let body;
    if (this.logedSeeionId !== null) {
      body = {
        login: true, session_id: this.logedSeeionId, product_id: this.productIdArray, tenant_id: this.tenantId, user_name: this.logedEmailId, op_type: true, offset: 0, limit: 10
      };
    }
    else {
      body = {
        login: false, session_id: this.guestSessionId, product_id: this.productIdArray, tenant_id: this.tenantId, op_type: true, offset: 0, limit: 10
      };
    }
    body = this.common.storeValidationWithCoupon(body, this.couponFlag, this.couponRes)
    this.relatedProd.relatedProductDataCart = Array<relatedProductData>();
    this.cart.getCartRelatedProducts(body).subscribe((data) => {
      if (data.res_status === true) {
        this.noRelatedItems = false;
        const resp = data.data.Product_Details;
        resp.map((item) => {
          const dataset = new relatedProductData();
          dataset.productId = item.product_id;
          dataset.productName = item.name;
          dataset.prodDescription = item.description;
          dataset.price = item.price;
          dataset.currencyIndicator = item.currency_indicator;
          dataset.discountPrice = item.discount_price;
          dataset.discountOffPrice = item.discount_off_price;
          dataset.recurringStatus = item.recurring_status;
          dataset.averageRating = item.average_rating;
          dataset.reviewCount = item.review_count;
          dataset.ratingCount = item.rating_count;
          dataset.wishlistStatus = item.wishlist_status;
          dataset.wishlistStatusId = item.wishlist_status_id;
          const imageParse = JSON.parse(item.image);
          if (imageParse.file_data) {
            imageParse.file_data.map((itemImg => {
              dataset.image = itemImg.media_data;
            }));
          }
          else {
            dataset.image = imageParse.data;
          }
          this.relatedProd.relatedProductDataCart.push(dataset);
        });
      }
      else {
        this.noRelatedItems = true;
      }
    });
    const success = this.ViewRelatedProductsSuccess.bind(this);
    const error = this.onErrorRelatedProducts.bind(this);
    this.common.http.post('RelatedProductDetailsList', body, success, error);
  }
  ViewRelatedProductsSuccess(data): any { }
  onErrorRelatedProducts(data): any {
  }
  getProductsFromRelated(pid) {
    this.router.navigate(['/productDetail', pid]);
  }

  /* Country dropdown */
  /**
           * @remarks Get Countries List
           * @author  Devi
           * @version 1.0
           */
  handleGetCountries(): any {
    const body = {
      ordersdropdowns_op_type: "countries_dropdown"
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
           * @remarks Get Region based on countries
           * @param country_id used for region list based on country
           * @author  Devi
           * @version 1.0
           */
  handleGetRegionByCountry(country_id) {
    const body = {
      ordersdropdowns_op_type: "zone_dropdown", country_id: country_id
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

  handleGetQuotes(countryName, regionName) {
    let body;
    if (countryName === "0") {
      this.snack.open('Please select Country', 'ok', { duration: 2000 });
    }
    else if (regionName === "0") {
      this.snack.open('Please select Region', 'ok', { duration: 2000 });
    }
    else {
      if (this.logedCustomerId !== null) {
        body = {
          preview_op_type: "view_cart", user_name: this.logedEmailId, coupon_applied: false,
          voucher_applied: false, tenant_id: this.tenantId,
          login: true, session_id: this.logedSeeionId, shipping_country_id: countryName, shipping_zone_id: regionName
        };
      }
      else {
        body = {
          preview_op_type: "view_cart",
          login: false,
          session_id: this.guestSessionId,
          shipping_country_id: countryName,
          shipping_zone_id: regionName,
          coupon_applied: false,
          tenant_id: this.tenantId,
          voucher_applied: false
        };
      }
      body = this.common.storeValidationWithCoupon(body, this.couponFlag, this.couponRes)
      body = this.common.referenceIdValidation(body)
      const success = this.handleGetTaxDetailsSuccess.bind(this);
      const error = this.onErrorTaxDetails.bind(this);
      this.common.http.post('Preview', body, success, error);
    }
  }
  handleGetTaxDetailsSuccess(data): any {
    if (data.Data.tax_names.res_status === false) {
      this.noTaxes = true;
      this.taxLabel = false;
    }
    else {
      this.noTaxes = false;
      this.taxesInfo = data.Data.tax_names;
      this.taxLabel = false;
    }
  }
  onErrorTaxDetails(error): any {
    this.snack.open(error, 'ok', { duration: 3000 });
  }
  /**
   * @remarks Get product Coupons List
   * @AddedBy  Ramana.majeti
   * @ModifiedBy Devi added store validations & changed the payloads
   * @version 1.0
   */
  getProductCoupons() {
    let body = {
      "coupon_op_type": "view", "limit": 100, "offset": 0, "product_id": this.productIdArray,
      "category_id": "all", tenant_id: this.tenantId
    };
    body = this.common.withoutDataStoreValidation(body);
    const success = this.CouponsOnSuccess.bind(this);
    const error = this.CouponsonError.bind(this);
    this.common.http.post('CouponsUi', body, success, error);

  }
  CouponsOnSuccess(data) {
    this.productCouponsArray = data.data;
  }
  CouponsonError() { }
  /**
          * @remarks Select Coupon Promo Code
          * @param selected promocode  and index
          * @author  Ramana.majeti
          * @version 1.0
          */
  selectedAddress(codea, idxc) {
    this.selectedindex = idxc;
    this.couponPromoCode = codea;
    this.applyCouponClks()
  }
  /**
  * @remarks Apply coupon Code Action Click
  * @author  Ramana.majeti
  * @version 1.0
  */

  applyCouponClks() {
    let body;
    if (this.couponPromoCode === null || this.couponPromoCode === undefined || this.couponPromoCode == '') {
      this.snack.open('Please Enter Valid Coupon', 'Ok', { duration: 5000 });
    } else {
      body = { "coupon_op_type": "select", "coupon_code": [this.couponPromoCode] };
      const success = this.ApplyCouponsOnSuccess.bind(this);
      const error = this.ApplyCouponsonError.bind(this);
      this.common.http.post('CouponsUi', body, success, error);
    }
  }
  ApplyCouponsOnSuccess(data) {
    if (data.res_status === true) {
      this.couponFlag = true;
      this.couponRes = data.data;
      this.coupontag = true;
      this.dialog.closeAll()
      this.selectedindex = this.selectedindex;
      this.viewCart();
    } else {
      this.snack.open(data.msg, 'Ok', { duration: 5000 });
    }
  }
  ApplyCouponsonError(data) { }
  removeCoupon() {
    this.couponPromoCode = '';
    this.coupontag = false;
    this.couponFlag = false;
    this.dialog.closeAll()
    this.viewCart()
  }
  viewCart2() {
    const body1 = {
      preview_op_type: "view_cart", user_name: this.logedEmailId, currency_id: 4,
      login: true, customer_id: this.logedCustomerId, session_id: this.logedSeeionId, "voucher_applied": false,
      shipping_country_id: 99, shipping_zone_id: 1476, store_id: 5, ref_id: 0, tenant_id: this.tenantId, tracking_id: '', "coupon_applied": true, "coupon_details": this.couponRes
    };
    const success = this.ViewsaaCartSuccess.bind(this);
    const error = this.viewcarttonError.bind(this);
    this.common.http.post('Preview', body1, success, error);
  }
  ViewsaaCartSuccess(data) {
    const resp = data.Data.cart_details;
    this.gcoupresString = resp.coupon_discount;
  }
  viewcarttonError(data) { }
  /**
         * @remarks placeorder Click
         * @author  
         * @version 1.0
         */

  placeOrderClk() {
    if (this.logedSeeionId === null) {
      this.router.navigate(['/auth/login'], { queryParams: { pageRoute: 'cart' } });
    }
    else {
      if (this.couponRes === undefined || this.couponRes === null) {
        this.router.navigate(['/placeorder'], { queryParams: { couponFlag: false } });
      } else {
        const oderInfo = JSON.stringify(this.couponRes[0]);
        const encoded = encodeURI(oderInfo);
        this.router.navigate(['/placeorder'], { queryParams: { couponFlag: true, couponRes: encoded } });
      }
    }
  }

  /**
   * @remarks Get Suggestion Products based on cart products
   * @author  
   * @version 1.0
  */
  suggestionProducts(): any {
    let body;
    if (this.logedCustomerId !== null) {
      body = {
        "customer_id": this.logedCustomerId, "product_id": this.productIdArray, "coupon_applied": false,
        "tenant_id": this.tenantId, "limit": 4
      };
    }
    else {
      body = {
        "product_id": this.productIdArray, "coupon_applied": false,
        "tenant_id": this.tenantId, "limit": 4
      };
    }
    this.suggetionProd.suggestionProductDataCart = Array<suggestionProductData>();
    body = this.common.storeValidationWithCoupon(body, this.couponFlag, this.couponRes)
    this.cart.getCartSuggetionProducts(body).subscribe((data) => {
      if (data.res_status === true) {
        this.nosuggetionItems = false;
        const resp = data.data;
        resp.map((item) => {
          const dataset = new suggestionProductData();
          dataset.productId = item.product_id;
          dataset.productName = item.name;
          dataset.prodDescription = item.description;
          dataset.price = item.org_price;
          dataset.currencyIndicator = item.currency_indicator;
          dataset.discountPrice = item.discount_price;
          dataset.discountOffPrice = item.discount_off_price;
          dataset.averageRating = item.average_rating;
          dataset.reviewCount = item.review_count;
          dataset.ratingCount = item.rating_count;
          const imageParse = JSON.parse(item.image);
          if (imageParse.file_data) {
            imageParse.file_data.map((itemImg => {
              dataset.image = itemImg.media_data;
            }));
          }
          else {
            dataset.image = imageParse.data;
          }
          this.suggetionProd.suggestionProductDataCart.push(dataset);
        });
      }
      else {
        this.nosuggetionItems = true;
      }
    });
  }

  viewCoupon() {
    if (this.logedSeeionId === null || this.logedSeeionId === undefined) {
      this.router.navigate(['/auth/login'], { queryParams: { pageRoute: 'cart' } });
    } else {
      this.dialog.open(this.CouponDetails, { position: { left: '35%' }, width: '572px', height: '567px' });
    }
  }
  mouseEnter(trigger) {
    if (this.timedOutCloser) {
      clearTimeout(this.timedOutCloser);
    }
    trigger.openMenu();
  }
  mouseLeave(trigger) {
    this.timedOutCloser = setTimeout(() => {
      trigger.closeMenu();
    }, 500);
  }
}
