import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignupComponent } from './components/signup/signup.component';
import { ApiService } from 'src/services/ApiService/api.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 500,
      preventDuplicates: true,
      closeButton: true,
      progressBar: true,
      positionClass: 'toast-top-right',
      progressAnimation: 'increasing',
    }),
    BrowserAnimationsModule
  ],
  exports:[
    LoginComponent,
    DashboardComponent,
    ToastrModule,
    BrowserAnimationsModule
  ],
  providers: [ApiService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
