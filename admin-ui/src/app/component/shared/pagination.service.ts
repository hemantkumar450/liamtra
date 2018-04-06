// Import Injectable Decorator
import { Injectable, OnInit } from '@angular/core';
import { PaginationEnum } from './enum/base.enum';

// Use @Injectable() to declare the RouteService class as an Injectable
@Injectable()
export class PaginationService implements OnInit {

    sortExpression = '';
    filterValues = {};
    startPage = 1;
    pageSize = PaginationEnum.PageSize;

    constructor() {
    }

    ngOnInit() {
    }

    setDefaultPage() {
        this.startPage = 1;
        this.pageSize = PaginationEnum.PageSize;
        this.sortExpression = '';
        this.filterValues = [];
    }

    resetPagination() {
        this.startPage = 1;
        this.pageSize = PaginationEnum.PageSize;
        this.sortExpression = '';
    }

    setPageChange(event) {
        this.startPage = 1 + event.page;
        this.pageSize = event.rows;
    }

    getParams() {
        let pagination = {
            PageSize: this.pageSize,
            RunCount: true,
            StartPageNo: this.startPage,
            SortExpression: this.sortExpression
        };
        return Object.assign(pagination, this.filterValues);
    }

    setSortExpression(event) {
        this.sortExpression = '';
        if (event) {
            let orderBy = '';
            if (event.order === -1) {
                orderBy = 'desc';
            }
            this.sortExpression = event.field + ' ' + orderBy;
        }
    }

    setFilterValues(filtersObj) {
        this.filterValues = {};
        this.resetPagination();
        const filterValues = Object.assign({}, this.filterValues);
        const copy = Object.assign({}, filtersObj);
        const copy2 = Object.assign({}, filtersObj);
        this._deleteAllProp(filtersObj);
        const filteredObj = this._deleteEmptyProp(copy);
        const newFilterValue = this._addPrefixToProp(copy);
        this._matchFilterProps(copy2);
        Object.assign(this.filterValues, newFilterValue);
    }

    _matchFilterProps(obj) {
        for (const prop of obj) {
            let f = 'Filter.' + prop;
            if (this.filterValues[f]) {
                this.filterValues[f] = obj[prop].value;
            }
        }
    }

    _deleteAllProp(obj) {
        for (const prop of obj) {
            delete obj[prop];
        }
        return obj;
    }

    _deleteEmptyProp(obj) {
        for (const prop of obj) {
            const val = obj[prop].value;
            if (val === undefined || val === null || val.length === 0) {
                delete obj[prop];
            }
        }
        return obj;
    }

    _addPrefixToProp(obj) {
        for (const prop of obj) {
            obj['Filter.' + prop] = obj[prop].value;
            delete obj[prop];
        }
        return obj;
    }

}
