import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductBrandPayload } from 'src/app/payload/productBrand/product-brand.payload';
import { ApiError } from 'src/app/utils/apiErrorMessages';
import { FormValidation } from 'src/app/utils/formValidation';

@Component({
  selector: 'app-product-brand-form',
  templateUrl: './product-brand-form.component.html',
  styleUrls: ['./product-brand-form.component.scss'],
})
export class ProductBrandFormComponent implements OnInit, OnChanges {
  // Form group
  productBrandForm: FormGroup;
  // Input
  @Input() productBrand: ProductBrandPayload | null;
  @Input() apiError: ApiError | null;
  // Form output
  @Output() productBrandOutput = new EventEmitter<ProductBrandPayload>();
  // Form validation
  formValidation = FormValidation;
  constructor(private formBuilder: FormBuilder) {
    this.productBrandForm = this.formBuilder.group({});
    this.productBrand = null;
    this.apiError = null;
  }

  ngOnInit(): void {
    this.productBrandForm = this.formBuilder.group({
      name: ['', Validators.required],
      notes: [''],
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.loadData();
  }

  loadData() {
    if (this.productBrand) {
      this.productBrandForm.get('name')?.setValue(this.productBrand.name);
      this.productBrandForm.get('notes')?.setValue(this.productBrand.notes);
    }
  }

  submit() {
    const result: ProductBrandPayload = {
      name: this.productBrandForm.get('name')?.value,
      notes: this.productBrandForm.get('notes')?.value,
    };
    // If there's an input (product brand), it means we're updating it. Therefore, we have to add the id
    if (this.productBrand) {
      result.id = this.productBrand.id;
    }
    // Send it back to the parent component.
    this.productBrandOutput.emit(result);
  }
  reset() {
    // Reloads the information from the product brand or resets the form
    if (this.productBrand) {
      this.loadData();
    } else {
      this.productBrandForm.reset();
    }
    this.apiError = null;
  }
}
