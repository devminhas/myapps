export class Product{
    id:number;
    productName:string;
    productCode:string;
    productDescription:string;
    coverImage:string;
    price:number;
    quantity:number;
    images:Array<{id:number,imagePath:string}>;
    subCategory:{id:number,subCategoryName:string};
    availableSizes:string;
}