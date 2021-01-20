import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { ProductsDataService } from "../../services/products-data.service";
import { CartService, ProductsInCart } from "../../services/cart.service";

interface SingleProductInCart {
  id: number,
  title: string,
  price: number,
  discount: boolean,
  discountPercentage: number,
  discountAmount: number,
  quantity: number
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Output() cartCleared: EventEmitter<any> = new EventEmitter<any>();

  productsAdded: ProductsInCart = {};
  productsInCartData: Array<SingleProductInCart> = [];
  totalSum: number = 0;

  constructor(private productsData: ProductsDataService, private cartService: CartService) { }

  ngOnInit(): void {
    this.updateProductsInCart();
    this.calculateTotal();
  }

  // Gets the data for displaying products in cart.
  productsCartDisplayData(): Array<SingleProductInCart> {
    let output = [];

    for (let product of this.productsData.getProducts()) {
      if (this.productsAdded.hasOwnProperty(product.id)) {
        output.push({
          id: product.id,
          title: product.title,
          price: product.price,
          discount: product.discount,
          discountPercentage: product.discountPercentage,
          discountAmount: product.discountAmount,
          quantity: this.productsAdded[product.id]
        });
      }
    }

    return output;
  }

  // Removes all products from cart.
  removeAllProducts(): void {
    this.cartService.removeAllProducts();
    this.emitCartCleared();
  }

  // Emits cartCleared event.
  emitCartCleared():void {
    this.cartCleared.emit(true);
  }

  // Calculates total.
  calculateTotal(): void {
    let total = 0;
    let productsInCart = this.productsInCartData;
    for (let product of productsInCart) {
      if (product.discount) {
        let discounted = Math.floor(product.quantity / product.discountAmount);
        let regular = product.quantity % product.discountAmount;
        let discountedPrice = product.discountAmount * product.price * product.discountPercentage / 100;
        total += regular * product.price + discounted * discountedPrice;
      }
      else {
        total += product.price * product.quantity;
      }
    }

    this.totalSum = total;
  }

  // Updates products in cart
  updateProductsInCart(): void {
    this.productsAdded = this.cartService.getAllProducts();
    this.productsInCartData = this.productsCartDisplayData();
  }

  // Removes single product from cart
  removeProduct(productId: number): void {
    this.cartService.removeProductFromCart(productId)
    this.updateProductsInCart();
    this.calculateTotal();
  }
}
