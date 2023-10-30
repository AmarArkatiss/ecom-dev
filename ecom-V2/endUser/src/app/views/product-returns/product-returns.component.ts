import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../helper/common.service';
import { HttpClient, } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-product-returns',
  templateUrl: './product-returns.component.html',
  styleUrls: ['./product-returns.component.scss']
})
export class ProductReturnsComponent implements OnInit {
  imgurl;
  constructor(private common: CommonService, private snack: MatSnackBar, private http: HttpClient, private activatedRoute: ActivatedRoute, private router: Router) {
    this.imgurl = environment.imageURL;
  }

  isLinear = false;
  reasonInfo: [];
  reasonDatainfo: [];
  logedSeeionId;
  logedCustomerId;
  logedEmailId;
  logedUserName;
  logedPhone;
  orderID;
  ProduID;
  addressDetailsArray: [];
  reasonId;
  returnId;
  returnForm;
  dateArray: any[];
  datee;
  productDetailsArray: any;
  returnImage;
  returnImageArray;
  selectedImage;
  orderLineId;
  relatedProductsArray: any;
  imagesUrl1
  imagesUrl = [];
  tenantId;

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.orderID = params.OrdersId;
      this.ProduID = params.productsId;
      this.orderLineId = params.LineId;
    })
    this.logedSeeionId = sessionStorage.getItem('sessionId');
    this.logedCustomerId = sessionStorage.getItem('customerId');
    this.logedEmailId = sessionStorage.getItem('userEmail');
    this.logedUserName = sessionStorage.getItem('userdata');
    this.logedPhone = sessionStorage.getItem('telephone');
    this.tenantId = sessionStorage.getItem('tenantId');
    this.handleGetRegionByCountry();
    this.getDeliverAddressDetails();
    this.getReturnDetails();
    this.getproductdetails();
    this.relatedproductsApi();
    this.returnForm = {
      order_op_type: '', cmonnts: '',
    }
    const img1 = 'assets/images/add6.jpg';
    const img2 = 'assets/images/add7.jpg';
    const img3 = 'assets/images/add12.jpg';
    this.imagesUrl1 = [{ path: img1 }, { path: img3 }, { path: img2 },];
  }

  /**
           * @remarks Get Region Based on Country
           * @author  
           * @version 0.1
           */
  handleGetRegionByCountry() {
    const body = {
      "ordersdropdowns_op_type": "returns_dropdown"
    }
    const success = this.reasonsApiSuccess.bind(this);
    const error = this.reasonsApionError.bind(this);
    this.common.http.post('countryandregionsdropdown', body, success, error);
  }

  reasonsApiSuccess(data) {
    this.reasonInfo = data.Return_Action_Data;
    this.reasonDatainfo = data.Return_Reason_Data;
  }

  reasonsApionError(data) { }
  /**
           * @remarks Product Detail
           * @author  ramana.majeti 
           * @version 0.1
           */

  getproductdetails() {
    const body = {
      "order_op_type": "order_details", "order_id": this.orderID, "login": true, order_line_id: this.orderLineId,
      "customer_id": this.logedCustomerId, "product_id": this.ProduID, "session_id": this.logedSeeionId
    };
    const success = this.detailsSuccess.bind(this);
    const error = this.DetailsonError.bind(this);
    this.common.http.post('history', body, success, error);
  }

  detailsSuccess(data) {
    this.productDetailsArray = data.data.product_details;
    this.returnImage = this.productDetailsArray.image;
    var obj = JSON.parse(this.returnImage);
    this.returnImageArray = obj.file_data;
    this.selectedImage = this.returnImageArray[0].media_data;
    this.dateArray = this.productDetailsArray.order_status;
    this.datee = this.dateArray[0].created_on;
  }
  DetailsonError(data) { }

  handleReturns(returid) {
    this.returnId = returid;
  }

  handleReason(rid) {
    this.reasonId = rid;
  }

  returnsSuccess(data) {
    this.snack.open(data.msg, 'Ok', { duration: 1000 });
    this.router.navigate(['/myorders']);
  }
  returnsonError(data) {
    this.snack.open(data.msg, 'Ok', { duration: 2000 });
  }
  /**
   * @remarks Get Related Product List
   * @author  Ramana.majeti
   * @version 1.0
  */

  relatedproductsApi() {
    const body = {
      login: true, session_id: this.logedSeeionId,
      user_name: this.logedEmailId, op_type: true, currency_id: 4, offset: 0, limit: 10
    };
    const success = this.ViewRelatedProductsSuccess.bind(this);
    const error = this.onErrorRelatedProducts.bind(this);
    this.common.http.post('RelatedProductDetailsList', body, success, error);
  }
  ViewRelatedProductsSuccess(data) {
    this.relatedProductsArray = data.data.Product_Details;
  }

  onErrorRelatedProducts(data) { }
  /**
             * @remarks Product Return
             * @author  Ramana.majeti
             * @version 0.1
             */

  handleReturnsclk() {
    const body = {
      "return_op_type": "customer_return", "return_type": "partial", "customer_id": this.logedCustomerId,
      "tenant_id": this.tenantId, "product_id": [parseInt(this.ProduID)], "ordered_on": this.datee, "opened": "yes", "return_reason_id": this.reasonId,
      "firstname": "", "lastname": "", "quantity": 1, "return_action_id": this.returnId,
      "email": this.logedEmailId, "telephone": this.logedPhone, "comment": this.returnForm.cmonnts, "address_id": 92, "order_id": this.orderID,
    }
    const success = this.returnsSuccess.bind(this);
    const error = this.returnsonError.bind(this);
    this.common.http.post('customerreturn', body, success, error);
  }

  /**
           * @remarks Get Delivery Address Details
           * @author  ramana.majeti
           * @version 0.1
           */
  getDeliverAddressDetails(): any {
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
  getDeliverAddressDetailsSuccess(data) {
    this.addressDetailsArray = data.delivery_details;
  }
  getDeliverAddressDetailsError() { }
  /**
             * @remarks Get Return Details
             * @author  
             * @version 0.1
             */
  getReturnDetails() {
    const body = {
      "order_op_type": "order_details", "order_id": this.orderID, "login": true, order_line_id: this.orderLineId,
      "customer_id": this.logedCustomerId, "product_id": this.ProduID, "session_id": this.logedSeeionId
    };
    const success = this.detailsSuccess.bind(this);
    const error = this.DetailsonError.bind(this);
    this.common.http.post('history', body, success, error);
  }
}
