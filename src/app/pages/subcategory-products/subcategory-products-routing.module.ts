import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubcategoryProductsPage } from './subcategory-products.page';

const routes: Routes = [
  {
    path: '',
    component: SubcategoryProductsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubcategoryProductsPageRoutingModule {}
