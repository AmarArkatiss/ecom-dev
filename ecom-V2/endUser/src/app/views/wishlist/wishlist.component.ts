import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { WishlistService } from './service/wishlist.service';
import { Wishlist, wish } from './modal/wishlist-modal';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment.prod';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/layout/service/menu.service';
import { CommonService } from 'src/app/helper/common.service';
import { MatDialog, } from '@angular/material/dialog';
import { CartService } from '../cart/service/cart.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  @ViewChild('folderDetails') FolderDetails: TemplateRef<any>;
  response: any[] = [];
  wishData: wish = new wish();
  folders: any = [];
  folderList;
  folderName;
  msg;
  imgurl;
  noItemImage = false;
  logedSeeionId;
  logedCustomerId;
  logedEmailId;
  tenantId;
  logedUserName;
  selectedFolderId: any;
  guestSessionId;
  constructor(private wS: WishlistService, private formBuilder: FormBuilder, private snack: MatSnackBar, private ms: MenuService, private cart: CartService,
    private spinner: NgxSpinnerService, private router: Router, private common: CommonService, readonly dialog: MatDialog, private cookieService: CookieService) {
    this.imgurl = environment.imageURL;
  }

  ngOnInit(): void {
    this.logedSeeionId = sessionStorage.getItem('sessionId');
    this.logedCustomerId = sessionStorage.getItem('customerId');
    this.logedEmailId = sessionStorage.getItem('userEmail');
    this.logedUserName = sessionStorage.getItem('userdata');
    this.guestSessionId = this.cookieService.get('GuestSessionIDdata');
    window.scroll(0, 0);
    this.tenantId = sessionStorage.getItem('tenantId');
    this.getFolders();
    this.common.aClickedEvent
      .subscribe((data: any) => {
        this.getFolders();
        sessionStorage.removeItem('currencyId');
        sessionStorage.removeItem('currencyName');
      });
    this.common.currencyClickedEvent
      .subscribe((data: any) => {
        this.getFolders();
      });
  }

  getPersonWishlist(folderID, folderName): any {
    this.noItemImage = false;
    this.spinner.show();
    this.folderName = folderName;
    this.folderList = folderID;
    let body;
    if (this.logedCustomerId !== null) {
      body = { wishlist_op_type: "view", tenant_id: this.tenantId, customer_id: this.logedCustomerId, folder_id: this.folderList, status: 0, limit: 50, offset: 0, session_id: this.logedSeeionId };
    } else {
      body = { wishlist_op_type: "view", tenant_id: this.tenantId, folder_id: this.folderList, status: 0, limit: 50, offset: 0, session_id: this.guestSessionId };
    }
    body = this.common.withoutDataStoreValidation(body)
    this.wishData.wishlists = Array<Wishlist>();
    this.wS.getWishList(body).subscribe((resp) => {
      if (resp.res_status === true) {
        if (resp.wishlist.length === 0) {
          this.noItemImage = true;
        }
        this.spinner.hide();
        resp.wishlist.map((item) => {
          const dataset = new Wishlist();
          dataset.customerId = item.customer_id;
          dataset.folderId = item.folder_id;
          dataset.prodId = item.product_id;
          dataset.folderName = item.folder_name;
          dataset.model = item.model;
          const imageParse = JSON.parse(item.image);
          if (imageParse.file_data) {
            imageParse.file_data.map((itemImg => {
              dataset.image = itemImg.media_data;
            }))
          }
          else {
            dataset.image = imageParse.data;
          }
          dataset.productName = item.product_name;
          dataset.price = item.price;
          dataset.specialPrice = item.special_price;
          dataset.rating = item.rating;
          dataset.discountPrice = item.discount_price;
          dataset.offPrice = item.discount_off_price;
          dataset.averageRating = item.average_rating;
          dataset.ratingCount = item.rating_count;
          dataset.reviewCount = item.review_count;
          dataset.currencyIndicator = item.currency_indicator;
          dataset.wishlistId = item.wishlist_id;
          this.wishData.wishlists.push(dataset);
        })
      } else {
        this.noItemImage = true;
        this.msg = resp.msg;
        this.spinner.hide();
      }
    })
  }
  /**
  * @remarks Get Folders List
  * @author 
  * @version 1.0
  */
  getFolders(): any {
    this.wS.getFolders().subscribe((data) => {
      if (data.res_status === true) {
        this.folders = data.folders_list;
        this.folderList = this.folders.length > 0 ? this.folders[0].folder_id : ''
        this.folderName = this.folders.length > 0 ? data.folders_list[0].folder_name : ''
        this.getPersonWishlist(data.folders_list[0].folder_id, data.folders_list[0].folder_name)
      }
    })
  }
  /**
       * @remarks Delete Item From WishList
       * @author 
       * @version 0.1
  */
  deleteWishlist(wishlistdata, i): any {
    let body;
    if (this.logedCustomerId !== null) {
      body = { wishlist_op_type: "delete", tenant_id: this.tenantId, wishlist_id: wishlistdata.wishlistId, session_id: this.logedSeeionId, customer_id: this.logedCustomerId };
    } else {
      body = { wishlist_op_type: "delete", tenant_id: this.tenantId, wishlist_id: wishlistdata.wishlistId, session_id: this.guestSessionId };
    }
    this.wS.deleteWishlist(body).subscribe((data) => {
      this.ms.passWishlistValue(data.wishlist_count)
      this.getPersonWishlist(wishlistdata.folderId, wishlistdata.folderName)
      this.folderName = wishlistdata.folderName;
      this.folderList = wishlistdata.folderId;
      if (data.res_status === true) {
        this.snack.open(data.msg, 'Ok', { duration: 2000 });
        this.wishData.wishlists.splice(i, 1);
      }
    })
  }
  /**
       * @remarks navigate to Product Detail Page
       * @author 
       * @version 0.1
       */

  goToProductsView(pid) {
    this.router.navigate(['/productDetail', pid]);
  }

  addToCart(pidd, price) {
    let body;
    body = {
      login: true, customer_id: this.logedCustomerId, session_id: this.logedSeeionId,
      product_id: pidd,
      recurring_id: 0,
      total_amount: 0,
      quantity: 1,
      option: []
    };
    const success = this.AddToCartSuccess.bind(this);
    const error = this.onErrorAddToCart.bind(this);
    this.common.http.post('Cart', body, success, error);
  }

  AddToCartSuccess(data) {
    if (data.res_status === true) {
      this.snack.open(data.msg, 'Ok', { duration: 2000 });
      this.ms.passValue(data.cart_count);
    } else {
      this.snack.open(data.msg, 'Ok', { duration: 2000 });
      this.ms.passValue(data.cart_count);
    }
  }

  onErrorAddToCart(data) {
    this.snack.open(data.msg, 'Ok', { duration: 2000 });
  }

  folderDelete(data) {
    let body;
    if (this.logedCustomerId !== null) {
      body = {
        folder_op_type: "delete",
        folder_id: data.folder_id,
        tenant_id: this.tenantId,
        session_id: this.logedSeeionId,
        customer_id: this.logedCustomerId,
        login: true,
      }
    } else {
      body = {
        folder_op_type: "delete",
        folder_id: data.folder_id,
        tenant_id: this.tenantId,
        login: false,
        session_id: this.guestSessionId
      }
    }
    this.cart.deleteFolders(body).subscribe((data) => {
      this.snack.open(data.msg, 'ok', { duration: 3000 });
      this.getFolders()
      if (data.res_status === true) {
        this.ms.passWishlistValue(data.wishlist_count)
      }
    })
  }
  editFolder(data) {
    this.selectedFolderId = data.folder_id
    this.folderName = data.folder_name
    this.dialog.open(this.FolderDetails, { position: { left: '35%' }, width: '570px' });
  }
  Update() {
    let body;
    if (this.logedCustomerId !== null) {
      body = {
        "folder_op_type": "modify",
        "folder_id": this.selectedFolderId,
        "folder_name": this.folderName,
        "tenant_id": this.tenantId,
        session_id: this.logedSeeionId,
        customer_id: this.logedCustomerId,
        login: true,
      }
    } else {
      body = {
        "folder_op_type": "modify",
        "folder_id": this.selectedFolderId,
        "folder_name": this.folderName,
        "tenant_id": this.tenantId,
        login: false,
        session_id: this.guestSessionId
      }
    }
    this.cart.updateFolders(body).subscribe((data) => {
      this.snack.open(data.msg, 'ok', { duration: 3000 });
      if (data.res_status === true) {
        this.dialog.closeAll();
        this.folderName = '';
        this.getFolders()
      }
    })
  }
}
