import {
  AfterViewInit,
  Component,
  Injector,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductBrandPayload } from 'src/app/payload/productBrand/product-brand.payload';
import { ProductBrandService } from 'src/app/service/productBrand/product-brand.service';
import { AppRoutes } from 'src/app/utils/appRoutes';
import { IndividualResultsComponent } from '../../individual/individual-results/individual-results.component';

@Component({
  selector: 'app-product-brand-results',
  templateUrl: './product-brand-results.component.html',
  styleUrls: ['./product-brand-results.component.scss'],
})
export class ProductBrandResultsComponent implements OnInit, AfterViewInit {
  // Search form
  searchForm: FormGroup;
  // Table
  displayedColumns = ['name', 'button']; // id will be hidden.
  // Dataset created to manipulate the data in the table.
  datasource: MatTableDataSource<ProductBrandPayload>;
  // Sort
  @ViewChild(MatSort) sort: MatSort | null = null;
  // Selected row
  brandSelected: ProductBrandPayload | null;
  // Data
  brands$: Observable<ProductBrandPayload[]>;
  // Dialog
  dialogRef: MatDialogRef<IndividualResultsComponent> | null;
  // Input
  @Input() showUpdateButton: boolean;
  // GUI flags
  isLoading = true;

  constructor(
    public injector: Injector,
    private router: Router,
    private service: ProductBrandService,
    private formBuilder: FormBuilder
  ) {
    this.searchForm = this.formBuilder.group({});
    this.datasource = new MatTableDataSource();
    this.brandSelected = null;
    this.brands$ = new Observable<ProductBrandPayload[]>();
    this.showUpdateButton = false;
    // Tries to inject a dialog reference (if it doesn't exist, it returns null)
    this.dialogRef = this.injector.get(MatDialogRef, null);
  }

  ngAfterViewInit() {
    this.datasource.sort = this.sort;
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      query: [''],
    });
    // This a hot observable, therefore it's only called once and the result is 'shared'.
    this.service.search().subscribe(
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
  loadDataSource(data: ProductBrandPayload[]) {
    this.datasource = new MatTableDataSource(data);
    this.datasource.sort = this.sort;
  }
  selectBrand(row: ProductBrandPayload) {
    if (this.brandSelected && this.brandSelected === row) {
      this.brandSelected = null;
    } else {
      this.brandSelected = row;
    }
  }
  search() {
    let query = this.searchForm.get('query')?.value;
    this.isLoading = true;
    this.service.search(query).subscribe(
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
  update(productBrand: ProductBrandPayload) {
    if (productBrand?.id !== null && productBrand?.id !== undefined) {
      this.router.navigateByUrl(
        AppRoutes.productBrand.update_id(productBrand.id)
      );
    }
  }

  closeDialog(type: ProductBrandPayload | null = null) {
    if (this.dialogRef !== null) {
      // Closes the dialog and sends the individual selected to whoever called the dialog.
      this.dialogRef?.close(type);
    }
  }
}
