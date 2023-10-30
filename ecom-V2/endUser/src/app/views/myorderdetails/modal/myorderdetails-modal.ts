export class OrderDetailsData {
    orderedDate: string;
    paymentName: string;
    paymentAddress1: string;
    paymentAddress2: string;
    paymentCity: string;
    paymentPostcode: string;
    paymentCountry: string;
    shippingName: string;
    shippingCompany: string;
    shippingAddress1: string;
    shippingAddress2: string;
    shippingCity: string;
    shippingPostcode: string;
    shippingCountry: string;
    shippingZone: string;
    street: string;
    company: string;
    orderStatus: any;
    otherItems: any;
    mobile: any;
}

export class OtherItemOrderDetailsData {
    customerId: number;
    productId: number;
    productName: string;
    model: string;
    quantity: number;
    price: number;
    image: string;
    orderId: number;
    invoiceNumber: number;
    paymentMethod: string;
    shippingMethod: string;
    currencyIndicator: any;
    orderLineId: number;
    itemStatus: string;
    cancelledDate: string;
}
export class myOrderDetails {
    data: OrderDetailsData[];
    otherItemsDetails: OtherItemOrderDetailsData[];
}