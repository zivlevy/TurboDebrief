import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { MainViewComponent } from './main-view/main-view.component';
import {LoginGuard} from './guards/login.guard';
import {AdminGuard} from './guards/admin.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    LoginGuard,
    AdminGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
