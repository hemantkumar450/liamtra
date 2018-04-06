import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsComponent, CmsEditComponent } from './index';
import { routing } from './cms.routing';
import { SharedComponentModule } from '../shared/shared-component.module';
import { RouterModule } from '@angular/router';
// import { StoreModule } from '@ngrx/store';
// import {TotalService} from './totaldb/totalDB.service';
// import { settingsReducer } from './totaldb/totalDb.reducer';
import { CmsService } from './shared/cms.service';
@NgModule({
    imports: [
        CommonModule,
        routing,
        // StoreModule.provideStore({
        //     settings: settingsReducer
        // }),
        SharedComponentModule
    ],
    declarations: [
        CmsComponent,
        CmsEditComponent,
        // CmsCommonBaseComponent
    ],
    exports: [
        SharedComponentModule
    ],
    providers: [
        CmsService,
        // TotalService
    ]
})

export class CmsModule { }
