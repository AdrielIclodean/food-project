export interface Car {
    //!exclamation says that the attribute is optional
    //? questionmark says that it's optional

    id: number;
    name: string;
    price: number;
    priceString?: string;
    stars: number ;
    imageUrl: string;
    origins: string[];
    maxSpeed: string;
    favorite: boolean;
    tags?: string[];

}