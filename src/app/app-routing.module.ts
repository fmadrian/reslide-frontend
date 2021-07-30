import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LandingComponent } from './component/page/landing/landing.component';
import { LoginComponent } from './component/page/login/login.component';
import { SignupComponent } from './component/page/signup/signup.component';
import { AppRoutes } from './utils/appRoutes';

const routes: Routes = [
  {path : AppRoutes.landing, component: LandingComponent},
  {path: AppRoutes.signup, component: SignupComponent, canActivate: [AuthGuard]},
  {path: AppRoutes.login, component: LoginComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
