import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '../../../node_modules/@angular/forms';
import { EntriesRoutingModule } from '../pages/entries/entries-routing.module';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [BreadCrumbComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports:[
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    BreadCrumbComponent
  ]
})
export class SharedModule { }
