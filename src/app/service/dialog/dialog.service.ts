import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DiscountFormComponent } from 'src/app/component/shared/discount/discount-form/discount-form.component';
import { IndividualResultsComponent } from 'src/app/component/shared/individual/individual-results/individual-results.component';
import { ProductResultsComponent } from 'src/app/component/shared/product/product-results/product-results.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  dimensions = {
    width: '600px',
    height: '400px',
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
    if (component) {
      let dialogRef: MatDialogRef<unknown, any>;
      // Add the data if there is any, open the component and return the result.
      if (data) {
        dialogRef = this.dialog.open(component, { ...this.dimensions, data });
      } else {
        dialogRef = this.dialog.open(component, this.dimensions);
      }
      /*dialogRef.afterClosed().subscribe((result) => {
      
      });*/
      return dialogRef.afterClosed();
    }
    return null;
  }
}
