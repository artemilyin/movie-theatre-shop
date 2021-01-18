import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { ProductsDataService } from "../../services/products-data.service";
import { Product } from "../../services/products-data.service";
import { CartService, ProductsInCart } from "../../services/cart.service";

interface ProductInCart {
  id: number,
  title: string,
  price: number,
  discount: boolean,
  quantity: number
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Output() cartCleared: EventEmitter<any> = new EventEmitter<any>();

  allProducts: Array<Product> = [];
  productsAdded: ProductsInCart = {};
  productsInCart: Array<ProductInCart> = [];
  totalSum: number = 0;

  constructor(private productsData: ProductsDataService, private cartService: CartService) { }

  ngOnInit(): void {
    this.allProducts = this.productsData.getProducts();
    this.productsAdded = this.cartService.getAllProducts();
    this.productsInCart = this.productsCartDisplayData();

    this.calculateTotal();
  }

  productsCartDisplayData(): Array<ProductInCart> {
    let output = [];

    for (let product of this.allProducts) {
      if (this.productsAdded.hasOwnProperty(product.id)) {
        output.push({
          id: product.id,
          title: product.title,
          price: product.price,
          discount: product.discount,
          quantity: this.productsAdded[product.id]
        });
      }
    }

    return output;
  }

  removeAllProducts(): void {
    this.cartService.removeAllProducts();
    this.emitCartCleared();
  }

  emitCartCleared():void {
    this.cartCleared.emit(true);
  }

  calculateTotal(): void {
    let total = 0;
    let productsInCart = this.productsInCart;
    for (let product of productsInCart) {
      console.log(product);
      if (product.discount) {
        let discounted = Math.floor(product.quantity / 5);
        let regular = product.quantity % 5;
        total += regular * product.price + discounted * 3 * product.price;
      }
      else {
        total += product.price * product.quantity;
      }
    }

    this.totalSum = total;
  }
}
