import { Component, OnInit } from '@angular/core';
import { ProductsDataService, Product } from "../../services/products-data.service";
import { CartService } from "../../services/cart.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Array<Product> = [];

  constructor(private productsData: ProductsDataService, private cartService: CartService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  // Function emulates API call, but now it just gives data from a service
  // In reality though we'd use nodejs or other backend call to get the data
  getAllProducts(): void {
    this.products = this.productsData.getProducts();
  }

  // Performs add to cart functionality by adding product to cart and incrementing product count.
  addToCart(event: Event|any, productId: number): void {
    // Get product quantity and add product to cart
    let quantitySelector = event.target.parentNode.querySelector('.quantity-' + productId);
    let quantity = quantitySelector.value;
    this.cartService.addProductToCart(productId, parseInt(quantity));
    // Set quantity to default value of 1.
    quantitySelector.value = 1;
    // Update items in cart count.
    let totalInCart = document.querySelector('.cart-button .badge')!.innerHTML;
    let newTotal = parseInt(totalInCart) + parseInt(quantity);
    document.querySelector('.cart-button .badge')!.innerHTML = newTotal.toString();
  }

  updateProducts() {
    this.getAllProducts();
  }
}
