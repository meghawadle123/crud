import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TodoListComponent } from './shared/component/todo-list/todo-list.component';
import { TodoFormComponent } from './shared/component/todo-form/todo-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { StudentDashboardComponent } from './shared/component/student-dashboard/student-dashboard.component';
import { StudentFormComponent } from './shared/component/student-form/student-form.component';
import { StudentTableComponent } from './shared/component/student-table/student-table.component';
import { GetconfirmComponent } from './shared/component/getconfirm/getconfirm.component';
import { ReceipeDashboardComponent } from './shared/component/receipe-dashboard/receipe-dashboard.component';
import { ReceipeFormComponent } from './shared/component/receipe-form/receipe-form.component';
import { ReceipeCardComponent } from './shared/component/receipe-card/receipe-card.component';
@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoFormComponent,
    StudentDashboardComponent,
    StudentFormComponent,
    StudentTableComponent,
    GetconfirmComponent,
    ReceipeDashboardComponent,
    ReceipeFormComponent,
    ReceipeCardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
