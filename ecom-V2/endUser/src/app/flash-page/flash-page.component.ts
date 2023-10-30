import { Component, OnInit } from '@angular/core';
import { CommonService } from '../helper/common.service';
import { latestOrderData, mylatestOrder } from '../views/myorders/modal/myorder-modal';
import { MyorderService } from '../views/myorders/service/myorder.service';
@Component({
  selector: 'app-flash-page',
  templateUrl: './flash-page.component.html',
  styleUrls: ['./flash-page.component.scss']
})
export class FlashPageComponent implements OnInit {
  ord: mylatestOrder = new mylatestOrder();
  CustmrId: string;
  sessionId;
  addressDetailsArray = [];
  mobile: string;
  panelOpenState = false;
  norecordsFlag = false;
  tenantId;
  constructor(private myorder: MyorderService, private common: CommonService) {
    this.CustmrId = sessionStorage.getItem('customerId');
    this.sessionId = sessionStorage.getItem('sessionId');
    this.mobile = sessionStorage.getItem('telephone');
    this.tenantId = sessionStorage.getItem('tenantId');
  }

  ngOnInit(): void {
    this.getLatestOrders();
    this.getDeliverAddressDetails();
    this.common.addressUpdateEvnt.subscribe((data) => {
      this.getDeliverAddressDetails();
    })
  }
  getLatestOrders() {
    const body = { recent_orders_op_type: "select", customer_id: this.CustmrId, tenant_id: this.tenantId, session_id: this.sessionId };
    this.myorder.getLatestOrders(body).subscribe((data) => {
      this.ord.data = Array<latestOrderData>();
      if (data.res_status === true) {
        data.data.map((item) => {
          const dataset = new latestOrderData();
          dataset.orderId = item.order_id;
          dataset.orderLineId = item.order_line_id;
          dataset.productId = item.product_id;
          dataset.status = item.order_status;
          dataset.name = item.product_name
          this.ord.data.push(dataset);
        })
      }
      else {
        this.ord.data = [];
      }
    })
  }
  getDeliverAddressDetails(): any {
    this.addressDetailsArray = []
    const body = {
      "login": true,
      "customer_id": this.CustmrId,
      "session_id": this.sessionId,
      "op_delivery_type": "retrive",
      "address_no": 1
    };
    this.myorder.getAddressDetails(body).subscribe((data) => {
      if (data.res_status === true) {
        data.delivery_details.map((item) => {
          if (item.default_address === 0) {
            this.addressDetailsArray.push(item)
          }
        })
        this.norecordsFlag = false;
      } else {
        this.addressDetailsArray = [];
        this.norecordsFlag = true
      }
    })
  }
}
