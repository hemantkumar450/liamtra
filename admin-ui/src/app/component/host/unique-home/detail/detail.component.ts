import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { UniqueHomeModel } from '../../models/unique-home.model';
import { ServiceCategoryService } from '../../services/service-category.service';
import { ServiceCategoryEnum } from '../../../shared/enum/base.enum';
import { MasterService } from '../../../shared/service/master.service';

@Component({
    selector: 'app-unique-home-detail',
    templateUrl: './detail.component.html'
})

export class HostUniqueHomeDetailComponent implements OnInit {

    @Input() uniqueHome: UniqueHomeModel;
    languages: Array<any> = [];
    selectedLanguages: Array<any> = [];
    statusList: Array<any> = [];


    constructor(public serviceCategoryService: ServiceCategoryService,
        public masterService: MasterService) { }

    ngOnInit() {
        this.getStatusList();
        this.languages = this.serviceCategoryService.getAllLanguages();
        this.uniqueHome.hostServiceLinkingSubCategories.forEach((item) => {
            if (item.svcCatgId === ServiceCategoryEnum.Languages) {
                this.selectedLanguages.push(item.svcSCatgId)
            }
        });
    }

    async  getStatusList() {
        this.statusList = await this.masterService.getSvcSubCategoryCodes(ServiceCategoryEnum.HostServiceStatus);
    }

    onMultiselectChange(svcCatgId, selected) {
        let hostServiceLinkingSubCategories = this.uniqueHome.hostServiceLinkingSubCategories.map(x => Object.assign({}, x));
        hostServiceLinkingSubCategories.forEach((element) => {
            if (element.svcCatgId === svcCatgId) {
                const index = this.uniqueHome.hostServiceLinkingSubCategories.findIndex(i => i.svcSCatgId === element.svcSCatgId);
                this.uniqueHome.hostServiceLinkingSubCategories.splice(index, 1);
            }
        });

        this.languages.forEach(lang => {
            selected.value.forEach(value => {
                if (lang.value === value) {
                    this.uniqueHome.hostServiceLinkingSubCategories
                        .splice(this.uniqueHome.hostServiceLinkingSubCategories.length, 0, lang);
                }
            });
        });
    }

}
