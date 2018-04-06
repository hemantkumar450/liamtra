import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordRoutingModule } from './forgot.routing';
import { ForgotPasswordComponent } from './forgot.component';
import {SharedComponentModule} from '../../component/shared/shared-component.module';

import { AuthService } from '../auth.service';

@NgModule({
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
    SharedComponentModule
  ],
  declarations: [ForgotPasswordComponent]
})
export class ForgotPasswordModule {
}
