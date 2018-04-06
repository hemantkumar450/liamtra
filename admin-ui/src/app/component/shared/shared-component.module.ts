import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavBarModule } from './navBar/navBar.module';
import { TableHeaderModule } from './tableHeader/tableHeader.module'
import { ModalPopupModule } from './modalPopup/modalPopup.module'
import { DpDatePickerModule } from 'ng2-date-picker';
import { UITabViewModule } from '../../shared/tab-view/tabview';
import { FocusDirective } from './directives/focus.directive';
import { OnlyAlphaNumeric, AlphaNumericWithExtraKey } from '../../shared/directives/alpa-numeric.directive';
import { OnlyDecimalNumber } from '../../shared/directives/decimal-number.directive';
import { TruncatePipe } from '../../shared/directives/truncate.directive';

import {
  DataTableModule,
  SharedModule,
  PanelMenuModule,
  CheckboxModule,
  TabMenuModule,
  MenuModule,
  RadioButtonModule,
  DropdownModule,
  GrowlModule,
  AutoCompleteModule,
  PanelModule,
  TreeModule,
  FieldsetModule,
  AccordionModule,
  DialogModule,
  ConfirmDialogModule,
  ConfirmationService,
  MultiSelectModule,
  MessagesModule,
  FileUploadModule
} from 'primeng/primeng';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { CalendarModule } from '../../shared/calendar/calendar';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { CodemirrorModule } from 'ng2-codemirror';

/* shared service for total records */
import { TotalRecordService } from './service/total-record.service';
import { ManageModule } from './manage-component/manage-component.module';

import { MasterService } from './service/master.service';

import { ShContextMenuModule } from 'ng2-right-click-menu';
import { PaginatorModule } from '../../core/paginator/paginator';
import { PaginationService } from './pagination.service';

@NgModule({
  imports: [
    FileUploadModule,
    CommonModule,
    DropdownModule,
    DataTableModule,
    GrowlModule,
    SharedModule,
    FormsModule,
    NavBarModule,
    TableHeaderModule,
    ModalPopupModule,
    PanelMenuModule,
    AutoCompleteModule,
    DialogModule,
    TabMenuModule,
    MenuModule,
    PanelModule,
    CalendarModule,
    CheckboxModule,
    FieldsetModule,
    DpDatePickerModule,
    RadioButtonModule,
    ManageModule,
    Ng2AutoCompleteModule,
    CodemirrorModule,
    ConfirmDialogModule,
    AccordionModule,
    TreeModule,
    ShContextMenuModule,
    MultiSelectModule,
    ScrollPanelModule,
    PaginatorModule,
    MessagesModule
  ],

  declarations: [
    OnlyAlphaNumeric,
    OnlyDecimalNumber,
    TruncatePipe,
    AlphaNumericWithExtraKey,
    FocusDirective
  ],

  providers: [
    TotalRecordService,
    MasterService,
    ConfirmationService,
    PaginationService

  ],

  exports: [
    FileUploadModule,
    FieldsetModule,
    DropdownModule,
    DataTableModule,
    AccordionModule,
    GrowlModule,
    SharedModule,
    FormsModule,
    NavBarModule,
    TableHeaderModule,
    ModalPopupModule,
    PanelMenuModule,
    AutoCompleteModule,
    DialogModule,
    TabMenuModule,
    PanelModule,
    MenuModule,
    // AgGridModule,
    ManageModule,
    Ng2AutoCompleteModule,
    CodemirrorModule,
    CalendarModule,
    ConfirmDialogModule,
    MultiSelectModule,
    TreeModule,
    // NgbModule,
    DpDatePickerModule,
    RadioButtonModule,
    ShContextMenuModule,
    FocusDirective,
    OnlyAlphaNumeric,
    OnlyDecimalNumber,
    TruncatePipe,
    AlphaNumericWithExtraKey,
    ScrollPanelModule,
    CheckboxModule,
    PaginatorModule,
    MessagesModule
  ],
  bootstrap: []




})
export class SharedComponentModule { }
