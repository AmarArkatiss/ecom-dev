import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../services/helper.services';
@Component({
  selector: 'app-summaryfieldscustom',
  templateUrl: './summaryfieldscustom.component.html',
  styleUrls: ['./summaryfieldscustom.component.scss']
})
export class SummaryfieldscustomComponent implements OnInit {
  params: any;
  requestedDate;
  quantity: any;
  extendedCost: any;
  minDate: any;
  maxDate: any;
  agInit(params: any): void {
    this.params = params;
    if (params.columnName === "RequestedDeliveryDate") {
      this.requestedDate = params.value;
    } else if (params.columnName === 'Quantity') {
      this.quantity = params.value;
    } else if (params.columnName === 'ExtendedPrice') {
      this.extendedCost = params.value;
    }
    this.minDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setDate(this.minDate.getDate() + 1);
    this.minDate.setDate(new Date().getDate());
  }

  refresh(params: any): boolean {
    return false;
  }
  constructor(private helper: HelperService) { }

  ngOnInit(): void { }

  qunatityChange(type, params) {
    if (type === 'sub' && this.quantity > 0) {
      this.quantity = this.quantity - 1;
    } else if (type === 'add') {
      this.quantity = this.quantity + 1;
    }
    params.data['Quantity'] = this.quantity;
    params.data['totalCost'] = (this.quantity * params.data['SplPrice']);
  }

  changeitemDeliveryDate(event, params) {
    if (event !== null && event !== undefined) {
      const formatedDate = this.helper.formatDate(event);
      params.data['RequestedDeliveryDate'] = formatedDate;
    }
  }

  deleteRow(params) { }
}
