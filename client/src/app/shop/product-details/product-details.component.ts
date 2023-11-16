import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons/faMinusCircle';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons/faPlusCircle';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
    product?: Product;
    faMinusCircle = faMinusCircle;
    faPlusCircle = faPlusCircle;

    constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute) {}

    ngOnInit(): void {
        this.loadProduct();
    }

    loadProduct() {
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        if (id)
            this.shopService.getProduct(+id).subscribe({
                next: (product) => (this.product = product),
                error: (error) => console.log(error),
            });
    }
}
