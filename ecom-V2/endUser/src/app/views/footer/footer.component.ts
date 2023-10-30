import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Clipboard } from '@angular/cdk/clipboard';
import { NgxSpinnerService } from 'ngx-spinner';
import { SummaryService } from '../product-summary/service/summary.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from 'src/app/helper/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TenantBasedDataService } from 'src/app/shared/services/tenant-based-data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @ViewChild('shareDetails') ShareDetails: TemplateRef<any>;
  imgurl;
  url;
  logedEmailId;
  searchedKey;
  logedCustomerId;
  logedSeeionId;
  logedUserName;
  tenantId;
  storeDetailsArray = [];
  storeId;
  logo;
  mainLogo;
  orgName: any;
  storeName;
  tenantAddress: any;
  tenantFooterData: any;
  constructor(private snack: MatSnackBar, private common: CommonService, private router: Router, private activatedRoute: ActivatedRoute, private tenantDataService: TenantBasedDataService,
    readonly bottomSheet: MatBottomSheet, private clipboard: Clipboard,
    private summary: SummaryService, private spinner: NgxSpinnerService) {
    this.logedCustomerId = sessionStorage.getItem('customerId');
    this.logedEmailId = sessionStorage.getItem('userEmail');
    this.logedUserName = sessionStorage.getItem('userdata');
    this.tenantId = sessionStorage.getItem('tenantId');
  }

  ngOnInit(): void {
    this.storeId = sessionStorage.getItem('StoreId');
    this.logo = sessionStorage.getItem('storeLogo');
    this.storeName = sessionStorage.getItem('storeName');
    this.imgurl = environment.imageURL;
    this.common.aClickedEvent
      .subscribe((data: any) => {
        this.storeId = sessionStorage.getItem('StoreId');
        this.getStoreDetails();
      });
    this.common.viewStoreEvnt
      .subscribe((data: any) => {
        this.logo = sessionStorage.getItem('storeLogo');
        this.storeName = sessionStorage.getItem('storeName');
      })
    this.getTenantBasedLogo();
    this.getTenantAddress();
  }

  share() {
    this.spinner.show();
    const body = {
      affiliate_op_type: 'create_affiliate_link', data: [{
        affiliation_insert_type: 'affiliation', affiliation_details: [{
          General: {
            type: 'master_site',
            type_related_id: 1,
            created_by: this.logedEmailId,
            tenant_id: this.tenantId,
            type_related_name: 'home',
            customer_id: this.logedCustomerId
          }
        }]
      }]
    };
    this.summary.getShareLink(body).subscribe((data) => {
      this.spinner.hide();
      if (data.res_status === true) {
        this.url = data.link;
        this.bottomSheet.open(this.ShareDetails);
      }
    });
  }
  closeTemplateSheetMenu() {
    this.bottomSheet.dismiss();
  }
  copyText(textToCopy: string) {
    this.clipboard.copy(textToCopy);
    this.snack.open('Copied', 'ok', { duration: 3000 });
  }
  getStoreDetails() {
    const settings_store = {
      store_id: this.storeId
    }
    const success = this.onSuccessStoreDetails.bind(this);
    const error = this.onErrorStoreDetails.bind(this);
    this.common.http.post('StoreAddress', settings_store, success, error);
  }
  onSuccessStoreDetails(data) {
    this.storeDetailsArray = []
    if (data.res_status === true) {
      this.storeDetailsArray.push(data.data);
    } else {
      this.storeDetailsArray = []
    }
  }

  onErrorStoreDetails(data) { }
  getTenantBasedLogo() {
    this.mainLogo = this.tenantDataService.Logo;
    this.orgName = this.tenantDataService.orgName;
  }
  getTenantAddress() {
    this.tenantAddress = this.tenantDataService.getTenantAddress()
    this.tenantFooterData = this.tenantDataService.getTenantFooterData()
  }

  getHrefLink(item: string): string {
    // Define logic to return the URL for each item based on your requirements
    switch (item) {
      case 'Home':
        return 'https://www.veterneo.com/';
      case 'Contact Us':
        return 'https://www.veterneo.com/contact/';
      case 'About Us':
        return 'https://www.veterneo.com/about/';
      case 'Business Enquiry':
        return 'https://www.veterneo.com/business-enquiry/';
      default:
        return '#'; // Default to '#' for items with no specific URL
    }
  }
}
