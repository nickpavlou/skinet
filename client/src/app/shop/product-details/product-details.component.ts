import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from 'src/app/basket/basket.service';
import { take } from 'rxjs';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
    product?: Product;
    faMinusCircle = faMinusCircle;
    faPlusCircle = faPlusCircle;
    quantity = 1;
    quantityInBasket = 0;

    constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute, private breadCrumbService: BreadcrumbService, private basketService: BasketService) {
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
                    this.basketService.basketSource$.pipe(take(1)).subscribe({
                        next: (basket) => {
                            const item = basket?.items.find((x) => x.id === +id);
                            if (item) {
                                this.quantity = item.quantity;
                                this.quantityInBasket = item.quantity;
                            }
                        },
                    });
                },
                error: (error) => console.log(error),
            });
    }

    incrementQuantity() {
        this.quantity++;
    }

    decrementQuantity() {
        this.quantity--;
    }

    updateBasket() {
        if (this.product) {
            if (this.quantity > this.quantityInBasket) {
                const itemsToAdd = this.quantity - this.quantityInBasket;
                this.quantityInBasket += itemsToAdd;
                this.basketService.addItemToBasket(this.product, itemsToAdd);
            } else {
                const itemsToRemove = this.quantityInBasket - this.quantity;
                this.quantityInBasket -= itemsToRemove;
                this.basketService.removeItemFromBasket(this.product.id, itemsToRemove);
            }
        }
    }

    get buttonText() {
        return this.quantityInBasket === 0 ? 'Add to basket' : 'Update basket';
    }
}
