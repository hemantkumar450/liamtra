import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { UniqueHomeModel } from '../../models/unique-home.model';
import { ServiceCategoryEnum } from '../../../shared/enum/base.enum';
import { ServiceCategoryService } from '../../services/service-category.service';


@Component({
    selector: 'app-unique-home-highlights',
    templateUrl: './highlights.component.html'
})

export class HostUniqueHomeHighlightsComponent implements OnInit {

    @Input() uniqueHome: UniqueHomeModel;
    aminitiesData: Array<any> = [];
    highlightsPlaces: Array<any> = [];
    placesGoodFor: Array<any> = [];
    bookingData: Array<any> = [];
    houseRules: Array<any> = [];
    cancellationPolicies: Array<any> = [];
    selectedAmenities: Array<any> = [];
    selectedHighlights: Array<any> = [];
    selectedPlaces: Array<any> = [];
    selectedBookingPreference: Array<any> = [];
    selectedHouseRules: Array<any> = [];
    selectedCancellationPolicy: Array<any> = [];

    constructor(public serviceCategoryService: ServiceCategoryService) {
        this.aminitiesData = this.serviceCategoryService.getAllAmenities();
        this.highlightsPlaces = this.serviceCategoryService.getAllHighlights();
        this.placesGoodFor = this.serviceCategoryService.getAllPlaces();
        this.bookingData = this.serviceCategoryService.getAllBookingPreference();
        this.houseRules = this.serviceCategoryService.getAllHouseRules();
        this.cancellationPolicies = this.serviceCategoryService.getAllCancelationPolicy();
    }

    ngOnInit() {
        if (this.uniqueHome.hostServiceLinkingSubCategories) {
            this.uniqueHome.hostServiceLinkingSubCategories.forEach((item) => {
                if (item.svcCatgId === ServiceCategoryEnum.Amenities) {
                    this.selectedAmenities.push(item.svcSCatgId)
                }
                if (item.svcCatgId === ServiceCategoryEnum.Highlights) {
                    this.selectedHighlights.push(item.svcSCatgId)
                }

                if (item.svcCatgId === ServiceCategoryEnum.PlaceType) {
                    this.selectedPlaces.push(item.svcSCatgId)
                }

                if (item.svcCatgId === ServiceCategoryEnum.BookingPreferences) {
                    this.selectedBookingPreference.push(item.svcSCatgId)
                }

                if (item.svcCatgId === ServiceCategoryEnum.HouseRules) {
                    this.selectedHouseRules.push(item.svcSCatgId)
                }

                if (item.svcCatgId === ServiceCategoryEnum.CancellationPolicy) {
                    this.selectedCancellationPolicy.push(item.svcSCatgId)
                }
            });
        }
    }

    onMultiselectChange(svcCatgId, selected) {
        const LIMIT_NUMBER = 2;
        if (this.selectedHighlights.length > LIMIT_NUMBER && svcCatgId === ServiceCategoryEnum.Highlights) {
            selected.value.pop();
            return;
        }
        let hostServiceLinkingSubCategories = this.uniqueHome.hostServiceLinkingSubCategories.map(x => Object.assign({}, x));
        hostServiceLinkingSubCategories.forEach((element) => {
            if (element.svcCatgId === svcCatgId) {
                const index = this.uniqueHome.hostServiceLinkingSubCategories.findIndex(i => i.svcSCatgId === element.svcSCatgId);
                this.uniqueHome.hostServiceLinkingSubCategories.splice(index, 1);
            }
        });
        this.selectedMultiselect(svcCatgId, selected)
    }

    selectedMultiselect(svcCatgId, selected) {
        switch (svcCatgId) {
            case ServiceCategoryEnum.Amenities:
                this.aminitiesData.forEach(aminity => {
                    selected.value.forEach(value => {
                        if (aminity.value === value) {
                            this.uniqueHome.hostServiceLinkingSubCategories
                                .splice(this.uniqueHome.hostServiceLinkingSubCategories.length, 0, aminity);
                        }
                    });
                });
                return;
            case ServiceCategoryEnum.Highlights:
                this.highlightsPlaces.forEach(highlight => {
                    selected.value.forEach(value => {
                        if (highlight.value === value) {
                            this.uniqueHome.hostServiceLinkingSubCategories
                                .splice(this.uniqueHome.hostServiceLinkingSubCategories.length, 0, highlight);
                        }
                    });
                });
                return;
            case ServiceCategoryEnum.PlaceType:
                this.placesGoodFor.forEach(place => {
                    selected.value.forEach(value => {
                        if (place.value === value) {
                            this.uniqueHome.hostServiceLinkingSubCategories
                                .splice(this.uniqueHome.hostServiceLinkingSubCategories.length, 0, place);
                        }
                    });
                });
                return;
            case ServiceCategoryEnum.BookingPreferences:
                this.bookingData.forEach(booking => {
                    selected.value.forEach(value => {
                        if (booking.value === value) {
                            this.uniqueHome.hostServiceLinkingSubCategories
                                .splice(this.uniqueHome.hostServiceLinkingSubCategories.length, 0, booking);
                        }
                    });
                });
                return;
            case ServiceCategoryEnum.HouseRules:
                this.houseRules.forEach(house => {
                    selected.value.forEach(value => {
                        if (house.value === value) {
                            this.uniqueHome.hostServiceLinkingSubCategories
                                .splice(this.uniqueHome.hostServiceLinkingSubCategories.length, 0, house);
                        }
                    });
                });
                return;
            case ServiceCategoryEnum.CancellationPolicy:
                this.cancellationPolicies.forEach(cancelPolicy => {
                    selected.value.forEach(value => {
                        if (cancelPolicy.value === value) {
                            this.uniqueHome.hostServiceLinkingSubCategories
                                .splice(this.uniqueHome.hostServiceLinkingSubCategories.length, 0, cancelPolicy);
                        }
                    });
                });
                return;
        }
    }
}
