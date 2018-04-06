import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemConstantComponent, SystemConstantService,SystemConstantEditComponent } from './index';
import { routing } from './system-constant.routing';
import { SharedComponentModule } from '../shared/shared-component.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    routing,
    SharedComponentModule
  ],
  declarations: [
    SystemConstantComponent,
    SystemConstantEditComponent
  ],
  exports: [
    SharedComponentModule
  ],
  providers: [
    SystemConstantService
  ]
})

export class SystemConstantModule { }
