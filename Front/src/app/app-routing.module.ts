import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Router } from 'express';
import { AuthGuard } from './common/auth.guard';
import { ContactComponent } from './views/contact/contact.component';
import { LoginComponent } from './views/login/login.component';
import { ProductComponent } from './views/product/product.component';
import { ProductsContainerComponent } from './views/products-container/products-container.component';
import { ProfileComponent } from './views/profile/profile.component';
import { RegisterComponent } from './views/register/register.component';


const routes: Routes = [
  {path:'login',component: LoginComponent},
  {path:'register',component: RegisterComponent},
  {path:'contact',component: ContactComponent},
  {path:'products',component: ProductsContainerComponent,canActivate: [AuthGuard]},
  {path:'profile',component: ProfileComponent,canActivate: [AuthGuard]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
