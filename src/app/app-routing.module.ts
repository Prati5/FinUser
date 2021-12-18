import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component:LoginComponent,
    data: { title: 'Login' },
  },
  {
    path: 'dashboard',
    component : DashboardComponent,
    //loadChildren: './components/dashboard/dashboard.module#dashboardComponentModule',
    data: { title: 'Login' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
