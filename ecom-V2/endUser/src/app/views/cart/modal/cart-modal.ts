export class cartProductData {
  relatedProductDataCart: relatedProductData[];
  suggestionProductDataCart: suggestionProductData[];
}

export class productData {
  cartId: number;
  customerId: number;
  productId: number;
  recurringId: number;
  option: any;
  quantity: number;
  productName: string;
  model: string;
  price: number;
  image: string;
  taxName: string;
  type: string;
  rate: number;
  recurringPaymentFrequency: string;
  recurringName: string;
  subscriptionToDate: any;
  subscriptionFromDate: any;
  cycle: number;
  period: string;
  currencyIndicator: any;
  netAmount: number;
  taxAmount: number;
  subTotal: number;
  wishlistStatus: number;
  wishlistStatusId: number;
  totalFlag: number;
  totalTax: string;
  totalPrice: any;
  finalAmount: any;
  numOfDeliveries: number;
  couponAfterprice: string;
  PriceAfterCoupon: any;
  prodEstTime: any;
  offPrice: string;
  discountPrice: string;
  subscriptionDiscount: any;
  subscriptionTotal: any;
  inadequateQty: string;
}

export class cartModalData {
  productData: productData[];
  GrandTotal: number;
  cartCount: number;
}

export class relatedProductData {
  productId: number;
  image: string;
  productName: string;
  prodDescription: string;
  price: number;
  currencyIndicator: string;
  discountPrice: number;
  discountOffPrice: number;
  wishlistStatus: number;
  wishlistStatusId: number;
  recurringStatus: number;
  averageRating: number;
  reviewCount: number;
  ratingCount: number;
  couponAfterprice: any;
}
export class suggestionProductData {
  productId: number;
  image: string;
  productName: string;
  prodDescription: string;
  price: number;
  currencyIndicator: string;
  discountPrice: number;
  discountOffPrice: number;
  averageRating: number;
  reviewCount: number;
  ratingCount: number;
  couponAfterprice: any;
}
