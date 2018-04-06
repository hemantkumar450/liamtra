import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'app/component/shared/message/messageService.service';
import { CountryModel, CountryService } from '../shared';
import { NotificationService } from '../../../shared/utils/notification.service';
declare const $;

@Component({
    selector: 'app-country-edit.component',
    templateUrl: './country-edit.component.html',
    styleUrls: ['./country-edit.component.css']
})
export class CountryEditComponent implements OnInit {
    country: CountryModel = new CountryModel();
    moduleName = 'Country';
    faIcon = 'fa fa-user fa-fw';
    public messageModal: Message[] = [];
    countries: Array<CountryModel> = new Array<CountryModel>();

    restServiceUrl: string;
    constructor(
        public messageService: MessageService,
        public countryService: CountryService,
        private router: Router,
        public notificationService: NotificationService,
        public route: ActivatedRoute,
    ) {
        this.country.countryId = +this.route.snapshot.params['countryId'] || 0;
        this.getCountryById()
    }

    ngOnInit() {
    }

    async getCountryById() {
        if (this.country.countryId > 0) {
            const response = await this.countryService.getCountryById(this.country.countryId);
            this.country = response.data.Result;
            this.country.Header = 'Edit Country';
            this.country.IconClass = 'fa fa-fw fa-plus txt-color-blue';
        }
    }


    cancel(): void {
        this.router.navigate(['/country']);
    }

    /* save function call once you click on save button inside the grid row */
    async saveCountryDetail() {
        const message = { severity: 'error', summary: 'error', detail: '' };
        let error = 0;
        if (this.country.countryCode.trim() === '') {
            message.detail = 'Country code is mandatory';
            this.messageService.showMessage(message);
            return;
        }

        if (this.country.countryName.trim() === '') {
            message.detail = 'Country name is mandatory';
            this.messageService.showMessage(message);
            return;
        }

        if (error > 0) {
            return;
        }

        const response = await this.countryService.saveCountryDetail(this.country)
        if (response) {
            this.cancel();
        }
    }
}
