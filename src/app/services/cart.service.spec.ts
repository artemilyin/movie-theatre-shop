import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add product to cart', () => {
    let productId = 2;
    let quantity = 5;
    service.addProductToCart(productId, quantity);
    expect(Object.keys(service.getAllProducts()).length).toBeGreaterThanOrEqual(1);
  });

  it('should remove all products from cart', () => {
    let productId = 2;
    let quantity = 5;
    service.addProductToCart(productId, quantity);
    service.removeAllProducts();
    expect(Object.keys(service.getAllProducts()).length).toBeFalsy();
  });

  it('should count the number of added products', () => {
    service.removeAllProducts();
    service.addProductToCart(1, 5);
    service.addProductToCart(2, 2);
    expect(service.getAllProductsCount()).toBe(7);
  });
});
