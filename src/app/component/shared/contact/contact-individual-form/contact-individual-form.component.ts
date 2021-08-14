import { Component, Input, OnInit, AfterViewInit, ViewChild, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ContactPayload } from 'src/app/payload/contact/contact.payload';
import { ContactTypePayload } from 'src/app/payload/contactType/contact-type.payload';
import { ContactTypeService } from 'src/app/service/contactType/contact-type.service';
import { AppRoutes } from 'src/app/utils/appRoutes';

@Component({
  selector: 'app-contact-individual-form',
  templateUrl: './contact-individual-form.component.html',
  styleUrls: ['./contact-individual-form.component.scss']
})
export class ContactIndividualFormComponent implements OnInit, AfterViewInit, OnChanges {
  // Contact form. 
  contactForm: FormGroup
  
  isContactFormOpen = new BehaviorSubject<boolean>(false);
  contactTypes : ContactTypePayload[] = [];

  // Contact table
  displayedColumns = ['contactType', 'value', 'notes']; // id will be hidden.
  // Contacts received from parent component.
  @Input() contacts: ContactPayload[] = [];
  // Dataset created to manipulate the data in the table.
  datasource: MatTableDataSource<ContactPayload>;
  // Sort
  @ViewChild(MatSort) sort: (MatSort | null) = null;
  // Selected row (contact)
  contactSelected : (ContactPayload | null);
  // Output
  @Output() componentOutput = new EventEmitter<ContactPayload[]>()

  constructor(private formBuilder: FormBuilder, private contactTypeService: ContactTypeService, private router: Router) { 
    this.datasource = new MatTableDataSource();
    this.contactForm = this.formBuilder.group({});
    this.contactSelected = this.resetContactSelected();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.loadDataSource();
  }
  ngAfterViewInit(){
    // Sets the sorting for the table.
    this.datasource.sort = this.sort;
  }
  ngOnInit(): void {
    // Load the datasource into the table
    this.datasource= new MatTableDataSource(this.contacts);
    // Load the contact types into the select component. 
    this.contactTypeService.getAll().subscribe(
      (data) =>{
        this.contactTypes = data;
      }, (error) => {
        // Show error message or redirect.
        this.router.navigateByUrl(AppRoutes.error.internal);
      }
    )
    this.contactForm = this.formBuilder.group({
      type :[null, Validators.required],
      value :['', Validators.required],
      notes :[''],
    });
  }
  
  openContactForm(){
    // Resets the form and opens it.
    this.contactForm.reset();
    this.isContactFormOpen.next(true);
  }
  closeContactForm(){
    this.isContactFormOpen.next(false);
  }
  selectContact(row: ContactPayload){
    // If we are making click on the same contact twice, it has to deselect the contact.
    if(this.contactSelected === row){
      this.contactSelected = this.resetContactSelected();
    }else{
      this.contactSelected = row;
    }
  }
  // Sets the contact selected to default
  resetContactSelected(){
    return null;
  }
  
  deleteContact(){
    // Deletes contact and resets the contact selected.
    if(this.contactSelected !== null){
      let index = this.contacts.indexOf(this.contactSelected);
      // Removes the selected contact
      this.contacts = [...this.contacts.slice(0, index), ...this.contacts.slice(index+1, this.contacts.length)];
      this.sendContactsToParentComponent();
      this.contactSelected = this.resetContactSelected();
      this.loadDataSource()
    }
  }
  saveContact(){ // OnSubmit form
    if(this.contactForm.valid){
      // Pushes the contacts to the array and sends it back.
      this.contacts.push({
        contactType: this.contactForm.get('type')?.value.type,
        value : this.contactForm.get('value')?.value,
        notes : this.contactForm.get('notes')?.value
      })
      this.sendContactsToParentComponent();
      this.loadDataSource();
    }
  }
  // Emits the contacts object to the parent component
  sendContactsToParentComponent(){
    this.componentOutput.next(this.contacts);
  }
  loadDataSource(){
    this.datasource= new MatTableDataSource(this.contacts);
  }
}
