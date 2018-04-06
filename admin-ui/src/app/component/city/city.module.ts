import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityEditComponent, CityComponent, CityService } from './index';
import { routing } from './city.routing';
import { SharedComponentModule } from '../shared/shared-component.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    routing,
    SharedComponentModule
  ],
  declarations: [
    CityComponent,
    CityEditComponent
  ],
  exports: [
    SharedComponentModule
  ],
  providers: [
    CityService
  ]
})

export class CityModule { }
