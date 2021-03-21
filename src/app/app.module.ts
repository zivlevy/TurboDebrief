import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { MainViewComponent } from './main-view/main-view.component';
import {LoginGuard} from './guards/login.guard';
import {AdminGuard} from './guards/admin.guard';
import {AuthInterceptor} from './services/authInterceptor.service';
import { MetaListComponent } from './meta-list/meta-list.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TableModule} from 'primeng/table';
import { FieldPipe } from './field.pipe';
import {ToolbarModule} from 'primeng/toolbar';
import {InputTextModule} from 'primeng/inputtext';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {DialogModule} from 'primeng/dialog';
import { DebriefMainComponent } from './views/debrief/debrief-main/debrief-main.component';
import { DebriefTurboListComponent } from './views/debrief/debrief-turbo-list/debrief-turbo-list.component';
import {GraphComponent} from './views/debrief/graph/graph.component';
import {ChartModule} from 'primeng/chart';
import { DataItemsListComponent } from './views/debrief/data-items-list/data-items-list.component';
import {SidebarModule} from 'primeng/sidebar';
import {ButtonModule} from 'primeng/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastModule} from 'primeng/toast';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainViewComponent,
    MetaListComponent,
    FieldPipe,
    DebriefMainComponent,
    DebriefTurboListComponent,
    GraphComponent,
    DataItemsListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TableModule,
    ToolbarModule,
    InputTextModule,
    DialogModule,
    DynamicDialogModule,
    AppRoutingModule,
    ChartModule,
    SidebarModule,
    ButtonModule,
    ToastModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    LoginGuard,
    AdminGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
