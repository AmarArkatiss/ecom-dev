import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../helper/common.service';


@Component({
  selector: 'app-vocher-details',
  templateUrl: './vocher-details.component.html',
  styleUrls: ['./vocher-details.component.scss']
})
export class VocherDetailsComponent implements OnInit {
  constructor(private common: CommonService) { }
  VocherArray: any[];
  ngOnInit(): void {
    this.getVochers();
  }
  /**
         * @remarks Get Vochers List
         * @author 
         * @version 0.1
         */

  getVochers() {
    const custID2 = sessionStorage.getItem('customerId');
    const body = { "voucher_op_type": "sent", "customer_id": custID2 };
    const success = this.VochersOnSuccess.bind(this);
    const error = this.VochersonError.bind(this);
    this.common.http.post('VoucherUi', body, success, error);
  }
  VochersOnSuccess(data) {
    this.VocherArray = data.data;
  }
  VochersonError(data) { }

}
