import { Injectable } from '@angular/core';

export interface ProductsInCart { [key: number]: number; }

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor() {}

  // Adds product information into localStorage.
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

  // Gets all products added to cart.
  getAllProducts(): ProductsInCart {
    let cart = localStorage.getItem('cart');

    if (!cart) {
      return {};
    }
    return JSON.parse(cart);
  }

  // Gets count of all products added to cart.
  getAllProductsCount(): number {
    let count = 0;
    let products = this.getAllProducts();
    for (let product in products) {
      count += products[product];
    }

    return count;
  }

  // Removes all products from cart.
  removeAllProducts(): void {
    localStorage.removeItem('cart');
  }

  // Removes product from cart using provided productId.
  removeProductFromCart(productId: number): void {
    let productsInCart = this.getAllProducts();
    delete productsInCart[productId];
    localStorage.setItem('cart', JSON.stringify(productsInCart));
  }
}
