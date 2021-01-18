import { Injectable } from '@angular/core';

export interface Product {
  id: number,
  title: string,
  price: number,
  discount: boolean,
  image: string,
  description: string
}

@Injectable({
  providedIn: 'root'
})
export class ProductsDataService {

  constructor() { }

  getProducts():Array<Product> {
    return [
      {
        id: 1,
        title: "Popcorn",
        price: 3,
        discount: false,
        image: "assets/images/popcorn.jpg",
        description: "Popcorn is a snack which consists of grains of maize or corn that have been heated until they have burst and become large and light. It can be eaten with salt or sometimes sugar."
      },
      {
        id: 2,
        title: "Snickers",
        price: 4,
        discount: true,
        image: "assets/images/snickers.jpg",
        description: "Snickers is a brand name chocolate bar made by the American company Mars, Incorporated, consisting of nougat topped with caramel and peanuts that has been enrobed in milk chocolate."
      },
      {
        id: 3,
        title: "Soda",
        price: 2,
        discount: false,
        image: "assets/images/soda.jpg",
        description: "Soda is a drink that usually contains carbonated water (although some vitamin waters and lemonades are not carbonated), a sweetener, and a natural or artificial flavoring."
      }
    ];
  }
}
