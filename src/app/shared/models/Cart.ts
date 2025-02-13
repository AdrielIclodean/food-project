import { CartItem } from "./CartItem";

export class Cart{
   public items: CartItem[] = [];

    get totalPrice():number{

        let totalPrice = 0;

        this.items.forEach(item => {
            totalPrice += item.price;
        });

        return totalPrice;
    }

    get totalItemsCount():number{
        let totalItems = 0;

        this.items.forEach(item => {
            totalItems += item.quantity;
        })

        return totalItems;
    }
}