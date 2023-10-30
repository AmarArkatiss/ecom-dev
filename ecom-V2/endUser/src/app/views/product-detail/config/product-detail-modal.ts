export class ProductDetails {
  productId: number;
  productName: string;
  description: string;
  originalprice: any;
  productCode: string;
  mainImage: string;
  priceInRewardPoints: number;
  quantity: number;
  metaTitle: string;
  metaDescription: string;
  metaKeyword: string;
  rewardPoints: number;
  brands?: any;
  availability: string;
  ratingAvg?: any;
  reviewCount: number;
  ratingCount: number;
  productDiscountPrice: any;
  currencyIndicator: string;
  offPrice: any;
  categoryId: number;
  categoryName: string;
  wishlistflag: number;
  wishlistStatusId: number;
}

export class recentlyViewedDetails {
  name: string;
  categoryId: number;
  sortOrder: number;
  productId: number;
  image: string;
  description: string;
  price: number;
  discountPrice: number;
  symbolLeft: string;
  wishlistflag: number;
  currencyIndicator: string;
  wishlistStatusId: number;
  offPrice: number;
  averageRating: number;
  ratingCount: number;
  reviewCount: number;
  priceType: string;
  symbol: string;
}

export class recentProductData {
  recentViewDetails: recentlyViewedDetails[];
}

export class ProductImage {
  image: string;
  sort: number;
}

export class ProductDiscount {
  quantity: number;
  price: number;
  currency_indicator: string;
}

export class productReview {
  author: string;
  dateAdded: string;
  rating: string;
  text: string;
  title: string;
}

export class productHighlights {
  producthighlightName: string;
  productHighlightId: any;
}

export class ProductDetailObject {
  productDetails: ProductDetails[];
  productImages: ProductImage[];
  productReviews: productReview[];
  productHighlight: productHighlights[];
  specifications: any[];
  payment_profile: any[];
  subscription_slab: any[];
  product_Discount: ProductDiscount[];
  product_availability_Options: any[];
}
