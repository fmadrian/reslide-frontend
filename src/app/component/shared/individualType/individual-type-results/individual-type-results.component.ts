import {
  AfterViewInit,
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IndividualTypePayload } from 'src/app/payload/individualType/individual-type.payload';
import { IndividualTypeService } from 'src/app/service/individualType/individual-type.service';
import { AppRoutes } from 'src/app/utils/appRoutes';

@Component({
  selector: 'app-individual-type-results',
  templateUrl: './individual-type-results.component.html',
  styleUrls: ['./individual-type-results.component.scss'],
})
export class IndividualTypeResultsComponent implements OnInit {
  // Individual table
  displayedColumns = ['name', 'notes', 'button']; // id will be hidden.
  // Dataset created to manipulate the data in the table.
  datasource: MatTableDataSource<IndividualTypePayload>;
  // Sort
  @ViewChild(MatSort) sort: MatSort | null = null;
  // Selected row
  individualTypeSelected: IndividualTypePayload | null;
  // GUI flags
  isLoading = true;
  @Input() showUpdateButton: boolean;
  // Output
  @Output() componentOutput = new EventEmitter<IndividualTypePayload[]>();
  // Dialog
  dialogRef: MatDialogRef<IndividualTypeResultsComponent> | null;
  constructor(
    public injector: Injector,
    private router: Router,
    private individualTypeService: IndividualTypeService
  ) {
    this.showUpdateButton = false;
    this.individualTypeSelected = null;
    this.datasource = new MatTableDataSource();
    // Tries to inject a dialog reference (if it doesn't exist, it returns null)
    this.dialogRef = this.injector.get(MatDialogRef, null);
  }

  ngOnInit(): void {
    this.individualTypeService.getAll().subscribe(
      (data) => {
        this.loadDataSource(data);
      },
      (error) => {
        this.router.navigateByUrl(AppRoutes.error.internal);
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  loadDataSource(data: IndividualTypePayload[]) {
    this.datasource = new MatTableDataSource(data);
  }
  select(row: IndividualTypePayload) {
    if (this.individualTypeSelected === row) {
      this.individualTypeSelected = null;
    } else {
      this.individualTypeSelected = row;
    }
  }
  update(individualType: IndividualTypePayload) {
    if (individualType.id)
      this.router.navigateByUrl(
        AppRoutes.individualType.update_id(individualType.id)
      );
  }
  closeDialog(type: IndividualTypePayload | null = null) {
    if (this.dialogRef !== null) {
      // Closes the dialog and sends the individual selected to whoever called the dialog.
      this.dialogRef?.close(type);
    }
  }
}
