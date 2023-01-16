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
import { jwtInterceptor } from './common/jwt.interceptor';
import { NavbarComponent } from './views/navbar/navbar.component';
import { ContactComponent } from './views/contact/contact.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { DashboardContainerComponent } from './views/dashboard-container/dashboard-container.component';
import { DashboardUserComponent } from './views/dashboard-user/dashboard-user.component';
import { BucketComponent } from './views/bucket/bucket.component';

@NgModule({
  declarations: [
    AppComponent,
  
    LoginComponent,
    ProductComponent,
    ProfileComponent,
    RegisterComponent,
    ProductsContainerComponent,
    NavbarComponent,
    ContactComponent,
    DashboardComponent,
    DashboardContainerComponent,
    DashboardUserComponent,
    BucketComponent
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
