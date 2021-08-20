import {
  Component,
  Injector,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MeasurementTypePayload } from 'src/app/payload/measurementType/measurement-type.payload';
import { MeasurementTypeService } from 'src/app/service/measurementType/measurement-type.service';
import { AppRoutes } from 'src/app/utils/appRoutes';
import { IndividualResultsComponent } from '../../individual/individual-results/individual-results.component';

@Component({
  selector: 'app-measurement-type-results',
  templateUrl: './measurement-type-results.component.html',
  styleUrls: ['./measurement-type-results.component.scss'],
})
export class MeasurementTypeResultsComponent implements OnInit {
  // Search form
  searchForm: FormGroup;
  // Table
  displayedColumns = ['name', 'notes', 'button']; // id will be hidden.
  // Dataset created to manipulate the data in the table.
  datasource: MatTableDataSource<MeasurementTypePayload>;
  // Sort
  @ViewChild(MatSort) sort: MatSort | null = null;
  // Selected row
  typeSelected: MeasurementTypePayload | null;
  // Dialog
  dialogRef: MatDialogRef<IndividualResultsComponent> | null;
  // Input
  @Input() showUpdateButton: boolean;
  // GUI flag
  isLoading = true;

  constructor(
    public injector: Injector,
    private router: Router,
    private service: MeasurementTypeService,
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
  loadDataSource(data: MeasurementTypePayload[]) {
    this.datasource = new MatTableDataSource(data);
  }
  selectType(row: MeasurementTypePayload) {
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
  update(individual: MeasurementTypePayload) {
    if (individual?.id !== null && individual?.id !== undefined) {
      this.router.navigateByUrl(
        AppRoutes.measurementType.update_id(individual.id)
      );
    }
  }

  closeDialog(type: MeasurementTypePayload | null = null) {
    if (this.dialogRef !== null) {
      // Closes the dialog and sends the individual (if there's any) selected to whoever called the dialog.
      this.dialogRef?.close(type);
    }
  }
}
