import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../helper/common.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { TenantBasedDataService } from 'src/app/shared/services/tenant-based-data.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  orderID;
  ProduID;
  logedCustomerId;
  orderLineID;
  productArray: any;
  productSubArray: any[];
  customerArray: any;
  currencyIndicator;
  currencyIndicatorIND;
  CurrencyShowStr;
  taxArray;
  ArrayLen;
  currencyId;
  invoiceFlag = false;
  paramRoute;
  tenantAddress: any;
  constructor(private common: CommonService, private http: HttpClient, private activatedRoute: ActivatedRoute, private router: Router, private tenantDataService: TenantBasedDataService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.orderID = params.OrdersId;
      this.paramRoute = params.paramRoute
      this.logedCustomerId = sessionStorage.getItem('customerId');
    })
    this.currencyId = sessionStorage.getItem('currencyId')
    this.getDetails();
    this.getTenantAddress();
  }
  /**
   * @remarks Get Invoice Details
   * @author  Ramana.majeti
   * @version 1.0
   */
  getDetails() {
    let body;
    body = {
      order_op_type: "invoice_details",
      order_id: this.orderID,
    };
    const success = this.getDetailOnSucess.bind(this);
    const error = this.getDetailOnError.bind(this);
    this.common.http.post('history', body, success, error);
  }
  getDetailOnSucess(data) {
    if (data.res_status === true) {
      this.productArray = data.invoice_details;
      this.customerArray = this.productArray.Customer_data;
      this.productSubArray = this.productArray.Product_data;
      this.taxArray = this.productArray.tax_name;
      const ArrayL = this.taxArray[0];
      this.ArrayLen = Object.keys(ArrayL).length;
      this.currencyIndicator = this.productSubArray[0].currency_indicator;
      this.CurrencyShowStr = this.productSubArray[0].currency_indicator;
      if (this.currencyIndicator == "$") {
        this.currencyIndicatorIND = false;
        this.currencyIndicator = true;
      }
      else {
        this.currencyIndicatorIND = true;
        this.currencyIndicator = false;
      }
    } else { }
  }

  get valueWithKeys() {
    return Object.keys(this.taxArray[0]);
  }

  get valueWithvalues() {
    return Object.values(this.taxArray[0]);
  }

  getDetailOnError(data) { }
  print() {
    window.print();
  }
  back() {
    this.router.navigate(['/myorderdetails', this.paramRoute]);
  }
  getTenantAddress() {
    this.tenantAddress = this.tenantDataService.getTenantAddress()
  }
}
