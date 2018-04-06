import { Routes, RouterModule } from '@angular/router';

import { ServiceTypeComponent,ServiceTypeEditComponent } from './index';
import { AuthGuard } from '../shared/guards/auth.guard'

export const cityRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ServiceTypeComponent,
        data: { pageTitle: 'Service Type' }
      },
      {
        path: 'Edit/:serviceTypeId',
        component: ServiceTypeEditComponent,
        data: { pageTitle: 'Service Type' }
      },
      {
        path: 'AddNew',
        component: ServiceTypeEditComponent,
        data: { pageTitle: 'Service Type' }
      }
    ]
  }
];

export const routing = RouterModule.forChild(cityRoutes)

