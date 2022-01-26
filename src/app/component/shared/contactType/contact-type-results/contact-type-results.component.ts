import {
  AfterViewInit,
  Component,
  Injector,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ContactTypePayload } from 'src/app/payload/contactType/contact-type.payload';
import { ContactTypeService } from 'src/app/service/contactType/contact-type.service';
import { AppRoutes } from 'src/app/utils/appRoutes';

@Component({
  selector: 'app-contact-type-results',
  templateUrl: './contact-type-results.component.html',
  styleUrls: ['./contact-type-results.component.scss'],
})
export class ContactTypeResultsComponent implements OnInit, AfterViewInit {
  AppRoutes = AppRoutes;
  isLoading = false;
  // Dialog
  dialogRef = this.injector.get(MatDialogRef, null); // Used to display the component inside a dialog.
  // Input
  @Input() showUpdateButton = false;
  // Table and sort
  displayedColumns = ['type', 'button'];
  datasource: MatTableDataSource<ContactTypePayload>; // We have to define, that it'll receive contact types.
  contactTypes: ContactTypePayload[] = [];
  @ViewChild(MatSort) sort: MatSort | null = null;

  constructor(
    public injector: Injector,
    private contactTypeService: ContactTypeService,
    private router: Router
  ) {
    this.datasource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.contactTypeService.getAll().subscribe(
      (data) => {
        this.contactTypes = data;
        this.reloadDatasource();
      },
      (error) => {
        this.router.navigateByUrl(AppRoutes.error.internal);
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngAfterViewInit(): void {
    // Linking the sort to the table.
    this.sort = this.datasource.sort;
  }
  reloadDatasource() {
    this.datasource = new MatTableDataSource(this.contactTypes);
    this.sort = this.datasource.sort;
  }

  closeDialog(type: ContactTypePayload | null = null) {
    if (this.dialogRef !== null) {
      // Closes the dialog and sends the individual selected to whoever called the dialog.
      this.dialogRef?.close(type);
    }
  }
}
