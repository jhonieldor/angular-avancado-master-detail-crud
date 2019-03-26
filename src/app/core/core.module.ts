import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '../../../node_modules/@angular/platform-browser';
import { BrowserAnimationsModule } from '../../../node_modules/@angular/platform-browser/animations';
import { HttpClientModule } from '../../../node_modules/@angular/common/http';
import { HttpClientInMemoryWebApiModule } from '../../../node_modules/angular-in-memory-web-api';
import { InMemoryDatabase } from '../in-memory-database';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
// import { ReactiveFormsModule } from '../../../node_modules/@angular/forms';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase),
    RouterModule
    // ReactiveFormsModule
  ],
  exports:[
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NavbarComponent
    // ReactiveFormsModule
    
  ]
})
export class CoreModule { }
