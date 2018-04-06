import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewComponent,  ReviewEditComponent, ReviewService } from './index';
import { routing } from './review.routing';
import { SharedComponentModule } from '../shared/shared-component.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    routing,
    SharedComponentModule
  ],
  declarations: [
    ReviewComponent,
    ReviewEditComponent
  ],
  exports: [
    SharedComponentModule
  ],
  providers: [
    ReviewService
  ]
})

export class ReviewModule { }
