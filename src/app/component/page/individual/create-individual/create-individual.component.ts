import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IndividualPayload } from 'src/app/payload/individual/individual.payload';
import { IndividualService } from 'src/app/service/individual/individual.service';
import { ApiError, ApiErrorMessage } from 'src/app/utils/apiErrorMessages';

@Component({
  selector: 'app-create-individual',
  templateUrl: './create-individual.component.html',
  styleUrls: ['./create-individual.component.scss']
})
export class CreateIndividualComponent implements OnInit {
  apiError : (ApiError | null) = null;
  constructor(private individualService: IndividualService, private _snackBar: MatSnackBar, private router: Router) { 
    
  }

  ngOnInit(): void {

  }
  createIndividual(individual : IndividualPayload){
    this.individualService.create(individual).subscribe(
      (data)=>{
        this._snackBar.open('Individual created', 'OK', {duration: 3000});
        this.apiError = null;
      },(error)=>{
        this.apiError = ApiErrorMessage(error.error);
        this._snackBar.open(error.error.message, 'OK', {duration: 3000});
      }
    )
  } 

}
