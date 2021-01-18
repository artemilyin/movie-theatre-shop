import { Injectable } from '@angular/core';
import { Product } from "./products-data.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor() {}

  addProductToCart(productId: number, quantity: number) {
    let productsInCart = this.getAllProducts();

    if (productsInCart.hasOwnProperty(productId)) {
      productsInCart[productId] += quantity;
    }
    else {
      productsInCart[productId] = quantity;
    }
    localStorage.setItem('cart', JSON.stringify(productsInCart));
  }

  removeProductFromCart(productId: number) {
    let productsInCart = this.getAllProducts();
    if (productsInCart.hasOwnProperty(productId)) {
      delete productsInCart[productId];
    }
  }

  getAllProducts() {
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

  removeAllProducts() {
    localStorage.clear();
  }


}
