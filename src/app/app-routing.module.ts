import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { InternalErrorComponent } from './component/page/error/internal-error/internal-error.component';
import { NotFoundComponent } from './component/page/error/not-found/not-found.component';
import { CreateIndividualComponent } from './component/page/individual/create-individual/create-individual.component';
import { SearchIndividualComponent } from './component/page/individual/search-individual/search-individual.component';
import { UpdateIndividualComponent } from './component/page/individual/update-individual/update-individual.component';
import { LandingComponent } from './component/page/landing/landing.component';
import { LoginComponent } from './component/page/login/login.component';
import { CreateUserComponent } from './component/page/user/create-user/create-user.component';
import { AppRoutes } from './utils/appRoutes';

const routes: Routes = [
  {path : AppRoutes.landing, component: LandingComponent},
  {path: AppRoutes.login, component: LoginComponent, canActivate: [AuthGuard]},
  {path: AppRoutes.user.create, component: CreateUserComponent},
  {path: AppRoutes.individual.create, component: CreateIndividualComponent},
  {path: AppRoutes.individual.update, component: UpdateIndividualComponent},
  {path: AppRoutes.individual.search, component: SearchIndividualComponent},
  {path: AppRoutes.error.internal, component: InternalErrorComponent},
  {path: AppRoutes.error.notFound, component: NotFoundComponent} // 404 always goes at last.
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation:'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
