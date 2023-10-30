export class affiliateData {
    customerId: number;
    productId: number;
    productName: string;
    type: string;
    affiliateId: string;
    conversions: string;
    clicks: number;
    link: string;
}
export class viewAffiliateData {
    customerId: number;
    productId: number;
    tenantId: number;
    conversions: number;
    clicks: number;
    totalAmount: number;
    affiliationDetails: [];
    currencyIndicator: any;
}

export class myOrder {
    data: affiliateData[];
    affiliateView: viewAffiliateData;
}