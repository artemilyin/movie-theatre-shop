import { Component, OnInit } from '@angular/core';
import { CartService } from "../../services/cart.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  elementsInCart: number = 0;
  cartComponentLoaded: boolean = false;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.setElementsInCart();
  }

  setElementsInCart(): void {
    this.elementsInCart = this.cartService.getAllProductsCount();
  }

  loadCartComponent(): void {
    this.cartComponentLoaded = true;
  }

  setCartCleared(): void {
    this.cartComponentLoaded = false;
    this.setElementsInCart();
  }
}
