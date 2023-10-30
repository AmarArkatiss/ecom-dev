export class Wishlist {
    customerId: number;
    productId: number;
    wishlistId: number;
    folderId: number;
    folderName: string;
    image: string;
    productName: string;
    model: string;
    stockStatusId: number;
    stock: string;
    price: number;
    specialPrice: number;
    discountPrice:number;
    offPrice:number;
    rating: number;
    prodId : number;
    currencyIndicator: string;
    ratingCount :number;
    reviewCount :number;
    averageRating:number;
}

export class wish {
    wishlists: Wishlist[];
}