import { Component, OnInit } from '@angular/core';
import { MyorderService } from '../myorders/service/myorder.service';
import { OrderData, myOrder } from './modal/myorder-modal';
import { environment } from 'src/environments/environment.prod';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from '../../helper/common.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MenuService } from 'src/app/layout/service/menu.service';
import { MatDialog } from '@angular/material/dialog';
import 'sweetalert2/src/sweetalert2.scss';
import { element } from 'protractor';
import { PlaceOrderService } from '../place-order/services/place-order.service';
import { AuthService } from 'src/app/helper/auth.service';
import { Duration } from 'ngx-bootstrap/chronos/duration/constructor';
@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.scss']
})
export class MyordersComponent implements OnInit {
  data = {
    "res_status": true,
    "status": 200,
    "data": [
      {
        "order_id": 941,
        "created_on": "31-12-2021 00:00:00",
        "order_status": "Draft",
        "payment_type": "Pending",
        "total_ordered_amount": "3317091.74",
        "details": [
          {
            "order_line_id": 626.0,
            "customer_id": 92,
            "total_amount": 92.8,
            "created_on": "31-12-2021 00:00:00",
            "payment_type": "0",
            "item_status": "Draft",
            "image": "{\"file_data\": [{\"storage_type\": \"os\", \"user_id\": 3, \"file_id\": 131, \"media_id\": \"5c21603c-d016-4056-92ab-35e1f35da5ed\", \"media_name\": \"61n4GUCJDcL._AC_UL480_FMwebp_QL65_.webp\", \"media_data\": \"https://intello-ecom.s3.amazonaws.com/file/2021-08-18/08-hrs/5c21603c-d016-4056-92ab-35e1f35da5ed._AC_UL480_FMwebp_QL65_?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVHGEEXKYLZ4TPNMQ%2F20220712%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220712T135121Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=6f55d53d3c29b27eea7ee67ce8d268a5ccd333f35d692b3ecdfadb2cd7f7d084\"}]}",
            "payment_status_id": 3,
            "product_name": "Cadbury Dairy Milk Silk Oreo Red Velvet, 60 g",
            "product_id": 169.0,
            "subscription_cycle": 0,
            "subscription_period": "NA",
            "subscription_from_date": "0",
            "subscription_to_date": "0",
            "recurring_id": 0,
            "recurring_name": null,
            "rec_price": NaN,
            "frequency": null,
            "cycle": NaN,
            "symbol_left": "₹",
            "net_amount": 80.0,
            "order_line_status": 19
          },
          {
            "order_line_id": 627.0,
            "customer_id": 92,
            "total_amount": 3912.1,
            "created_on": "31-12-2021 00:00:00",
            "payment_type": "0",
            "item_status": "Draft",
            "image": "{\"file_data\": [{\"storage_type\": \"os\", \"user_id\": 3, \"file_id\": 452, \"media_id\": \"58210142-8743-48fc-92bc-5c67ae74e5c8\", \"media_name\": \"badam.webp\", \"media_data\": \"https://intello-ecom.s3.amazonaws.com/file/2022-07-07/11-hrs/58210142-8743-48fc-92bc-5c67ae74e5c8.webp?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVHGEEXKYLZ4TPNMQ%2F20220712%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220712T135121Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=eb40ae365e79826b451dba737b2f8f6cc847a279aa1717448a71fbe7bc7a2561\"}]}",
            "payment_status_id": 3,
            "product_name": "Neu.Farm Almonds/Badam - Californian - Premium Quality - 100% Natural - Pack of 2 Almonds  (2 x 200 g)",
            "product_id": 117.0,
            "subscription_cycle": 0,
            "subscription_period": "NA",
            "subscription_from_date": "0",
            "subscription_to_date": "0",
            "recurring_id": 0,
            "recurring_name": null,
            "rec_price": NaN,
            "frequency": null,
            "cycle": NaN,
            "symbol_left": "₹",
            "net_amount": 16862.5,
            "order_line_status": 19
          },
          {
            "order_line_id": 628.0,
            "customer_id": 92,
            "total_amount": 2960.0,
            "created_on": "31-12-2021 00:00:00",
            "payment_type": "0",
            "item_status": "Draft",
            "image": "{\"file_data\": [{\"storage_type\": \"os\", \"user_id\": 3, \"file_id\": 156, \"media_id\": \"689e91ee-4196-4111-94e7-3d83ac8f6679\", \"media_name\": \"Amul1.jpg\", \"media_data\": \"https://intello-ecom.s3.amazonaws.com/file/2021-09-06/15-hrs/689e91ee-4196-4111-94e7-3d83ac8f6679.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVHGEEXKYLZ4TPNMQ%2F20220712%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220712T135121Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=da3444a74dc603e1fafc7399522ef79ef7957ff72f41983c164d0ff5e644ac29\"}]}",
            "payment_status_id": 3,
            "product_name": "Amul Unsalted Butter 500 g",
            "product_id": 553.0,
            "subscription_cycle": 0,
            "subscription_period": "NA",
            "subscription_from_date": "0",
            "subscription_to_date": "0",
            "recurring_id": 0,
            "recurring_name": null,
            "rec_price": NaN,
            "frequency": null,
            "cycle": NaN,
            "symbol_left": "₹",
            "net_amount": 11840.0,
            "order_line_status": 19
          },
          {
            "order_line_id": 628.0,
            "customer_id": 92,
            "total_amount": 2960.0,
            "created_on": "31-12-2021 00:00:00",
            "payment_type": "0",
            "item_status": "Draft",
            "image": "{\"file_data\": [{\"storage_type\": \"os\", \"user_id\": 3, \"file_id\": 156, \"media_id\": \"689e91ee-4196-4111-94e7-3d83ac8f6679\", \"media_name\": \"Amul1.jpg\", \"media_data\": \"https://intello-ecom.s3.amazonaws.com/file/2021-09-06/15-hrs/689e91ee-4196-4111-94e7-3d83ac8f6679.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVHGEEXKYLZ4TPNMQ%2F20220712%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220712T135121Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=da3444a74dc603e1fafc7399522ef79ef7957ff72f41983c164d0ff5e644ac29\"}]}",
            "payment_status_id": 3,
            "product_name": "Amul Unsalted Butter 500 g",
            "product_id": 553.0,
            "subscription_cycle": 0,
            "subscription_period": "NA",
            "subscription_from_date": "0",
            "subscription_to_date": "0",
            "recurring_id": 0,
            "recurring_name": null,
            "rec_price": NaN,
            "frequency": null,
            "cycle": NaN,
            "symbol_left": "₹",
            "net_amount": 11840.0,
            "order_line_status": 19
          }
        ]
      },
      {
        "order_id": 942,
        "created_on": "31-12-2021 00:00:00",
        "order_status": "Draft",
        "payment_type": "Pending",
        "total_ordered_amount": "3317091.74",
        "details": [
          {
            "order_line_id": 629.0,
            "customer_id": 92,
            "created_on": "31-12-2021 00:00:00",
            "total_amount": 3912.1,
            "payment_type": "N.A",
            "item_status": "Draft",
            "image": "{\"file_data\": [{\"storage_type\": \"os\", \"user_id\": 3, \"file_id\": 452, \"media_id\": \"58210142-8743-48fc-92bc-5c67ae74e5c8\", \"media_name\": \"badam.webp\", \"media_data\": \"https://intello-ecom.s3.amazonaws.com/file/2022-07-07/11-hrs/58210142-8743-48fc-92bc-5c67ae74e5c8.webp?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVHGEEXKYLZ4TPNMQ%2F20220712%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220712T135121Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=eb40ae365e79826b451dba737b2f8f6cc847a279aa1717448a71fbe7bc7a2561\"}]}",
            "payment_status_id": 3,
            "product_name": "Neu.Farm Almonds/Badam - Californian - Premium Quality - 100% Natural - Pack of 2 Almonds  (2 x 200 g)",
            "product_id": 117.0,
            "subscription_cycle": 0,
            "subscription_period": "NA",
            "subscription_from_date": "0",
            "subscription_to_date": "0",
            "recurring_id": 0,
            "recurring_name": null,
            "rec_price": NaN,
            "frequency": null,
            "cycle": NaN,
            "symbol_left": "₹",
            "net_amount": 16862.5,
            "order_line_status": 19
          },
          {
            "order_line_id": 629.0,
            "customer_id": 92,
            "total_amount": 63200.0,
            "created_on": "31-12-2021 00:00:00",
            "payment_type": "N.A",
            "item_status": "Draft",
            "image": "{\"file_data\": [{\"storage_type\": \"os\", \"user_id\": 3, \"file_id\": 482, \"media_id\": \"483d903e-4be0-4bdb-a1ac-9f5f080d6593\", \"media_name\": \"acer.jpg\", \"media_data\": \"https://intello-ecom.s3.amazonaws.com/file/2022-07-07/15-hrs/483d903e-4be0-4bdb-a1ac-9f5f080d6593.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVHGEEXKYLZ4TPNMQ%2F20220712%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220712T135121Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=d03d392dcfbbdeddfa1e2331978539bc821621d900934b313989564b341cbb72\"}]}",
            "payment_status_id": 3,
            "product_name": "Acer Aspire 7",
            "product_id": 142.0,
            "subscription_cycle": 0,
            "subscription_period": "NA",
            "subscription_from_date": "0",
            "subscription_to_date": "0",
            "recurring_id": 256,
            "recurring_name": " ₹20000.00 will be billed every day",
            "rec_price": 20000.0,
            "frequency": "day",
            "cycle": 1.0,
            "symbol_left": "₹",
            "net_amount": 60000.0,
            "order_line_status": 19
          }
        ]
      },
      {
        "order_id": 943,
        "created_on": "31-12-2021 00:00:00",
        "order_status": "Draft",
        "payment_type": "Pending",
        "total_ordered_amount": "3317091.74",
        "details": [
          {
            "order_line_id": 630.0,
            "customer_id": 92,
            "total_amount": 2960.0,
            "created_on": "31-12-2021 00:00:00",
            "payment_type": "Pending",
            "item_status": "Draft",
            "image": "{\"file_data\": [{\"storage_type\": \"os\", \"user_id\": 3, \"file_id\": 156, \"media_id\": \"689e91ee-4196-4111-94e7-3d83ac8f6679\", \"media_name\": \"Amul1.jpg\", \"media_data\": \"https://intello-ecom.s3.amazonaws.com/file/2021-09-06/15-hrs/689e91ee-4196-4111-94e7-3d83ac8f6679.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVHGEEXKYLZ4TPNMQ%2F20220712%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220712T135121Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=da3444a74dc603e1fafc7399522ef79ef7957ff72f41983c164d0ff5e644ac29\"}]}",
            "payment_status_id": 3,
            "product_name": "Amul Unsalted Butter 500 g",
            "product_id": 553.0,
            "subscription_cycle": 0,
            "subscription_period": "NA",
            "subscription_from_date": "0",
            "subscription_to_date": "0",
            "recurring_id": 0,
            "recurring_name": null,
            "rec_price": NaN,
            "frequency": null,
            "cycle": NaN,
            "symbol_left": "₹",
            "net_amount": 11840.0,
            "order_line_status": 19
          }
        ]
      },
    ]
  }

  imgurl;
  noItemImage;
  customerIdForReorder;
  productIdForReorder;
  orderIdForReorder;
  subscriptionTodate;
  confrmcodFlag = false;
  constructor(private myorder: MyorderService, public dialog: MatDialog, private route: ActivatedRoute, private router: Router,
    private spinner: NgxSpinnerService, private snack: MatSnackBar, private common: CommonService, private ps: PlaceOrderService,
    public auth: AuthService, private menu: MenuService) {
    this.imgurl = environment.imageURL;
  }
  ord: myOrder = new myOrder();
  msg;
  logedSeeionId;
  logedCustomerId;
  logedEmailId;
  logedUserName;
  StatusReport;
  repayCondition: Boolean;
  paymentWindow;
  tenantId;
  razorpayOrderId;
  stripeFlag = false;
  paypalFlag = false;
  razorFlag = false;
  codFlag = false
  currencyCode;
  orderTotalAmnt;
  ngOnInit(): void {
    this.logedSeeionId = sessionStorage.getItem('sessionId');
    this.logedCustomerId = sessionStorage.getItem('customerId');
    this.logedEmailId = sessionStorage.getItem('userEmail');
    this.logedUserName = sessionStorage.getItem('userdata');
    this.tenantId = sessionStorage.getItem('tenantId');
    this.getMyOrders();
    this.reasonsApiCalling();
  }
  /**
           * @remarks Get Order Details
           * @author  
           * @version 0.1
           */
  getMyOrders(): any {
    this.spinner.show();
    const body = { order_op_type: "product_details", session_id: this.logedSeeionId, customer_id: this.logedCustomerId, limit: "50", offset: 0 };
    this.myorder.getSummaryProducts(body).subscribe((data) => {
      this.ord.data = Array<OrderData>();
      if (data.res_status === false) {
        this.noItemImage = true;
        this.spinner.hide();
      }

      // -------------------------old code-------------------------------------------
      else {
        this.spinner.hide();
        this.noItemImage = false;
        data.data.map((item) => {
          const dataset = new OrderData();
          dataset.customerId = item.customer_id;
          this.customerIdForReorder = item.customer_id;
          this.productIdForReorder = item.product_id;
          this.orderIdForReorder = item.order_id;
          dataset.productId = item.product_id;
          dataset.orderId = item.order_id;
          dataset.name = item.product_name;
          dataset.price = item.net_amount;
          dataset.orderLineId = item.order_line_id;
          dataset.subFromDate = item.subscription_from_date;
          dataset.recurringId = item.recurring_id;
          dataset.subCycle = item.subscription_cycle;
          dataset.subDuration = item.subscription_period;
          dataset.recurringName = item.recurring_name;
          dataset.subToDate = item.subscription_to_date;
          dataset.totalAmount = item.total_amount;
          dataset.code = item.code
          dataset.itemStatus = item.item_status;
          dataset.cancelledDate = item.cancelled_on;
          dataset.paymentStatus = item.payment_type;
          dataset.subscriptionTodatee = item.subscription_to_date;
          const covertDate = item.created_on;
          const a = covertDate.split(" ");
          dataset.orderedDate = a[0];
          dataset.status = item.item_status;
          dataset.currencyIndicator = item.symbol_left;
          const imageParse = JSON.parse(item.image);
          if (imageParse.file_data) {
            imageParse.file_data.map((itemImg => {
              dataset.image = itemImg.media_data;
            }));
          }
          else {
            dataset.image = imageParse.data;
          }
          this.ord.data.push(dataset);
        });
      }
    });
  }

  orderDetails(orderData) {
    const oderInfo = JSON.stringify(orderData);
    const encoded = encodeURI(oderInfo);
    this.router.navigate(['/myorderdetails', encoded]);
  }
  /**
            * @remarks Ratiing And Review the Product
            * @params ProductInfo
            * @author  
            * @version 0.1
            */
  handleRatingAndReview(productInfo) {
    const productData = JSON.stringify(productInfo);
    const encoded = encodeURI(productData);
    this.router.navigate(['/myorderreview', encoded]);
  }
  handleRepay(oId, pId, line_id) { }
  /**
   * @remarks Item want to Reorders
   * @params OrderId and ProductId
   * @author  
   * @version 1.0
  */

  handleReorder(oId, pId) {
    let body = {
      "order_op_type": "re_order_details", "customer_id": this.logedCustomerId,
      "order_id": oId, "product_id": [pId], tenant_id: this.tenantId,
      "session_id": this.logedSeeionId,
      "login": true, "quantity": 1
    }
    body = this.common.referenceIdValidation(body)
    const success = this.getAddToCartSuccess.bind(this);
    const error = this.onErrorAddToCart.bind(this);
    this.common.http.post('history', body, success, error);
  }
  handleReturn(oId, pId, line_id) {
    this.router.navigate(['/productReturns'], { queryParams: { OrdersId: oId, productsId: pId, LineId: line_id } }
    );
  }

  /**
    * @remarks Cancel Order
    * @author  Devi
    * @version 1.0
  */
  cancelOrder(oId, pId, lineId) {
    this.spinner.show()
    let body = { order_id: oId, order_line_id: [lineId], customer_id: this.logedCustomerId }
    this.myorder.cancelOrder(body).subscribe((data) => {
      this.spinner.hide()
      if (data.res_status === true) {
        this.snack.open(data.msg, 'Ok', { duration: 5000 });
        this.getMyOrders();
      } else {
        this.snack.open(data.msg, 'Ok', { duration: 5000 });
      }
    })
  }

  /**
    * @remarks Reasons Api
    * @author  
    * @version 1.0
  */
  reasonsApiCalling() {
    const body = {
      "sales_return_op_type": "drop_down"
    }
    const success = this.reasonsApiSuccess.bind(this);
    const error = this.reasonsApionError.bind(this);
    this.common.http.post('salesreturn', body, success, error);
  }
  reasonsApiSuccess(data) { }

  reasonsApionError(data) { }

  getAddToCartSuccess(data): any {
    this.snack.open(data.msg, 'Ok', { duration: 2000 });
    this.menu.passValue(data.cart_count);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onErrorAddToCart(data) {
    this.snack.open(data, 'Ok', { duration: 2000 });
  }

  handleItemReturn(data) { }

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

  repayClick(paymentPopup, item) {
    this.orderTotalAmnt = item.totalAmount;
    this.currencyCode = item.code
    this.paymentWindow = this.dialog.open(paymentPopup, { width: '50%', height: '305px', disableClose: true });
    this.stripeFlag = false;
    this.paypalFlag = false;
    this.razorFlag = false;
    this.codFlag = false;
  }

  closepaymentDialog() {
    this.paymentWindow.close();
  }
  /**
   * @remarks CashOnDeliveryClick
   * @author  
   * @version 1.0
   */
  codClick(OID) {
    const body = {
      "customer_id": this.logedCustomerId,
      "session_id": this.logedSeeionId,
      "order_id": OID,
      "tenant_id": this.tenantId,
      "payment_type": "COD",
      "ref_id": "",
      "store_id": "",
      "url": "",
      "api_name": "",
      "tracking_id": "",
    };
    const success = this.codOnSucess.bind(this);
    const error = this.codOnError.bind(this);
    this.common.http.post('Cod', body, success, error);

  }
  codOnSucess(data) {
    if (data.res_status === true) {
      this.confrmcodFlag = true;
      this.snack.open(data.msg_1, 'Ok', { duration: 5000 });
      this.dialog.closeAll()
      this.getMyOrders();
    } else {
      this.snack.open(data.msg, 'Ok', { duration: 5000 });
    }
  }
  codOnError(data) { }

  confirmorderCodClick() {
    this.getMyOrders();
    this.closepaymentDialog();
  }

  rClick() {
    this.dialog.closeAll();
    const floatNuumber = parseFloat(this.orderTotalAmnt);
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
    const floatNuumber = parseFloat(this.orderTotalAmnt);
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
}
