import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { HelperService } from './shared/services/helper.services';
import { ErrorService } from './shared/services/error-handle.service';
import { ADOrdersInterceptor } from './shared/interceptor';

import { MatStepperModule } from '@angular/material/stepper';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { SummaryfieldscustomComponent } from './shared/components/summaryfieldscustom/summaryfieldscustom.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { MatMenuModule } from '@angular/material/menu';
import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { WishlistComponent } from './views/wishlist/wishlist.component';
import { ProfileComponent } from './views/profile/profile.component';
import { AccountComponent } from './views/account/account.component';
import { ProductSummaryComponent } from './views/product-summary/product-summary.component';
import { ProductDetailComponent } from './views/product-detail/product-detail.component';
import { CartComponent } from './views/cart/cart.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { PlaceOrderComponent } from './views/place-order/place-order.component';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { MatRadioModule } from '@angular/material/radio';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MyordersComponent } from './views/myorders/myorders.component';
import { MyorderdetailsComponent } from './views/myorderdetails/myorderdetails.component';
import { FiltersComponent } from './views/filters/filters.component';
import { ManageaddressesComponent } from './views/manageaddresses/manageaddresses.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MyorderreviewComponent } from './views/myorderreview/myorderreview.component';
import { ProductSearchComponent } from './views/product-search/product-search.component';
import { SliderModule } from 'angular-image-slider';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { ProductReturnsComponent } from './views/product-returns/product-returns.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { AffiliationsComponent } from './views/affiliations/affiliations.component';
import { TableModule } from 'primeng/table';
import { DatePipe } from '@angular/common';
// import {MatNativeDateModule} from '@angular/material';
// import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatTooltipModule } from '@angular/material/tooltip';
import { InvoiceComponent } from './views/invoice/invoice.component';
import { SavelaterComponent } from './views/savelater/savelater.component';
import { GiftCardComponent } from './views/gift-card/gift-card.component';
import { VocherDetailsComponent } from './views/vocher-details/vocher-details.component';
import { MyVocherDetailsComponent } from './views/my-vocher-details/my-vocher-details.component';
import { CookieService } from 'ngx-cookie-service';
import { FlashPageComponent } from './flash-page/flash-page.component';
import { FooterComponent } from './views/footer/footer.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AgmCoreModule } from '@agm/core';
import {ToastModule} from 'primeng/toast';
import {RippleModule} from 'primeng/ripple';
import {CarouselModule} from 'primeng/carousel';
import { CommonCardComponent } from './shared/components/common-card/common-card/common-card.component';

// import { InvoiceComponent } from './views/invoice/invoice.component';

@NgModule({
  declarations: [
    AppComponent,

    SummaryfieldscustomComponent,
    LayoutComponent,
    FlashPageComponent,
    WishlistComponent,
    ProfileComponent,
    AccountComponent,
    ProductSummaryComponent,
    ProductDetailComponent,
    CartComponent,
    PlaceOrderComponent,
    MyordersComponent,
    MyorderdetailsComponent,
    FiltersComponent,
    ManageaddressesComponent,
    LandingPageComponent,
    MyorderreviewComponent,
    ProductSearchComponent,

    ProductReturnsComponent,
    AffiliationsComponent,
    InvoiceComponent,
    SavelaterComponent,
    GiftCardComponent,
    VocherDetailsComponent,
    MyVocherDetailsComponent,
    FooterComponent,
    CommonCardComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSelectModule,
    MatSidenavModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatListModule,
    MatDialogModule,
    HttpClientModule,
    MatTabsModule,
    MatChipsModule,
    NgbModule,
    MatAutocompleteModule,
    MatBottomSheetModule,
    PopoverModule.forRoot(),
    NgxSliderModule,
    MatStepperModule,
    AlertModule.forRoot(),
    MatMenuModule,
    MatListModule,
    MatButtonToggleModule,
    ButtonModule,
    AccordionModule,
    MatRadioModule,
    InputTextModule,
    DropdownModule,
    MatSnackBarModule,
    NgxPayPalModule,
    NgxSpinnerModule,
    SliderModule,
    IvyCarouselModule,
    ModalModule.forRoot(),
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    TableModule,
    ToastModule,RippleModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBGH7AhTDnGRMkMASTqq0IIAIZnSpNRLE4',
      libraries: ['places'],
    }),
    // ToastModule,
    // MatMomentDateModule,
    CarouselModule
  ],
  bootstrap: [AppComponent],
  providers: [
    ErrorService,
    CookieService,
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: ADOrdersInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    HelperService,
  ],
  entryComponents: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
  constructor(private injector: Injector) {}
}
