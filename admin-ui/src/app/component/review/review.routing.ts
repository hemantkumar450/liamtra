import { Routes, RouterModule } from '@angular/router';
import { ReviewComponent, ReviewEditComponent } from './index';
import { AuthGuard } from '../shared/guards/auth.guard'

export const reviewRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ReviewComponent,
        data: { pageTitle: 'Review' }
      },
      {
        path: 'Edit/:reviewId',
        component: ReviewEditComponent,
        data: { pageTitle: 'Review' }
      },
    ]
  }
];

export const routing = RouterModule.forChild(reviewRoutes)
