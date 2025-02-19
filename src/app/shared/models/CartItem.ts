import { Car } from "./Car";

export class CartItem{

    car:Car;
    quantity:number = 1;
    
    constructor(car:Car){
        this.car = car;
    }

    // getter function
    get price():number{
        return this.car.price * this.quantity;
    }


}