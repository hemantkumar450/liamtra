import { NgModule, ApplicationRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { JsonpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedComponentModule } from '../../src/app/component/shared/shared-component.module';
import { routing } from './app.routing'

// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';

// Core providers
import { CoreModule } from './core/core.module';
import { SmartadminLayoutModule } from './shared/layout/layout.module';

import { MessageModule } from './component/shared/message/message.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { LoaderComponent } from './core/loader/loader.component';
import { LoaderService } from './core/loader/loader.service';
import { NgSpinKitModule } from 'ng-spin-kit'

/* shared service */
import { RouteService, ApiUrl } from './shared/index';
import { CommonService } from './shared/common.service';

import { AuthGuard } from './component/shared';
import { DndModule } from 'ng2-dnd';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    LoaderComponent
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    BrowserAnimationsModule,
    // FormsModule,
    JsonpModule,
    ModalModule.forRoot(),
    SharedComponentModule,
    CoreModule,
    SmartadminLayoutModule,
    MessageModule,
    routing,
    NgSpinKitModule,
    DndModule.forRoot()
    // CalendarModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [
    SharedComponentModule
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    // ENV_PROVIDERS,
    CommonService,
    APP_PROVIDERS,
    RouteService,
    ApiUrl,
    AuthGuard
  ]
})

export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) { }
}
