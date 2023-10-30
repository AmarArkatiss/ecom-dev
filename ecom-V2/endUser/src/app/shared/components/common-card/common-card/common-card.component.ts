import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
  Inject,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
@Component({
  selector: 'app-common-card',
  templateUrl: './common-card.component.html',
  styleUrls: ['./common-card.component.scss']
})
export class CommonCardComponent implements OnInit {
  @ViewChild('folderDetails') FolderDetails: TemplateRef<any>;
  @Input() weekdealsAdss: any;
  @Input() wishlistNone: any;
  @Input() foldervisible: any;
  @Input() folderName: any;
  @Input() formhide: any;
  @Input() folderList: any;
  @Input() folders: any;
  @Input() wishlistAdd: any;
  @Output() hideFolderEvent = new EventEmitter<string>();
  @Output() addfolderEvent = new EventEmitter<string>();
  @Output() showfolderEvent = new EventEmitter<string>();
  @Output() addWishListEvent = new EventEmitter<string>();
  @Output() removeWishListEvent = new EventEmitter<string>();
  @Output() addToCartEvent = new EventEmitter<string>();
  @Output() goToProductEvent = new EventEmitter<string>();
  responsiveOptions: any;
  constructor() {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  ngOnInit(): void { }

  hideFolder() {
    this.hideFolderEvent?.emit();
  }

  addFolder() {
    this.addfolderEvent?.emit(this.folderName);
  }

  showfolder() {
    this.showfolderEvent?.emit();
  }

  addtoWishlist(totData, index, status) {
    const wishListBody: any = { totData: totData, index: index, status: status }
    this.addWishListEvent?.emit(wishListBody);
  }

  removeWishlist(i, wishlistStatusId, data, status) {
    const wishListBody: any = { i: i, wishlistStatusId: wishlistStatusId, data: data, status: status }
    this.removeWishListEvent?.emit(wishListBody);
  }

  addToCartClick(proId, productprice) {
    const cartBody: any = { proId: proId, productprice: productprice }
    this.addToCartEvent?.emit(cartBody);
  }

  goToProductsView(id) {
    this.goToProductEvent.emit(id);
  }

}
