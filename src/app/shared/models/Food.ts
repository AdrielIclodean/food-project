export class Food{
    //!exclamation says that the attribute is optional
    //? questionmark says that it's optional

    id!: number;  
    name!: String;
    price!: number;
    tags?: string[];
    favorite: boolean = false;
    stars: number = 0;
    imageurl! : string;
    origins!: string[];
    cookTime!: string;

}