import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceCategoryComponent, ServiceCategoryService, ServiceCategoryEditComponent } from './index';
import { routing } from './service-category.routing';
import { SharedComponentModule } from '../shared/shared-component.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    routing,
    SharedComponentModule
  ],
  declarations: [
    ServiceCategoryComponent,
    ServiceCategoryEditComponent
  ],
  exports: [
    SharedComponentModule
  ],
  providers: [
    ServiceCategoryService
  ]
})

export class ServiceCategoryModule { }
