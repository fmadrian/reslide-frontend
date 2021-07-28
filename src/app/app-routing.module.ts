import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './component/page/base/base.component';
import { LoginComponent } from './component/page/login/login.component';
import { SignupComponent } from './component/page/signup/signup.component';
import { AppRoutes } from './utils/routes';

const routes: Routes = [
  {path : AppRoutes.landing, component: BaseComponent},
  {path: AppRoutes.signup, component: SignupComponent},
  {path: AppRoutes.login, component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
