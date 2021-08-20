import {
  AfterViewInit,
  Component,
  Injector,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProductPayload } from 'src/app/payload/product/product.payload';
import { ProductBrandPayload } from 'src/app/payload/productBrand/product-brand.payload';
import { ProductTypePayload } from 'src/app/payload/productType/product-type.payload';
import { ProductService } from 'src/app/service/product/product.service';
import { AppRoutes } from 'src/app/utils/appRoutes';
import { IndividualResultsComponent } from '../../individual/individual-results/individual-results.component';
import { ProductBrandResultsComponent } from '../../productBrand/product-brand-results/product-brand-results.component';
import { ProductTypeResultsComponent } from '../../productType/product-type-results/product-type-results.component';

@Component({
  selector: 'app-product-results',
  templateUrl: './product-results.component.html',
  styleUrls: ['./product-results.component.scss'],
})
export class ProductResultsComponent implements OnInit, AfterViewInit {
  // Search form
  searchForm: FormGroup;
  // Table
  displayedColumns = [
    'name',
    'brand',
    'code',
    'type',
    'quantityAvailable',
    'measurementType',
    'price',
    'taxExempt',
    'productStatus',
    'button',
  ]; // id will be hidden.
  // Dataset created to manipulate the data in the table.
  datasource: MatTableDataSource<ProductPayload>;
  // Sort
  @ViewChild(MatSort) sort: MatSort | null = null;
  // Selected row
  productSelected: ProductPayload | null;
  // Dialog
  dialogRef: MatDialogRef<IndividualResultsComponent> | null;
  // Selected values in search query
  searchQuerySelection = {
    brand: { name: '' },
    type: { type: '' },
  };
  // GUI flags
  @Input() showUpdateButton = false;
  isLoading = true;

  constructor(
    public injector: Injector,
    private router: Router,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
    this.searchForm = this.formBuilder.group({});
    this.datasource = new MatTableDataSource();
    this.productSelected = null;
    // Tries to inject a dialog reference (if it doesn't exist, it returns null)
    this.dialogRef = this.injector.get(MatDialogRef, null);
  }
  ngAfterViewInit(): void {
    this.datasource.sort = this.sort;
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      name: [''],
      code: [''],
      status: ['active'],
    });
    // This a hot observable, therefore it's only called once and the result is 'shared'.
    this.productService.search().subscribe(
      (data) => {
        this.loadDataSource(data);
      },
      () => {
        this.closeDialog();
        this.router.navigateByUrl(AppRoutes.error.internal);
      },
      () => {
        this.isLoading = false;
      }
    );
  }
  loadDataSource(data: ProductPayload[]) {
    this.datasource = new MatTableDataSource(data);
    this.datasource.sort = this.sort;
  }
  selectProduct(row: ProductPayload) {
    if (this.productSelected && this.productSelected === row) {
      this.productSelected = null;
    } else {
      this.productSelected = row;
    }
  }
  search() {
    this.isLoading = true;
    let name = this.searchForm.get('name')?.value;
    let brand =
      this.searchQuerySelection.brand.name !== undefined
        ? this.searchQuerySelection.brand.name
        : '';
    let type =
      this.searchQuerySelection.type.type !== undefined
        ? this.searchQuerySelection.type.type
        : '';
    let code = this.searchForm.get('code')?.value;
    let status = this.searchForm.get('status')?.value;
    this.productService.search(name, code, brand, type, status).subscribe(
      (data) => {
        this.loadDataSource(data);
      },
      () => {
        this.closeDialog();
        this.router.navigateByUrl(AppRoutes.error.internal);
      },
      () => {
        this.isLoading = false;
      }
    );
  }
  update(individual: ProductPayload) {
    if (individual?.id !== null && individual?.id !== undefined) {
      this.router.navigateByUrl(AppRoutes.product.update_id(individual.id));
    }
  }

  closeDialog(type: ProductPayload | null = null) {
    if (this.dialogRef !== null) {
      // Closes the dialog and sends the individual (if there's any) selected to whoever called the dialog.
      this.dialogRef?.close(type);
    }
  }

  // Dialog
  openDialog(dialog: string): void {
    let dimensions = {
      width: '600px',
      height: '400px',
    };
    if (dialog === 'brand') {
      const dialogRef = this.dialog.open(
        ProductBrandResultsComponent,
        dimensions
      );
      dialogRef.afterClosed().subscribe((result) => {
        this.searchQuerySelection.brand = { ...result };
      });
    } else if (dialog === 'productType') {
      const dialogRef = this.dialog.open(
        ProductTypeResultsComponent,
        dimensions
      );
      dialogRef.afterClosed().subscribe((result) => {
        this.searchQuerySelection.type = { ...result };
      });
    }
  }
  resetForm() {
    // Resets the form.
    this.searchForm.get('name')?.setValue('');
    this.searchForm.get('code')?.setValue('');
    this.searchForm.get('status')?.setValue('active');
    this.searchQuerySelection = {
      brand: { name: '' },
      type: { type: '' },
    };
  }
}
