export class ProductDetail {
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
    productoffPrice: any;
    priceType:string;
    symbol:string;
}

export class SummaryData {
    productDetails: ProductDetail[];
}
// ramana
export class ReviewedProductDetail {
    name: string;
    helpRating: number;
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
    helpAuthor: string;
    helpcoment: string
    helpDateAdded: any;
    recentRating: number;
    recentAuthor: string;
    recentComent: string;
    recentDateAdded: any;
}
export class ReviewData {
    reviewProductDetails: ReviewedProductDetail[];
}

export class AttributeDetail {
    attribute_id: number;
    attr_name: string;
}

export class AttrDetail {
    attribute_group_id: number;
    attr_grp_name: string;
    attribute_details: AttributeDetail[];
}

export class Brand {
    manufacturer_id: number;
    name: string;
}


export class filterDataObject {
    attr_details: AttrDetail[];
    opt_details: any[];
    Brands: Brand[];
    price_range: string[];
}
