import { Injectable } from '@angular/core';
const Api = {
  ViewCart: 'ViewCart',
  Layout: 'Layout',
  Checkoutop: 'Checkoutop',
  CheckOutBilling: 'CheckOutBilling',
  ProductDetailsList: 'ProductDetailsList',
  ProductDetailsUI: 'ProductDetailsUI',
  Cart: 'Cart',
  Preview: 'Preview',
  categorylistui: 'categorylistui',
  pincode: 'pincode',
  RelatedProductDetailsList: 'RelatedProductDetailsList',
  review: 'ReviewUI',
  ui_orders: 'ui_orders',
  folders: 'folders ',
  wishlist: 'wishlist',
  filter: 'filterui',
  filteredproductdetails: 'filteredproductdetails',
  createPayment: 'create-payment',
  executePayment: 'execute-payment',
  countryandregionsdropdown: 'ordersdropdowns',
  EcommLogin: 'EcommLogin',
  Customer_details: 'Customer_details',
  history: 'history',
  register: 'Register',
  delivery_mode: 'delivery_mode',
  est_delivery_dtls: 'est_delivery_dtls',
  ConfirmOrder: 'ConfirmOrder',
  EcommLogout: 'EcommLogout',
  suggestion: 'suggestion',
  search: 'search',
  profile: 'profile',
  password: 'password',
  customerlogin: 'customerlogin',
  salesreturn: 'salesreturn',
  setting: 'setting',
  customerreturn: 'customerreturn',
  Cod: 'Cod',
  uploadDocument: 'uploadDocument',
  order: 'order',
  viewDocumentsInFolder: 'viewDocumentsInFolder',
  CouponsUi: 'CouponsUi',
  currency: 'Default/Currency',
  store: 'setting',
  VoucherUi: 'VoucherUi',
  inquiry: 'StoreEnquiry',
  StoreAddress: 'StoreAddress',
  WeeklyAds: 'WeeklyAds',
  storelistui: 'storelistui',
  Session: 'Session',
  recommendations: 'recommendations',
  DeliveryDates: 'DeliveryDates',
  //cartRelatedProducts:'RelatedProductDetailsList', https://tcq.arkatiss.com/pay/order
};
@Injectable({
  providedIn: 'root',
})
export class UrlConfigService {
  private jsonApi: any = Api;
  public carouselUrl: string = 'https://demoapps.arkatiss.com/CMS/';
  // public base_url: String = 'https://botpi.arkatiss.com/ecomm/';
  public base_url: String = 'https://demoapps.arkatiss.com/ecomm/';

  public pinCodeUrl = 'https://api.postalpincode.in/pincode/';
  // public orderbaseUrl = 'https://tcq.arkatiss.com/pay/';
  public orderbaseUrl = 'https://demoapps.arkatiss.com/pay/';

  constructor() {}
  getorderBaseUrl(): any {
    return this.orderbaseUrl;
  }

  getCarouselBaseUrl(): any {
    return this.carouselUrl;
  }
  getBaseUrl(): any {
    return this.base_url;
  }

  getUrls() {
    return this.jsonApi;
  }
}
