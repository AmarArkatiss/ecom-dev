export class PlaceOrderObject {
    placeOrderData: Array<CartDataForplaceOrder>;
    GetDeliveryAddressData: Array<GetDeliveryAddrDetails>;
}

export class CartDataForplaceOrder {
    lines: CartDetails[];
    Grand_Total: number;
    cart_count: number;
}

export class CartDetails {
    cart_id: number;
    customer_id: number;
    product_id: number;
    recurring_id: number;
    option: [];
    quantity: number;
    product_name: string;
    model: string;
    price: number;
    image: string;
    tax_name: string;
    type: string;
    rate: number;
    recurring_payment_frequency: string;
    net_amount: number;
    tax_amount: number;
    sub_total: number;
}

export class GetDeliveryAddrDetails {
    sessoinId: string;
    customerId: number;
    addressType: string;
    defaultAddress: number;
    addressId: number;
    firstName: string;
    lastName: string;
    company: string;
    address1: string;
    address2: string;
    city: string;
    postcode: string;
    countryName: string;
    countryId: number;
    zoneName: string;
    zoneId: number;
    mobile: string;
}
