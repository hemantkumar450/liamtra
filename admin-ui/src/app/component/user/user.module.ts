import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent, UserService, UserEditComponent } from './index';
import { routing } from './user.routing';
import { SharedComponentModule } from '../shared/shared-component.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormControlDirective } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    routing,
    SharedComponentModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    UserComponent,
    UserEditComponent
  ],
  exports: [
    SharedComponentModule
  ],
  providers: [
    UserService]
})

export class UserModule { }
