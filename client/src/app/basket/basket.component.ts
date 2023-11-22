import { Component } from '@angular/core';
import { BasketService } from './basket.service';
import { faMinusCircle, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { BasketItem } from '../shared/models/basket';

@Component({
    selector: 'app-basket',
    templateUrl: './basket.component.html',
    styleUrls: ['./basket.component.scss'],
})
export class BasketComponent {
    faMinusCircle = faMinusCircle;
    faPlusCircle = faPlusCircle;
    faTrash = faTrash;

    constructor(public basketService: BasketService) {}

    incrementQuantity(item: BasketItem) {
        this.basketService.addItemToBasket(item);
    }

    removeItem(id: number, quantity: number) {
        this.basketService.removeItemFromBasket(id, quantity);
    }
}
