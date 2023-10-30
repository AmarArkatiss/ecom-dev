import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class TenantBasedDataService {
  currencyId;
  storeId;
  deliverySummaryData: any[];
  orgName: any;
  middileBannerImg1: any;
  middileBannerImg2: any;
  middileBannerImg3: any;
  defaultCatBannerImg: any;
  Logo: any;
  phoneNum: any;
  wishlistNoneImg: any;
  wishlistImg: any;
  traditionalSelectedImg: any;
  traditionalUnSelectedImg: any;
  tabSelectedImg: any;
  tabUnSelectedImg: any;
  brandName: any;
  constructor() {
    this.storeId = sessionStorage.getItem('StoreId');
    this.currencyId = sessionStorage.getItem('currencyId');
    this.orgName = sessionStorage.getItem('orgName');
    this.getTenantBasedBanners();
  }

  getTenantBasedBanners() {
    if (this.orgName === 'veterneo') {
      this.middileBannerImg1 = 'assets/images/Middle-1.jpg';
      this.middileBannerImg2 = 'assets/images/Middle-2.jpg';
      this.middileBannerImg3 = 'assets/images/Middle-3.jpg';
      this.defaultCatBannerImg = 'assets/svg/Nutrition Category_Banner.png';
      (this.Logo = 'assets/images/Veterneo_Final_Logo_SVG.svg'),
        (this.phoneNum = '+91 7799774424'),
        (this.wishlistNoneImg = 'assets/svg/Wishlist.svg'),
        (this.wishlistImg = 'assets/svg/btn-whishlist-selected.svg'),
        (this.traditionalSelectedImg = 'assets/svg/TraditionView.svg'),
        (this.traditionalUnSelectedImg = 'assets/svg/Tradition_unSelected.svg'),
        (this.tabSelectedImg = 'assets/svg/tabs_Selected.svg'),
        (this.tabUnSelectedImg = 'assets/svg/tabs_Unselected.svg');
      this.brandName = 'Farming';
      this.orgName = 'Veterneo';
    } else {
      this.middileBannerImg1 = 'assets/images/Grocery Banner-1 updated.jpg';
      this.middileBannerImg2 = 'assets/images/Grocery Banner-2 updated.jpg';
      this.middileBannerImg3 = 'assets/images/Fruits Banner updated.jpg';
      this.defaultCatBannerImg = 'assets/images/bannerRectangle 493.png';
      (this.Logo = 'assets/images/cswg.png'),
        (this.phoneNum = '+91 9100800001'),
        (this.wishlistNoneImg = 'assets/svg/Wishlist.svg'),
        (this.wishlistImg = 'assets/svg/btn-whishlist-selected.svg'),
        (this.traditionalSelectedImg = 'assets/svg/TraditionViewBot.svg'),
        (this.traditionalUnSelectedImg =
          'assets/svg/Tradition_unSelectedBot.svg'),
        (this.tabSelectedImg = 'assets/svg/tabs_Selected 1 1.svg'),
        (this.tabUnSelectedImg = 'assets/svg/tabs_Unselected 1.svg'),
        (this.brandName = 'Brands');
      this.orgName = 'Botcom';
    }
  }
  getTenantAddress() {
    if (this.orgName === 'veterneo') {
      const address = {
        phoneNum: '+91 7799774424',
        email: 'customercare@veterneo.com',
        addressLine1: '64-B, Mothi Nagar, Vengal Rao Nagar',
        addressLine2: 'Sanjeeva Reddy Nagar,Hyderabad, Telangana 500038',
        addressLine3:
          ' Ph.No:+91 7799774424, Email:- customercare@veterneo.com:, CIN No:U74300AP2001PLC038239',
        address4: '64-B, Mothi Nagar, Vengal Rao Nagar,',
        address5: 'Sanjeeva Reddy Nagar,Hyderabad,',
        address6: 'Telangana 500038',
      };
      return address;
    } else {
      const address = {
        phoneNum: '+91 9100800001',
        email: 'ecomsupport@arkatiss.com',
        addressLine1: 'PLOT NO 1 IDA, Hyderabad',
        addressLine2: '',
        addressLine3:
          'Ph.No:9100800001, Email:- botcomsupport@arkatiss.com:, CIN No:U74300AP2001PLC038239',
        address4: '4400 Route 9 South Freehold',
        address5: 'New Jersey07728',
        address6: 'USA',
      };
      return address;
    }
  }
  getTenantFooterData() {
    if (this.orgName === 'Veterneo') {
      const footerData = {
        data: [
          {
            title: 'About',
            subtitle: ['Home', 'Contact Us', 'About Us', 'Business Enquiry'],
          },
          {
            title: 'NUTRITION & SUPPLEMENTS',
            subtitle: [
              'Calisupp',
              'Multisupp',
              'Liversupp',
              'Gronic',
              'N-Mix Forte',
            ],
          },
          {
            title: 'DEWORMERS & ANTIBIOTICS',
            subtitle: [
              'N-Triclamet',
              'Ciflo-TZ',
              'Vetazit',
              'Enrobex',
              'En-Clear',
              'Sheegra',
            ],
          },
          {
            title: 'ADDRESS & LOCATION',
            subtitle: [
              '+91 9100800001',
              '4400 Route 9 South Freehold',
              'New Jersey07728',
              'USA',
              'ecomsupport@arkatiss.com',
            ],
          },
        ],
      };
      return footerData;
    } else if (this.orgName === 'Botcom') {
      const footerData = {
        data: [
          {
            title: 'About',
            subtitle: [
              'Contact Us',
              'About Us',
              'Careers',
              'News',
              'Corporate Information',
            ],
          },
          {
            title: 'Help',
            subtitle: [
              'Payments',
              'Shipping',
              'Cancellation & Returns',
              "FAQ's",
              'Reports',
              'Shining a Light',
            ],
          },
          {
            title: 'Legal',
            subtitle: [
              'General Information',
              'Privacy Policy',
              'Terms Of Service',
            ],
          },
          {
            title: 'ADDRESS & LOCATION',
            subtitle: [
              '+91 9100800001',
              '4400 Route 9 South Freehold',
              'New Jersey07728',
              'USA',
              'ecomsupport@arkatiss.com',
            ],
          },
        ],
      };
      return footerData;
    }
  }
}
