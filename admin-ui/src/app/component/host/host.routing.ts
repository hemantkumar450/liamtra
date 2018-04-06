import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';

import {
    HostUniqueHomeComponent,
    HostUniqueHomeEditComponent,
    HostTourComponent,
    HostTourEditComponent,
    HostTourAttachmentComponent,
    HostTourSubCategoryComponent,
    HostTourRouteComponent
} from './index';

export const HomeRoutes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        children: [
            {
                path: 'unique-home',
                component: HostUniqueHomeComponent,
                data: { pageTitle: 'Unique Home' }
            },
            {
                path: 'edit-unique-home/:svcId',
                component: HostUniqueHomeEditComponent,
                data: { pageTitle: 'Hosted Unique Home Details' }
            },
            {
                path: 'tour',
                component: HostTourComponent,
                data: { pageTitle: 'Hosted Tour' }
            },
            {
                path: 'edit-tour/:tourId/:svcId',
                component: HostTourEditComponent,
                data: { pageTitle: 'Hosted edit Tour' }
            }
        ]
    }
];

export const routing = RouterModule.forChild(HomeRoutes)
