import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvoicePayload } from 'src/app/payload/invoice/invoice.payload';
import { InvoiceService } from 'src/app/service/invoice/invoice.service';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';
import { ApiError, ApiErrorMessage } from 'src/app/utils/apiErrorMessages';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss'],
})
export class CreateInvoiceComponent implements OnInit {
  apiError: ApiError | null = null;
  constructor(
    private invoiceService: InvoiceService,
    private snackbarService: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  createInvoice(invoice: InvoicePayload) {
    this.invoiceService.create(invoice).subscribe(
      (data) => {
        this.snackbarService.show('Invoice created');
        this.apiError = null;
      },
      (error) => {
        this.apiError = ApiErrorMessage(error.error); // We pass it to the child component
        this.snackbarService.show(error.error.message);
      }
    );
  }
}
