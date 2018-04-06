import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';

import { BookedUniqueHomeComponent, BookedUniqueHomeEditComponent } from './index';

export const HomeRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'unique-home',
        component: BookedUniqueHomeComponent,
        data: { pageTitle: 'Unique Home' }
      },
      {
        path: 'edit-unique-home/:bookingId',
        component: BookedUniqueHomeEditComponent,
        data: { pageTitle: 'Hosted Unique Home Details' }
      }
    ]
  }
];

export const routing = RouterModule.forChild(HomeRoutes)
