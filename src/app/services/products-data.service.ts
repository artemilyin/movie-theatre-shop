import { Injectable } from '@angular/core';

export interface Product {
  id: number,
  title: string,
  price: number,
  discount: boolean,
  discountPercentage: number,
  discountAmount: number,
  image: string,
  description: string
}

@Injectable({
  providedIn: 'root'
})
export class ProductsDataService {

  constructor() { }

  // Gets all existing products - products from "API" and added by user.
  getProducts(): Array<Product> {
    let userProducts = this.getUserProducts();
    let baseProducts = [
      {
        id: 1,
        title: "Popcorn",
        price: 3,
        discount: false,
        discountPercentage: 0,
        discountAmount: 0,
        image: "assets/images/popcorn.jpg",
        description: "Popcorn is a snack which consists of grains of maize or corn that have been heated until they have burst and become large and light. It can be eaten with salt or sometimes sugar."
      },
      {
        id: 2,
        title: "Snickers",
        price: 4,
        discount: true,
        discountPercentage: 60,
        discountAmount: 5,
        image: "assets/images/snickers.jpg",
        description: "Snickers is a brand name chocolate bar made by the American company Mars, Incorporated, consisting of nougat topped with caramel and peanuts that has been enrobed in milk chocolate."
      },
      {
        id: 3,
        title: "Soda",
        price: 2,
        discount: false,
        discountPercentage: 0,
        discountAmount: 0,
        image: "assets/images/soda.jpg",
        description: "Soda is a drink that usually contains carbonated water (although some vitamin waters and lemonades are not carbonated), a sweetener, and a natural or artificial flavoring."
      }
    ];

    return baseProducts.concat(userProducts);
  }

  // Adds product to existing products list.
  // @see this.getProducts()
  addProduct(data: Product): void {
    let addedProducts = this.getUserProducts();
    addedProducts.push(data);
    localStorage.setItem('added_products', JSON.stringify(addedProducts));
  }

  // Gets products added by users.
  // @see this.getProducts()
  getUserProducts(): Array<Product> {
    let addedProducts = localStorage.getItem('added_products');
    if (!addedProducts) {
      return [];
    }

    return JSON.parse(addedProducts);
  }

  // Checks if such product exists.
  productExists(title: string): boolean {
    let exists = false;
    this.getProducts().forEach(product => {
      if (product.title.toLowerCase() == title.toLowerCase()) {
        exists = true;
      }
    });

    return exists;
  }
}
