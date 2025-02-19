import { Injectable } from '@angular/core';
import { Cart } from '../../shared/models/Cart';
import { Car } from '../../shared/models/Car';
import { CartItem } from '../../shared/models/CartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart = new Cart();

  constructor() {

  }

  addToCart(car: Car | null) {
    if (car) {
      let cartItem = this.cart.items
        .find(item => item.car.id === car.id);

      if (cartItem && car) {
        this.changeQuantity(car.id, cartItem.quantity + 1);
        return;
      }
    }

    if (car) {
      this.cart.items.push(new CartItem(car));

    }
  }

  removeFromCart(carId: number): void {
    // filtering out the car which are not equal to our id 
    this.cart.items =
      this.cart.items.filter(item => item.car.id != carId);
  }

  changeQuantity(id: number, quantity: number) {
    let cartItem = this.cart.items.find(item => item.car.id === id)
    if (!cartItem) {
      return; // no cart item existing with that id
    }

    cartItem.quantity = quantity;
  }

  getCart(): Cart {
    return this.cart;
  }
}
