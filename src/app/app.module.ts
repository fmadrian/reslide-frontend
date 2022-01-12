import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FooterComponent } from './component/shared/base/footer/footer.component';
import { LoginComponent } from './component/page/login/login.component';
import { SidenavComponent } from './component/shared/base/sidenav/sidenav.component';
import { NavbarComponent } from './component/shared/base/navbar/navbar.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptor/token-interceptor';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { LandingComponent } from './component/page/landing/landing.component';
import { MatMenuModule } from '@angular/material/menu';
import { CreateUserComponent } from './component/page/user/create-user/create-user.component';
import { UserFormComponent } from './component/shared/user/user-form/user-form.component';
import { IndividualFormComponent } from './component/shared/individual/individual-form/individual-form.component';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { ContactIndividualFormComponent } from './component/shared/contact/contact-individual-form/contact-individual-form.component';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddressIndividualFormComponent } from './component/shared/address/address-individual-form/address-individual-form.component';
import { ErrorStateMatcher } from '@angular/material/core';
import { CustomErrorStateMatcher } from './utils/errorState/errorStateMatcher';
import { BaseComponent } from './component/base/base.component';
import { InternalErrorComponent } from './component/page/error/internal-error/internal-error.component';
import { NotFoundComponent } from './component/page/error/not-found/not-found.component';
import { CreateIndividualComponent } from './component/page/individual/create-individual/create-individual.component';
import { SearchIndividualComponent } from './component/page/individual/search-individual/search-individual.component';
import { UpdateIndividualComponent } from './component/page/individual/update-individual/update-individual.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IndividualResultsComponent } from './component/shared/individual/individual-results/individual-results.component';
import { CreateProductComponent } from './component/page/product/create-product/create-product.component';
import { ProductFormComponent } from './component/shared/product/product-form/product-form.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MeasurementTypeResultsComponent } from './component/shared/measurementType/measurement-type-results/measurement-type-results.component';
import { ProductBrandResultsComponent } from './component/shared/productBrand/product-brand-results/product-brand-results.component';
import { ProductTypeResultsComponent } from './component/shared/productType/product-type-results/product-type-results.component';
import { SearchProductComponent } from './component/page/product/search-product/search-product.component';
import { ProductResultsComponent } from './component/shared/product/product-results/product-results.component';
import { UpdateProductComponent } from './component/page/product/update-product/update-product.component';
import { CreateInvoiceComponent } from './component/page/invoice/create-invoice/create-invoice.component';
import { InvoiceFormComponent } from './component/shared/invoice/invoice-form/invoice-form.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { InvoiceDetailResultsComponent } from './component/shared/invoiceDetail/invoice-detail-results/invoice-detail-results.component';
import { InvoiceDetailFormComponent } from './component/shared/invoiceDetail/invoice-detail-form/invoice-detail-form.component';
import { DiscountFormComponent } from './component/shared/discount/discount-form/discount-form.component';
import { PaymentFormComponent } from './component/shared/payment/payment-form/payment-form.component';
import { PaymentResultsComponent } from './component/shared/payment/payment-results/payment-results.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SearchInvoiceComponent } from './component/page/invoice/search-invoice/search-invoice.component';
import { InvoiceResultsComponent } from './component/shared/invoice/invoice-results/invoice-results.component';
import { UpdateInvoiceComponent } from './component/page/invoice/update-invoice/update-invoice.component';
import { MatDatepickerModule } from '@matheo/datepicker';
import { MatNativeDateModule } from '@matheo/datepicker/core';
import { InvoiceTotalComponent } from './component/shared/invoice/invoice-total/invoice-total.component';
import { ViewInvoiceComponent } from './component/page/invoice/view-invoice/view-invoice.component';
import { OrderFormComponent } from './component/shared/order/order-form/order-form.component';
import { OrderResultsComponent } from './component/shared/order/order-results/order-results.component';
import { OrderTotalComponent } from './component/shared/order/order-total/order-total.component';
import { OrderDetailFormComponent } from './component/shared/orderDetail/order-detail-form/order-detail-form.component';
import { OrderDetailResultsComponent } from './component/shared/orderDetail/order-detail-results/order-detail-results.component';
import { CreateOrderComponent } from './component/page/order/create-order/create-order.component';
import { SearchOrderComponent } from './component/page/order/search-order/search-order.component';
import { UpdateOrderComponent } from './component/page/order/update-order/update-order.component';
import { ViewOrderComponent } from './component/page/order/view-order/view-order.component';
import { MatTreeModule } from '@angular/material/tree';
import { DateRangeComponent } from './component/shared/date/date-range/date-range.component';
import { UpdateUserComponent } from './component/page/user/update-user/update-user.component';
import { ProductBrandFormComponent } from './component/shared/productBrand/product-brand-form/product-brand-form.component';
import { CreateProductBrandComponent } from './component/page/productBrand/create-product-brand/create-product-brand.component';
import { SearchProductBrandComponent } from './component/page/productBrand/search-product-brand/search-product-brand.component';
import { UpdateProductBrandComponent } from './component/page/productBrand/update-product-brand/update-product-brand.component';
import { MeasurementTypeFormComponent } from './component/shared/measurementType/measurement-type-form/measurement-type-form.component';
import { CreateMeasurementTypeComponent } from './component/page/measurementType/create-measurement-type/create-measurement-type.component';
import { UpdateMeasurementTypeComponent } from './component/page/measurementType/update-measurement-type/update-measurement-type.component';
import { SearchMeasurementTypeComponent } from './component/page/measurementType/search-measurement-type/search-measurement-type.component';
import { PaymentMethodFormComponent } from './component/shared/paymentMethod/payment-method-form/payment-method-form.component';
import { PaymentMethodResultsComponent } from './component/shared/paymentMethod/payment-method-results/payment-method-results.component';
import { CreatePaymentMethodComponent } from './component/page/paymentMethod/create-payment-method/create-payment-method.component';
import { SearchPaymentMethodComponent } from './component/page/paymentMethod/search-payment-method/search-payment-method.component';
import { UpdatePaymentMethodComponent } from './component/page/paymentMethod/update-payment-method/update-payment-method.component';
import { IndividualTypeFormComponent } from './component/shared/individualType/individual-type-form/individual-type-form.component';
import { IndividualTypeResultsComponent } from './component/shared/individualType/individual-type-results/individual-type-results.component';
import { CreateIndividualTypeComponent } from './component/page/individualType/create-individual-type/create-individual-type.component';
import { SearchIndividualTypeComponent } from './component/page/individualType/search-individual-type/search-individual-type.component';
import { UpdateIndividualTypeComponent } from './component/page/individualType/update-individual-type/update-individual-type.component';
import { NgxPrintModule } from 'ngx-print';
import { PrintBasicInformationComponent } from './component/shared/print/print-basic-information/print-basic-information.component';
import { ProductResultsQuantityComponent } from './component/shared/product/product-results-quantity/product-results-quantity.component';
import { OrderResultsEstimatedDateComponent } from './component/shared/order/order-results-estimated-date/order-results-estimated-date.component';
import { SearchPaymentComponent } from './component/page/payment/search-payment/search-payment.component';
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LoginComponent,
    SidenavComponent,
    NavbarComponent,
    LandingComponent,
    CreateUserComponent,
    UserFormComponent,
    IndividualFormComponent,
    ContactIndividualFormComponent,
    AddressIndividualFormComponent,
    BaseComponent,
    InternalErrorComponent,
    NotFoundComponent,
    CreateIndividualComponent,
    SearchIndividualComponent,
    UpdateIndividualComponent,
    IndividualResultsComponent,
    CreateProductComponent,
    ProductFormComponent,
    MeasurementTypeResultsComponent,
    ProductBrandResultsComponent,
    ProductTypeResultsComponent,
    SearchProductComponent,
    ProductResultsComponent,
    UpdateProductComponent,
    CreateInvoiceComponent,
    InvoiceFormComponent,
    InvoiceDetailResultsComponent,
    InvoiceDetailFormComponent,
    DiscountFormComponent,
    PaymentFormComponent,
    PaymentResultsComponent,
    InvoiceResultsComponent,
    SearchInvoiceComponent,
    UpdateInvoiceComponent,
    InvoiceTotalComponent,
    ViewInvoiceComponent,
    OrderFormComponent,
    OrderResultsComponent,
    OrderTotalComponent,
    OrderDetailFormComponent,
    OrderDetailResultsComponent,
    CreateOrderComponent,
    SearchOrderComponent,
    UpdateOrderComponent,
    ViewOrderComponent,
    DateRangeComponent,
    UpdateUserComponent,
    ProductBrandFormComponent,
    CreateProductBrandComponent,
    SearchProductBrandComponent,
    UpdateProductBrandComponent,
    MeasurementTypeFormComponent,
    CreateMeasurementTypeComponent,
    UpdateMeasurementTypeComponent,
    SearchMeasurementTypeComponent,
    PaymentMethodFormComponent,
    PaymentMethodResultsComponent,
    CreatePaymentMethodComponent,
    SearchPaymentMethodComponent,
    UpdatePaymentMethodComponent,
    IndividualTypeFormComponent,
    IndividualTypeResultsComponent,
    CreateIndividualTypeComponent,
    SearchIndividualTypeComponent,
    UpdateIndividualTypeComponent,
    PrintBasicInformationComponent,
    ProductResultsQuantityComponent,
    OrderResultsEstimatedDateComponent,
    SearchPaymentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // Reactive forms
    ReactiveFormsModule,
    // HTTP client
    HttpClientModule,
    // NGX webstorage
    NgxWebstorageModule.forRoot(),
    // Matheo datepicker
    MatDatepickerModule,
    MatNativeDateModule,
    // NGX Print
    NgxPrintModule,
    // Angular material
    BrowserAnimationsModule,
    // Angular material components
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatMenuModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatTabsModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatTreeModule,
  ],
  providers: [
    // Dependency injections.
    // HTTP interceptors
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    // Form error state matcher
    { provide: ErrorStateMatcher, useClass: CustomErrorStateMatcher },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
