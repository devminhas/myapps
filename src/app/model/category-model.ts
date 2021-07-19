import { SubCategory } from "./subcategory";

export interface Category {
id:number;
categoryName:string;
categoryDescription:string;
coverImage:string;
url?:string;
subCategories:SubCategory[];

}