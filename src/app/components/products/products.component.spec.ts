import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import {ProductsDataService} from "../../services/products-data.service";

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use products list from productsData service', () => {
    const productsDataService = fixture.debugElement.injector.get(ProductsDataService);
    fixture.detectChanges();
    component.getAllProducts();
    expect(productsDataService.getProducts()).toEqual(component.products);
  });
});
