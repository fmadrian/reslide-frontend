import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoicePayload } from 'src/app/payload/invoice/invoice.payload';
import { InvoiceService } from 'src/app/service/invoice/invoice.service';
import { AppRoutes } from 'src/app/utils/appRoutes';

@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.scss'],
})
export class ViewInvoiceComponent implements OnInit {
  @Input() invoice: InvoicePayload;
  error: string | null = null;
  id: number | null = null;
  constructor(
    private activateRoute: ActivatedRoute,
    private invoiceService: InvoiceService,
    private router: Router
  ) {
    this.invoice = {
      clientName: '',
      clientCode: '',
      details: [],
      status: '',
      transaction: {
        date: '',
        notes: '',
        payments: [],
        username: '',
      },
    };
  }

  ngOnInit(): void {
    // 1. Get the individual using the code passed in the parameters (query parameters).
    this.id = this.activateRoute.snapshot.params.id;
    this.getInvoice();
  }
  getInvoice() {
    if (this.id) {
      this.invoiceService.get(this.id).subscribe(
        (data) => {
          this.invoice = data;
          this.error = null;
        },
        (error) => {
          this.error = error.error.message;
        }
      );
    }
  }
  update() {
    if (this.invoice.id) {
      this.router.navigateByUrl(AppRoutes.invoice.update_id(this.invoice.id));
    }
  }
}
