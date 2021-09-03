import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IndividualPayload } from 'src/app/payload/individual/individual.payload';
import { IndividualService } from 'src/app/service/individual/individual.service';
import { AppRoutes } from 'src/app/utils/appRoutes';

@Component({
  selector: 'app-individual-results',
  templateUrl: './individual-results.component.html',
  styleUrls: ['./individual-results.component.scss'],
})
export class IndividualResultsComponent implements OnInit {
  // Search form
  searchForm: FormGroup;
  // Individual table
  displayedColumns = ['type', 'code', 'name', 'button']; // id will be hidden.
  // Dataset created to manipulate the data in the table.
  datasource: MatTableDataSource<IndividualPayload>;
  // Sort
  @ViewChild(MatSort) sort: MatSort | null = null;
  // Selected row
  individualSelected: IndividualPayload | null;
  // Output
  @Output() componentOutput = new EventEmitter<IndividualPayload[]>();
  // GUI flag
  isLoading = true;
  @Input() showUpdateButton: boolean;
  // Dialog
  dialogRef: MatDialogRef<IndividualResultsComponent> | null;
  constructor(
    public injector: Injector,
    private router: Router,
    private individualService: IndividualService,
    private formBuilder: FormBuilder
  ) {
    this.searchForm = this.formBuilder.group({});
    this.datasource = new MatTableDataSource();
    this.individualSelected = null;
    this.showUpdateButton = false;
    // Tries to inject a dialog reference (if it doesn't exist, it returns null)
    this.dialogRef = this.injector.get(MatDialogRef, null);
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      query: [''],
    });
    this.individualService.search().subscribe(
      (data) => {
        this.loadDataSource(data);
      },
      () => {
        this.router.navigateByUrl(AppRoutes.error.internal);
      },
      () => {
        this.isLoading = false;
      }
    );
  }
  loadDataSource(data: IndividualPayload[]) {
    this.datasource = new MatTableDataSource(data);
  }
  selectIndividual(row: IndividualPayload) {
    if (this.individualSelected && this.individualSelected === row) {
      this.individualSelected = null;
    } else {
      this.individualSelected = row;
    }
  }
  search() {
    let query = this.searchForm.get('query')?.value;
    this.isLoading = true;
    this.individualService.search(query).subscribe(
      (data) => {
        this.loadDataSource(data);
      },
      () => {
        this.router.navigateByUrl(AppRoutes.error.internal);
      },
      () => {
        this.isLoading = false;
      }
    );
  }
  update(individual: IndividualPayload) {
    if (individual?.id !== null && individual?.id !== undefined) {
      this.router.navigateByUrl(AppRoutes.individual.update_id(individual.id));
    }
  }
  sendToParentComponent(individual: IndividualPayload) {
    if (individual !== null && individual !== undefined) {
      // Send individual to parent component
    }
  }
  closeDialog(type: IndividualPayload | null = null) {
    if (this.dialogRef !== null) {
      // Closes the dialog and sends the individual selected to whoever called the dialog.
      this.dialogRef?.close(type);
    }
  }
}
