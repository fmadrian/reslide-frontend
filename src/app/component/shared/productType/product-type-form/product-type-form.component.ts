import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductTypePayload } from 'src/app/payload/productType/product-type.payload';
import { ProductTypeService } from 'src/app/service/productBrand/product-type.service';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';
import { ApiError } from 'src/app/utils/apiErrorMessages';
import { FormValidation } from 'src/app/utils/formValidation';

@Component({
  selector: 'app-product-type-form',
  templateUrl: './product-type-form.component.html',
  styleUrls: ['./product-type-form.component.scss'],
})
export class ProductTypeFormComponent implements OnInit {
  // Form group
  productTypeForm: FormGroup;
  // Input
  @Input() productType: ProductTypePayload | null;
  @Input() apiError: ApiError | null;
  // Form output
  @Output() productTypeOutput = new EventEmitter<ProductTypePayload>();
  @Output() refreshOutput = new EventEmitter<void>();
  // Form validation
  formValidation = FormValidation;
  constructor(
    private formBuilder: FormBuilder,
    private productTypeService: ProductTypeService,
    private snackbarService: SnackbarService
  ) {
    this.productTypeForm = this.formBuilder.group({});
    this.productType = null;
    this.apiError = null;
  }

  ngOnInit(): void {
    this.productTypeForm = this.formBuilder.group({
      type: ['', Validators.required],
      notes: [''],
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.loadData();
  }

  loadData() {
    if (this.productType) {
      this.productTypeForm.get('type')?.setValue(this.productType.type);
      this.productTypeForm.get('notes')?.setValue(this.productType.notes);
    }
  }

  submit() {
    const result: ProductTypePayload = {
      type: this.productTypeForm.get('type')?.value,
      notes: this.productTypeForm.get('notes')?.value,
    };
    // If there's an input (product brand), it means we're updating it. Therefore, we have to add the id
    if (this.productType) {
      result.id = this.productType.id;
    }
    // Send it back to the parent component.
    this.productTypeOutput.emit(result);
  }
  reset() {
    // Reloads the information from the product brand or resets the form
    if (this.productType) {
      this.loadData();
    } else {
      this.productTypeForm.reset();
    }
    this.apiError = null;
  }

  switchStatus() {
    if (this.productType) {
      this.productTypeService.switchStatus(this.productType).subscribe(
        () => {
          this.snackbarService.show('Status changed.');
          this.refreshOutput.next();
        },
        (error) => {
          this.snackbarService.show(error);
        }
      );
    }
  }
}
