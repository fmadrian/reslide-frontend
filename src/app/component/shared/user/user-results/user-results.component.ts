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
import { UserPayload } from 'src/app/payload/user/user.payload';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user/user.service';
import { AppRoutes } from 'src/app/utils/appRoutes';
import { IndividualResultsComponent } from '../../individual/individual-results/individual-results.component';

@Component({
  selector: 'app-user-results',
  templateUrl: './user-results.component.html',
  styleUrls: ['./user-results.component.scss'],
})
export class UserResultsComponent implements OnInit, AfterViewInit {
  // Search form
  searchForm: FormGroup;
  // Table
  displayedColumns = ['name', 'role', 'updateButton']; // id will be hidden.
  // Dataset created to manipulate the data in the table.
  datasource: MatTableDataSource<UserPayload>;
  users: UserPayload[] = [];
  // Sort
  @ViewChild(MatSort) sort: MatSort | null = null;
  // Dialog
  dialogRef: MatDialogRef<IndividualResultsComponent> | null;
  // Input
  @Input() showUpdateButton = false;
  // GUI flags
  isLoading = false;
  AppRoutes = AppRoutes;
  constructor(
    public injector: Injector,
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    public authService: AuthService
  ) {
    this.searchForm = this.formBuilder.group({});
    this.datasource = new MatTableDataSource();
    // Tries to inject a dialog reference (if it doesn't exist, it returns null)
    this.dialogRef = this.injector.get(MatDialogRef, null);
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      username: [''],
    });
    this.loadDataSource();
  }
  ngAfterViewInit() {
    this.datasource.sort = this.sort;
  }
  loadDataSource() {
    this.datasource = new MatTableDataSource(this.users);
    this.datasource.sort = this.sort;
  }
  search() {
    this.isLoading = true;
    const username = this.searchForm.get('username')?.value;
    this.userService.search(username).subscribe(
      (data) => {
        this.users = data;
        this.loadDataSource();
      },
      (error) => {
        this.router.navigateByUrl(AppRoutes.error.internal);
      },
      () => {
        this.isLoading = false;
      }
    );
  }
}
