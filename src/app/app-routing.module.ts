import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { InternalErrorComponent } from './component/page/error/internal-error/internal-error.component';
import { NotFoundComponent } from './component/page/error/not-found/not-found.component';
import { CreateIndividualComponent } from './component/page/individual/create-individual/create-individual.component';
import { SearchIndividualComponent } from './component/page/individual/search-individual/search-individual.component';
import { UpdateIndividualComponent } from './component/page/individual/update-individual/update-individual.component';
import { CreateInvoiceComponent } from './component/page/invoice/create-invoice/create-invoice.component';
import { SearchInvoiceComponent } from './component/page/invoice/search-invoice/search-invoice.component';
import { UpdateInvoiceComponent } from './component/page/invoice/update-invoice/update-invoice.component';
import { ViewInvoiceComponent } from './component/page/invoice/view-invoice/view-invoice.component';
import { LandingComponent } from './component/page/landing/landing.component';
import { LoginComponent } from './component/page/login/login.component';
import { CreateOrderComponent } from './component/page/order/create-order/create-order.component';
import { SearchOrderComponent } from './component/page/order/search-order/search-order.component';
import { UpdateOrderComponent } from './component/page/order/update-order/update-order.component';
import { ViewOrderComponent } from './component/page/order/view-order/view-order.component';
import { CreateProductComponent } from './component/page/product/create-product/create-product.component';
import { SearchProductComponent } from './component/page/product/search-product/search-product.component';
import { UpdateProductComponent } from './component/page/product/update-product/update-product.component';
import { CreateProductBrandComponent } from './component/page/productBrand/create-product-brand/create-product-brand.component';
import { SearchProductBrandComponent } from './component/page/productBrand/search-product-brand/search-product-brand.component';
import { UpdateProductBrandComponent } from './component/page/productBrand/update-product-brand/update-product-brand.component';
import { CreateUserComponent } from './component/page/user/create-user/create-user.component';
import { UpdateUserComponent } from './component/page/user/update-user/update-user.component';
import { ProductTypeResultsComponent } from './component/shared/productType/product-type-results/product-type-results.component';
import { AppRoutes } from './utils/appRoutes';

const routes: Routes = [
  {
    path: AppRoutes.landing,
    component: LandingComponent,
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutes.login,
    component: LoginComponent,
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutes.user.create,
    component: CreateUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutes.individual.create,
    component: CreateIndividualComponent,
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutes.individual.update,
    component: UpdateIndividualComponent,
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutes.individual.search,
    component: SearchIndividualComponent,
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutes.product.create,
    component: CreateProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutes.product.search,
    component: SearchProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutes.product.update,
    component: UpdateProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutes.invoice.create,
    component: CreateInvoiceComponent,
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutes.invoice.search,
    component: SearchInvoiceComponent,
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutes.invoice.update,
    component: UpdateInvoiceComponent,
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutes.invoice.view,
    component: ViewInvoiceComponent,
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutes.order.create,
    component: CreateOrderComponent,
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutes.order.search,
    component: SearchOrderComponent,
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutes.order.update,
    component: UpdateOrderComponent,
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutes.order.view,
    component: ViewOrderComponent,
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutes.measurementType.search,
    component: ProductTypeResultsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutes.user.update,
    component: UpdateUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutes.productBrand.create,
    component: CreateProductBrandComponent,
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutes.productBrand.update,
    component: UpdateProductBrandComponent,
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutes.productBrand.search,
    component: SearchProductBrandComponent,
    canActivate: [AuthGuard],
  },
  { path: AppRoutes.error.internal, component: InternalErrorComponent },
  { path: AppRoutes.error.notFound, component: NotFoundComponent }, // 404 always goes at last.
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
