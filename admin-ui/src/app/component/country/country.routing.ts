import { Routes, RouterModule } from '@angular/router';
import { CountryComponent,CountryEditComponent } from './index';
import { AuthGuard } from '../shared/guards/auth.guard'

export const countryRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: CountryComponent,
        data: { pageTitle: 'Country' }
      },
      {
        path: 'Entry/:countryId',
        component: CountryEditComponent,
        data: { pageTitle: 'Country' }
      },
      {
        path: 'AddNew',
        component: CountryEditComponent,
        data: { pageTitle: 'Country' }
      }
    ]
  }
];

export const routing = RouterModule.forChild(countryRoutes)

