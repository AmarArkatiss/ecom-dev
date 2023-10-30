import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs-compat';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private cartData = new BehaviorSubject<any>({

  });
  itemValue = new BehaviorSubject(this.theItem);
  constructor() { }

  setCartCount(data): any {
    this.cartData.next(data);

  }
  getCartCount(): any {
    return this.cartData.asObservable();
  }
  thesetItem(value) {
    if (value !== null) {
      this.itemValue.next(value); // this will make sure to tell every subscriber about the change.
      sessionStorage.setItem('theItem', JSON.stringify(value));
    }
  }

  get theItem() {
    const data = sessionStorage.getItem('theItem')
    return JSON.parse(data);
  }
}
