import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { UniqueHomeModel } from '../../models/unique-home.model';
import { ServiceCategoryService } from '../../services/service-category.service';
import { ServiceCategoryEnum } from '../../../shared/enum/base.enum';

@Component({
    selector: 'app-unique-home-listing',
    templateUrl: './listing.component.html'
})

export class HostUniqueHomeListingComponent implements OnInit {
    @Input() uniqueHome: UniqueHomeModel;
    likeList: Array<any> = [];
    properties: Array<any> = [];
    rooms: Array<any> = [];
    beds: Array<any> = [];
    bathrooms: Array<any> = [];
    amenities: Array<any> = [];
    guestRooms: Array<any> = [];
    roomType: number = ServiceCategoryEnum.RoomType;
    property: number = ServiceCategoryEnum.PropertyType;

    constructor(public serviceCategoryService: ServiceCategoryService) { }

    ngOnInit() {
        this.likeList = this.serviceCategoryService.getAllLikeData();
        this.properties = this.serviceCategoryService.getAllPropertyList();
        this.rooms = this.serviceCategoryService.getAllRooms();
        this.beds = this.serviceCategoryService.getAllBedList()
        this.bathrooms = this.serviceCategoryService.getAllBathrooms();
        this.guestRooms = this.serviceCategoryService.getAllGuestRoom();
    }

    onSelected(type) {
        let index = this.uniqueHome.hostServiceLinkingSubCategories.findIndex(i => i.svcCatgId === type)
        if (type === ServiceCategoryEnum.RoomType) {            
            this.uniqueHome.hostServiceLinkingSubCategories[index].svcSCatgId = this.uniqueHome.hostStayDetail.listType;
        } else {
            this.uniqueHome.hostServiceLinkingSubCategories[index].svcSCatgId = this.uniqueHome.hostStayDetail.propertyType;
        }
    }
}
