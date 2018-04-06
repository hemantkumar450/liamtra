import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './host.routing';
import { SharedComponentModule } from '../shared/shared-component.module';
import * as fromServices from './services';
import * as fromComponent from './index';

import * as fromTourServices from './tour/shared';



@NgModule({
  imports: [
    CommonModule,
    routing,
    SharedComponentModule
  ],
  declarations: [
    ...fromComponent.components
  ],
  exports: [
    SharedComponentModule
  ],
  providers: [
    ...fromServices.services,
    ...fromTourServices.services
  ]
})

export class HostModule { }
