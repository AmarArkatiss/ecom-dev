export class OrderData {
  customerId: number;
  productId: number;
  orderId: number;
  orderLineId: number;
  name: string;
  model: string;
  price: number;
  image: string;
  status: string;
  colour: string;
  reward: number;
  orderedDate: string;
  subFromDate: any;
  subToDate: any;
  recurringName: string;
  recurringId: any;
  subCycle: number;
  subDuration: string;
  orderStatus: [];
  currencyIndicator: any;
  itemStatus: any;
  paymentStatus: any;
  subscriptionTodatee: any;
  totalAmount: any;
  code: string;
  cancelledDate: string;
}

export class myOrder {
  data: OrderData[];
}
export class latestOrderData {
  productId: number;
  orderId: number;
  orderLineId: number;
  name: string;
  status: string;
}
export class mylatestOrder {
  data: latestOrderData[];
}