import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ShopComponent } from './shop.component';
import { ProductItemComponent } from './product-item/product-item.component';

@NgModule({
    declarations: [ShopComponent, ProductItemComponent],
    imports: [CommonModule, SharedModule, FontAwesomeModule],
    exports: [ShopComponent],
})
export class ShopModule {}
