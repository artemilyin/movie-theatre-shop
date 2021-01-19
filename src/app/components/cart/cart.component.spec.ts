import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import {ProductsDataService} from "../../services/products-data.service";
import {CartService} from "../../services/cart.service";

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove products from cart', () => {
    const cartService = fixture.debugElement.injector.get(CartService);
    component.removeAllProducts();
    fixture.detectChanges();

    expect(Object.keys(cartService.getAllProducts()).length).toEqual(0);
  });

  it('should calculate total', () => {
    // For some reason this test fails sometimes.
    // Cannot say the exact reason, but for some reason
    // it checks total sum when not all required products added to cart.
    const cartService = fixture.debugElement.injector.get(CartService);
    cartService.removeAllProducts();
    cartService.addProductToCart(1, 3);
    cartService.addProductToCart(2, 5);
    cartService.addProductToCart(3, 1);
    component.productsCartDisplayData();
    component.calculateTotal();
    fixture.detectChanges();

    expect(component.totalSum).toBe(23);
  });

});
