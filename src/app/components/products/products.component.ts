import { Component, OnInit } from '@angular/core';
import { ProductsDataService, Product } from "../../services/products-data.service";
import { CartService } from "../../services/cart.service";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Array<Product> = [];
  productForm: FormGroup;
  formDefaults = {
    id: this.productsData.getProducts().length + 1,
    title: '',
    price: 0,
    description: '',
    discount: false,
    image: ''
  };

  constructor(
    private productsData: ProductsDataService,
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) {
    this.productForm = this.formBuilder.group(this.formDefaults);
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  // Function emulates API call, but now it just gives data from a service
  // In reality though we'd use nodejs or other backend call to get the data
  getAllProducts(): void {
    this.products = this.productsData.getProducts();
  }

  addToCart(event: Event|any, productId: number): void {
    let quantitySelector = event.target.parentNode.querySelector('.quantity-' + productId);
    let quantity = quantitySelector.value;
    this.cartService.addProductToCart(productId, parseInt(quantity));
    quantitySelector.value = 1;
    let totalInCart = document.querySelector('.cart-button .badge')!.innerHTML;
    let newTotal = parseInt(totalInCart) + parseInt(quantity);
    document.querySelector('.cart-button .badge')!.innerHTML = newTotal.toString();
  }

  newProductId(): number {
    return this.productsData.getProducts().length + 1;
  }

  onSubmit(): void {
    this.productsData.addProduct(this.productForm.value);
    this.productForm.reset(this.formDefaults);
    this.getAllProducts();
  }
}
