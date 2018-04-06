import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UniqueHomeModel } from '../models/unique-home.model';
import { TableHeaderComponent } from '../../shared/tableHeader/tableHeader.component';
import * as fromServices from '../services';
import { Paginator } from '../../../core/paginator/paginator';
import { DataTable } from 'primeng/primeng';
import { PaginationEnum } from '../../shared/enum/base.enum';
import { PaginationService } from '../../shared/pagination.service';

@Component({
    selector: 'app-unique-home',
    templateUrl: './unique-home.component.html',
    // styleUrls: ['./cms.component.css']
})

export class HostUniqueHomeComponent implements OnInit {
    uniqueHomes: UniqueHomeModel[];
    disabledAddNewButton: boolean = true;
    moduleName = 'Home';
    addFunctionName = 'Home';
    faIcon = 'fa fa-database fa-fw';
    @ViewChild(TableHeaderComponent) searchInput: TableHeaderComponent;
    gb: any;
    public pageSize: Number = PaginationEnum.PageSize;
    @ViewChild(DataTable) dataTableComponent: DataTable;
    @ViewChild(Paginator) paginatorComponent: Paginator;
    public totalRecords: Number = 0;

    constructor(protected uniqueHomeService: fromServices.HostUniqueHomeService,
        protected paginationService: PaginationService,
        protected router: Router) {
        this.paginationService.setDefaultPage();
    }

    ngOnInit() {
        this.gb = this.searchInput._gb.nativeElement;
        this.getUniqueHomes();
    }

    async getUniqueHomes() {
        const data = await this.uniqueHomeService.getAllUniqueHomes(this.paginationService.getParams());
        if (data.data.Result) {
            console.log(data.data.Result);
            this.uniqueHomes = data.data.Result.data;
            this.totalRecords = data.data.Result.totalRecords;
        }
    }

    pageChanged(event) {
        this.paginationService.setPageChange(event);
        this.getUniqueHomes();
    }

    onSorting(event) {
        this.paginationService.setSortExpression(event);
        this.getUniqueHomes();
    }

    onFiltering(event) {
        this.dataTableComponent.reset();
        this.paginatorComponent.first = 0;
        let colName: any = 'Filter.';
        colName += Object.getOwnPropertyNames(event.filters);
        let col: any = Object.getOwnPropertyNames(event.filters)
        let obj = {};
        if (col.length > 0) {
            let value = event.filters[col].value;
            obj[colName] = value;
        }
        this.paginationService.setFilterValues(obj);
        this.getUniqueHomes();
    }

    editUniqueHomes(home: UniqueHomeModel) {
        this.router.navigate(['host/edit-unique-home/' + home.svcId]);
    }
}
