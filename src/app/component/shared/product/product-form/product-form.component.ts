import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProductPayload } from 'src/app/payload/product/product.payload';
import { FormValidation } from 'src/app/utils/formValidation';
import { MeasurementTypeResultsComponent } from '../../measurementType/measurement-type-results/measurement-type-results.component';
import { ProductBrandResultsComponent } from '../../productBrand/product-brand-results/product-brand-results.component';
import { ProductTypeResultsComponent } from '../../productType/product-type-results/product-type-results.component';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit, OnChanges {
  // Form
  productForm: FormGroup;
  formValidation = FormValidation;
  // Input
  @Input() productInput: ProductPayload | null = null;
  @Input() apiError: any = null;
  // Output
  /**
   * I use this approach because I don't want to emit values each time we do a change in the object.
   * If I used an EventEmitter or a BehaviorSubject each time that I want to set new values in it
   * I would be submitting it to the parent component (hence, I would be updating or creating) a product.
   */
  @Output() productOutput = new EventEmitter<ProductPayload>();
  product: ProductPayload;
  // Selected values
  selectedValues = {
    productBrand: { name: '' },
    productType: { type: '' },
    measurementType: { name: '' },
  };

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog) {
    this.productForm = this.formBuilder.group({});
    this.product = this.resetProduct();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.resetForm();
  }
  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(0.01)]],
      price: [0, [Validators.required, Validators.min(0.01)]],
      notes: [''],
      taxExempt: ['false', Validators.required],
      productStatus: ['active'],
    });
    this.resetForm();
  }
  submit() {
    if (
      this.productForm.valid &&
      this.selectedValues.measurementType.name !== '' &&
      this.selectedValues.productType.type !== '' &&
      this.selectedValues.productBrand.name !== ''
    ) {
      this.product = {
        ...this.product,
        name: this.productForm.get('name')?.value,
        code: this.productForm.get('code')?.value,
        quantityAvailable: this.productForm.get('quantity')?.value,
        price: this.productForm.get('price')?.value,
        notes: this.productForm.get('notes')?.value,
        taxExempt:
          this.productForm.get('taxExempt')?.value === 'true' ? true : false,
        type: this.selectedValues.productType.type,
        measurementType: this.selectedValues.measurementType.name,
        brand: this.selectedValues.productBrand.name,
        productStatus: this.productForm.get('productStatus')?.value.toString(),
      };
      this.productOutput.next({ ...this.product });
    }
  }
  resetForm() {
    this.product = this.resetProduct();
    this.productForm.reset();
    this.productForm.get('code')?.setValue(this.product.code);
    this.productForm.get('name')?.setValue(this.product.name);
    this.productForm.get('quantity')?.setValue(this.product.quantityAvailable);
    this.productForm.get('price')?.setValue(this.product.price);
    this.productForm.get('notes')?.setValue(this.product.notes);
    this.productForm
      .get('taxExempt')
      ?.setValue(this.product.taxExempt.toString());
    this.productForm
      .get('productStatus')
      ?.setValue(this.product?.productStatus?.toString());
    this.selectedValues = {
      measurementType: { name: this.product.measurementType },
      productBrand: { name: this.product.brand },
      productType: { type: this.product.type },
    };
  }
  resetProduct() {
    if (this.productInput === null) {
      return {
        brand: '',
        code: '',
        measurementType: '',
        name: '',
        notes: '',
        price: 0,
        quantityAvailable: 0,
        taxExempt: false,
        type: '',
        status: 'active',
      };
    } else {
      return {
        ...this.productInput,
      };
    }
  }

  // Dialog
  openDialog(dialog: string): void {
    let dimensions = {
      width: '600px',
      height: '400px',
    };
    if (dialog === 'measurementType') {
      // Measurement type dialog.
      const dialogRef = this.dialog.open(
        MeasurementTypeResultsComponent,
        dimensions
      );
      dialogRef.afterClosed().subscribe((result) => {
        this.selectedValues.measurementType.name = result?.name;
      });
    } else if (dialog === 'brand') {
      const dialogRef = this.dialog.open(
        ProductBrandResultsComponent,
        dimensions
      );
      dialogRef.afterClosed().subscribe((result) => {
        this.selectedValues.productBrand.name = result?.name;
      });
    } else if (dialog === 'productType') {
      const dialogRef = this.dialog.open(
        ProductTypeResultsComponent,
        dimensions
      );
      dialogRef.afterClosed().subscribe((result) => {
        this.selectedValues.productType.type = result?.type;
      });
    }
  }
}
