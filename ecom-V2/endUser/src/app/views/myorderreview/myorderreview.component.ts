import { Component, OnInit } from '@angular/core';
import { MyorderreviewService } from './service/myorderreview.service';
import { myOrderReview } from './modal/myorderreview-modal';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../helper/common.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UtilsService } from '../../helper/utils.service';
@Component({
  selector: 'app-myorderreview',
  templateUrl: './myorderreview.component.html',
  styleUrls: ['./myorderreview.component.scss']
})
export class MyorderreviewComponent implements OnInit {
  ord: myOrderReview = new myOrderReview();
  selectProductId: any;
  currentRate = 0;
  title = '';
  customerreviewtext: any;
  productDetails: any;
  usernameForReviewTitle;
  logedSeeionId;
  logedCustomerId;
  logedEmailId;
  logedUserName;
  constructor(private myorderreview: MyorderreviewService, private route: ActivatedRoute,
    private router: Router, private snack: MatSnackBar, private common: CommonService,
    private utils: UtilsService) { }

  ngOnInit(): void {
    this.logedSeeionId = sessionStorage.getItem('sessionId');
    this.logedCustomerId = sessionStorage.getItem('customerId');
    this.logedEmailId = sessionStorage.getItem('userEmail');
    this.logedUserName = sessionStorage.getItem('userdata');
    const id = this.route.snapshot.paramMap.get('id');
    const encoded = decodeURI(id);
    const prodInfo = JSON.parse(encoded);
    this.productDetails = prodInfo;
    this.selectProductId = prodInfo.productId;
    const info = this.utils.getUserInfo();
    const fName = info.firstName;
    this.usernameForReviewTitle = sessionStorage.getItem('userdata');
    if (this.usernameForReviewTitle == null) {
      this.usernameForReviewTitle = fName;
    }
  }

  // Product Rating
  handleSubmitReview(): any {
    const body = {
      review_op_type: 'insert',
      data: {
        title: this.title,
        author: this.usernameForReviewTitle,
        customer_id: this.logedCustomerId,
        product_id: this.selectProductId,
        text: this.customerreviewtext,
        rating: this.currentRate,
        date_added: new Date(),
        status: true
      }
    };
    const success = this.handleSubmitReviewSuccess.bind(this);
    const error = this.onError.bind(this);
    if (this.currentRate === 0) {
      this.snack.open('Please give rating', 'ok', { duration: 3000 });
    }
    else if (this.customerreviewtext === '' || this.customerreviewtext === undefined) {
      this.snack.open('Please enter Description', 'ok', { duration: 3000 });
    }
    else {
      this.common.http.post('review', body, success, error);
    }

  }
  handleSubmitReviewSuccess(data): any {
    if (data.status === 200 || data.res_status === true) {
      this.snack.open('Thanks for reviewed', 'ok', { duration: 3000 });
      this.router.navigate(['/myorders']);
    }
  }
  onError(error): any {
    this.snack.open(error, 'ok', { duration: 3000 });
  }
  goToProductView(prodId): any {
    this.router.navigate(['/productDetail', prodId]);
  }

}
