import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  OnChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, of } from 'rxjs';
import { AddressPayload } from 'src/app/payload/address/address.payload';

@Component({
  selector: 'app-address-individual-form',
  templateUrl: './address-individual-form.component.html',
  styleUrls: ['./address-individual-form.component.scss'],
})
export class AddressIndividualFormComponent
  implements OnInit, AfterViewInit, OnChanges
{
  // Contact form.
  addressForm: FormGroup;
  isAddressFormOpen = new BehaviorSubject<boolean>(false);

  // Contact table
  displayedColumns = ['value', 'description']; // id will be hidden.
  // Contacts received from parent component.
  @Input() addresses: AddressPayload[] = [];
  // Dataset created to manipulate the data in the table.
  datasource: MatTableDataSource<AddressPayload>;
  // Sort
  @ViewChild(MatSort) sort: MatSort | null = null;
  // Selected row (contact)
  addressSelected: AddressPayload | null;
  // Output
  @Output() componentOutput = new EventEmitter<AddressPayload[]>();

  constructor(private formBuilder: FormBuilder) {
    this.datasource = new MatTableDataSource();
    this.addressForm = this.formBuilder.group({});
    this.addressSelected = this.resetAddressSelected();
  }
  ngOnInit(): void {
    // Load the datasource into the table
    this.loadDataSource;
    this.addressForm = this.formBuilder.group({
      description: ['', Validators.required],
      value: ['', Validators.required],
    });
  }
  ngAfterViewInit() {
    // Sets the sorting for the table.
    this.datasource.sort = this.sort;
  }
  // Triggered when there is changes on the input sent by the parent component.
  ngOnChanges() {
    // Reloads the new information received from the parent component (addresses)
    this.loadDataSource();
  }
  selectAddress(row: AddressPayload) {
    // If we are making click on the same contact twice, it has to deselect the contact.
    if (this.addressSelected === row) {
      this.addressSelected = this.resetAddressSelected();
    } else {
      this.addressSelected = row;
    }
  }
  saveAddress() {
    if (this.addressForm.valid) {
      this.addresses.push({
        description: this.addressForm.get('description')?.value,
        value: this.addressForm.get('value')?.value,
      });
      this.sendContactsToParentComponent();
      this.loadDataSource();
    }
  }
  deleteAddress() {
    if (this.addressSelected !== null) {
      let index = this.addresses.indexOf(this.addressSelected);
      // Removes the selected contact
      this.addresses = [
        ...this.addresses.slice(0, index),
        ...this.addresses.slice(index + 1, this.addresses.length),
      ];
      this.sendContactsToParentComponent();
      this.addressSelected = this.resetAddressSelected();
      this.loadDataSource();
    }
  }
  openAddressForm() {
    this.addressForm.reset();
    this.isAddressFormOpen.next(true);
  }
  closeAddressForm() {
    this.isAddressFormOpen.next(false);
  }
  resetAddressSelected() {
    return null;
  }
  // Emits the contacts object to the parent component
  sendContactsToParentComponent() {
    this.componentOutput.next(this.addresses);
  }
  loadDataSource() {
    this.datasource = new MatTableDataSource(this.addresses);
  }
}
