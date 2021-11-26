import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { PaymentMethodPayload } from 'src/app/payload/paymentMethod/payment-method.payload';
import { PaymentMethodService } from 'src/app/service/paymentMethod/payment-method.service';
import { AppRoutes } from 'src/app/utils/appRoutes';

@Component({
  selector: 'app-payment-method-results',
  templateUrl: './payment-method-results.component.html',
  styleUrls: ['./payment-method-results.component.scss'],
})
export class PaymentMethodResultsComponent implements OnInit {
  // App routes
  AppRoutes = AppRoutes;
  // Input
  @Input() showUpdateButton: boolean;
  // Data
  paymentMethods: PaymentMethodPayload[];
  // GUI
  isLoading: boolean;
  // Form
  searchForm: FormGroup;
  // Table
  displayedColumns = ['name', 'notes', 'updateButton'];
  // Dataset created to manipulate the data in the table.
  datasource: MatTableDataSource<PaymentMethodPayload>;
  // Sort
  @ViewChild(MatSort) sort: MatSort | null = null;
  constructor(
    private paymentMethodService: PaymentMethodService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.showUpdateButton = false;
    this.paymentMethods = [];
    this.isLoading = false;
    this.searchForm = this.formBuilder.group({});
    this.datasource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      name: [''],
    });
    this.search();
  }

  search() {
    let name = '';
    this.isLoading = true;
    this.paymentMethodService.search(name).subscribe(
      (data) => {
        this.paymentMethods = data;
        this.isLoading = false;
        this.reloadDatasource();
      },
      (error) => {
        this.router.navigateByUrl(AppRoutes.error.internal);
      }
    );
  }
  reloadDatasource() {
    this.datasource = new MatTableDataSource(this.paymentMethods);
    this.datasource.sort = this.sort;
  }
}
