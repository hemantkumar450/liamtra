import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceTypeComponent, ServiceTypeService,ServiceTypeEditComponent } from './index';
import { routing } from './service-type.routing';
import { SharedComponentModule } from '../shared/shared-component.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    routing,
    SharedComponentModule
  ],
  declarations: [
    ServiceTypeComponent,
    ServiceTypeEditComponent
  ],
  exports: [
    SharedComponentModule
  ],
  providers: [
    ServiceTypeService
  ]
})

export class ServiceTypeModule { }
