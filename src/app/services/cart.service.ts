import { Injectable } from '@angular/core';

export interface ProductsInCart { [key: number]: number; }

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor() {}

  addProductToCart(productId: number, quantity: number): void {
    let productsInCart = this.getAllProducts();

    if (productsInCart.hasOwnProperty(productId)) {
      productsInCart[productId] += quantity;
    }
    else {
      productsInCart[productId] = quantity;
    }
    localStorage.setItem('cart', JSON.stringify(productsInCart));
  }

  removeProductFromCart(productId: number): void {
    let productsInCart = this.getAllProducts();
    if (productsInCart.hasOwnProperty(productId)) {
      delete productsInCart[productId];
    }
  }

  getAllProducts(): ProductsInCart {
    let cart = localStorage.getItem('cart');

    if (!cart) {
      return {};
    }
    return JSON.parse(cart);
  }

  getAllProductsCount(): number {
    let count = 0;
    let products = this.getAllProducts();
    for (let product in products) {
      count += products[product];
    }

    return count;
  }

  removeAllProducts(): void {
    localStorage.clear();
  }


}
