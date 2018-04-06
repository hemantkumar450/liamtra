import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateComponent, StateService,StateEditComponent } from './index';
import { routing } from './state.routing';
import { SharedComponentModule } from '../shared/shared-component.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    routing,
    SharedComponentModule
  ],
  declarations: [
    StateComponent,
    StateEditComponent
  ],
  exports: [
    SharedComponentModule
  ],
  providers: [
    StateService
  ]
})

export class StateModule { }
