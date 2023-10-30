import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/helper/common.service';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-manageaddresses',
  templateUrl: './manageaddresses.component.html',
  styleUrls: ['./manageaddresses.component.scss']
})
export class ManageaddressesComponent implements OnInit {
  constructor(private snack: MatSnackBar, private common: CommonService, private router: Router, private mapsAPILoader: MapsAPILoader,) { }
  showdisablename = true;
  showeditablename = false;
  showpassword = false;
  manageaddressfields;
  manageaddress = [];
  addaddressForm: boolean;
  firstName;
  address_1;
  countryInfo;
  addressDetailsArray = [];
  norecordsFlag = false;
  regionInfo;
  lastName;
  mobile;
  email;
  sessionId;
  CustmrId;
  landmark;
  tenantId;
  addressIdd;
  addressIddDel;
  addFlag = false;
  editFlag = false;
  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;

  ngOnInit(): void {
    this.addaddressForm = false;
    this.firstName = sessionStorage.getItem('firstname');
    this.lastName = sessionStorage.getItem('lastname');
    this.mobile = sessionStorage.getItem('telephone');
    this.email = sessionStorage.getItem('userEmail');
    this.sessionId = sessionStorage.getItem('sessionId');
    this.CustmrId = sessionStorage.getItem('customerId');
    this.tenantId = sessionStorage.getItem('tenantId');
    this.manageaddress = [{
      firstname: this.firstName, lastname: this.lastName, landmark: this.landmark,
    }];
    this.manageaddressfields = {
      firstname: '', lastName: '', address_1: '', address_2: '',
      city: '', postcode: '', country: '', zone_id: '', address_type: "home", company: '',
      default_address: false, landmark: '', country_id: '',
      street_area: '', mobile: '', is_selected: ''
    }
    this.handleGetCountries();
    this.getDeliverAddressDetails();
  }
  /**
     * @remarks add  address
     * @author  Ramana.majeti
     * @version 1.0
     */
  addaddress(): void {
    this.addFlag = true;
    this.addaddressForm = !this.addaddressForm;
  }
  cancelform(): void {
    this.addFlag = false;
    this.editFlag = false;
    this.manageaddressfields = [];
    this.addaddressForm = false;
  }
  /**
      * @remarks update  address
      * @author  Ramana.majeti
      * @version 1.0
      */
  manageaddressForm(): void {
    let body;
    const defaultAdd = this.manageaddressfields.default_address === false ? 1 : 0
    if (this.manageaddressfields.firstname !== '' && this.manageaddressfields.lastname !== '' && this.manageaddressfields.address_1 !== '' && this.manageaddressfields.mobile !== '' &&
      this.manageaddressfields.city !== '' && this.manageaddressfields.postcode !== '' && this.manageaddressfields.country_id !== '' && this.manageaddressfields.zone_id !== '') {
      if (this.addFlag == true) {
        body = {
          login: true,
          customer_id: this.CustmrId,
          session_id: this.sessionId, tenant_id: this.tenantId,
          op_delivery_type: "insert",
          "new_details": [{
            address_type: this.manageaddressfields.address_type,
            default_address: defaultAdd,
            firstname: this.manageaddressfields.firstname,
            lastname: this.manageaddressfields.lastname,
            company: this.manageaddressfields.company,
            address_1: this.manageaddressfields.address_1, address_2: this.manageaddressfields.address_2,
            city: this.manageaddressfields.city,
            mobile: this.manageaddressfields.mobile,
            postcode: this.manageaddressfields.postcode,
            country_id: parseInt(this.manageaddressfields.country_id),
            zone_id: parseInt(this.manageaddressfields.zone_id),
            landmark: this.manageaddressfields.landmark,
            street_area: this.manageaddressfields.street_area
          }]
        }
      }
      if (this.editFlag == true) {
        body = {
          login: true,
          customer_id: this.CustmrId,
          session_id: this.sessionId, tenant_id: this.tenantId,
          op_delivery_type: "update", address_no: this.addressIdd,
          "new_details": [{
            address_type: this.manageaddressfields.address_type,
            default_address: defaultAdd,
            firstname: this.manageaddressfields.firstname,
            lastname: this.manageaddressfields.lastname,
            address_1: this.manageaddressfields.address_1,
            address_2: this.manageaddressfields.address_2,
            city: this.manageaddressfields.city,
            mobile: this.manageaddressfields.mobile,
            is_selected: 'false',
            postcode: this.manageaddressfields.postcode,
            country_id: parseInt(this.manageaddressfields.country_id),
            zone_id: parseInt(this.manageaddressfields.zone_id),
            company: this.manageaddressfields.company,
            landmark: this.manageaddressfields.landmark, address_id: this.addressIdd,
            street_area: this.manageaddressfields.street_area
          }]
        }
      }
      const success = this.registrationSucess.bind(this);
      const error = this.registrationError.bind(this);
      this.common.http.post('Customer_details', body, success, error);
    } else {
      this.snack.open('Please fill all required fields', 'ok', { duration: 1500 });
    }
  }
  registrationSucess(data) {
    if (data.res_status === true) {
      this.snack.open(data.msg, 'ok', { duration: 1000 });
      this.getDeliverAddressDetails()
      this.addFlag = false;
      this.editFlag = false;
      this.manageaddressfields = {}
      this.common.addressUpdate('data')
      this.manageaddressfields.default_address = false
    } else {
      this.snack.open(data.msg, 'ok', { duration: 1000 });
    }
  }
  registrationError(data) { }
  /**
   * @remarks Edit Button for update address
   * @author  
   * @version 1.0
   */
  editAddress(event): void {
    this.editFlag = true;
    this.addressIdd = event.address_id;
    this.manageaddressfields = [];
    this.addaddressForm = !this.addaddressForm;
    this.manageaddressfields = event;
    this.manageaddressfields.country_id = (event.country_id).toString()
    this.manageaddressfields.default_address = event.default_address === 0 ? true : false
    this.manageaddressfields.is_selected = event.is_selected
    this.handleGetRegionByCountry(event.country_id);
    this.manageaddressfields.zone_id = (event.zone_id).toString()
  }
  /**
   * @remarks Delete update address
   * @author  
   * @version 1.0
  */

  deleteAddress(index): void {
    this.addressIddDel = index.address_id;
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success btn-sm',
        cancelButton: 'btn btn-default btn-sm'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      text: 'Are you sure Address want to delete?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: '#ff7f27',
      cancelButtonText: 'No',
      width: '400px',

    }).then((result) => {
      if (result.value) {
        this.deleteApiCalling();
        this.manageaddress.splice(index, 1);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }
  /**
       * @remarks Delete Api for delete address
       * @author  
       * @version 1.0
       */
  deleteApiCalling() {
    const body = {
      op_delivery_type: "delete",
      login: true,
      new_details: [{
        customer_id: this.CustmrId,
        session_id: this.sessionId,
        tenant_id: this.tenantId,
        "address_id": this.addressIddDel
      }]
    }
    const success = this.deleteAddressOnSucess.bind(this);
    const error = this.deleteAddressonError.bind(this);
    this.common.http.post('Customer_details', body, success, error);
  }
  deleteAddressOnSucess(data) {
    if (data.res_status === true) {
      this.snack.open(data.msg, 'ok', { duration: 500 });
      this.getDeliverAddressDetails()
      this.common.addressUpdate('data')
    } else {
      this.snack.open(data.msg, 'ok', { duration: 500 });
    }
  }
  deleteAddressonError(data) { }
  /**
  * @remarks handle Get countries
  * @author  
  * @version 1.0
  */
  handleGetCountries(): any {
    const body = {
      ordersdropdowns_op_type: "countries_dropdown"
    };
    const success = this.handleCountrySuccess.bind(this);
    const error = this.onErrorCountry.bind(this);
    this.common.http.post('countryandregionsdropdown', body, success, error);
  }
  handleCountrySuccess(data): any {
    this.countryInfo = data.country;
  }
  onErrorCountry(error): any {
    this.snack.open(error, 'ok', { duration: 3000 });
  }
  /**
  * @remarks Get  regions Based on Countries
  * @param Country Id
  * @author  
  * @version 1.0
  */
  handleGetRegionByCountry(cId) {
    const body = {
      ordersdropdowns_op_type: "zone_dropdown", country_id: cId
    };
    const success = this.handleRegionSuccess.bind(this);
    const error = this.onErrorRegion.bind(this);
    this.common.http.post('countryandregionsdropdown', body, success, error);
  }

  handleRegionSuccess(data): any {
    this.regionInfo = data.zone;
  }
  onErrorRegion(error): any {
    this.snack.open(error, 'ok', { duration: 3000 });
  }

  /**
  * @remarks Get Delivery Address Detail
  * @author  
  * @version 1.0
  */
  getDeliverAddressDetails(): any {
    const body = {
      "login": true,
      "customer_id": this.CustmrId,
      "session_id": this.sessionId,
      "op_delivery_type": "retrive",
      "address_no": 1
    };
    const success = this.getDeliverAddressDetailsSuccess.bind(this);
    const error = this.getDeliverAddressDetailsError.bind(this);
    this.common.http.post('Customer_details', body, success, error);
  }
  getDeliverAddressDetailsSuccess(data) {
    if (data.res_status === true) {
      this.addressDetailsArray = data.delivery_details;
      this.norecordsFlag = false;
    } else {
      this.addressDetailsArray = [];
      this.norecordsFlag = true
    }
  }
  getDeliverAddressDetailsError() { }

  getLiveLocation() {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
    });
  }
  setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }
}
