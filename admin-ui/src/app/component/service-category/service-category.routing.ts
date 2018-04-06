import { Routes, RouterModule } from '@angular/router';
import { ServiceCategoryComponent, ServiceCategoryEditComponent } from './index';
import { AuthGuard } from '../shared/guards/auth.guard'

export const cityRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ServiceCategoryComponent,
        data: { pageTitle: 'Service Category' }
      },
      {
        path: 'Entry/:serviceCategoryId/:totalDB',
        component: ServiceCategoryEditComponent,
        data: { pageTitle: 'Service Category' }
      },
      {
        path: 'AddNew/:totalDB',
        component: ServiceCategoryEditComponent,
        data: { pageTitle: 'Service Category' }
      }
    ]
  }
];

export const routing = RouterModule.forChild(cityRoutes)

