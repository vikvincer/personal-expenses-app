import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule), data: {label: 'Dashboard'}},
  {path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule), data: {label: 'Login'}},
  {path: 'expenses', loadChildren: () => import('./pages/expenses/expenses.module').then(m => m.ExpensesModule), data: {label: 'Expenses'}},
  {path: '**', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
