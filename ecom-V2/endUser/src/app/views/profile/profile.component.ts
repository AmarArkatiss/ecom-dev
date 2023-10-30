import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from './service/profile.service';
import { profileObj, profile } from './modal/profile-modal';
import { CommonService } from 'src/app/helper/common.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  old_password;
  new_password;
  retype_password;
  oldhide = true;
  newhide = true;
  confirmhide = true;
  constructor(private profile: ProfileService, private common: CommonService, private snack: MatSnackBar) { }
  showdisablename = true;
  showeditablename = false;
  showpassword = false;
  is_edit: boolean = true;
  firstName;
  lastName;
  gender;
  profileimage;
  email;
  mobile;
  customer_id: any;
  tenantId;
  profileDataobj: profileObj = new profileObj();
  ngOnInit(): void {
    this.firstName = sessionStorage.getItem('firstname');
    this.lastName = sessionStorage.getItem('lastname');
    this.mobile = sessionStorage.getItem('telephone');
    this.email = sessionStorage.getItem('userEmail');
    this.customer_id = sessionStorage.getItem('customerId');
    this.tenantId = sessionStorage.getItem('tenantId');
    this.getProducts();
  }
  /**
  * @remarks Feteching profile Details
  * @author 
  * @version 0.1
  */
  getProfile(): any {
    this.profileDataobj.profileData = Array<profile>()
    this.profile.getProfileData().subscribe((resp) => {
      resp.data.map((item) => {
        const dataset = new profile();
        this.email = item.email;
        this.firstName = item.fname;
        this.lastName = item.lname;
        this.gender = item.gender;
        this.mobile = item.mobile;
      })
    })
  }
  /**
    * @remarks Get profile Details
    * @author  Ramana.majeti
    * @version 0.1
    */
  getProducts(): void {
    const body = {
      profile_op_type: 'profile_view', customer_id: +this.customer_id
    };
    const success = this.onProductSuccess.bind(this);
    const error = this.onError.bind(this);
    this.common.http.post('profile', body, success, error);
  }
  onProductSuccess(data): any {

    const firstname = data.data[0].firstname;
    sessionStorage.setItem('firstname', firstname);
    const lastname = data.data[0].lastname;
    sessionStorage.setItem('lastname', lastname);
    this.common.ProfileNameUpdate('data');
    this.firstName = data.data[0].firstname;
    this.lastName = data.data[0].lastname;
    this.mobile = data.data[0].telephone;
    this.email = data.data[0].email;
    this.gender = data.data[0].gender;
    this.profileimage = data.data[0].profile_picture;
    sessionStorage.setItem('profileimagess', this.profileimage);
  }
  onError(data): any {
  }
  //Profile Save And Update
  /**
   * @remarks  Save profile Details
   * @author  Ramana.majeti
   * @version 0.1
   */

  profilesave(): any {
    if (this.firstName !== '' && this.lastName !== '' && this.gender !== '' && this.mobile !== '' && this.email !== '') {
      const body = {
        profile_op_type: 'profile_update', customer_id: +this.customer_id, firstname: this.firstName,
        lastname: this.lastName, gender: this.gender, telephone: this.mobile,
        email: this.email, profile_picture: 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg'
      };
      const success = this.onProductSave.bind(this);
      const error = this.onError.bind(this);
      this.common.http.post('profile', body, success, error);
    } else {
      this.snack.open('Please fill all required fields', 'ok', { duration: 1500 });
    }
  }
  onProductSave(data) {
    this.snack.open(data.msg, 'Ok', { duration: 2000 });
    this.showdisablename = true;
    this.getProducts();
  }
  //Change Password API
  /**
           * @remarks Change Password
           * @author  
           * @version 0.1
           */
  changepwd() {
    if (this.old_password !== undefined && this.new_password !== undefined && this.retype_password !== undefined) {
      const body = {
        customer_op_type: 'reset_password', customer_id: this.customer_id, old_password: this.old_password,
        new_password: this.new_password, retype_password: this.retype_password
      };
      const success = this.onChangepwdSave.bind(this);
      const error = this.onError.bind(this);
      this.common.http.post('password', body, success, error);
    } else {
      this.snack.open('Please fill all required fields', 'ok', { duration: 1500 });
    }
  }
  onChangepwdSave(data) {
    if (data.res_status === true) {
      this.showpassword = false;
      this.snack.open(data.msg, "Ok", { duration: 2000 });
    } else {
      this.snack.open(data.msg, "Ok", { duration: 2000 });
    }
  }
  /**
   * @remarks Edit profile Details
   * @author  
   * @version 1.0
   */

  editPersonalInfo(value): any {
    if (value === 'show') {
      this.showdisablename = false;
      this.showeditablename = true;
    } else {
      this.showdisablename = true;
      this.showeditablename = false;
    }
  }
  showpasswords(): any {
    this.showpassword = !this.showpassword;
  }
}
