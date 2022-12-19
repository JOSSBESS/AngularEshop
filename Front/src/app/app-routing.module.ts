import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Router } from 'express';
import { LoginComponent } from './views/login/login.component';
import { ProductComponent } from './views/product/product.component';
import { ProductsContainerComponent } from './views/products-container/products-container.component';
import { ProfileComponent } from './views/profile/profile.component';
import { RegisterComponent } from './views/register/register.component';


const routes: Routes = [
  {path: 'login',component: LoginComponent},
  {path:'register',component: RegisterComponent},
  {path:'products',component: ProductsContainerComponent},
  {path:'profil',component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
