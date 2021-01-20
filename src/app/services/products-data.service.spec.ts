import { TestBed } from '@angular/core/testing';

import { ProductsDataService } from './products-data.service';

describe('ProductsDataService', () => {
  let service: ProductsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a product', () => {
    let productData = {
      id: 4,
      title: "Hamburger",
      price: 3,
      discount: false,
      discountPercentage: 10,
      discountAmount: 2,
      image: "assets/images/soda.jpg",
      description: "Hamburgers are tasty food, but not always healthy"
    };
    service.addProduct(productData);
    expect(service.getUserProducts().length).toBeGreaterThanOrEqual(1);
  });

  it('should check product existence', () => {
    let productTitle = 'popcorn';
    expect(service.productExists(productTitle)).toBeTrue();
    expect(service.productExists('not existing product')).toBeFalse();
  });
});
