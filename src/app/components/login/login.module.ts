import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import {ReactiveFormsModule} from '@angular/forms';
const routes: Routes = [
  { path: '', component: LoginComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
