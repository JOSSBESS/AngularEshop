import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './views/login/login.component';
import { ProductComponent } from './views/product/product.component';
import { ProfileComponent } from './views/profile/profile.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './views/register/register.component';
import { ProductsContainerComponent } from './views/products-container/products-container.component';
import { Router } from 'express';
import { jwtInterceptor } from './common/jwt.interceptor';
import { NavbarComponent } from './views/navbar/navbar.component';
import { ContactComponent } from './views/contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
  
    LoginComponent,
    ProductComponent,
    ProfileComponent,
    RegisterComponent,
    ProductsContainerComponent,
    NavbarComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule

  ],
  providers: [
    HttpClient,
    { provide: HTTP_INTERCEPTORS, useClass: jwtInterceptor,multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
