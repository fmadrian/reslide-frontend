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
import {NgxWebstorageModule} from 'ngx-webstorage'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptor/token-interceptor';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import { LandingComponent } from './component/page/landing/landing.component';
import {MatMenuModule} from '@angular/material/menu';
import { CreateUserComponent } from './component/page/user/create-user/create-user.component';
import { UserFormComponent } from './shared/user/user-form/user-form.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    SidenavComponent,
    NavbarComponent,
    BaseComponent,
    LandingComponent,
    CreateUserComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // Reactive forms
    ReactiveFormsModule,
    // HTTP client 
    HttpClientModule,
    // NGX webstorage
    NgxWebstorageModule.forRoot(),
    // Angular material
    BrowserAnimationsModule,
    // Angular material components
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatMenuModule
    
  ],
  providers: [
    // HTTP interceptors
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
