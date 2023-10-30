export class OrderReviewData {
    productId: number;
    constructorId: number;
    author: string;
    createdDate: string;
    rating: number;
    status: boolean;
    reviewText: string;
    reviewOpType: string;
}

export class myOrderReview {
    data: OrderReviewData[];
}