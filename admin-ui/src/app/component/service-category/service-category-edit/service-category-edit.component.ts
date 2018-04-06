import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'app/component/shared/message/messageService.service';
import { ServiceCategoryModel, ServiceCategoryService, ServiceSubCategoryModel } from '../shared';
import { NotificationService } from '../../../shared/utils/notification.service';
declare const $;

@Component({
    selector: 'app-service-category-edit.component',
    templateUrl: './service-category-edit.component.html',
    styleUrls: ['./service-category-edit.component.css']
})
export class ServiceCategoryEditComponent implements OnInit {
    serviceCategory: ServiceCategoryModel = new ServiceCategoryModel();
    moduleName = 'Service Category';
    faIcon = 'fa fa-user fa-fw';
    public messageModal: Message[] = [];
    gb: any;
    serviceSubCategories: Array<ServiceSubCategoryModel> = new Array<ServiceSubCategoryModel>();
    disabled: Boolean = false;
    restServiceUrl: string;
    constructor(
        public messageService: MessageService,
        public serviceCategoryService: ServiceCategoryService,
        private router: Router,
        public notificationService: NotificationService,
        public route: ActivatedRoute,
    ) {

    }

    ngOnInit() {
        this.serviceCategory.svcCatgId = +this.route.snapshot.params['serviceCategoryId'] || 0;
        this.getServiceCategoryById()
    }

    async getServiceCategoryById() {
        if (this.serviceCategory.svcCatgId > 0) {
            const response = await this.serviceCategoryService.getServiceCategoryById(this.serviceCategory.svcCatgId);
            this.serviceCategory = response.data.Result;
            this.disabled = !this.disabled;
            this.serviceCategory.Header = 'Edit Service Category';
            this.serviceCategory.IconClass = 'fa fa-fw fa-plus txt-color-blue';
            this.serviceSubCategories = this.serviceCategory.serviceSubCategory.map(x => Object.assign({}, x));
        }
    }

    addServiceSubCategory(): void {
        let isEdit = false;
        const errorCount = 0;
        let message = {};
        this.serviceSubCategories.forEach(element => {
            if (element.isEdit === true && (element.svcSCatgCode === '' || element.svcSCatgDesc === '')) {
                isEdit = true;
            }
        });
        if (isEdit) {
            message = { severity: 'error', summary: 'error', detail: 'please complete the prev item' };
            this.messageService.showMessage(message);
        }
        if (errorCount === 0 && !isEdit) {
            /* splice the object into the existing array */
            const item: ServiceSubCategoryModel = new ServiceSubCategoryModel();
            item.isEdit = true;
            item.svcCatgId = this.serviceCategory.svcCatgId;
            this.serviceSubCategories = [...this.serviceSubCategories, item];
        }
    }

    /* edit the selected row */
    editServiceSubCategory(row: ServiceSubCategoryModel): void {
        let count = 0;
        this.serviceCategory.serviceSubCategory.forEach(item => {
            if (item.isEdit) {
                count++;
            }
        });
        if (count > 0) {
            row.isEdit = false;
            const message = { severity: 'error', summary: 'error', detail: 'First update previous edit' };
            this.messageService.showMessage(message);
        } else {
            row.isEdit = true;
        }
    }

    cancelSubCategory(row: ServiceSubCategoryModel) {
        if (row.svcSCatgId > 0) {
            row.isEdit = false;
            return;
        }
        const index = this.serviceSubCategories.findIndex(i => i.svcSCatgId === row.svcSCatgId
            && i.svcSCatgCode === row.svcSCatgCode && i.svcSCatgDesc === row.svcSCatgDesc);
        this.serviceSubCategories.splice(index, 1);
        this.serviceSubCategories = [...this.serviceSubCategories];
    }

    cancel(): void {
        this.router.navigate(['/serviceCategory']);
    }

    /* save function call once you click on save button inside the grid row */
    async saveServiceCategory() {
        const message = { severity: 'error', summary: 'error', detail: 'First update previous edit' };
        let error = 0;
        if (this.serviceCategory.svcCatgCode.trim() === '') {
            message.detail = 'Service Category code is mandatory';
            this.messageService.showMessage(message);
            error++;
        }

        if (this.serviceCategory.svcCatgDesc.trim() === '') {
            message.detail = 'Service Category description is mandatory';
            this.messageService.showMessage(message);
            error++;
        }

        this.serviceSubCategories.forEach(item => {
            if (item.svcSCatgCode.trim() === '') {
                message.detail = 'Service Sub Category code is mandatory';
                this.messageService.showMessage(message);
                error++;
            }
            if (item.svcSCatgDesc.trim() === '') {
                message.detail = 'Service Sub Category description is mandatory';
                this.messageService.showMessage(message);
                error++;
            }
        });

        if (error > 0) {
            return;
        }
        // this.serviceCategory.serviceSubCategory.forEach(serverSubCat => {
        this.serviceSubCategories.forEach(subCat => {
            if (subCat.svcSCatgId === 0) {
                this.serviceCategory.serviceSubCategory.splice(this.serviceCategory.serviceSubCategory.length, 0, subCat);
            }
        })

        this.serviceCategory.serviceSubCategory.forEach(serverSubCat => {
            this.serviceSubCategories.forEach(subCat => {
                if (subCat.svcSCatgId !== 0 && subCat.svcSCatgId === serverSubCat.svcSCatgId && !serverSubCat.isDeleted) {
                    serverSubCat.svcSCatgCode = subCat.svcSCatgCode;
                    serverSubCat.svcSCatgDesc = subCat.svcSCatgDesc;
                    serverSubCat.isActive = subCat.isActive;
                }
            });
        });

        const response = await this.serviceCategoryService.saveServiceCategoryDetails(this.serviceCategory)
        if (response) {
            this.cancel();
        }
    }

    deleteServiceSubCategory(row: ServiceSubCategoryModel) {
        this.notificationService.smartMessageBox({
            title: "<i class='fa fa-sign-out txt-color-orangeDark'></i> Delete DataSource -  <span class='txt-color-orangeDark'><strong>"
                + row.svcSCatgCode + $('#show-shortcut').text() + "</strong></span> ?",
            content: "Are you sure you want to delete this DataSource ?",
            buttons: '[No][Yes]'

        }, (ButtonPressed) => {
            if (ButtonPressed === 'Yes') {
                this.serviceCategory.serviceSubCategory.forEach(item => {
                    if (item.svcSCatgId === row.svcSCatgId) {
                        item.isDeleted = true;
                    } else {
                        item.isDeleted = false;
                    }
                })
                const index = this.serviceSubCategories.findIndex(i => i.svcSCatgCode === row.svcSCatgCode
                    && i.svcSCatgDesc === row.svcSCatgDesc);
                this.serviceSubCategories.splice(index, 1);
                this.serviceSubCategories = [... this.serviceSubCategories];
                // this.deleteSubCategory(row);
                // calling the delete api with serviceCategoryId as a param
            }
        });
    }

    // async  deleteSubCategory(row) {
    //     let response = await this.serviceCategoryService.deleteServiceSubCategoryDetails(row.svcSCatgId);
    // }

}
