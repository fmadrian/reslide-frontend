import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { DiscountPayload } from 'src/app/payload/discount/discount.payload';
import { InvoiceDetailPayload } from 'src/app/payload/invoiceDetail/invoice-detail.payload';
import { ProductPayload } from 'src/app/payload/product/product.payload';
import { DialogService } from 'src/app/service/dialog/dialog.service';
import { InvoiceDetailService } from 'src/app/service/invoiceDetail/invoice-detail.service';
import { ProductService } from 'src/app/service/product/product.service';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';
import { AppRoutes } from 'src/app/utils/appRoutes';
import { ProductResultsComponent } from '../../product/product-results/product-results.component';

@Component({
  selector: 'app-invoice-detail-form',
  templateUrl: './invoice-detail-form.component.html',
  styleUrls: ['./invoice-detail-form.component.scss'],
})
export class InvoiceDetailFormComponent implements OnInit {
  // Form
  invoiceDetailsForm: FormGroup;
  // API error
  apiError: any = null;
  // Products loaded in the autocomplete input.
  products$: undefined | Observable<ProductPayload[]>;
  // Values
  productSelected: ProductPayload | null = null;
  discount: DiscountPayload | undefined;
  // Input
  @Input() invoiceDetailInput: InvoiceDetailPayload | null = null;
  @Input() invoiceId: number | null = null;
  // Output
  @Output() invoiceDetailOutput = new EventEmitter<InvoiceDetailPayload>();
  @Output() refreshInvoice = new EventEmitter<void>();
  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private productService: ProductService,
    private invoiceDetailService: InvoiceDetailService,
    private snackbarService: SnackbarService,
    private dialogService: DialogService
  ) {
    this.invoiceDetailsForm = this.formBuilder.group({});
    this.products$ = new Observable<ProductPayload[]>();
  }

  ngOnInit() {
    this.invoiceDetailsForm = this.formBuilder.group({
      notes: [''],
      productAutocomplete: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(0)]],
      disableDiscountPrompt: [false, Validators.required],
    });
    this.products$ = this.invoiceDetailsForm
      .get('productAutocomplete')
      ?.valueChanges.pipe(
        switchMap(() => {
          let query = this.invoiceDetailsForm.get('productAutocomplete')?.value;
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
      this.invoiceDetailsForm
        .get('productAutocomplete')
        ?.setValue(
          `${this.productSelected?.code} ${this.productSelected?.name}`
        );
    }
  }
  applyDiscount(discountReceived: DiscountPayload) {
    this.discount = discountReceived;
  }
  deleteDiscount() {
    this.discount = undefined;
  }
  changeDiscount(discount: DiscountPayload | null) {
    if (discount) {
      this.discount = discount;
    }
  }
  // Form management
  submit() {
    // And the form is valid and we have selected a product.
    if (this.invoiceDetailsForm.valid && this.productSelected) {
      // Validate the new detail line.
      this.invoiceDetailService
        .validate({
          notes: this.invoiceDetailsForm.get('notes')?.value,
          priceByUnit: this.invoiceDetailsForm.get('priceByUnit')?.value,
          productCode: this.productSelected?.code,
          quantity: this.invoiceDetailsForm.get('quantity')?.value,
          status: 'active',
          discountApplied: this.discount,
        })
        .subscribe(
          (data) => {
            // If we are updating, we have to add the detail to the invoice and ask the parent component to refresh the invoice.
            if (this.invoiceId) {
              data.invoiceId = this.invoiceId;
              this.invoiceDetailService.create(data).subscribe(
                () => {
                  this.snackbarService.show('Detail added.');
                  this.refreshInvoice.next();
                },
                (error) => {
                  this.snackbarService.show(error);
                }
              );
            } else {
              // Send the returned validated line to the parent component.
              this.invoiceDetailOutput.next(data);
            }
          },
          (error) => {
            this.snackbarService.show(error);
          }
        );
    }
  }
  resetForm() {
    this.invoiceDetailsForm.reset();
    // TODO: RESET discount form.
    this.productSelected = null;
  }
  openDialog(name: string) {
    let dialog = null;
    if (name === 'discount') {
      dialog = this.dialogService.open(name, this.discount);
      dialog?.subscribe((data) => {
        this.changeDiscount(data);
      });
    } else if (name === 'product') {
      dialog = this.dialogService.open(name);
      dialog?.subscribe((data) => {
        this.changeProduct(data);
      });
    }
  }
}
