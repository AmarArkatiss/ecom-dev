import { Component, EventEmitter, OnInit, Output, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../helper/common.service';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../services/shared.service';
import { SummaryService } from './service/summary.service';
import { AttrDetail, AttributeDetail, Brand, filterDataObject, ProductDetail, SummaryData, ReviewData, ReviewedProductDetail } from './modal/summary-modal';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment.prod';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Clipboard } from '@angular/cdk/clipboard';
import { UtilsService } from '../../helper/utils.service';
import { CookieService } from 'ngx-cookie-service';
import { MenuService } from 'src/app/layout/service/menu.service';
import { TenantBasedDataService } from 'src/app/shared/services/tenant-based-data.service';

@Component({
  selector: 'app-product-summary',
  templateUrl: './product-summary.component.html',
  styleUrls: ['./product-summary.component.scss']
})
export class ProductSummaryComponent implements OnInit {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  @ViewChild('shareDetails') ShareDetails: TemplateRef<any>;
  listViewStatus: boolean;
  gridViewStatus: boolean;
  showwishlistform = true;
  showAddFolder = false;
  parentName: any;
  productSummary;
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
  reviewData: ReviewData = new ReviewData();
  filterModelObject: filterDataObject = new filterDataObject();
  imageURL;

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
  url;
  currentURL;
  guestSessionId;
  optionTypeList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
  bannerImg
  // Filter Component End
  constructor(private route: ActivatedRoute, private ms: MenuService, private router: Router, private snack: MatSnackBar,
    private common: CommonService, private http: HttpClient, private shared: SharedService,
    private summary: SummaryService, private cookieService: CookieService, private spinner: NgxSpinnerService, private utils: UtilsService, private tenantDataService: TenantBasedDataService,
    readonly bottomSheet: MatBottomSheet, private clipboard: Clipboard) {
    this.imageURL = environment.imageURL;
  }
  productList = [];
  productName = '';
  AddToCartStatus: any;
  msg;
  selectedCategoryId = '';
  logedSeeionId;
  logedCustomerId;
  logedEmailId;
  currencyId;
  storeId;
  status: string;
  tenantId;
  topPosToStartShowing = 100;
  productCount;
  defaultCatBanner: any;
  ngOnInit(): void {
    window.scroll(0, 0);
    this.currentURL = window.location.href;
    this.selectedCategoryId = this.route.snapshot.paramMap.get('id');
    const currencyId = '';
    this.logedSeeionId = sessionStorage.getItem('sessionId');
    this.guestSessionId = this.cookieService.get('GuestSessionIDdata');
    this.logedCustomerId = sessionStorage.getItem('customerId');
    this.logedEmailId = sessionStorage.getItem('userEmail');
    this.storeId = sessionStorage.getItem('StoreId')
    this.currencyId = sessionStorage.getItem('currencyId')
    this.tenantId = sessionStorage.getItem('tenantId');
    if (this.logedEmailId == null) {
      const infoo = this.utils.getUserInfo();
      this.logedEmailId = infoo.email;
    }

    this.route.queryParams.subscribe(params => {
      this.status = params.status;
    })
    this.route.params.subscribe(params => {
      this.selectedCategoryId = params.id;
      this.catId = params.id;
      this.getProducts(params.id);
      this.filters(params.id);
      this.catName = params.name;
      this.scrollToTop();

    });

    setTimeout(() => {
      document.getElementById("mainheader").scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    },
      500);

    this.common.aClickedEvent
      .subscribe((data: any) => {
        this.getProducts(this.catId);
        this.filters(this.catId);
        this.storeId = sessionStorage.getItem('StoreId')
        this.scrollToTop();
      });
    this.common.currencyClickedEvent
      .subscribe((data: any) => {
        this.currencyId = sessionStorage.getItem('currencyId')
        this.getProducts(this.catId);
        this.filters(this.catId);
      });
    this.getFolders();
    this.getMiddleBanner();
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollPosition >= this.topPosToStartShowing) {
      this.scrollToTop();
    } else {
      this.scrollToTop();
    }
  }

  getMiddleBanner() {
    this.defaultCatBanner = this.tenantDataService.defaultCatBannerImg;
  }

  goToProductsView(id): void {
    this.router.navigate(['/productDetail', id]);
  }

  scrollToTop() {
    setTimeout(() => {
      document.getElementById('mainheader')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    },
      500);
  }

  //Store validation method
  storeValidation(body) {
    const storeId = sessionStorage.getItem('StoreId')
    const currencyId = sessionStorage.getItem('currencyId');
    if (this.storeId == null || this.storeId === 'all') {
      if (this.currencyId == null) {
        return body;
      } else {
        body.data[0]['currency_id'] = parseInt(this.currencyId);
        return body;
      }
    } else {
      if (this.currencyId == null) {
        body['store_id'] = this.storeId;
        return body;
      } else {
        body.data[0]['currency_id'] = parseInt(this.currencyId);
        body['store_currency_flag'] = 1
        body['store_id'] = this.storeId;
        return body;
      }
    }

  }


  /**
    * @remarks  Get products Details
    * @AddedBy Amar
    * @ModifiedBy Devi added store validations & changed the payloads
    * @version 1.0
   */
  getProducts(id): any {
    this.noImage = false;
    this.spinner.show();
    const url = sessionStorage.getItem('affiliateUrl')
    let body;
    if (this.logedSeeionId == null) {
      body = {
        login: false,
        session_id: this.guestSessionId,
        tenant_id: this.tenantId,
        api_name: "ProductDetailsList",
        data: [{
          offset: 0,
          limit: 20
        }]
      }
      body = this.common.storeValidation(body)
    } else {
      body = {
        login: true,
        session_id: this.logedSeeionId,
        user_name: this.logedEmailId,
        tenant_id: this.tenantId,
        api_name: "ProductDetailsList",
        data: [{
          offset: 0,
          limit: 20
        }]
      }
      body = this.common.storeValidation(body)
    }
    body = this.common.referenceIdValidation(body)
    body = this.brandValidation(body, id)
    this.summaryData.productDetails = Array<ProductDetail>();
    this.summary.getSummaryProducts(body).subscribe(
      (data) => {
        if (data.res_status === true) {
          this.spinner.hide();
          if (data.data.Product_Details.length === 0) {
            this.noImage = true;
          }
          this.productCount = data.data.Product_Details.length;
          data.data.Product_Details.map((item => {
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
            productDataset.productoffPrice = item.discount_off_price;
            productDataset.productId = item.product_id;
            productDataset.offPrice = item.discount_off_price;
            productDataset.sortOrder = item.sort_order;
            productDataset.symbolLeft = item.type_symbol;
            productDataset.priceType = item.price_type;
            productDataset.wishlistflag = item.wishlist_status;
            productDataset.currencyIndicator = item.currency_indicator;
            productDataset.wishlistStatusId = item.wishlist_status_id;
            this.summaryData.productDetails.push(productDataset);
          }));
          const image = data.data.category_banner
          if (image !== '') {
            const bannerImage = JSON.parse(image);
            if ('file_data' in bannerImage) {
              let imgArr = bannerImage.file_data;
              imgArr.map((element) => {
                if (element.storage_type === 'db') {
                  this.bannerImg = "data:image/png;base64," + element.media_data;
                } else {
                  this.bannerImg = element.media_data;
                }
              });
            } else {
              this.bannerImg = JSON.parse(image).data;
            }
          } else { this.bannerImg = '' }
          this.spinner.hide();
        } else {
          this.msg = data.msg;
          this.bannerImg = ''
          this.spinner.hide();
          this.noImage = true;
        }

      },
      (err) => {
      }
    );
  }
  brandValidation(body, id) {
    if (this.status != undefined) {
      body.data[0]['filter_data'] = { 'manufacturer_id': [id] };
      return body;
    } else {
      body.data[0]['filter_data'] = { 'category_id': [id] };
      return body;
    }
  }

  /**
 * @remarks Get top Review Products
 * @author  Devi
 * @version 1.0
 */
  getTopReviewedProducts(data) {
    let body;
    if (this.logedSeeionId == null) {
      body = {
        top_reviewed_op_type: "select",
        "login": false,
        data: [{
          offset: 0,
          limit: 20
        }]
      }
      body = this.common.storeValidation(body);
    } else {
      body = {
        top_reviewed_op_type: "select",
        login: true,
        user_name: this.logedEmailId,
        data: [{
          offset: 0,
          limit: 20
        }]
      }
      body = this.common.storeValidation(body);
    }
    body = this.brandValidation(body, data)
    this.reviewData.reviewProductDetails = Array<ReviewedProductDetail>();
    this.summary.getReviewProducts(body).subscribe(
      (data) => {
        if (data.res_status === true) {
          this.spinner.hide();
          data.data.map((item => {
            const productDataset = new ReviewedProductDetail();
            productDataset.discountPrice = item.discount_price;
            productDataset.averageRating = item.average_rating;
            productDataset.ratingCount = item.rating_count;
            productDataset.reviewCount = item.review_count;
            productDataset.helpRating = item.rating;
            productDataset.helpAuthor = item.author;
            productDataset.helpcoment = item.text;
            productDataset.helpDateAdded = item.date_added;
            productDataset.recentRating = item.recent_rating;
            productDataset.recentAuthor = item.recent_author;
            productDataset.recentComent = item.recent_review;
            productDataset.recentDateAdded = item.recent_date_added;
            const imageParse = JSON.parse(item.image);
            if (imageParse.file_data) {
              imageParse.file_data.map((itemImg => {
                productDataset.image = itemImg.media_data;
              }));
            }
            else {
              productDataset.image = imageParse.data;
            }
            productDataset.name = item.product_name;
            productDataset.price = item.price;
            productDataset.productId = item.product_id;
            productDataset.offPrice = item.discount_off_price;
            productDataset.currencyIndicator = item.currency_indicator;
            this.reviewData.reviewProductDetails.push(productDataset);
          }));
          this.spinner.hide();
        } else {
          this.msg = data.msg;
          this.snack.open(data.msg, 'Ok');
          this.spinner.hide();
        }
      },
      (err) => { }
    );
  }
  getProductsSuccess(data): any {
    this.productList = data.data;
  }

  /**
  * @remarks Navigate to product Detail page
  * @author  
  * @version 1.0
  */
  addToCart(product): any {
    this.router.navigate(['/productDetail', product.productId]);
  }
  onError(data) { }

  AddtoCartSuccess(data): any {
    this.AddToCartStatus = data.data;
  }

  addNewFolder(): any {
    this.showwishlistform = false;
    this.showAddFolder = true;
  }
  /**
   * @remarks Add folders to item in folders 
   * @author  
   * @version 1.0
  */
  addFolder(): any {
    let body;
    if (this.logedCustomerId !== null) {
      body = {
        folder_op_type: 'create', parent_folder_id: 0, tenant_id: this.tenantId, login: true,
        folder_name: this.folderName, customer_id: this.logedCustomerId, session_id: this.logedSeeionId
      };
    }
    else {
      body = {
        folder_op_type: 'create', parent_folder_id: 0, tenant_id: this.tenantId, login: false,
        folder_name: this.folderName, session_id: this.guestSessionId
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
    * @remarks Get  folders to List 
    * @author  
    * @version 1.0
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
  /**
  * @remarks Add  to item to WishList 
  * @author  
  * @version 1.0
  */
  addtoWishlist(totData, index): void {
    this.spinner.show();
    let body;
    if (this.logedCustomerId !== null) {
      body = {
        wishlist_op_type: 'add', tenant_id: this.tenantId, customer_id: this.logedCustomerId,
        product_id: totData.productId, folder_id: this.folderList, session_id: this.logedSeeionId
      };
    }
    else {
      body = {
        wishlist_op_type: 'add',
        product_id: totData.product_id, folder_id: this.folderList, session_id: this.guestSessionId
      };
    }
    this.summary.addToWishlist(body).subscribe((data) => {
      this.ms.passWishlistValue(data.wishlist_count)
      if (data.res_status === true) {
        this.spinner.hide();
        this.trigger.closeMenu();
        this.snack.open(data.msg, 'Ok', { duration: 2000 });
        this.summaryData.productDetails[index].wishlistflag = 0;
      }
      else {
        this.snack.open(data.msg + '- Please select folder', 'Ok', { duration: 2000 });
        this.spinner.hide();
      }
    });
  }

  getFilteredData(evt): any {
    this.spinner.show();
    if (evt.res_status === true) {
      this.summaryData.productDetails = [];
      evt.data.map((item => {
        const productDataset = new ProductDetail();
        productDataset.categoryId = item.category_id;
        productDataset.description = item.description;
        productDataset.discountPrice = item.discount_price;
        productDataset.offPrice = item.discount_off_price;
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
        productDataset.symbolLeft = item.symbol_left;
        productDataset.wishlistflag = item.wishlist_status;
        productDataset.currencyIndicator = item.currency_indicator;
        productDataset.wishlistStatusId = item.wishlist_status_id;
        this.summaryData.productDetails.push(productDataset);
      }));
      this.spinner.hide();
    } else {
      this.route.params.subscribe(params => {
        this.getProducts(params.id);
        this.catName = params.name;
      });
      this.spinner.hide();
    }
  }
  /**
  * @remarks Remove item From WishList 
  * @author  
  * @version 1.0
  */

  removeWishlist(i, wishlistStatusId): any {
    let body;
    if (this.logedCustomerId !== null) {
      body = { wishlist_op_type: 'delete', wishlist_id: wishlistStatusId, tenant_id: this.tenantId, session_id: this.logedSeeionId, customer_id: this.logedCustomerId };
    } else {
      body = { wishlist_op_type: 'delete', wishlist_id: wishlistStatusId, tenant_id: this.tenantId, session_id: this.guestSessionId };
    }
    this.summary.deleteWishlist(body).subscribe((data) => {
      this.ms.passWishlistValue(data.wishlist_count)
      if (data.res_status === true) {
        this.snack.open(data.msg, 'Ok', { duration: 2000 });
        // this.wishData.wishlists.splice(i, 1);
        this.summaryData.productDetails[i].wishlistflag = 1;
        this.snack.open('Item removed from Wishlist', 'Ok', { duration: 2000 });
      }
    });
  }
  /**
    * @remarks Item  add to ShopLater  
    * @author Ramana.majeti  
    * @version 1.0
    */
  shopLaterClk(p) {
    let body;
    if (this.logedCustomerId !== null) {
      body = {
        wishlist_op_type: 'shop_later', customer_id: this.logedCustomerId,
        product_id: p.productId, tenant_id: this.tenantId
      };
    }
    else {
      body = {
        wishlist_op_type: 'shop_later',
        product_id: p.productId
      };
    }
    const success = this.shoplaterOnSuccess.bind(this);
    const error = this.shoplaterOnError.bind(this);
    this.common.http.post('wishlist', body, success, error);
  }
  shoplaterOnSuccess(data) {
    this.snack.open(data.msg, 'ok', { duration: 2000 });
  }
  shoplaterOnError(data) { }

  /**
   * @remarks   Item  add to Cart  
   * @author  ramana.majeti
   * @version 0.1
  */
  cartClk(pdetal) {
    let priceCal;
    const pricedisCheck = pdetal.discountPrice;
    if (pricedisCheck >= 0) {
      priceCal = pdetal.discountPrice;
    }
    else {
      priceCal = pdetal.price;
    }
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
    this.summary.addToCart(body).subscribe((data) => {
      this.ms.passValue(data.cart_count);
      if (data.res_status === true) {
        this.snack.open(data.msg, 'Ok', { duration: 2000 });
      } else {
        this.snack.open(data.msg, 'Ok', { duration: 5000 });
      }
    });
  }

  AddToCartSuccess(data) {
    this.snack.open(data.msg, 'Ok', { duration: 2000 });
    this.ms.passValue(data.cart_count);
  }

  onErrorAddToCart(data) {
    this.snack.open(data.msg, 'Ok', { duration: 2000 });
  }

  filters(catId): any {
    let body = this.status != undefined ? { manufacturer_id: parseInt(catId) } : { category_id: parseInt(catId) }
    body = this.common.withoutDataStoreValidation(body);
    this.summary.filterView(body).subscribe((data) => {
      if (data.res_status === true) {
        this.filterModelObject.attr_details = new Array<AttrDetail>();
        data.data.attr_details.map((item) => {
          const dataset = new AttrDetail();
          dataset.attr_grp_name = item.attr_grp_name;
          dataset.attribute_group_id = item.attribute_group_id;
          dataset.attribute_details = new Array<AttributeDetail>();
          const details = item.attribute_details;
          details.map((test) => {
            const dataSetSub = new AttributeDetail();
            dataSetSub.attr_name = test.attr_name;
            dataSetSub.attribute_id = test.attribute_id;
            dataset.attribute_details.push(dataSetSub);
          })
          this.filterModelObject.attr_details.push(dataset);
        })
        this.filterModelObject.Brands = new Array<Brand>();
        data.data.Brands.map((item) => {
          const dataBrandset = new Brand();
          dataBrandset.manufacturer_id = item.manufacturer_id;
          dataBrandset.name = item.name;
          this.filterModelObject.Brands.push(dataBrandset);
        })
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
    });

  }

  changeFilter(event, name, value, index, data): any {
    this.spinner.show()
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
    const url = sessionStorage.getItem('affiliateUrl')
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
    this.summary.getSummaryProducts(body).subscribe(
      (data) => {
        this.spinner.hide();
        if (data.msg === 'No Records Found') {
          this.noImage = true;
        }
        if (data.res_status === true) {
          this.summaryData.productDetails = [];
          this.noImage = false;
          data?.data?.Product_Details?.map((item => {
            this.productCount = data?.data?.Product_Details.length;
            const productDataset = new ProductDetail();
            productDataset.categoryId = item.category_id;
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
            productDataset.offPrice = item.discount_off_price;
            productDataset.ratingCount = item.rating_count;
            productDataset.reviewCount = item.review_count;
            productDataset.productId = item.product_id;
            productDataset.sortOrder = item.sort_order;
            productDataset.symbolLeft = item.symbol_left;
            productDataset.wishlistflag = item.wishlist_status;
            productDataset.currencyIndicator = item.currency_indicator;
            productDataset.wishlistStatusId = item.wishlist_status_id;
            productDataset.productoffPrice = item.discount_off_price;
            productDataset.priceType = item.price_type;
            this.summaryData.productDetails.push(productDataset);

          }));
          const image = data.data.category_banner
          if (image !== '') {
            const bannerImage = JSON.parse(image);
            if ('file_data' in bannerImage) {
              let imgArr = bannerImage.file_data;
              imgArr.map((element) => {
                if (element.storage_type === 'db') {
                  this.bannerImg = "data:image/png;base64," + element.media_data;
                } else {
                  this.bannerImg = element.media_data;
                }
              });
            } else {
              this.bannerImg = image.data;
            }
          } else { this.bannerImg = '' }
        } else {
          this.msg = data.msg;
          this.spinner.hide();
          this.noImage == false;
        }
      },
      (err) => { }
    );
  }

  share() {
    this.spinner.show();
    const body = {
      affiliate_op_type: 'create_affiliate_link', data: [{
        affiliation_insert_type: 'affiliation', affiliation_details: [{
          General: {
            type: 'category',
            type_related_id: parseInt(this.selectedCategoryId),
            created_by: this.logedEmailId,
            tenant_id: this.tenantId,
            type_related_name: this.catName.replaceAll(' ', '%20'),
            customer_id: this.logedCustomerId
          }
        }]
      }]
    };
    this.summary.getShareLink(body).subscribe((data) => {
      if (data.res_status === true) {
        this.spinner.hide();
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
    this.snack.open('Copied', 'ok', { duration: 2000 });
  }

  hClick() {
    this.router.navigate(['/home']);
  }
}