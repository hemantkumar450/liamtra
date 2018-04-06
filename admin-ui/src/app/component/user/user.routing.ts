import { Routes, RouterModule } from '@angular/router';

import { UserComponent, UserEditComponent } from './index';
import { AuthGuard } from '../shared/guards/auth.guard'

export const userRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: UserComponent,
        data: { pageTitle: 'User' }
      },
      {
        path: 'AddNew',
        component: UserEditComponent,
        data: { pageTitle: 'User' }
      },
      {
        path: 'Edit/:id',
        component: UserEditComponent,
        data: { pageTitle: 'User' }
      }

    ]
  }
];

export const routing = RouterModule.forChild(userRoutes)

