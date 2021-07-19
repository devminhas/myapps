import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubcategoryProductsPageRoutingModule } from './subcategory-products-routing.module';

import { SubcategoryProductsPage } from './subcategory-products.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubcategoryProductsPageRoutingModule
  ],
  declarations: [SubcategoryProductsPage]
})
export class SubcategoryProductsPageModule {}
