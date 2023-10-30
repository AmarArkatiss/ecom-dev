import { Component, EventEmitter, OnDestroy, OnInit, Output, OnChanges, ViewChild, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../helper/common.service';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../services/shared.service';
import { SummaryService } from '../product-summary/service/summary.service';
import { ProductDetail, SummaryData } from '../product-summary/modal/summary-modal';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment.prod';
import { NgxSpinnerService } from 'ngx-spinner';
import { CookieService } from 'ngx-cookie-service';
import { MenuService } from 'src/app/layout/service/menu.service';


@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  listViewStatus: boolean;
  gridViewStatus: boolean;
  showwishlistform = true;
  showAddFolder = false;
  parentName: any;
  wishfolders = [{ folder: 'Default' }];
  folderName;
  folderList;
  sampleProductData: any[] = [];
  productView = 'grid';
  cartProduct = [];
  catName;
  folders = [];
  foldervisible = false;
  formhide = true;
  summaryData: SummaryData = new SummaryData();
  imgurl;
  searKy;
  noRecordsFlag = false;
  // Filter component Start//
  filterattrData = [];
  filtermanufdetails = [];
  filteroptdetails = [];
  filterpricelist = [];
  optiondetails = [];
  brandsData = [];
  catId;
  @Output() filteredData = new EventEmitter();
  attrDetails = [];
  manuf_details = [];
  opt_val_details = [];
  price_details = [];
  body;
  filterOptions;
  noImage = false;
  productList = [];
  productName = '';
  AddToCartStatus: any;
  msg;
  selectedCategoryId = '';
  logedSeeionId;
  logedCustomerId;
  logedEmailId;
  serchedInfodata: any;
  guestSessionId;
  tenantId;

  constructor(private route: ActivatedRoute, private ms: MenuService, private router: Router, private snack: MatSnackBar,
    private common: CommonService, private http: HttpClient, private shared: SharedService,
    private spinner: NgxSpinnerService, private cookieService: CookieService, private summary: SummaryService) {
    this.imgurl = environment.imageURL;
    window.scroll(0, 0);

  }
  ngOnDestroy(): void {
    /**
     * @remarks event for clear searched key value when exit the page
     * @author  Devi
     * @version 1.0
    */
    this.common.searchKey('empty');
  }


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const decoded = decodeURI(id);
    const serchedInfo = JSON.parse(decoded);
    this.serchedInfodata = serchedInfo;
    this.logedSeeionId = sessionStorage.getItem('sessionId');
    this.logedEmailId = sessionStorage.getItem('userEmail');
    this.guestSessionId = this.cookieService.get('GuestSessionIDdata');
    this.logedCustomerId = sessionStorage.getItem('customerId');
    this.tenantId = sessionStorage.getItem('tenantId');
    this.getProducts();
    this.getFolders();
    this.filters();
    this.common.aClickedEvent
      .subscribe((data: any) => {
        this.filters();
      });
    this.common.currencyClickedEvent
      .subscribe((data: any) => {
        this.filters();
      });

    /**
     * @remarks Get searched data from layout component
     * @author  Devi
     * @version 1.0
    */
    this.common.searchEvent
      .subscribe((data) => {
        this.serchedInfodata = data
        this.getProducts();
        this.filters();
      });
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.filters();
  }

  goToProductsView(id): void {
    this.router.navigate(['/productDetail', id]);
  }

  /**
           * @remarks Get Searched products 
           * @author  
           * @version 1.0
           */
  getProducts(): any {
    this.summaryData.productDetails = Array<ProductDetail>();
    this.serchedInfodata.map((item => {
      const productDataset = new ProductDetail();
      productDataset.categoryId = item.category_id;
      productDataset.description = item.description;
      productDataset.discountPrice = item.discount_price;
      productDataset.offPrice = item.discount_off_price;
      productDataset.averageRating = item.average_rating;
      productDataset.ratingCount = item.rating_count;
      productDataset.reviewCount = item.review_count;
      const imageParse = JSON.parse(item.image);
      if (imageParse.file_data) {
        imageParse.file_data.map((itemImg => {
          productDataset.image = itemImg.media_data;
        }));
      }
      else {
        productDataset.image = imageParse.data;
      }
      productDataset.name = item.name;
      productDataset.price = item.price;
      productDataset.productId = item.product_id;
      productDataset.sortOrder = item.sort_order;
      productDataset.symbolLeft = item.type_symbol;
      productDataset.priceType = item.price_type;
      productDataset.wishlistflag = item.wishlist_status;
      productDataset.currencyIndicator = item.currency_indicator;
      productDataset.wishlistStatusId = item.wishlist_status_id;
      productDataset.categoryId = item.category_id;
      this.catId = productDataset.categoryId;
      this.summaryData.productDetails.push(productDataset);
    }));
    this.spinner.hide();
  }
  getProductsSuccess(data): any {
    if (data.res_status === true) {
    }
    else {
      this.snack.open(data.msg, 'Ok');
    }
  }
  /**
             * @remarks Item Add to cart
             * @author  
             * @version 0.1
             */
  addToCart(product): any {
    this.router.navigate(['/productDetail', product.productId]);
  }

  onError(data) { }

  AddtoCartSuccess(data): any {
    this.AddToCartStatus = data.data;
  }
  /**
             * @remarks Grid View
             * @author  
             * @version 0.1
             */

  gridViewShow(event) { }
  /**
           * @remarks List View
           * @author  
           * @version 0.1
           */
  listViewShow(event) { }

  addNewFolder(): any {
    this.showwishlistform = false;
    this.showAddFolder = true;
  }

  //Adding folder to item 
  /**
             * @remarks  Add to folder For item want to add to folder
             * @author  
             * @version 0.1
             */
  addFolder(): any {
    let body;
    if (this.logedCustomerId !== null) {
      body = {
        folder_op_type: 'create', tenant_id: this.tenantId, parent_folder_id: 0, folder_name: this.folderName,
        customer_id: this.logedCustomerId, session_id: this.logedSeeionId, login: true,
      };

    }
    else {
      body = {
        folder_op_type: 'create', parent_folder_id: 0, folder_name: this.folderName,
        session_id: this.guestSessionId, tenant_id: this.tenantId, login: false,
      };
    }
    this.summary.addFolders(body).subscribe((data) => {
      this.snack.open(data.msg, "OK", { duration: 1000 });
      if (data.res_status === true) {
        this.foldervisible = false;
        this.formhide = true;
        this.getFolders();
      }
    });
    this.folderName = '';
  }

  gridView() {
    this.productView = 'grid';
  }
  listView() {
    this.productView = 'list';
  }
  /**
             * @remarks Get Folders List
             * @author  
             * @version 0.1
             */
  getFolders(): any {
    this.summary.getFolders().subscribe((data) => {
      if (data.res_status === true) {
        this.folders = data.folders_list;
        this.folderList = this.folders.length > 0 ? this.folders[0].folder_id : ''
      }
    });
  }
  showfolder(): any {
    this.foldervisible = true;
    this.formhide = false;
  }

  hidefolder(): any {
    this.foldervisible = false;
    this.formhide = true;
  }
  // item add to WishList

  /**
             * @remarks Item Add to WishList 
             * @author  
             * @version 0.1
             */
  addtoWishlist(totData, index): void {
    this.spinner.show();
    let body
    if (this.logedCustomerId !== null) {
      body = {
        wishlist_op_type: 'add', tenant_id: this.tenantId, customer_id: this.logedCustomerId, session_id: this.logedSeeionId,
        product_id: totData.productId, folder_id: this.folderList
      };
    } else {
      body = { wishlist_op_type: 'add', tenant_id: this.tenantId, product_id: totData.productId, folder_id: this.folderList, session_id: this.guestSessionId };
    }
    this.summary.addToWishlist(body).subscribe((data) => {
      this.ms.passWishlistValue(data.wishlist_count);
      if (data.res_status === true) {
        this.trigger.closeMenu();
        this.snack.open(data.msg, 'Ok');
        this.summaryData.productDetails[index].wishlistflag = 0;
      }
      else {
        this.snack.open(data.msg + '- Please select folder', 'Ok');
      }
      this.spinner.hide();
    });
  }

  cartClk(pdetal) {
    let priceCal;
    const pricedisCheck = pdetal.price;
    let body;
    if (this.logedCustomerId !== null) {
      body = {
        login: true, customer_id: this.logedCustomerId, session_id: this.logedSeeionId,
        product_id: pdetal.productId,
        recurring_id: 0,
        total_amount: 0,
        quantity: 1,
        option: []
      };
    }
    else {
      body = {
        login: false, session_id: this.guestSessionId,
        product_id: pdetal.productId,
        recurring_id: 0,
        total_amount: 0,
        quantity: 1,
        option: []
      };
    }
    const success = this.AddToCartSuccess.bind(this);
    const error = this.onErrorAddToCart.bind(this);
    this.common.http.post('Cart', body, success, error);
  }
  AddToCartSuccess(data) {
    this.snack.open(data.msg, 'Ok', { duration: 2000 });
    this.ms.passValue(data.cart_count);
  }

  onErrorAddToCart(data) {
    this.snack.open(data.msg, 'Ok', { duration: 2000 });
  }

  /**
   * @remarks Remove Item from WishList
   * @author  
   * @version 0.1
  */
  removeWishlist(i, wishlistStatusId): any {
    let body;
    if (this.logedCustomerId !== null) {
      body = { wishlist_op_type: 'delete', wishlist_id: wishlistStatusId, tenant_id: this.tenantId, session_id: this.logedSeeionId, customer_id: this.logedCustomerId };
    } else {
      body = { wishlist_op_type: 'delete', wishlist_id: wishlistStatusId, tenant_id: this.tenantId, session_id: this.guestSessionId };
    }
    this.summary.deleteWishlist(body).subscribe((data) => {
      this.ms.passWishlistValue(data.wishlist_count);
      if (data.res_status === true) {
        this.snack.open(data.msg, 'Ok');
        this.summaryData.productDetails[i].wishlistflag = 1;
        this.snack.open('Item removed from Wishlist', 'Ok', { duration: 3000 });
      }
    });
  }

  filters() {
    let body = { category_id: parseInt(this.catId) };
    body = this.common.withoutDataStoreValidation(body);
    const success = this.filtersSuccess.bind(this);
    const error = this.onError.bind(this);
    this.common.http.post('filter', body, success, error);
  }

  filtersSuccess(data): any {
    if (data.res_status === true) {
      this.filterattrData = data.data.attr_details;
      this.filtermanufdetails = data.data.manuf_details;
      this.filteroptdetails = data.data.opt_details;
      this.filterpricelist = data.data.price_range;
      this.brandsData = data.data.Brands;
      for (let i = 0; i < this.filteroptdetails.length; i++) {
        for (let a = 0; a < this.filteroptdetails[i].option_details.length; a++) {
          this.optiondetails.push(this.filteroptdetails[i].option_details[a]);
        }
      }
    }
  }

  changeFilter(event, name, value, index, data): any {
    this.noImage = false;
    if (name === 'attr') {
      if (value && event.checked) {
        this.attrDetails.push(data);
      } else {
        this.attrDetails.map((item, j) => {
          if (item === data) {
            this.attrDetails.splice(j, 1)
          }
        });
      }
    } else if (name === 'brand') {
      if (value && event.checked) {
        this.manuf_details.push(data);
      } else {
        this.manuf_details.map((item, j) => {
          if (item === data) {
            this.manuf_details.splice(j, 1);
          }
        });
      }
    } else if (name === 'optiondetails') {
      if (value && event.checked) {
        this.opt_val_details.push(data);
      } else {
        this.opt_val_details.map((item, j) => {
          if (item === data) {
            this.opt_val_details.splice(j, 1);
          }
        });
      }
    } else if (name === 'price') {
      if (value && event.checked) {
        this.price_details.push(data);
      } else {
        this.price_details.map((item, j) => {
          if (item === data) {
            this.price_details.splice(j, 1);
          }
        });
      }
    }
    this.filterOptions = {
      attr_details: this.attrDetails, manuf_details: this.manuf_details,
      opt_val_details: this.opt_val_details, price_details: this.price_details, category_id: [+this.catId]
    };
    if (this.attrDetails.length === 0) {
      delete this.filterOptions["attr_details"];
    }
    if (this.manuf_details.length === 0) {
      delete this.filterOptions["manuf_details"];
    }
    if (this.opt_val_details.length === 0) {
      delete this.filterOptions["opt_val_details"];
    }
    if (this.price_details.length === 0) {
      delete this.filterOptions["price_details"];
    }
    let body;
    if (this.logedCustomerId !== null) {
      body = {
        login: true,
        api_name: "ProductDetailsList",
        session_id: this.logedSeeionId,
        tenant_id: this.tenantId,
        user_name: this.logedEmailId, data: [{ offset: 0, limit: 20, "filter_data": this.filterOptions }]
      };
    }
    else {
      body = {
        login: false,
        api_name: "ProductDetailsList",
        session_id: this.guestSessionId,
        tenant_id: this.tenantId,
        data: [{ offset: 0, limit: 20, "filter_data": this.filterOptions }]
      };
    }
    body = this.common.storeValidation(body);
    body = this.common.referenceIdValidation(body);
    this.summaryData.productDetails = Array<ProductDetail>();
    this.spinner.show();
    this.summary.getSummaryProducts(body).subscribe(
      (data) => {
        if (data.msg === 'No Records Found') {
          this.noImage = true;
        }
        if (data.res_status === true) {
          this.summaryData.productDetails = [];
          this.noImage = false;
          data.data.Product_Details.map((item => {
            const productDataset = new ProductDetail();
            productDataset.categoryId = item.category_id;
            productDataset.offPrice = item.discount_off_price;
            productDataset.description = item.description;
            productDataset.discountPrice = item.discount_price;
            const imageParse = JSON.parse(item.image);
            if (imageParse.file_data) {
              imageParse.file_data.map((itemImg => {
                productDataset.image = itemImg.media_data;
              }));
            }
            else {
              productDataset.image = imageParse.data;
            }
            productDataset.name = item.name;
            productDataset.price = item.price;
            productDataset.averageRating = item.average_rating;
            productDataset.ratingCount = item.rating_count;
            productDataset.reviewCount = item.review_count;
            productDataset.productId = item.product_id;
            productDataset.sortOrder = item.sort_order;
            productDataset.symbolLeft = item.symbol_left;
            productDataset.priceType = item.price_type;
            productDataset.wishlistflag = item.wishlist_status;
            productDataset.currencyIndicator = item.currency_indicator;
            productDataset.wishlistStatusId = item.wishlist_status_id;
            this.summaryData.productDetails.push(productDataset);
          }));
          this.spinner.hide();
        } else {
          this.msg = data.msg;
          this.spinner.hide();
          this.noImage == false;
        }
      },
      (err) => {
      }
    );
  }
}