import { Routes, RouterModule } from '@angular/router';

import { SystemConstantComponent,SystemConstantEditComponent } from './index';
import { AuthGuard } from '../shared/guards/auth.guard'

export const cityRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: SystemConstantComponent,
        data: { pageTitle: 'System Constant' }
      },
      {
        path: 'Edit/:systemConstantId',
        component: SystemConstantEditComponent,
        data: { pageTitle: 'System Constant' }
      },
      {
        path: 'AddNew',
        component: SystemConstantEditComponent,
        data: { pageTitle: 'System Constant' }
      }
    ]
  }
];

export const routing = RouterModule.forChild(cityRoutes)

