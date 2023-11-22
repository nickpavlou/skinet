import { Component } from '@angular/core';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { BasketService } from 'src/app/basket/basket.service';
import { BasketItem } from 'src/app/shared/models/basket';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
    faCartShopping = faCartShopping;

    constructor(public basketService: BasketService) {}

    getCount(items: BasketItem[]) {
        return items.reduce((sum, item) => sum + item.quantity, 0);
    }
}
