import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PlaceOrderService } from './services/place-order.service';
import { MatDialog } from '@angular/material/dialog';
import { SharedService } from '../services/shared.service';
import { PlaceOrderObject, CartDataForplaceOrder, GetDeliveryAddrDetails } from './model/place-order-model';
import { CommonService } from '../../helper/common.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { MenuService } from 'src/app/layout/service/menu.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatVerticalStepper } from '@angular/material/stepper';
import 'sweetalert2/src/sweetalert2.scss';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/helper/auth.service';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent implements OnInit {
  addressDetails: any;
  expressCharge: any;
  standardCharge: any;
  constructor(private ps: PlaceOrderService, private cookieService: CookieService, public dialog: MatDialog, private common: CommonService,
    private shared: SharedService, private http: HttpClient, private snack: MatSnackBar,
    private menu: MenuService, private router: Router, private activatedRoute: ActivatedRoute, private spinner: NgxSpinnerService, public formBuilder: FormBuilder, public auth: AuthService) {
    this.imgurl = environment.imageURL;
  }
  @ViewChild(MatVerticalStepper) stepper: MatVerticalStepper;
  @ViewChild('addressDiv', { read: ElementRef }) public addressDiv: ElementRef<any>;

  imgurl: any;
  addString: number;
  paymentMethods: any[] = [];
  paymentOption: 3;
  isLinear = false;
  unitId = '711163107';
  orderDetails: any;
  deladdress: any;
  myCart: any;
  vocherFlag: any;
  disabled = false;
  disabledp = false;
  cartData = [];
  totalPrice: number;
  totaldummyPrice: number;
  paymentIDForPay: any;
  selectedState: any = null;
  productMainImage: any;
  selectedAddressForDelivery;
  estimatedDeliveryDtls;
  deliveryCharges;
  orderedProductEntireDetails: any;
  selectedDeliveryMode;
  deliveryMode;
  taxDetails;
  detailsForConfirmOrder;
  countryInfo;
  logedSeeionId;
  logedCustomerId;
  logedEmailId;
  logedUserName;
  regionInfo;
  newaddressform;
  resultOfDeliveryModeSuccess;
  noAddressFoundFlag;
  // ---------new----
  shippAdd = true;
  newAddForm = false;
  ordersummChangeDiv = false;
  orderexpandDiv = false;
  orderConfirmFlag = false
  paymentFlag = false;
  proceedFlag = false;
  inactiveSummary = false;
  addressShipView = false
  // --------------
  shippD;
  paymentexpandDiv;
  resultOfAddressInsertSuccess;
  logedPhone;
  signupForm: FormGroup;
  guestSessionId;
  summaryData;
  totoal;
  voucherArray: any[];
  safeDiv = false;
  AddNAddrk = true;
  changeaddClk = false;
  aa = true;
  does = false;
  lenth16more = false;
  cvverror = false;
  options;
  confrmOrderFlag = false;
  amountcurrency;
  floatNuumber;
  raziid;
  selectedDelivery = [];
  stripeFlag = false;
  paypalFlag = false;
  razorFlag = false;
  codFlag = false

  states: any[] = [
    { name: 'Arizona', code: 'Arizona' },
    { name: 'California', value: 'California' },
    { name: 'Florida', code: 'Florida' },
    { name: 'Ohio', code: 'Ohio' },
    { name: 'Washington', code: 'Washington' }
  ];

  cities1: any[] = [];
  cities2: any[] = [];
  city1: any = null;
  city2: any = null;
  dialogRef;
  dialogNewAddr;
  deliverMode;
  getDeliveryCharges: number;
  numberstring;
  rzp1;
  amountgettingStr;
  orderId;
  currencyIndicator;
  Url: string;
  razorpayOrderId;
  deliveryOptionList = [];
  cId;
  pId;
  deliveryTypeList = [];
  getCoupRes = [];
  currencyId;
  storeId;
  eventTriggered = false;
  couponFlag
  VocherForm: FormGroup;
  vocherEntercodeArray = [];
  tenantId;
  panelOpenState = false;
  imageParse;
  butDisabled = true;
  placeOrdObj: PlaceOrderObject = new PlaceOrderObject();
  expressFlag;
  selectedDeliveryFlag;
  btnDisabled;
  buyNowFlag = false
  currencyCode
  optionTypeL = [11, 12];
  addressFlag = false;
  optionTypeList2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]

  ngOnInit(): void {
    this.disabled = true;
    this.btnDisabled = true;
    this.vocherFlag = false;
    this.shippD = false;
    this.paymentexpandDiv = false;
    this.disabledp = true;
    this.activatedRoute.queryParams.subscribe(params => {
      const url = window.location.href;
      this.couponFlag = params.couponFlag;
      if (url.includes('couponRes')) {
        const coupArr = decodeURI(params.couponRes);
        const testCoup = JSON.parse(coupArr)
        this.getCoupRes = testCoup;
      }
      if (url.includes('buynowData')) {
        this.buyNowFlag = JSON.parse(params.buyNowFlag);
        const buyArr = decodeURI(params.buynowData);
        const data = JSON.parse(buyArr)
        this.cartData.push(data)
      }
    })
    this.VocherForm = this.formBuilder.group({
      VocherCode: ['', Validators.required],
    }),
      this.logedPhone = sessionStorage.getItem('telephone');
    this.logedSeeionId = sessionStorage.getItem('sessionId');
    this.logedCustomerId = sessionStorage.getItem('customerId');
    this.logedEmailId = sessionStorage.getItem('userEmail');
    this.logedUserName = sessionStorage.getItem('userdata');
    this.logedPhone = sessionStorage.getItem('telephone');
    this.storeId = sessionStorage.getItem('StoreId');
    this.currencyId = sessionStorage.getItem('currencyId');
    this.tenantId = sessionStorage.getItem('tenantId');
    this.getOrderSummary();
    this.viewCart();
    this.handleGetCountries();
    this.getPaymentMethods();
    this.getDeliverAddressDetails();
    this.newaddressform = {
      firstname: '', lastname: '', default_address: false,
      pincode: '', address: '', city: '', country: '', zone: '', addresstype: ''
    }
    this.signupForm = this.formBuilder.group({
      deliverMode: ['', Validators.required]
    })
    this.common.aClickedEvent
      .subscribe((data: any) => {
        this.storeId = sessionStorage.getItem('StoreId')
        this.viewCart();
      });
    this.common.currencyClickedEvent
      .subscribe((data: any) => {
        this.currencyId = sessionStorage.getItem('currencyId')
        this.viewCart();
        this.getOrderProductSummary('Standard');
      });
  }

  onTabOpen(event) {
    if (event.index === 1) {
      this.getOrderSummary();
    }
  }
  onTabClose(event) { }

  /**
    * @remarks view cart product list
    * @AddedBy  Amar
    * @ModifiedBy Devi added store validations & changed the payloads
    * @version 1.0
   */
  viewCart(): any {
    // Function call eventFlag=null
    let body;
    this.spinner.show();
    body = {
      preview_op_type: "view_cart", user_name: this.logedEmailId, tenant_id: this.tenantId,
      login: true, session_id: this.logedSeeionId,
      // shipping_country_id: 223, shipping_zone_id: 3613,
      voucher_applied: false
    };
    body = this.common.storeValidationWithCoupon(body, JSON.parse(this.couponFlag), [this.getCoupRes])
    body = this.common.referenceIdValidation(body)
    const success = this.ViewCartSuccess.bind(this);
    const error = this.onError.bind(this);
    this.common.http.post('Preview', body, success, error);
  }

  ViewCartSuccess(data): any {
    if (data.res_status === false) {
      this.spinner.hide();
      if (data.Data.cart_details.length === 0) {
        this.router.navigate(['/cart'])
      }
    }
    else {
      this.spinner.hide();
      this.placeOrdObj.placeOrderData = Array<CartDataForplaceOrder>();
      const dataset = new CartDataForplaceOrder();
      dataset.Grand_Total = data.Data.price;
      dataset.cart_count = data.Data.cart_count;
      dataset.lines = data.Data.cart_details;
      this.expressCharge = data.Data.express_charges
      this.standardCharge = data.Data.standard_charges
      this.currencyIndicator = data.Data.currency_indicator
      for (let a of dataset.lines) {
        this.imageParse = JSON.parse(a.image);
        this.totoal = dataset.lines[0].price;
        const body = { image: this.imageParse.file_data[0].media_data, data: a }
        if (this.buyNowFlag === false) {
          this.cartData = data.Data.cart_details;
        }
      }
      this.placeOrdObj.placeOrderData.push(dataset);
    }
  }
  onError(data) { }
  getOrderSummary() {
    this.ps.getSampleProducts().subscribe((resp) => {
      resp.ecomData.map((item) => {
        if (item._unit_id === this.unitId) {
          this.orderDetails = item;
          this.orderDetails.quantity = 1;
        }
      });
    });
  }
  addLineLevelDeliveryDates(event, type) {
    if (type === 'add') {
      this.orderDetails.quantity = this.orderDetails.quantity + 1;
    } else if (type === 'sub') {
      this.orderDetails.quantity = this.orderDetails.quantity - 1;
    }
  }

  addAddress(openAddressPopup) {
    this.dialogNewAddr = this.dialog.open(openAddressPopup, { width: '45%', height: '428px', disableClose: true });
  }
  closeNewAddressDialog() {
    this.dialogNewAddr.close();
  }
  closepaymentDialog() {
    this.dialogNewAddr.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }
  placeOrder() {
    if (this.paymentOption !== undefined) {

    }
  }

  handlePayment() {
    const body = {
      payer: {
        payment_method: "paypal"
      },
      transactions: [{
        item_list: {
          items: [{
            name: "testitem",
            sku: "12345",
            price: "1.00",
            currency: "USD",
            quantity: 1
          }]
        },
        amount: {
          total: "1.00",
          currency: "USD"
        },
        description: "This is the payment transaction description."
      }],
      redirect_urls: { "return_url": "http://www.google.com/", "cancel_url": "http://localhost:4200/#/myorders" }

    };
    const success = this.getPaymentSuccess.bind(this);
    const error = this.onErrorPayment.bind(this);
    this.common.http.post('createPayment', body, success, error);

  }
  getPaymentSuccess(data): any {
    this.paymentIDForPay = data.paymentID;
    window.open("https://www.sandbox.paypal.com/checkoutnow?sessionID=uid_9851113d76_mtq6mtq6ndy&buttonSessionID=uid_a75408bb1b_mtq6mzi6mje&fundingSource=paypal&buyerCountry=IN&locale.x=en_US&commit=true&clientID=AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R&env=sandbox&sdkMeta=eyJ1cmwiOiJodHRwczovL3d3dy5wYXlwYWwuY29tL3Nkay9qcz9jbGllbnQtaWQ9c2IiLCJhdHRycyI6eyJkYXRhLXVpZCI6InVpZF9jYnRrbWJucW92em50bW1pc2V3eXdmcnFjY3lwenMifX0&xcomponent=1&version=5.0.247&token=6CS572371C8896444", "_blank");
    const body = {
      "paymentID": this.paymentIDForPay
    }
    const success = this.getPaymentExecuteSuccess.bind(this);
    const error = this.onErrorExecutePayment.bind(this);
    this.common.http.post('executePayment', body, success, error);

  }
  getPaymentExecuteSuccess(data): any { }

  onErrorExecutePayment(data) { }

  onErrorPayment(data) { }

  handleOtherPayment() {
    this.snack.open('Coming soon', 'Ok', { duration: 2000 });
  }

  /**
   * @remarks Get Delivery Address
   * @author  
   * @version 0.1
  */
  getDeliverAddressDetails(): any {
    this.spinner.show()
    const body = {
      "login": true,
      "customer_id": this.logedCustomerId,
      "session_id": this.logedSeeionId,
      "op_delivery_type": "retrive",
      "address_no": 1
    };
    const success = this.getDeliverAddressDetailsSuccess.bind(this);
    const error = this.getDeliverAddressDetailsError.bind(this);
    this.common.http.post('Customer_details', body, success, error);
  }

  getDeliverAddressDetailsSuccess(data): any {
    this.spinner.hide()
    this.placeOrdObj.GetDeliveryAddressData = Array<GetDeliveryAddrDetails>();
    if (data.delivery_details.res_status === false) {
      this.noAddressFoundFlag = true;
    }
    else {
      this.noAddressFoundFlag = false;
      data.delivery_details.map((item) => {
        const dataset = new GetDeliveryAddrDetails();
        dataset.firstName = item.firstname;
        dataset.lastName = item.lastname;
        dataset.addressType = item.address_type;
        dataset.defaultAddress = item.default_address;
        dataset.customerId = item.customer_id;
        dataset.addressId = item.address_id;
        dataset.company = item.company;
        dataset.address1 = item.address_1;
        dataset.address2 = item.address_2;
        dataset.city = item.city;
        dataset.postcode = item.postcode;
        dataset.countryName = item.country_name;
        dataset.countryId = item.country_id;
        dataset.zoneName = item.zone_name;
        dataset.zoneId = item.zone_id;
        dataset.mobile = item.mobile;
        if (item.is_selected === 'true') {
          this.selectedAddressForDelivery = item.address_id
          this.addressDetails = dataset
          this.addressFlag = true
        } else if (this.addressFlag === false) {
          if (item.default_address === 0) {
            this.selectedAddressForDelivery = item.address_id
            this.addressDetails = dataset
          }
        }
        this.placeOrdObj.GetDeliveryAddressData.push(dataset);
      });
      this.addressDiv.nativeElement.scrollTop = 0
    }
  }

  getDeliverAddressDetailsError(data): any { }

  getPaymentMethods(): any {
    const body = { "delivery_op_type": "select" };
    const success = this.getPaymentMethodSuccess.bind(this);
    const error = this.onErrorGetPaymentMethod.bind(this);
    this.common.http.post('delivery_mode', body, success, error);
  }

  getPaymentMethodSuccess(data): any {
    if (data.res_status === true) {
      this.paymentMethods = data.data;
    }
    else {
      this.snack.open('Not available this delivery mode', 'Ok', { duration: 2000 });
    }
  }

  onErrorGetPaymentMethod(data) { }

  selectedAddress(addrId): any {
    this.addressDetails = addrId;
    this.selectedAddressForDelivery = addrId.addressId;
    this.signupForm.reset();
    this.newaddressform.firstname = addrId.firstName
    this.newaddressform.lastname = addrId.lastName
    this.newaddressform.pincode = addrId.postcode
    this.newaddressform.address = addrId.address1
    this.newaddressform.city = addrId.city
    this.newaddressform.country = addrId.countryId
    this.newaddressform.zone = addrId.zoneId
    this.newaddressform.mobile = addrId.mobile
    this.newaddressform.addresstype = addrId.addressType
    this.newaddressform.default_address = addrId.defaultAddress
    this.newAddressSubmit('update')
    this.getOrderProductSummary(this.selectedDeliveryFlag);
  }
  addressUpdate(data) { }

  selectDeliveryMode(delivMode) {
    if (this.selectedAddressForDelivery === undefined) {
      this.snack.open('Please select delivery address to proceed', 'Ok', { duration: 3000 });
    }
  }

  selectDeliveryMode2(delivMode, cId, pId) {
    this.cId = cId;
    this.pId = pId;
    this.getDeliveryCharges = delivMode;
    this.eventTriggered = true;
    this.getOrderProductSummary('selected');
  }

  getEstimatedDelDetails(): any {
    const body = {
      "delivery_op_type": "select", "delivery_mode_id": this.selectedDeliveryMode, "login": true, "customer_id": this.logedCustomerId,
      "sessoin_id": this.logedSeeionId, "source_zipcode": 500081, "address_id": this.selectedAddressForDelivery
    };
    const success = this.getEstimatedDelDetailsSuccess.bind(this);
    const error = this.onErrorgetEstimatedDelDetails.bind(this);
    this.common.http.post('est_delivery_dtls', body, success, error);
  }

  getEstimatedDelDetailsSuccess(data): any {
    if (data.res_status === true) {
      this.estimatedDeliveryDtls = data.data;
      this.deliveryCharges = this.estimatedDeliveryDtls[0].delivery_charges;
    }
    else {
      this.snack.open(data.msg, 'Ok', { duration: 2000 });
    }
  }
  onErrorgetEstimatedDelDetails(data) { }

  /**
   * @remarks Get order product Summary
   * @author  
   * @version 0.1
   */

  getOrderProductSummary(data): any {
    this.expressFlag = data;
    this.selectedDeliveryFlag = data;
    if (data !== undefined) {
      this.proceedFlag = true;
    }
    let body: any;
    if (this.expressFlag === 'Standard') {
      this.spinner.show();
      this.deliveryTypeList = [];
      body = {
        "preview_op_type": "order_summery", "customer_id": this.logedCustomerId, "login": true, "session_id": this.logedSeeionId,
        "address_id": this.selectedAddressForDelivery, "delivery_details": [], "voucher_applied": false, "tenant_id": this.tenantId
      };
      body = this.common.storeValidationWithCoupon(body, JSON.parse(this.couponFlag), this.getCoupRes)
    } else if (this.expressFlag === 'Express') {
      this.spinner.show();
      this.deliveryTypeList = [];
      this.cartData.map((element) => {
        this.deliveryTypeList.push({ cart_id: element.cart_id, product_id: element.product_id, delivery_type: 'Express Delivery' })
      })
      body = {
        "preview_op_type": "order_summery", "customer_id": this.logedCustomerId, "login": true, "session_id": this.logedSeeionId,
        "address_id": this.selectedAddressForDelivery, "delivery_details": this.deliveryTypeList, "voucher_applied": false, "tenant_id": this.tenantId
      };
      body = this.common.storeValidationWithCoupon(body, JSON.parse(this.couponFlag), this.getCoupRes)
    }
    else {
      this.deliveryTypeList = [];
      this.summaryData.cart_details.map((element) => {
        if (element.cart_id === this.cId) {
          this.deliveryTypeList.push({ cart_id: this.cId, product_id: this.pId, delivery_type: this.getDeliveryCharges })
        } else {
          this.deliveryTypeList.push({ cart_id: element.cart_id, product_id: element.product_id, delivery_type: element.delivery_type })
        }
      })
      body = {
        "preview_op_type": "order_summery", "customer_id": this.logedCustomerId, "login": true, "session_id": this.logedSeeionId,
        "address_id": this.selectedAddressForDelivery, "delivery_details": this.deliveryTypeList, "voucher_applied": false
      };
      body = this.common.storeValidationWithCoupon(body, JSON.parse(this.couponFlag), this.getCoupRes)
    }
    const success = this.getOrderProductSummarySuccess.bind(this);
    const error = this.onErrorgetgetOrderProductSummary.bind(this);
    this.common.http.post('Preview', body, success, error);
  }

  getOrderProductSummarySuccess(data): any {
    this.vocherFlag = false;
    this.summaryData = data.Data;
    this.spinner.hide();
    if (data.res_status) {
      this.aa = true;
      this.safeDiv = true;
      this.summaryData.cart_details.map((element, idx) => {
        const imgObj = element.image;
        const image = JSON.parse(imgObj);
        if ('file_data' in image) {
          const imgArr = image.file_data;
          imgArr.map((ele) => {
            if (ele.storage_type === 'db') {
              this.summaryData.cart_details[idx].imageUrl = 'data:image/png;base64,' + ele.media_data;
            } else {
              this.summaryData.cart_details[idx].imageUrl = ele.media_data;
            }
          });
        }
        else {
          this.summaryData.cart_details[idx].imageUrl = image.data;
        }
      });
      this.resultOfDeliveryModeSuccess = false;
      this.taxDetails = true;
      this.orderedProductEntireDetails = data.Data;
      this.detailsForConfirmOrder = data;
      this.deliveryOptionList = data.Data.shipping_methods;
      this.amountgettingStr = this.summaryData.grand_total;
      this.currencyCode = this.summaryData.code
      this.resultOfDeliveryModeSuccess = false;
      this.taxDetails = true;
      this.orderedProductEntireDetails = data.Data;
      this.detailsForConfirmOrder = data;
    }
  }

  onErrorgetgetOrderProductSummary(data) {
    this.resultOfDeliveryModeSuccess = false;
  }

  handlePlaceorder() {
    this.orderConfirmFlag = false;
    this.orderexpandDiv = true;
    this.paymentFlag = true;
    this.inactiveSummary = true;
    this.ordersummChangeDiv = false;
    this.codFlag = false
    this.razorFlag = false
    this.changeaddClk = false;
    this.shippAdd = false;
    this.newAddForm = false;
    this.addressShipView = true;
  }

  /**
 * @remarks Store Validations
 * @author  Devi
 * @version 1.0
 */

  //order confirmation Details

  orderConfirmed(): any {
    this.spinner.show();
    const orederData = this.detailsForConfirmOrder;
    let body;
    let Url = sessionStorage.getItem('affiliateUrl')
    orederData.Data.cart_details.map((item) => {
      if (item.subscription_to_date === 0 || item.subscription_from_date === 0) {
        item['subscription_flag'] = 0;
      } else {
        item['subscription_flag'] = 1;
      }
    })
    body = {
      login: true,
      sessoin_id: this.logedSeeionId,
      customer_id: this.logedCustomerId,
      address_id: this.selectedAddressForDelivery,
      order_type: "affiliated",
      api_name: "ConfirmOrder",
      tenant_id: this.tenantId,
      Data: orederData.Data
    }
    body = this.common.storeValidationWithCoupon(body, JSON.parse(this.couponFlag), this.getCoupRes)
    body = this.common.referenceIdValidation(body)
    const success = this.getConfirmOrderSuccess.bind(this);
    const error = this.onErrorgetgetOrderConfirm.bind(this);
    this.common.http.post('ConfirmOrder', body, success, error);
  }

  getConfirmOrderSuccess(data): any {
    this.menu.passValue(data.cart_count)
    this.spinner.hide();
    if (data.res_status === true) {
      this.orderId = data.order_id;
      this.currencyIndicator = data;
      this.codClick();
    }
    else {
      this.snack.open(data.msg, 'Ok', { duration: 2000 });
    }
  }
  onErrorgetgetOrderConfirm(data) { }

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

  handleGetRegionByCountry(cId) {
    const body = {
      ordersdropdowns_op_type: "zone_dropdown", country_id: cId
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

  /**
   * @remarks Adding New Address Submit
   * @author  Ramana
   * @version 1.0
   */
  newAddressSubmit(data) {
    this.resultOfAddressInsertSuccess = true;
    let body;
    const defaultAdd = this.newaddressform.default_address === false ? 1 : 0
    if (this.newaddressform.firstname !== '' && this.newaddressform.lastname !== '' && this.newaddressform.address !== '' && this.newaddressform.mobile !== '' &&
      this.newaddressform.city !== '' && this.newaddressform.pincode !== '' && this.newaddressform.country !== '' && this.newaddressform.zone !== '') {
      if (data === 'add') {
        body = {
          login: true,
          customer_id: this.logedCustomerId,
          session_id: this.logedSeeionId,
          tenant_id: this.tenantId,
          op_delivery_type: "insert",
          new_details: [{
            firstname: this.newaddressform.firstname, lastname: this.newaddressform.lastname,
            address_1: this.newaddressform.address, address_2: '', city: this.newaddressform.city, mobile: this.newaddressform.mobile,
            postcode: this.newaddressform.pincode, country_id: parseInt(this.newaddressform.country),
            zone_id: parseInt(this.newaddressform.zone), address_type: this.newaddressform.addresstype, company: '',
            street_area: this.newaddressform.streetname, landmark: this.newaddressform.landmark, default_address: defaultAdd
          }]
        }
      } else {
        body = {
          login: true,
          customer_id: this.logedCustomerId,
          session_id: this.logedSeeionId,
          tenant_id: this.tenantId,
          op_delivery_type: "update",
          address_no: this.selectedAddressForDelivery,
          new_details: [{
            firstname: this.newaddressform.firstname, lastname: this.newaddressform.lastname, address_id: this.selectedAddressForDelivery,
            mobile: this.newaddressform.mobile,
            address_1: this.newaddressform.address, address_2: '', city: this.newaddressform.city, postcode: this.newaddressform.pincode, country_id: parseInt(this.newaddressform.country),
            zone_id: parseInt(this.newaddressform.zone), address_type: this.newaddressform.addresstype, company: '',
            street_area: this.newaddressform.streetname, landmark: this.newaddressform.landmark, default_address: this.newaddressform.default_address, is_selected: 'true'
          }]
        }
      }
      const success = this.newaddressformSucess.bind(this);
      const error = this.newaddressformError.bind(this);
      this.common.http.post('Customer_details', body, success, error)
    } else {
      this.snack.open('Please fill all required fields', 'ok', { duration: 1500 });
    }
  }

  newaddressformSucess(data) {
    if (data.res_status === false) {
      this.resultOfAddressInsertSuccess = false;
      this.snack.open(data.msg, 'Ok', { duration: 500 });
      this.getDeliverAddressDetails();
    } else {
      this.resultOfAddressInsertSuccess = true;
      this.newAddForm = false;
      this.shippAdd = true;
      this.snack.open(data.msg, 'Ok', { duration: 500 });
      this.getDeliverAddressDetails();
      this.closeNewAddressDialog();
    }
  }

  newaddressformError(data) { }

  handlePayments(data) {
    if (data === 'paypal') {
      this.paypalFlag = true;
      this.stripeFlag = false;
      this.razorFlag = false;
      this.codFlag = false;
    } else if (data === 'stripe') {
      this.stripeFlag = true;
      this.paypalFlag = false;
      this.razorFlag = false;
      this.codFlag = false;
    } else if (data === 'razor') {
      this.stripeFlag = false;
      this.paypalFlag = false;
      this.razorFlag = true;
      this.codFlag = false;
    } else {
      this.stripeFlag = false;
      this.paypalFlag = false;
      this.razorFlag = false;
      this.codFlag = true;
    }
  }
  paypalClk(paypalPopup) {
    this.dialogNewAddr = this.dialog.open(paypalPopup, { width: '45%', height: '305px', disableClose: true });
    this.confrmOrderFlag = true;
  }

  stripeClk(stripePop) {
    this.dialogNewAddr = this.dialog.open(stripePop, { width: '45%', height: '375px', disableClose: true });
    this.confrmOrderFlag = true;
  }
  validateForm() { }
  keyup(event) {
    if (event.length <= 16) {
      this.does = true;
      this.lenth16more = false;
    }
    else if (event.length >= 17) {
      this.does = false;
      this.lenth16more = true;
    }
    else {
      this.does = false;
    }
  }
  cvvup(event) {
    if (event.length <= 2) {
      this.cvverror = true;
    }
    else {
      this.cvverror = false;
    }
  }

  rClick() {
    this.floatNuumber = parseFloat(this.amountgettingStr);
    this.amountcurrency = this.floatNuumber * 100;
    const body = {
      "amount": this.amountcurrency,
      "currency": this.currencyCode
    }
    this.ps.getorderMenu(body).subscribe(
      (data) => {
        this.razorpayOrderId = data._id;
        this.razorpay()
      }, (err) => {
        this.snack.open(err, 'OK', { duration: 5000 })
      }
    );
  }

  razorpay() {
    this.floatNuumber = parseFloat(this.amountgettingStr);
    this.amountcurrency = this.floatNuumber * 100;
    const options: any = {
      // rzp_test_7HdkaZ1xFGPomB * rzp_test_s82NKjqnrIcU79
      key: 'rzp_test_s82NKjqnrIcU79',
      amount: this.amountcurrency, // amount should be in paise format to display Rs 1255 without decimal point
      currency: this.currencyCode,
      name: this.logedEmailId, // company name or product name
      description: '',  // product description
      image: './assets/logo.jpg', // company logo or product image
      razorpay_order_id: this.razorpayOrderId, // order_id created by you in backend
      modal: {
        // We should prevent closing of the form when esc key is pressed.
        escape: false,
      },
      notes: {
        // include notes if any
      },
      theme: {
        color: '#0c238a'
      }
    };
    options.handler = ((response, error) => {
      options.response = response;
      this.snack.open(response.razorpay_payment_id, 'Ok', { duration: 2000 });
      this.snack.open(response.razorpay_order_id, 'Ok', { duration: 2000 });
      this.snack.open(response.razorpay_signature, 'Ok', { duration: 2000 });
      alert(response.razorpay_signature);
      alert(response.razorpay_signature);
      alert(response.razorpay_signature);
      // call your backend api to verify payment signature & capture transaction
    });
    options.modal.ondismiss = (() => {
      // handle the case when user closes the form while transaction is in progress
    });
    const rzp = new this.auth.nativeWindow.Razorpay(options);
    rzp.open();
  }

  codClick() {
    this.spinner.show()
    let body;
    body = {
      "customer_id": this.logedCustomerId,
      "session_id": this.logedSeeionId,
      "order_id": this.orderId,
      "tenant_id": this.tenantId,
      "payment_type": "COD",
      "store_id": "",
      "api_name": "Cod",
    };
    body = this.common.referenceIdValidation(body)
    const success = this.codOnSucess.bind(this);
    const error = this.codOnError.bind(this);
    this.common.http.post('Cod', body, success, error);
  }
  sav() {
    this.shippAdd = false;
    this.newAddForm = false;
    this.addressShipView = true
    this.orderexpandDiv = true;
    this.inactiveSummary = true;
    this.orderConfirmFlag = true;
    this.ordersummChangeDiv = false;
    this.shippD = false;
    this.changeaddClk = true;
    this.AddNAddrk = false;
    this.disabled = false;
  }
  codOnSucess(data) {
    this.spinner.hide()
    if (data.res_status === true) {
      this.confrmOrderFlag = true;
      this.snack.open(data.msg_2, 'Ok', { duration: 5000 });
      this.router.navigate(['/myorders']);
    } else {
      this.snack.open(data.msg, 'Ok', { duration: 5000 });
    }
  }
  codOnError(data) {
    this.spinner.hide()
  }

  confirmorderClick() {
    this.clearCookies();
    this.router.navigate(['/myorders']);
  }
  clearCookies() {
    this.cookieService.deleteAll('../');
  }
  // Vouchers

  vocherAddArray() {
    //vocherEntercodeArray "VocherForm.VocherCode"
    let ca = [];
    let asdfg = this.VocherForm.value.VocherCode;
    this.vocherEntercodeArray.push(this.VocherForm.value.VocherCode);
  }

  applyVocherClks() {
    this.spinner.show();
    this.vocherFlag = true;
    let body;
    if (this.vocherEntercodeArray.length >= 1) {
      body = {
        preview_op_type: "order_summery", customer_id: this.logedCustomerId, address_id: this.selectedAddressForDelivery,
        login: true, session_id: this.logedSeeionId, voucher_applied: true,
        delivery_details: this.deliveryTypeList,
        voucher_details: { code: this.vocherEntercodeArray }
      };
    }
    else {
      body = {
        preview_op_type: "order_summery", customer_id: this.logedCustomerId, address_id: this.selectedAddressForDelivery,
        login: true, session_id: this.logedSeeionId, voucher_applied: true,
        delivery_details: this.deliveryTypeList,
        voucher_details: { code: [this.VocherForm.value.VocherCode] }
      };
    }
    body = this.common.storeValidationWithCoupon(body, JSON.parse(this.couponFlag), this.getCoupRes);
    const success = this.VocherOnSuccess.bind(this);
    const error = this.VocheronError.bind(this);
    this.common.http.post('Preview', body, success, error);
  }

  VocherOnSuccess(data) {
    this.summaryData = data.Data;
    this.spinner.hide();
    if (data.res_status) {
      this.aa = true;
      this.safeDiv = true;
      this.resultOfDeliveryModeSuccess = false;
      this.taxDetails = true;
      this.orderedProductEntireDetails = data.Data;
      this.detailsForConfirmOrder = data;
      this.deliveryOptionList = data.Data.shipping_methods;
      this.resultOfDeliveryModeSuccess = false;
      this.taxDetails = true;
      this.orderedProductEntireDetails = data.Data;
      this.detailsForConfirmOrder = data;
    }
  }

  VocheronError() { }

  shipptouch() {
    this.shippAdd = false;
    this.newAddForm = false;
    this.shippD = !this.shippD;
  }
  shipaddChangeClk() {
    this.shippAdd = true;
    this.newAddForm = false;
    this.addressShipView = false
    this.shippD = true;
    this.changeaddClk = false;
    this.AddNAddrk = true;
    this.getDeliverAddressDetails()
  }
  AddNAddrBtnClk() {
    this.shippAdd = false;
    this.newAddForm = true;
    this.addressShipView = false
    this.changeaddClk = true;
    this.shippD = false;
    this.AddNAddrk = false;
  }

  Ordersumtouch() {
    this.orderexpandDiv = !this.orderexpandDiv;
    this.orderConfirmFlag = !this.orderConfirmFlag;
    this.ordersummChangeDiv = false;
  }

  orderSumChangeClk() {
    this.orderexpandDiv = false;
    this.inactiveSummary = true;
    this.orderConfirmFlag = false;
    this.ordersummChangeDiv = !this.ordersummChangeDiv;
    this.disabledp = false;
  }

  paymenttouch() {
    this.paymentexpandDiv = !this.paymentexpandDiv;
  }

  btshoping() {
    this.router.navigate(['/home']);
  }
}
