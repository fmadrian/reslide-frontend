import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button'; 
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav'; 
import { FooterComponent } from './component/shared/base/footer/footer.component';
import { LoginComponent } from './component/page/login/login.component';
import { SignupComponent } from './component/page/signup/signup.component';
import { BaseComponent } from './component/page/base/base.component';
import { SidenavComponent } from './component/shared/base/sidenav/sidenav.component';
import { NavbarComponent } from './component/shared/base/navbar/navbar.component';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider'; 
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input'; 
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    SidenavComponent,
    NavbarComponent,
    BaseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // Reactive forms
    ReactiveFormsModule,
    // Angular material
    BrowserAnimationsModule,
    // Angular material components
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
