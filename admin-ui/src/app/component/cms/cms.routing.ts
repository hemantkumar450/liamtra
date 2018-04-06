import { Routes, RouterModule } from '@angular/router';
import { CmsComponent, CmsEditComponent } from './index';
import { AuthGuard } from '../shared/guards/auth.guard'

export const cmsRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: CmsComponent,
        data: { pageTitle: 'CMS' }
      },
      {
        path: 'Entry/:cmsId',
        component: CmsEditComponent,
        data: { pageTitle: 'CMS' }
      },
      {
        path: 'AddNew',
        component: CmsEditComponent,
        data: { pageTitle: 'CMS' }
      }
    ]
  }
];

export const routing = RouterModule.forChild(cmsRoutes)

