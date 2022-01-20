import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { DiscountPayload } from 'src/app/payload/discount/discount.payload';
import { OrderDetailPayload } from 'src/app/payload/orderDetail/order-detail.payload';
import { ProductPayload } from 'src/app/payload/product/product.payload';
import { DialogService } from 'src/app/service/dialog/dialog.service';
import { OrderDetailService } from 'src/app/service/orderDetail/order-detail.service';
import { ProductService } from 'src/app/service/product/product.service';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';
import { AppRoutes } from 'src/app/utils/appRoutes';

@Component({
  selector: 'app-order-detail-form',
  templateUrl: './order-detail-form.component.html',
  styleUrls: ['./order-detail-form.component.scss'],
})
export class OrderDetailFormComponent implements OnInit {
  // Form
  orderDetailsForm: FormGroup;
  // API error
  apiError: any = null;
  // Products loaded in the autocomplete input.
  products$: undefined | Observable<ProductPayload[]>;
  // Values
  productSelected: ProductPayload | null = null;
  discount: DiscountPayload | undefined;
  // Input
  @Input() orderDetailInput: OrderDetailPayload | null = null;
  @Input() orderId: number | null = null;
  // Output
  @Output() orderDetailOutput = new EventEmitter<OrderDetailPayload>();
  @Output() refreshOrder = new EventEmitter<void>();
  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private productService: ProductService,
    private orderDetailService: OrderDetailService,
    private snackbarService: SnackbarService,
    private dialogService: DialogService
  ) {
    this.orderDetailsForm = this.formBuilder.group({});
    this.products$ = new Observable<ProductPayload[]>();
  }

  ngOnInit() {
    this.orderDetailsForm = this.formBuilder.group({
      notes: [''],
      productAutocomplete: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(0)]],
      priceByUnit: [0, [Validators.required, Validators.min(0)]],
    });
    this.products$ = this.orderDetailsForm
      .get('productAutocomplete')
      ?.valueChanges.pipe(
        switchMap(() => {
          let query = this.orderDetailsForm.get('productAutocomplete')?.value;
          return this.productService.search('', query);
        }),
        catchError(() => {
          this.router.navigateByUrl(AppRoutes.error.internal); // Redirects the user.
          return of([]); // Returns empty observable with empty array.
        })
      );
  }
  // Value selection function
  changeProduct(product: ProductPayload | null) {
    if (product) {
      this.productSelected = product;
      this.orderDetailsForm
        .get('productAutocomplete')
        ?.setValue(
          `${this.productSelected?.code} ${this.productSelected?.name}`
        );
    }
  }
  // Form management
  submit() {
    // And the form is valid and we have selected a product.
    if (this.orderDetailsForm.valid && this.productSelected) {
      const quantity = this.orderDetailsForm.get('quantity')?.value;
      const priceByUnit = this.orderDetailsForm.get('priceByUnit')?.value;
      const data: OrderDetailPayload = {
        quantity,
        priceByUnit,
        notes: this.orderDetailsForm.get('notes')?.value,
        productCode: this.productSelected.code,
        productName: this.productSelected.name,
        total: parseFloat((quantity * priceByUnit).toFixed(2)),
      };
      if (this.orderId) {
        data.orderId = this.orderId;
        this.orderDetailService.create(data).subscribe(
          () => {
            this.snackbarService.show('Detail added.');
            this.refreshOrder.next();
          },
          (error) => {
            this.snackbarService.show(error);
          }
        );
      } else {
        // Send the returned validated line to the parent component.
        this.orderDetailOutput.next(data);
      }
    }
  }
  resetForm() {
    this.orderDetailsForm.reset();
    this.productSelected = null;
  }
  openDialog(name: string) {
    let dialog = null;
    if (name === 'product') {
      dialog = this.dialogService.open(name);
      dialog?.subscribe((data) => {
        this.changeProduct(data);
      });
    }
  }
}
