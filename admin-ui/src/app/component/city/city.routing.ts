import { Routes, RouterModule } from '@angular/router';
import { CityEditComponent, CityComponent } from './index';
import { AuthGuard } from '../shared/guards/auth.guard'

export const cityRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: CityComponent,
        data: { pageTitle: 'City' }
      },
      {
        path: 'Entry',
        component: CityEditComponent,
        data: { pageTitle: 'City' }
      },
      {
        path: 'AddNew',
        component: CityEditComponent,
        data: { pageTitle: 'City' }
      }
    ]
  }
];

export const routing = RouterModule.forChild(cityRoutes)

