import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { CreateContactTypeComponent } from './component/page/contactType/create-contact-type/create-contact-type.component';
import { SearchContactTypeComponent } from './component/page/contactType/search-contact-type/search-contact-type.component';
import { UpdateContactTypeComponent } from './component/page/contactType/update-contact-type/update-contact-type.component';
import { InternalErrorComponent } from './component/page/error/internal-error/internal-error.component';
import { NotFoundComponent } from './component/page/error/not-found/not-found.component';
import { CreateIndividualComponent } from './component/page/individual/create-individual/create-individual.component';
import { SearchIndividualComponent } from './component/page/individual/search-individual/search-individual.component';
import { UpdateIndividualComponent } from './component/page/individual/update-individual/update-individual.component';
import { CreateIndividualTypeComponent } from './component/page/individualType/create-individual-type/create-individual-type.component';
import { SearchIndividualTypeComponent } from './component/page/individualType/search-individual-type/search-individual-type.component';
import { UpdateIndividualTypeComponent } from './component/page/individualType/update-individual-type/update-individual-type.component';
import { CreateInvoiceComponent } from './component/page/invoice/create-invoice/create-invoice.component';
import { SearchInvoiceComponent } from './component/page/invoice/search-invoice/search-invoice.component';
import { UpdateInvoiceComponent } from './component/page/invoice/update-invoice/update-invoice.component';
import { ViewInvoiceComponent } from './component/page/invoice/view-invoice/view-invoice.component';
import { LandingComponent } from './component/page/landing/landing.component';
import { LoginComponent } from './component/page/login/login.component';
import { CreateMeasurementTypeComponent } from './component/page/measurementType/create-measurement-type/create-measurement-type.component';
import { SearchMeasurementTypeComponent } from './component/page/measurementType/search-measurement-type/search-measurement-type.component';
import { UpdateMeasurementTypeComponent } from './component/page/measurementType/update-measurement-type/update-measurement-type.component';
import { CreateOrderComponent } from './component/page/order/create-order/create-order.component';
import { SearchOrderComponent } from './component/page/order/search-order/search-order.component';
import { UpdateOrderComponent } from './component/page/order/update-order/update-order.component';
import { ViewOrderComponent } from './component/page/order/view-order/view-order.component';
import { SearchPaymentComponent } from './component/page/payment/search-payment/search-payment.component';
import { CreatePaymentMethodComponent } from './component/page/paymentMethod/create-payment-method/create-payment-method.component';
import { SearchPaymentMethodComponent } from './component/page/paymentMethod/search-payment-method/search-payment-method.component';
import { UpdatePaymentMethodComponent } from './component/page/paymentMethod/update-payment-method/update-payment-method.component';
import { CreateProductComponent } from './component/page/product/create-product/create-product.component';
import { SearchProductComponent } from './component/page/product/search-product/search-product.component';
import { UpdateProductComponent } from './component/page/product/update-product/update-product.component';
import { CreateProductBrandComponent } from './component/page/productBrand/create-product-brand/create-product-brand.component';
import { SearchProductBrandComponent } from './component/page/productBrand/search-product-brand/search-product-brand.component';
import { UpdateProductBrandComponent } from './component/page/productBrand/update-product-brand/update-product-brand.component';
import { CreateUserComponent } from './component/page/user/create-user/create-user.component';
import { SearchUserComponent } from './component/page/user/search-user/search-user.component';
import { UpdateCurrentUserComponent } from './component/page/user/update-current-user/update-current-user.component';
import { UpdateUserComponent } from './component/page/user/update-user/update-user.component';
import { CreateProductTypeComponent } from './component/page/productType/create-product-type/create-product-type.component';
import { SearchProductTypeComponent } from './component/page/productType/search-product-type/search-product-type.component';
import { UpdateProductTypeComponent } from './component/page/productType/update-product-type/update-product-type.component';
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
    component: SearchMeasurementTypeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutes.measurementType.create,
    component: CreateMeasurementTypeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutes.measurementType.update,
    component: UpdateMeasurementTypeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutes.user.updateCurrentUser,
    component: UpdateCurrentUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutes.user.updateUser,
    component: UpdateUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutes.user.search,
    component: SearchUserComponent,
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
  {
    path: AppRoutes.paymentMethod.create,
    component: CreatePaymentMethodComponent,
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutes.paymentMethod.update,
    component: UpdatePaymentMethodComponent,
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutes.paymentMethod.search,
    component: SearchPaymentMethodComponent,
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutes.individualType.create,
    component: CreateIndividualTypeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutes.individualType.update,
    component: UpdateIndividualTypeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutes.individualType.search,
    component: SearchIndividualTypeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutes.contactType.create,
    component: CreateContactTypeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutes.contactType.update,
    component: UpdateContactTypeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutes.contactType.search,
    component: SearchContactTypeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutes.payment.search,
    component: SearchPaymentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutes.productType.create,
    component: CreateProductTypeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutes.productType.update,
    component: UpdateProductTypeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutes.productType.search,
    component: SearchProductTypeComponent,
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
