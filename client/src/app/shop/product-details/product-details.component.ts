import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons/faMinusCircle';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons/faPlusCircle';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
    product?: Product;
    faMinusCircle = faMinusCircle;
    faPlusCircle = faPlusCircle;

    constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute, private breadCrumbService: BreadcrumbService) {
        this.breadCrumbService.set('@productDetails', ' ');
    }

    ngOnInit(): void {
        this.loadProduct();
    }

    loadProduct() {
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        if (id)
            this.shopService.getProduct(+id).subscribe({
                next: (product) => {
                    this.product = product;
                    this.breadCrumbService.set('@productDetails', product.name);
                },
                error: (error) => console.log(error),
            });
    }
}
