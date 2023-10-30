import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ProductSummaryComponent } from './views/product-summary/product-summary.component';
import { ProfileComponent } from './views/profile/profile.component';
import { WishlistComponent } from './views/wishlist/wishlist.component';
import { CartComponent } from './views/cart/cart.component';
import { PlaceOrderComponent } from './views/place-order/place-order.component';
import { MyordersComponent } from './views/myorders/myorders.component';
import { MyorderdetailsComponent } from './views/myorderdetails/myorderdetails.component';
import { ProductDetailComponent } from './views/product-detail/product-detail.component';
import { FiltersComponent } from './views/filters/filters.component';
import { ManageaddressesComponent } from './views/manageaddresses/manageaddresses.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MyorderreviewComponent } from './views/myorderreview/myorderreview.component';
import { ProductSearchComponent } from './views/product-search/product-search.component';
import { ProductReturnsComponent } from './views/product-returns/product-returns.component';
import { AffiliationsComponent } from './views/affiliations/affiliations.component';
import { InvoiceComponent } from './views/invoice/invoice.component';
import { SavelaterComponent } from './views/savelater/savelater.component';
import { GiftCardComponent } from './views/gift-card/gift-card.component';
import { VocherDetailsComponent } from './views/vocher-details/vocher-details.component';
import { MyVocherDetailsComponent } from './views/my-vocher-details/my-vocher-details.component';
import { FlashPageComponent } from './flash-page/flash-page.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: LandingPageComponent },
      // { path: '', component: LandingPageComponent },
      { path: 'wishlist', component: WishlistComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'cart', component: CartComponent },
      { path: 'productDetail/:id', component: ProductDetailComponent },
      { path: 'product/:id/:name', component: ProductSummaryComponent },
      { path: 'product', component: ProductSummaryComponent },
      { path: 'placeorder', component: PlaceOrderComponent },
      { path: 'myorders', component: MyordersComponent },
      { path: 'myorderreview/:id', component: MyorderreviewComponent },
      { path: 'filters', component: FiltersComponent },
      { path: 'manageaddresses', component: ManageaddressesComponent },
      { path: 'myorderdetails/:id', component: MyorderdetailsComponent },
      { path: 'home', component: LandingPageComponent },
      { path: 'search/:id', component: ProductSearchComponent },
      { path: 'productReturns',component:ProductReturnsComponent},
      { path: 'affiliate',component:AffiliationsComponent},
      { path: 'invoice',component:InvoiceComponent},
      {path: 'savelater', component:SavelaterComponent},
      {path: 'giftcard', component:GiftCardComponent},
      {path: 'VocherDetails', component:VocherDetailsComponent},
      {path: 'MyVocherDetails',  component:MyVocherDetailsComponent},
      {path: 'flashPage', component: FlashPageComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
