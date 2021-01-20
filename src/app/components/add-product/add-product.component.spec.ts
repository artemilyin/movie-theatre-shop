import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddProductComponent } from './add-product.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProductComponent ],
      imports: [
        FormsModule, ReactiveFormsModule
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should has input value', () => {
    // check existing title 'popcorn'.
    const inputEl = de.query(By.css('input[name="title"]'));
    inputEl.nativeElement.value = 'popcorn'
    component.checkProductExistence({ target: inputEl.nativeElement });
    fixture.detectChanges();
    expect(component.titleError).toBeTrue();

    // Check new product title.
    inputEl.nativeElement.value = 'new product';
    component.checkProductExistence({ target: inputEl.nativeElement });
    fixture.detectChanges();
    expect(component.titleError).toBeFalse();
  });
});
