import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './shared/layout/app-layouts/main-layout.component';
// import {AuthLayoutComponent} from './shared/layout/app-layouts/auth-layout.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    data: { pageTitle: 'Home' },
    children: [
      {
        path: '', redirectTo: 'serviceCategory', pathMatch: 'full'
      },
      {
        path: 'serviceCategory',
        loadChildren: 'app/component/service-category/service-category.module#ServiceCategoryModule'
      },
      {
        path: 'user',
        loadChildren: 'app/component/user/user.module#UserModule'
      },
      {
        path: 'systemConstant',
        loadChildren: 'app/component/system-constant/system-constant.module#SystemConstantModule'
      },
      {
        path: 'serviceType',
        loadChildren: 'app/component/service-type/service-type.module#ServiceTypeModule'
      },
      {
        path: 'country',
        loadChildren: 'app/component/country/country.module#CountryModule'
      },
      {
        path: 'city',
        loadChildren: 'app/component/city/city.module#CityModule'

      },
      {
        path: 'state',
        loadChildren: 'app/component/state/state.module#StateModule'

      },
      {
        path: 'review',
        loadChildren: 'app/component/review/review.module#ReviewModule'

      },
      {
        path: 'cms',
        loadChildren: 'app/component/cms/cms.module#CmsModule'

      },
      {
        path: 'host',
        loadChildren: 'app/component/host/host.module#HostModule'
      },
      {
        path: 'book',
        loadChildren: 'app/component/book/book.module#BookModule'

      }
      // {
      //   path: 'host-tour-itenary',
      //   data: {
      //     expectedRole: [1, 2]
      //   },
      //   loadChildren: 'app/component/host-tour-itenary/host-tour-itenary.module#HostTourItenaryModule'

      // },
      // {
      //   path: 'host-tour-departure',

      //   loadChildren: 'app/component/host-tour-departure/host-tour-departure.module#HostTourDepartureModule'
      // }
      // ,
      // {
      //   path: 'host-tour-sight-seeing',

      //   loadChildren: 'app/component/host-tour-itenary-sight-seeing/host-tour-itenary-sight-seeing.module#HostTourSightSeeingModule'

      // }
      // ,
      // {
      //   path: 'host-tour-flight',

      //   loadChildren: 'app/component/host-tour-itenary-flight/host-tour-itenary-flight.module#HostTourItenaryFlightModule'

      // }

    ]
  },

  { path: 'auth', loadChildren: 'app/auth/auth.module#AuthModule' },

  { path: '**', redirectTo: 'miscellaneous/error404' }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
