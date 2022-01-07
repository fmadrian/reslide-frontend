import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductPayload } from 'src/app/payload/product/product.payload';
import { ProductService } from 'src/app/service/product/product.service';
import { AppRoutes } from 'src/app/utils/appRoutes';

@Component({
  selector: 'app-product-results-quantity',
  templateUrl: './product-results-quantity.component.html',
  styleUrls: ['./product-results-quantity.component.scss'],
})
export class ProductResultsQuantityComponent implements OnInit, AfterViewInit {
  AppRoutes = AppRoutes;
  title = 'Products low in quantity';
  isLoading = false;
  isOpen = false;
  error = '';
  products: ProductPayload[] = [];
  form = this.formBuilder.group({});
  displayedColumns = [
    'name',
    'brand',
    'code',
    'type',
    'quantityAvailable',
    'measurementType',
    'price',
    'taxExempt',
    'button',
  ];
  // Dataset created to manipulate the data in the table.
  datasource: MatTableDataSource<ProductPayload> = new MatTableDataSource();
  // Sort
  @ViewChild(MatSort) sort: MatSort | null = null;
  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      quantity: [0, [Validators.required]],
    });
    this.search();
  }
  ngAfterViewInit(): void {
    this.loadDataSource();
  }
  switchContent() {
    this.isOpen = !this.isOpen;
  }
  search() {
    this.isLoading = true;
    this.error = '';
    const quantity = this.form.get('quantity')?.value;
    this.productService.searchLessOrEqual(quantity).subscribe(
      (data) => {
        this.products = data;
        this.loadDataSource();
      },
      (error) => {
        this.error = "We couldn't fetch the data.";
      },
      () => {
        this.isLoading = false; // Remove the loading spinner.
      }
    );
  }
  loadDataSource() {
    this.datasource = new MatTableDataSource(this.products);
    this.datasource.sort = this.sort;
  }
}
