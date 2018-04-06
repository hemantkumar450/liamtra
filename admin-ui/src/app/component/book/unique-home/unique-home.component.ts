import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UniqueHomeModel } from '../models/unique-home.model';
import { TableHeaderComponent } from '../../shared/tableHeader/tableHeader.component';
import { BookedUniqueHomeService } from '../services/unique-home.service';
import { Paginator } from '../../../core/paginator/paginator';
import { DataTable } from 'primeng/primeng';
import { PaginationEnum } from '../../shared/enum/base.enum';
import { PaginationService } from '../../shared/pagination.service';
import { BookedUniqueHomeModel } from '../models/unique-booked-model';

@Component({
    selector: 'app-book-unique-home',
    templateUrl: './unique-home.component.html',
    // styleUrls: ['./cms.component.css']
})

export class BookedUniqueHomeComponent implements OnInit {
    uniqueBookedHomes: BookedUniqueHomeModel[];
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

    constructor(protected uniqueHomeService: BookedUniqueHomeService,
        protected paginationService: PaginationService, protected router: Router) {
        this.paginationService.setDefaultPage();
    }

    ngOnInit() {
        this.gb = this.searchInput._gb.nativeElement;
        this.getUniqueBookedHomes();
    }

    async getUniqueBookedHomes() {
        const data = await this.uniqueHomeService.getAllUniqueBookedHomes(this.paginationService.getParams());
        if (data.data.Result) {
            let record: any = data.data.Result;
            this.uniqueBookedHomes = record.data;
            this.totalRecords = record.totalRecords;
        }
    }

    pageChanged(event) {
        this.paginationService.setPageChange(event);
        this.getUniqueBookedHomes();
    }

    addCountry() {
    }

    editHome(home: BookedUniqueHomeModel) {
        this.router.navigate(['book/edit-unique-home/' + home.bookingId]);
    }

    onSorting(event) {
        this.paginationService.setSortExpression(event);
        this.getUniqueBookedHomes();
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
        this.getUniqueBookedHomes();
    }
}
