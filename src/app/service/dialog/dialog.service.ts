import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DiscountFormComponent } from 'src/app/component/shared/discount/discount-form/discount-form.component';
import { IndividualResultsComponent } from 'src/app/component/shared/individual/individual-results/individual-results.component';
import { MeasurementTypeResultsComponent } from 'src/app/component/shared/measurementType/measurement-type-results/measurement-type-results.component';
import { ProductResultsComponent } from 'src/app/component/shared/product/product-results/product-results.component';
import { ProductBrandResultsComponent } from 'src/app/component/shared/productBrand/product-brand-results/product-brand-results.component';
import { ProductTypeResultsComponent } from 'src/app/component/shared/productType/product-type-results/product-type-results.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  dimensions = {
    width: '65%',
    height: '80%',
  };
  constructor(public dialog: MatDialog) {}

  open(name: string, data: any = undefined) {
    let component: ComponentType<unknown> | undefined;
    if (name === 'client') {
      component = IndividualResultsComponent;
    } else if (name === 'discount') {
      component = DiscountFormComponent;
    } else if (name === 'product') {
      component = ProductResultsComponent;
    }
    if (name === 'measurementType') {
      component = MeasurementTypeResultsComponent;
    } else if (name === 'brand') {
      component = ProductBrandResultsComponent;
    } else if (name === 'productType') {
      component = ProductTypeResultsComponent;
    }

    if (component) {
      let dialogRef: MatDialogRef<unknown, any>;
      // Add the data if there is any, open the component and return the result.
      if (data) {
        dialogRef = this.dialog.open(component, { ...this.dimensions, data });
      } else {
        dialogRef = this.dialog.open(component, this.dimensions);
      }
      return dialogRef.afterClosed();

      /**
       *  TO GET THE OBJECT OF THE DIALOG:
       *
       * this.dialogService.open('example').subscribe((result) => {
       *     this.selectedValues.name.field = result?.field;
       *  });
       */
    }
    return null;
  }
}
