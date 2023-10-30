import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/helper/common.service';
import { Brands, BrandDetails } from './filter-model';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  filterattrData = [];
  filtermanufdetails = [];
  filteroptdetails = [];
  filterpricelist = [];
  optiondetails = [];
  catId;
  BrandsData: BrandDetails = new BrandDetails();
  @Output() filteredData = new EventEmitter();

  constructor(private common: CommonService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.filters();
    this.route.params.subscribe(params => {
      this.catId = params.id;
    });
  }
  /**
         * @remarks Apply Filter to sort the data
         * @author
         * @version 1.0
         */
  filters(): any {
    const body = { category_id: 104 };
    this.BrandsData.brandDetails = Array<Brands>();
    const success = this.filtersSuccess.bind(this);
    const error = this.onError.bind(this);
    this.common.http.post('filter', body, success, error);
  }

  filtersSuccess(data): any {
    this.filterattrData = data.data.attr_details;
    this.filtermanufdetails = data.data.manuf_details;
    this.filteroptdetails = data.data.opt_details;
    this.filterpricelist = data.data.price_list;
    for (let i = 0; i < this.filteroptdetails.length; i++) {
      for (let a = 0; a < this.filteroptdetails[i].option_details.length; a++) {
        this.optiondetails.push(this.filteroptdetails[i].option_details[a]);
      }
    }
  }
  onError(data) { }
  attrDetails = [];
  manuf_details = [];
  opt_val_details = [];
  price_details = [];
  body;
  /**
           * @remarks Apply Filter based on name , brand name , manufacture 
           * @param name , value , index ,attr , price
           * @author  Ramana.majeti
           * @version 1.0
           */
  changeFilter(name, value, index, event) {
    if (name === 'attr') {
      if (value) {
        this.attrDetails.push(event);
      } else {
        this.attrDetails.splice(index)
      }
    } else if (name === 'brand') {
      if (value) {
        this.manuf_details.push(event);
      } else {
        this.manuf_details.splice(index)
      }
    } else if (name === 'optiondetails') {
      if (value) {
        this.opt_val_details.push(event);
      } else {
        this.opt_val_details.splice(index)
      }
    } else if (name === 'price') {
      if (value) {
        this.price_details.push(event);
      } else {
        this.price_details.splice(index)
      }
    }
    if (this.opt_val_details.length === 0 && this.manuf_details.length === 0 && this.price_details.length === 0) {
      this.body = { attr_details: this.attrDetails, category_id: [+this.catId] };
    } else if (this.attrDetails.length === 0 && this.manuf_details.length === 0 && this.price_details.length === 0) {
      this.body = { opt_val_details: this.opt_val_details, category_id: [+this.catId] };
    } else if (this.attrDetails.length === 0 && this.opt_val_details.length === 0 && this.price_details.length === 0) {
      this.body = { manuf_details: this.manuf_details, category_id: [+this.catId] };
    } else if (this.attrDetails.length === 0 && this.opt_val_details.length === 0 && this.manuf_details.length === 0) {
      this.body = { price_details: this.price_details, category_id: [+this.catId] };
    } else {
      this.body = { attr_details: this.attrDetails, manuf_details: this.manuf_details, opt_val_details: this.opt_val_details, price_details: this.price_details, category_id: [+this.catId] };
    }
    const success = this.changefiltersSuccess.bind(this);
    const error = this.onError.bind(this);
    this.common.http.post('filteredproductdetails', this.body, success, error);
  }
  changefiltersSuccess(data): any {
    if (data.res_status === true) {
      this.filteredData.emit(data);
    }
    else {
      this.filteredData.emit(data);
    }
  }
}
