import { Component, OnInit } from '@angular/core';
import { CartService } from "../../services/cart.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  elementsInCartCount: number = 0;
  cartComponentLoaded: boolean = false;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.setElementsInCartCount();
  }

  // Sets elements in cart count.
  setElementsInCartCount(): void {
    this.elementsInCartCount = this.cartService.getAllProductsCount();
  }

  // Sets cartComponentLoaded to true.
  // Used for displaying cart component.
  setLoadCartComponent(): void {
    this.cartComponentLoaded = true;
  }

  // Sets cartComponentLoaded to false and recalculates items in cart.
  setCartCleared(): void {
    this.cartComponentLoaded = false;
    document.querySelector('.cart-button .badge')!.innerHTML = this.cartService.getAllProductsCount().toString();
  }
}
