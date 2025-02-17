import { Injectable } from '@angular/core';
import { Cart } from '../../shared/models/Cart';
import { Food } from '../../shared/models/Food';
import { CartItem } from '../../shared/models/CartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart = new Cart();

  constructor() {

  }

  addToCart(food: Food | null) {
    if (food) {
      let cartItem = this.cart.items
        .find(item => item.food.id === food.id);

      if (cartItem && food) {
        this.changeQuantity(food.id, cartItem.quantity + 1);
        return;
      }
    }

    if (food) {
      this.cart.items.push(new CartItem(food));

    }
  }

  removeFromCart(foodId: number): void {
    // filtering out the food which are not equal to our id 
    this.cart.items =
      this.cart.items.filter(item => item.food.id != foodId);
  }

  changeQuantity(id: number, quantity: number) {
    let cartItem = this.cart.items.find(item => item.food.id === id)
    if (!cartItem) {
      return; // no cart item existing with that id
    }

    cartItem.quantity = quantity;
  }

  getCart(): Cart {
    return this.cart;
  }
}
