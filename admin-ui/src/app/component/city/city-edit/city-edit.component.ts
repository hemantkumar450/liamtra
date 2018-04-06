import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'app/component/shared/message/messageService.service';
import { CityModel, CityService } from '../shared';
import { NotificationService } from '../../../shared/utils/notification.service';
declare const $;

@Component({
    selector: 'app-city-edit.component',
    templateUrl: './city-edit.component.html',
    styleUrls: ['./city-edit.component.css']
})
export class CityEditComponent implements OnInit {
    city: CityModel = new CityModel();
    moduleName = 'Service Category';
    faIcon = 'fa fa-user fa-fw';
    countryId: number = 0;
    public messageModal: Message[] = [];
    countries: Array<CityModel> = new Array<CityModel>();
    restServiceUrl: string;
    constructor(
        public messageService: MessageService,
        public cityService: CityService,
        private router: Router,
        public notificationService: NotificationService,
        public route: ActivatedRoute,
    ) {
        this.city.cityId = +this.route.snapshot.queryParams['cityId'] || 0;
        this.city.stateId = +this.route.snapshot.queryParams['stateId'] || 0;
        this.countryId = +this.route.snapshot.queryParams['countryId'] || 0;
        this.getCityById()
    }

    ngOnInit() {
    }

    async getCityById() {
        if (this.city.cityId > 0) {
            const response = await this.cityService.getCityById(this.city.cityId);
            this.city = response.data.Result;
            this.city.Header = 'Edit city',
            this.city.IconClass = 'fa fa-fw fa-plus txt-color-blue';
        }
    }


    cancel(): void {
        this.router.navigate(['/city'],
            { queryParams: { countryId: this.countryId, stateId: this.city.stateId, cityId: this.city.cityId } });
    }

    /* save function call once you click on save button inside the grid row */
    async saveCity() {
        const message = { severity: 'error', summary: 'error', detail: '' };
        let error = 0;
        if (this.city.cityName.trim() === '') {
            message.detail = '';
            message.detail = 'City name is mandatory';
            this.messageService.showMessage(message);
            error++;
        }

        if (this.city.cityCode.trim() === '') {
            message.detail = '';
            message.detail = 'City code is mandatory';
            this.messageService.showMessage(message);
            error++;
        }

        if (this.city.stateId === 0) {
            message.detail = '';
            message.detail = 'State selection is mandatory';
            this.messageService.showMessage(message);
            error++;
        }

        if (error > 0) {
            return;
        }

        const response = await this.cityService.saveCityDetail(this.city)
        if (response) {
            this.cancel();
        }
    }
}
