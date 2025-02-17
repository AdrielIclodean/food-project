export interface Food {
    //!exclamation says that the attribute is optional
    //? questionmark says that it's optional

    id: number;
    name: String;
    price: number;
    stars: number ;
    imageUrl: string;
    origins: string[];
    cookTime: string;
    favorite: boolean;
    tags?: string[];

}