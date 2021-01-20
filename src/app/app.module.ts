import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { HeaderComponent } from './components/header/header.component';
import { ReactiveFormsModule } from "@angular/forms";
import { AddProductComponent } from './components/add-product/add-product.component';
import { RouterModule } from "@angular/router";
import { ThankYouPageComponent } from './components/thank-you-page/thank-you-page.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    ProductsComponent,
    HeaderComponent,
    AddProductComponent,
    ThankYouPageComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: 'thank-you',
        component: ThankYouPageComponent
      },
      {
        path: '',
        component: HomeComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
