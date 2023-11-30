import { Component } from '@angular/core';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';
import { BasketItem } from 'src/app/shared/models/basket';
import { faCartShopping, faClockRotateLeft, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
    faCartShopping = faCartShopping;
    faClockRotateLeft = faClockRotateLeft;
    faRightFromBracket = faRightFromBracket;

    constructor(public basketService: BasketService, public accountService: AccountService) {}

    getCount(items: BasketItem[]) {
        return items.reduce((sum, item) => sum + item.quantity, 0);
    }
}
