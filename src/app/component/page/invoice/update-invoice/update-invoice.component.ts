import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoicePayload } from 'src/app/payload/invoice/invoice.payload';
import { PaymentPayload } from 'src/app/payload/payment/payment.payload';
import { InvoiceService } from 'src/app/service/invoice/invoice.service';
import { PaymentService } from 'src/app/service/payment/payment.service';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';
import { ApiError, ApiErrorMessage } from 'src/app/utils/apiErrorMessages';
import { AppRoutes } from 'src/app/utils/appRoutes';

@Component({
  selector: 'app-update-invoice',
  templateUrl: './update-invoice.component.html',
  styleUrls: ['./update-invoice.component.scss'],
})
export class UpdateInvoiceComponent implements OnInit {
  apiError: ApiError | null = null;
  invoiceInput: InvoicePayload | null = null;
  id = 0; // Id of the invoice to be modified.
  error: string | null = null;
  constructor(
    private invoiceService: InvoiceService,
    private snackbarService: SnackbarService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // 1. Get the individual using the code passed in the parameters (query parameters).
    this.id = this.activateRoute.snapshot.params.id;
    this.getInvoice();
  }
  update(invoice: InvoicePayload) {
    this.invoiceService.update(invoice).subscribe(
      (data) => {
        this.snackbarService.show('Invoice updated');
        this.apiError = null;
        this.router.navigateByUrl(AppRoutes.invoice.view_id(this.id));
      },
      (error) => {
        this.apiError = error; // We pass it to the child component
        this.snackbarService.show(error);
      }
    );
  }
  getInvoice() {
    this.invoiceService.get(this.id).subscribe(
      (data) => {
        this.invoiceInput = data;
        this.error = null;
      },
      (error) => {
        this.error = error.error.message;
      }
    );
  }
}
