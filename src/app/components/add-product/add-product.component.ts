import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ProductsDataService } from "../../services/products-data.service";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  @Output() productAdded: EventEmitter<any> = new EventEmitter<any>();

  titleError: boolean = false;
  productForm: FormGroup;
  formDefaults = {
    id: this.productsData.getProducts().length + 1,
    title: '',
    price: 1,
    description: '',
    discount: false,
    discountPercentage: 10,
    discountAmount: 2,
    image: ''
  };

  constructor(
    private productsData: ProductsDataService,
    private formBuilder: FormBuilder
  ) {
    this.productForm = this.formBuilder.group(this.formDefaults);
  }

  ngOnInit(): void {
  }

  // Submits form, resets it, adds product and recalculates products display.
  onSubmit(): void {
    this.productsData.addProduct(this.productForm.value);
    this.productForm.reset(this.formDefaults);
    this.emitProductAdded();
  }

  // Gets id for the new product.
  // It's better to do it via database request, though.
  newProductId(): number {
    return this.productsData.getProducts().length + 1;
  }

  // Emits productAdded event.
  emitProductAdded():void {
    this.productAdded.emit(true);
  }

  // Checks if product exists.
  checkProductExistence(event: any) {
    this.titleError = this.productsData.productExists(event.target.value);
  }
}
