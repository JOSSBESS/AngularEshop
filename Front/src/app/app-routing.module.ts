import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './common/auth.guard';
import { RoleGuard } from './common/role.guard';
import { ContactComponent } from './views/contact/contact.component';
import { LoginComponent } from './views/login/login.component';
import { ProductsContainerComponent } from './views/products-container/products-container.component';
import { ProfileComponent } from './views/profile/profile.component';
import { RegisterComponent } from './views/register/register.component';
import { DashboardContainerComponent } from './views/dashboard-container/dashboard-container.component';
import { DashboardUserComponent } from './views/dashboard-user/dashboard-user.component';
import { BucketContainerComponent } from './views/bucket-container/bucket-container.component';


const routes: Routes = [
  {path:'login',component: LoginComponent},
  {path:'register',component: RegisterComponent},
  {path:'contact',component: ContactComponent},
  {path:'products',component: ProductsContainerComponent},
  {path:'profile',component: ProfileComponent,canActivate: [AuthGuard]},
  {path:'dashboard',component: DashboardContainerComponent,canActivate: [RoleGuard, AuthGuard]},
  {path:'dashtarget',component: DashboardUserComponent,canActivate: [RoleGuard, AuthGuard]},
  {path:'bucket',component: BucketContainerComponent,canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
