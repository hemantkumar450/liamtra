import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './book.routing';
import { SharedComponentModule } from '../shared/shared-component.module';
import * as fromServices from './services';
import * as fromComponent from './index';



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
    ...fromServices.services
  ]
})

export class BookModule { }
