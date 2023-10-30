import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MyorderService } from '../affiliations/service/affiliation.service';
import { affiliateData, myOrder } from './modal/affiliations-modal';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from '../../helper/common.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MenuService } from 'src/app/layout/service/menu.service';
import 'sweetalert2/src/sweetalert2.scss';
import { MatDialog } from '@angular/material/dialog';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-affiliations',
  templateUrl: './affiliations.component.html',
  styleUrls: ['./affiliations.component.scss']
})
export class AffiliationsComponent implements OnInit {
  @ViewChild('affiliationDetails') AffiliationDetails: TemplateRef<any>;
  ord: myOrder = new myOrder();
  logedCustomerId: any;
  affiliateDetails: any;
  tenantId;
  constructor(private myorder: MyorderService, private route: ActivatedRoute, private router: Router,
    private spinner: NgxSpinnerService, private snack: MatSnackBar, private clipboard: Clipboard,
    private common: CommonService, readonly dialog: MatDialog,
    private menu: MenuService) { }

  ngOnInit(): void {
    this.logedCustomerId = sessionStorage.getItem('customerId');
    this.tenantId = sessionStorage.getItem('tenantId');
    this.getAffiliationList();
  }
  /**
            * @remarks Get AffiliationList Details
            * @author  
            * @version 1.0
            */
  getAffiliationList() {
    this.spinner.show();
    const body = { affiliate_op_type: 'affiliate_details_list', tenant_id: this.tenantId, customer_id: this.logedCustomerId };
    this.myorder.getAffiliateDetails(body).subscribe((data) => {
      this.ord.data = Array<affiliateData>();
      this.spinner.hide();
      if (data.res_status === true) {
        data.data.map((element) => {
          const dataset = new affiliateData();
          dataset.productId = element.type_id;
          dataset.productName = element.type_name;
          dataset.type = element.type;
          dataset.affiliateId = element.id;
          dataset.conversions = element.conversion_count;
          dataset.clicks = element.clicks_count;
          dataset.link = element.affiliate_link;
          this.ord.data.push(dataset);

        });
      } else {
        this.ord.data = []
      }
    })
  }
  /**
            * @remarks Get index Position
            * @param used indexposition  in Html Page
            * @author  
            * @version 1.0
            */
  getIndex(ds) {
    return this.ord.data.indexOf(ds);
  }

  view(affId) {
    this.dialog.open(this.AffiliationDetails, { position: { left: '15%' }, width: '100%' });
    this.spinner.show();
    const body = { affiliate_op_type: 'affiliate_details_view', tenant_id: 3, id: affId };
    this.myorder.getAffiliateDetails(body).subscribe((data) => {
      this.spinner.hide();
      this.ord.data = Array<affiliateData>();
      if (data.res_status === true) {
        this.affiliateDetails = data.data;
        this.getAffiliationList()
      }
    })
  }
  copyText(textToCopy: string) {
    this.clipboard.copy(textToCopy);
    this.snack.open('Copied', 'ok', { duration: 3000 });
  }
}
