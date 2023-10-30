
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})

export class HelperService {
  selectedIndex: any;
  selectedObject: any;
  productSet: any;
  currencyId;
  storeId;
  private data;
  private selectedOrders: any[] = [];
  private selectedOrdersSummary: any[] = [];
  deliverySummaryData: any[];
  public saveSummaryFlag = false;
  public cartLength = 0;
  defaultOrderTypes: any;
  savedCartData: any[] = [];
  savedCartState: any;
  saveSummaryData: any;
  constructor() {
    this.storeId = sessionStorage.getItem('StoreId')
    this.currencyId = sessionStorage.getItem('currencyId')
  }

  // child recieve data
  getData() {
    let temp = this.selectedOrders;
    this.clearData();
    return temp;
  }

  getSavedOrdersData() {
    let temp = this.selectedOrders;
    return temp;
  }

  calculateTotalPriceAndSavings(details) {
    const priceArray = [];
    const savingsArray = [];
    let priceObj: any;
    details.map((item, i) => {
      if (item.Quantity >= 0) {
        const price = item.Quantity * item.PromoDiscountPrice
        const savings = item.Quantity * item.Allowance;
        item['totalCost'] = price;
        item['totalSavings'] = savings;
      }
    })
    details.map((item, j) => {
      if (item.totalCost > 0) {
        priceArray.push(item.totalCost)
        savingsArray.push(item.totalSavings)
      }
    })
    const totalPrice = priceArray.reduce((a, b) => { return a + b; }, 0)
    const totalSavings = savingsArray.reduce((a, b) => { return a + b; }, 0)
    priceObj = { total: (totalPrice).toFixed(2), savings: (totalSavings).toFixed(2) }
    return priceObj;
  }

  getSummaryData() {
    let temp = this.selectedOrdersSummary;
    this.clearData();
    return temp;

  }

  // Parent to child send data
  setData(index, product, productList) {
    this.data = {
      indexvalue: index,
      productInfo: product,
      productDataSet: productList
    }
  }

  setSelectedOrdersData(selOrdList) {
    this.selectedOrders = selOrdList;
  }

  setOrdersSummaryData(selOrdSummary) {
    this.selectedOrdersSummary = selOrdSummary;
  }
  clearData() {
    this.selectedOrders = [];
    this.data = {
      indexvalue: 0,
      productInfo: {},
      productDataSet: []
    };
  }

  saveSummaryDetails(data) {
    this.saveSummaryData = data;
  }
  getSummaryDetails(data) { }
  saveToDeliveryItems(deliveryData) {
    this.deliverySummaryData = [];
    const deliverySummary = [];
    const deptList = [];
    const actualDates = [];
    const rowData = deliveryData;
    rowData.map((item) => {
      deptList.push(item.Department);
      actualDates.push(item.RequestedDate)
    });
    const trailerType = [... new Set(deptList)];
    const trailerTypeWithDates = [... new Set(actualDates)];
    trailerType.map((dept) => {
      trailerTypeWithDates.map((date) => {
        const deliveryDetail = [];
        let summary = {};
        rowData.map((item) => {
          if (dept === item.Department) {
            if (date === item.RequestedDate) {
              const obj = {
                ItemCode: item.ItemCode, ItemDesc: item.ItemDesc, Quantity: item.Quantity, UPC: item.UPC,
                RegPrice: item.RegPrice, SplPrice: item.SplPrice, Unit: item.Unit
              };
              deliveryDetail.push(obj);
              summary = { reqDelDate: item.RequestedDate, trailerType: item.Department, detail: deliveryDetail };
            }
          }
        });
        deliverySummary.push(summary);
      })

    });
    this.deliverySummaryData = deliverySummary;
  }

  getDeliverySummaryData() {
    return this.deliverySummaryData
  }

  saveCartStatus(data) {
    this.cartLength = this.cartLength + 1;
    this.savedCartData.push(data)
  }
  getSavedCartStatus() {
    return this.savedCartData
  }

  setExisitingState(orderDtls) {
    this.savedCartState = orderDtls
  }
  getExisitingState() {
    return this.savedCartState;
  }
  getDefaultOrderTypes() {
    return this.defaultOrderTypes;
  }

  /* Send Email to Buyer */
  sendEmailToBuyer(obj) {
    return true;
  }

  /**
  * Format Date - DD-MM-YYYY
  * @author Anudeep Thummalapalli
  * @version 0.1
  * @param cureentDate - String
  * @returns date in formart like DD-MM-YYYY 30-04-2021
  */
  formatDate(cureentDate): string {
    const d = new Date(cureentDate);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [month, day, year].join('/');
  }

  formatDateToApi(cureentDate): string {
    const d = new Date(cureentDate);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [year, month, day].join('-');
  }
}


