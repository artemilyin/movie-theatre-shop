import { Component, OnInit } from '@angular/core';
import { ProductsDataService } from "../../services/products-data.service";
import { Product } from "../../services/products-data.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Array<Product> = [];
  constructor(private productsData: ProductsDataService) { }

  // TODO: this should populate products' objects array
  // Function emulates API call, but now it just gives data from a service
  // In reality though we'd use nodejs or other backend call to get the data
  getAllProducts(): void {
    this.products = this.productsData.getProducts();
  }

  ngOnInit(): void {
    console.log(this.products);
    this.getAllProducts();
    console.log(this.products[0]);
  }

}
