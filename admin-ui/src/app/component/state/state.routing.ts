import { Routes, RouterModule } from '@angular/router';

import { StateComponent,StateEditComponent } from './index';
import { AuthGuard } from '../shared/guards/auth.guard'

export const cityRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: StateComponent,
        data: { pageTitle: 'State' }
      },
      {
        path: 'Edit/:countryId/:stateId',
        component: StateEditComponent,
        data: { pageTitle: 'State' }
      },
      {
        path: 'AddNew/:countryId',
        component: StateEditComponent,
        data: { pageTitle: 'State' }
      }
    ]
  }
];

export const routing = RouterModule.forChild(cityRoutes)

