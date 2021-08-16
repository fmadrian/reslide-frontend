import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { IndividualPayload } from 'src/app/payload/individual/individual.payload';
import { IndividualService } from 'src/app/service/individual/individual.service';
import { AppRoutes } from 'src/app/utils/appRoutes';

@Component({
  selector: 'app-individual-results',
  templateUrl: './individual-results.component.html',
  styleUrls: ['./individual-results.component.scss']
})
export class IndividualResultsComponent implements OnInit {

  // Search form
  searchForm: FormGroup;
  // Individual table
  displayedColumns = ['type','code', 'name', 'button']; // id will be hidden.
  @Input() isUpdating : boolean;
  // Dataset created to manipulate the data in the table.
  datasource: MatTableDataSource<IndividualPayload>;
  // Sort
  @ViewChild(MatSort) sort: (MatSort | null) = null;
  // Selected row
  individualSelected : (IndividualPayload | null);
  // Output
  @Output() componentOutput = new EventEmitter<IndividualPayload[]>()
  individuals$ : Observable<IndividualPayload[]>;
  
  constructor(private router: Router, private individualService: IndividualService, private formBuilder: FormBuilder) { 
    this.searchForm = this.formBuilder.group({})
    this.datasource = new MatTableDataSource();
    this.individualSelected = null;
    this.individuals$ = new Observable<IndividualPayload[]>();
    this.isUpdating = true;
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      query: ['']
    })
    this.individuals$ = this.individualService.search()
    this.individuals$.subscribe(
      (data)=>{
        this.loadDataSource(data)
      },() =>{
        this.router.navigateByUrl(AppRoutes.error.internal)
      }
    )
  }
  loadDataSource(data: IndividualPayload[]){
    this.datasource= new MatTableDataSource(data);
  }
  selectIndividual(row: IndividualPayload){
    if(this.individualSelected && this.individualSelected === row){
      this.individualSelected = null;
    }else{
      this.individualSelected = row;
    }
  }
  search(){
    let query = this.searchForm.get('query')?.value;
    this.individuals$ = this.individualService.search(query);
    this.individuals$.subscribe(
      (data)=>{
        this.loadDataSource(data);
      },() =>{
        this.router.navigateByUrl(AppRoutes.error.internal)
      }
    )
  }
  update(individual: IndividualPayload){
    if(individual?.id !== null && individual?.id !== undefined){
      this.router.navigateByUrl(AppRoutes.individual.update_id(individual.id));
    }
  }
  sendToParentComponent(individual: IndividualPayload){
    if(individual !== null && individual !== undefined){
      // Send individual to parent component
    }
  }

}
