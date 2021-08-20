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
import { ProductTypePayload } from 'src/app/payload/productType/product-type.payload';
import { ProductTypeService } from 'src/app/service/productBrand/product-type.service';
import { AppRoutes } from 'src/app/utils/appRoutes';

@Component({
  selector: 'app-product-type-results',
  templateUrl: './product-type-results.component.html',
  styleUrls: ['./product-type-results.component.scss'],
})
export class ProductTypeResultsComponent implements OnInit, AfterViewInit {
  // Search form
  searchForm: FormGroup;
  // Table
  displayedColumns = ['name', 'button']; // id will be hidden.
  // Dataset created to manipulate the data in the table.
  datasource: MatTableDataSource<ProductTypePayload>;
  // Sort
  @ViewChild(MatSort) sort: MatSort | null = null;
  // Selected row
  typeSelected: ProductTypePayload | null;
  // Dialog (loads a product type results component)
  dialogRef: MatDialogRef<ProductTypeResultsComponent> | null;
  // Input
  @Input() showUpdateButton: boolean;
  // GUI flag
  isLoading = true;

  constructor(
    public injector: Injector,
    private router: Router,
    private service: ProductTypeService,
    private formBuilder: FormBuilder
  ) {
    this.searchForm = this.formBuilder.group({});
    this.datasource = new MatTableDataSource();
    this.typeSelected = null;
    this.showUpdateButton = false;
    // Tries to inject a dialog reference (if it doesn't exist, it returns null)
    this.dialogRef = this.injector.get(MatDialogRef, null);
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
  ngAfterViewInit(): void {
    this.datasource.sort = this.sort;
  }

  loadDataSource(data: ProductTypePayload[]) {
    this.datasource = new MatTableDataSource(data);
    this.datasource.sort = this.sort;
  }
  selectType(row: ProductTypePayload) {
    if (this.typeSelected && this.typeSelected === row) {
      this.typeSelected = null;
    } else {
      this.typeSelected = row;
    }
  }
  search() {
    this.isLoading = true;
    let query = this.searchForm.get('query')?.value;
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
  update(individual: ProductTypePayload) {
    if (individual?.id !== null && individual?.id !== undefined) {
      this.router.navigateByUrl(
        AppRoutes.measurementType.update_id(individual.id)
      );
    }
  }

  closeDialog(type: ProductTypePayload | null = null) {
    if (this.dialogRef !== null) {
      // Closes the dialog and sends the individual (if there's any) selected to whoever called the dialog.
      this.dialogRef?.close(type);
    }
  }
}
