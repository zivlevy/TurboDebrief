import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {MainViewComponent} from './main-view/main-view.component';
import {LoginGuard} from './guards/login.guard';

const routes: Routes = [
  { path: '', component: MainViewComponent, canActivate: [LoginGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
