// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { BrowserAnimationsModule} from "@angular/platform-browser/animations"
// import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { HttpClientInMemoryWebApiModule } from '../../node_modules/angular-in-memory-web-api';
// import { InMemoryDatabase } from './in-memory-database';
// import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    AppRoutingModule,
    // FormsModule,
    
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
