import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryEditComponent, CountryComponent, CountryService } from './index';
import { routing } from './country.routing';
import { SharedComponentModule } from '../shared/shared-component.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    routing,
    SharedComponentModule
  ],
  declarations: [
    CountryComponent,
    CountryEditComponent
  ],
  exports: [
    SharedComponentModule
  ],
  providers: [
    CountryService
  ]
})

export class CountryModule { }
