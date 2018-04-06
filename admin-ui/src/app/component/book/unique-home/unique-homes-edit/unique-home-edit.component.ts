import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UniqueHomeModel } from '../models/unique-home.model';
import { TableHeaderComponent } from '../../shared/tableHeader/tableHeader.component';
import { BookedUniqueHomeService } from '../../services/unique-home.service';
import { Paginator } from '../../../core/paginator/paginator';
import { DataTable } from 'primeng/primeng';
import { PaginationEnum, AttachmentType } from '../../../shared/enum/base.enum';
import { PaginationService } from '../../shared/pagination.service';
import { BookedUniqueHomeModel } from '../../models/unique-booked-model';
import { ApiUrl } from '../../../../shared/api.service';
import { TruncatePipe } from '../../../../shared/directives/truncate.directive';

@Component({
    selector: 'app-unique-home-edit.component',
    templateUrl: './unique-home-edit.component.html',
    styleUrls: ['./unique-home-edit.component.css']
})

export class BookedUniqueHomeEditComponent implements OnInit {
    header: String = 'Booked Unique Home Details';
    public ApiUrl = ApiUrl;
    IconClass: String = 'xxx';
    public attachmentType = AttachmentType;
    bookedUniqueHomeModel: BookedUniqueHomeModel = new BookedUniqueHomeModel();
    selectedTab: string = "AllDetail"
    constructor(
        public route: ActivatedRoute,
        public uniqueHomeService: BookedUniqueHomeService,
        protected router: Router
    ) {
        // this.bookedUniqueHomeModel.attachment.attachmentUrl = '';

    }

    ngOnInit() {
        this.bookedUniqueHomeModel.bookingId = this.route.snapshot.params['bookingId'] || 0;
        this.getBookedUniqueHomeDetails();
    }

    saveCountryDetail() {

    }

    async getBookedUniqueHomeDetails() {
        const data = await this.uniqueHomeService.getBookedHomeByBookingId(this.bookedUniqueHomeModel.bookingId);
        if (data.data.Result) {
            this.bookedUniqueHomeModel = data.data.Result;
        }
    }

    cancel() {
        this.router.navigate(['uniqueHome']);

    }

    onTabSelect(tab) {
        this.selectedTab = tab;
    }

    saveHostTour() { }

}
