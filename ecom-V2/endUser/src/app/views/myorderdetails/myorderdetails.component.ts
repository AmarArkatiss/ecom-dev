import { Component, OnInit } from '@angular/core';
import { MyorderDetailService } from '../myorderdetails/service/myorderdetails.service';
import { OrderDetailsData, myOrderDetails, OtherItemOrderDetailsData } from './modal/myorderdetails-modal';
import { environment } from 'src/environments/environment.prod';
import { ActivatedRoute, Router } from '@angular/router';
import { MyorderService } from '../myorders/service/myorder.service';
import { myOrder } from '../myorders/modal/myorder-modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from '../../helper/common.service';
import { element } from 'protractor';
import { MenuService } from 'src/app/layout/service/menu.service';
import { PlaceOrderService } from '../place-order/services/place-order.service';
import { AuthService } from 'src/app/helper/auth.service';

@Component({
  selector: 'app-myorderdetails',
  templateUrl: './myorderdetails.component.html',
  styleUrls: ['./myorderdetails.component.scss']
})
export class MyorderdetailsComponent implements OnInit {
  myProducts = [];
  address;
  itemStatus;
  orderId;
  orderProduct: any;
  customerId: any;
  productId;
  orderLineId;
  ordAddress: myOrderDetails = new myOrderDetails();
  ord: myOrder = new myOrder();
  noOrdersImg;
  imgurl;
  logedSeeionId;
  logedCustomerId;
  logedEmailId;
  logedUserName;
  logedPhone;
  otherItemsInOrder;
  otherItemsInOrderDetails;
  ProductStatus;
  paymenttypeStatus;
  orderStatus = [];
  retryStatus;
  paymentWindow;
  confrmcodFlag = false;
  panelOpenState = false;
  sellerInformation = [];
  storeId;
  orderDate: any;
  paymentStatus: any;
  storeName: any;
  totalAmnt: any;
  currencyIndicator: any;
  tenantId;
  orderItemsList = []
  razorpayOrderId;
  stripeFlag = false;
  paypalFlag = false;
  razorFlag = false;
  codFlag = false
  currencyCode;
  paramRoute;
  showPopStatus: string;
  cancelItemList = [];
  productShipStatus = false;
  testing:any;
  constructor(private myOdrDetails: MyorderDetailService, public dialog: MatDialog, private route: ActivatedRoute, private datePipe: DatePipe, private menu: MenuService,
    private router: Router, private common: CommonService, private snack: MatSnackBar, private myorder: MyorderService, private spinner: NgxSpinnerService,
    private ps: PlaceOrderService, public auth: AuthService) {
    this.imgurl = environment.imageURL;
  }

  ngOnInit(): void {
    this.logedSeeionId = sessionStorage.getItem('sessionId');
    this.logedCustomerId = sessionStorage.getItem('customerId');
    this.logedEmailId = sessionStorage.getItem('userEmail');
    this.logedUserName = sessionStorage.getItem('userdata');
    this.logedPhone = sessionStorage.getItem('telephone');
    this.tenantId = sessionStorage.getItem('tenantId');
    const id = this.route.snapshot.paramMap.get('id');
    this.paramRoute = id
    const decoded = decodeURI(id);
    const prodInfo = JSON.parse(decoded);
    this.orderProduct = prodInfo;
    this.orderId = this.orderProduct.orderId;
    this.productId = this.orderProduct.productId;
    this.orderLineId = this.orderProduct.orderLineId
    this.customerId = this.orderProduct.customerId;
    this.orderDate = this.orderProduct.orderedDate;
    this.paymenttypeStatus = this.orderProduct.paymentStatus;
    if (this.paymenttypeStatus == "Pending") {
      this.retryStatus = true;
    }
    else {
      this.retryStatus = false;
    }
    this.getMyOrders();
  }
  /**
   * @remarks Get MyOrder Details
   * @author  
   * @version 1.0
   */

  getMyOrders(): any {
    this.spinner.show();
    const body = {
      order_op_type: "order_details", order_id: this.orderId, login: true,
      customer_id: this.logedCustomerId,
      session_id: this.logedSeeionId,
    };
    this.myOdrDetails.getSummaryOrderDetails(body).subscribe((data) => {
      this.ordAddress.data = Array<OrderDetailsData>();
      this.ordAddress.otherItemsDetails = Array<OtherItemOrderDetailsData>();
      if (data.res_status === true) {
        this.noOrdersImg = false;
        this.spinner.hide();
        this.orderStatus = data.data.order_status;
        data.data.product_details.map((otherItemDetails) => {
          const dataset = new OtherItemOrderDetailsData();
          dataset.productName = otherItemDetails.product_name;
          dataset.productId = otherItemDetails.product_id;
          dataset.orderId = otherItemDetails.order_id;
          dataset.orderLineId = otherItemDetails.order_line_id;
          dataset.customerId = otherItemDetails.customer_id;
          dataset.currencyIndicator = otherItemDetails.currency_indicator;
          dataset.price = otherItemDetails.net_amount;
          dataset.quantity = otherItemDetails.quantity;
          dataset.itemStatus = otherItemDetails.item_status;
          dataset.cancelledDate = otherItemDetails.cancelled_on;
          dataset.paymentMethod = otherItemDetails.payment_method;
          this.currencyIndicator = otherItemDetails.currency_indicator;
          const imageParse = JSON.parse(otherItemDetails.image);
          if (imageParse.file_data) {
            imageParse.file_data.map((otherItemImg => {
              dataset.image = otherItemImg.media_data;
            }));
          }
          else {
            dataset.image = imageParse.data;
          }
          this.ordAddress.otherItemsDetails.push(dataset);
        });
        const dataset = new OrderDetailsData();
        dataset.shippingName = data.data.address_details[0].full_name;
        dataset.shippingCompany = data.data.address_details[0].company;
        dataset.shippingAddress1 = data.data.address_details[0].address_1;
        dataset.shippingAddress2 = data.data.address_details[0].address_2;
        dataset.shippingCity = data.data.address_details[0].city;
        dataset.shippingPostcode = data.data.address_details[0].postcode;
        dataset.shippingCountry = data.data.address_details[0].country;
        dataset.shippingZone = data.data.address_details[0].state;
        dataset.street = data.data.address_details[0].street_area;
        dataset.mobile = data.data.address_details[0].mobile;
        dataset.paymentName = data.data.address_details[0].payment_name;
        dataset.paymentAddress1 = data.data.address_details[0].payment_address_1;
        dataset.paymentAddress2 = data.data.address_details[0].payment_address_2;
        dataset.paymentCity = data.data.address_details[0].payment_city;
        dataset.paymentPostcode = data.data.address_details[0].payment_postcode;
        dataset.paymentCountry = data.data.address_details[0].payment_country;
        this.itemStatus = data.data.address_details[0].order_status;
        this.paymentStatus = data.data.address_details[0].payment_status;
        this.storeId = data.data.address_details[0].store_id;
        this.storeName = data.data.address_details[0].store_name;
        this.totalAmnt = data.data.address_details[0].total_amount;
        this.currencyCode = data.data.address_details[0].code;
        this.ordAddress.data.push(dataset);
        this.orderItemsList = data.data.product_details.filter(d => d.item_status !== 'Order Cancelled');
        this.cancelItemList = data.data.product_details.filter(d => d.item_status !== 'Order Cancelled');
        this.orderItemsList.map((item) => {
          const imageParse = JSON.parse(item.image);
          if (imageParse.file_data) {
            imageParse.file_data.map((otherItemImg => {
              item['productImage'] = otherItemImg.media_data;
            }));
          }
          else {
            item['productImage'] = imageParse.data;
          }
        })
        this.cancelItemList.map((item) => {
          const imageParse = JSON.parse(item.image);
          if (imageParse.file_data) {
            imageParse.file_data.map((otherItemImg => {
              item['productImage'] = otherItemImg.media_data;
            }));
          }
          else {
            item['productImage'] = imageParse.data;
          }
        })
      } else {
        this.spinner.hide();
        this.noOrdersImg = true;
      }
      this.getStoreDetails()
    });
  }
  /**
   * @remarks Get Seller information
   * @author  Devi
   * @version 1.0
  */

  getStoreDetails() {
    this.sellerInformation = []
    this.myOdrDetails.getStoreData(this.storeId).subscribe((data) => {
      this.sellerInformation.push(data.data)
    })
  }

  viewReorder(reorderPopup, status) {
    this.showPopStatus = status
    this.dialog.open(reorderPopup, { width: '50%', position: { top: '2%' } });
  }
  viewCancel(cancelPopup, status) {
    this.showPopStatus = status
    this.dialog.open(cancelPopup, { width: '50%', position: { top: '2%' } });
  }
  /**
   * @remarks Remove item from the product list
   * @author  Devi
   * @version 1.0
  */
  clearItemFrmList(pId, i) {
    this.orderItemsList.map((element, idx) => {
      if (element.product_id == pId) {
        this.orderItemsList.splice(idx, 1)
      }
    })
  }
  clearCancelList(pId, i) {
    this.cancelItemList.map((element, idx) => {
      if (element.product_id == pId) {
        this.cancelItemList.splice(i, 1)
      }
    })
  }
  /**
   * @remarks Submit ReOrder
   * @author  Devi
   * @version 1.0
  */
  handleReorder() {
    let apiItemList = []
    this.spinner.show()
    this.orderItemsList.map((item) => {
      apiItemList.push(item.product_id)
    })
    let body = {
      "order_op_type": "re_order_details", "customer_id": this.logedCustomerId,
      "order_id": this.orderId, "product_id": apiItemList, tenant_id: this.tenantId,
      "session_id": this.logedSeeionId,
      "login": true, "quantity": 1
    }
    body = this.common.referenceIdValidation(body)
    this.myOdrDetails.reOrder(body).subscribe((data) => {
      this.spinner.hide()
      this.snack.open(data.msg, 'Ok', { duration: 2000 });
      this.dialog.closeAll()
      this.menu.passValue(data.cart_count);
    })
  }

  /**
  * @remarks Order Cancel
  * @author  Devi
  * @version 1.0
  */
  cancelOrder() {
    let orderLinesList = []
    this.spinner.show()
    this.cancelItemList.map((item) => {
      orderLinesList.push(item.order_line_id)
    })
    let body = { order_id: this.orderId, order_line_id: orderLinesList, customer_id: this.logedCustomerId }
    this.myOdrDetails.cancelOrder(body).subscribe((data) => {
      this.spinner.hide()
      if (data.res_status === true) {
        this.snack.open(data.msg, 'Ok', { duration: 5000 });
        this.getMyOrders();
        this.dialog.closeAll()
      } else {
        this.snack.open(data.msg, 'Ok', { duration: 5000 });
      }
    })
  }
  /**
  * @remarks Invoice Click to View Invoice Details
  * @param  order_id, product_id, line_id
  * @author  Ramana
  * @version 1.0
  */

  invoiceClick() {
    if (this.itemStatus === "Draft") {
      this.snack.open('The Product is in Draft Stage', 'Ok', { duration: 5000 });
    }
    else {
      this.router.navigate(['/invoice'], { queryParams: { OrdersId: this.orderId, paramRoute: this.paramRoute } })
    }
  }

  /**
   * @remarks Get related products 
   * @params productId, orderId, OrderLineId
   * @author  
   * @version 1.0
  */
  getProductsFromRelated(pid, oid, olId) {
    this.router.navigate(['/myorderdetails', pid, oid, olId]);
    this.productId = pid;
    this.orderLineId = olId
    this.orderId = oid
    this.getMyOrders();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  goToProductsView(pid) {
    this.router.navigate(['/productDetail', pid]);
  }

  // Payment Methods
  repayClick(paymentPopup) {
    this.dialog.open(paymentPopup, { width: '50%', height: '305px', disableClose: true });
    this.stripeFlag = false;
    this.paypalFlag = false;
    this.razorFlag = false;
    this.codFlag = false;
  }
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
  codClick() {
    let body;
    body = {
      "customer_id": this.logedCustomerId,
      "session_id": this.logedSeeionId,
      "order_id": this.orderId,
      "tenant_id": this.tenantId,
      "payment_type": "COD",
      "store_id": this.storeId,
      "api_name": "Cod",
    };
    body = this.common.referenceIdValidation(body)
    const success = this.codOnSucess.bind(this);
    const error = this.codOnError.bind(this);
    this.common.http.post('Cod', body, success, error);

  }
  codOnSucess(data) {
    if (data.res_status === true) {
      this.confrmcodFlag = true;
      this.dialog.closeAll()
      this.getMyOrders()
    }
  }
  codOnError(data) { }

  rClick() {
    this.dialog.closeAll();
    const floatNuumber = parseFloat(this.totalAmnt);
    const amountcurrency = floatNuumber * 100;
    const body = {
      "amount": amountcurrency,
      "currency": this.currencyCode
    }
    this.ps.getorderMenu(body).subscribe(
      (data) => {
        this.razorpayOrderId = data._id;
        this.razorpay()
      }, (err) => { }
    );
  }

  razorpay() {
    const floatNuumber = parseFloat(this.totalAmnt);
    const amountcurrency = floatNuumber * 100;
    const options: any = {
      key: 'rzp_test_s82NKjqnrIcU79',
      amount: amountcurrency, // amount should be in paise format to display Rs 1255 without decimal point
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

  paypalClk(paypalPopup) {
    this.dialog.closeAll();
    this.dialog.open(paypalPopup, { width: '50%', height: '380px', disableClose: true });
    this.confrmcodFlag = true;
  }
  stripeClk(stripePop) {
    this.dialog.closeAll();
    this.dialog.open(stripePop, { width: '45%', height: '375px', disableClose: true });
    this.confrmcodFlag = true;
  }

  /**
   * @remarks show/hide product status
   * @author  Devi
   * @version 1.0
  */
  productStatusClk() {
    this.productShipStatus = true
  }

}
