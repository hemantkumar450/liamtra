import { Http, Headers, RequestOptions, BaseRequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import { ServiceSubCategory } from '../models/unique-home.model';
import { ServiceCategoryEnum } from '../../shared/enum/base.enum'


@Injectable()
export class ServiceCategoryService {

    serviceCategoryList: Array<ServiceSubCategory> = [];


    constructor(private http: Http) {
    }

    setAllServiceCategory(data) {
        return this.serviceCategoryList = data;
    }

    getServiceCategory() {
        return this.serviceCategoryList;
    }

    getAllLanguages() {
        const languages = this.serviceCategoryList.filter((item) => {
            return item.svcCatgId === ServiceCategoryEnum.Languages
        });
        if (languages.length > 0) {
            languages.map((item) => {
                item.label = item.svcSCatgDesc;
                item.value = item.svcSCatgId;
            })
            return languages;
        }
    }

    getAllLikeData() {
        const likeData = this.serviceCategoryList.filter((item) => {
            return item.svcCatgId === ServiceCategoryEnum.RoomType
        });
        if (likeData.length > 0) {
            likeData.map((item) => {
                item.label = item.svcSCatgDesc;
                item.value = item.svcSCatgId;
            })
            return likeData;
        }
    }


    getAllPropertyList() {
        const propertyList = this.serviceCategoryList.filter((item) => {
            return item.svcCatgId === ServiceCategoryEnum.PropertyType
        });

        if (propertyList.length > 0) {
            propertyList.map((item) => {
                item.label = item.svcSCatgDesc;
                item.value = item.svcSCatgId;
            });
            return propertyList;
        }
    }


    getAllBedList() {

        const bedList = this.serviceCategoryList.filter((item) => {
            return item.svcCatgId === ServiceCategoryEnum.TotalBeds;
        });

        if (bedList.length > 0) {
            bedList.map((item) => {
                item.label = item.svcSCatgDesc;
                item.value = item.svcSCatgDesc;
            })
            return bedList;
        }
    }

    getAllGuestRoom() {
        const guests = this.serviceCategoryList.filter((item) => {
            return item.svcCatgId === ServiceCategoryEnum.TotalAdultGuest;
        });

        if (guests.length > 0) {
            guests.map((item) => {
                item.label = item.svcSCatgDesc;
                item.value = item.svcSCatgDesc;
            });
            return guests;
        }
    }


    getAllRooms() {

        const rooms = this.serviceCategoryList.filter((item) => {
            return item.svcCatgId === ServiceCategoryEnum.TotalRooms;
        });

        if (rooms.length > 0) {
            rooms.map((item) => {
                item.label = item.svcSCatgDesc;
                item.value = item.svcSCatgDesc;
            })
            return rooms;
        }
    }


    getAllBathrooms() {
        const bathrooms = this.serviceCategoryList.filter((item) => {
            return item.svcCatgId === ServiceCategoryEnum.TotalBathrooms;
        });

        if (bathrooms.length > 0) {
            bathrooms.map((item) => {
                item.label = item.svcSCatgDesc;
                item.value = item.svcSCatgDesc;
            });
            return bathrooms;
        }
    }


    getAllAmenities() {

        const amenities = this.serviceCategoryList.filter((item) => {
            return item.svcCatgId === ServiceCategoryEnum.Amenities;
        });

        if (amenities.length > 0) {
            amenities.map((item) => {
                item.label = item.svcSCatgDesc;
                item.value = item.svcSCatgId;
            })
            return amenities;
        }
    }


    getAllHighlights() {

        const highlights = this.serviceCategoryList.filter((item) => {
            return item.svcCatgId === ServiceCategoryEnum.Highlights;
        });

        if (highlights.length > 0) {
            highlights.map((item) => {
                item.label = item.svcSCatgDesc;
                item.value = item.svcSCatgId;
            })
            return highlights;
        }
    }


    getAllPlaces() {
        const places = this.serviceCategoryList.filter((item) => {
            return item.svcCatgId === ServiceCategoryEnum.PlaceType;
        });
        if (places.length > 0) {
            places.map((item) => {
                item.label = item.svcSCatgDesc;
                item.value = item.svcSCatgId;
            })
            return places;
        }
    }


    getAllBookingPreference() {
        const bookingPreference = this.serviceCategoryList.filter((item) => {
            return item.svcCatgId === ServiceCategoryEnum.BookingPreferences;
        });


        if (bookingPreference.length > 0) {
            bookingPreference.map((item) => {
                item.label = item.svcSCatgDesc;
                item.value = item.svcSCatgId;
            });
            return bookingPreference;
        }
    }


    getAllHouseRules() {
        const houseRules = this.serviceCategoryList.filter((item) => {
            return item.svcCatgId === ServiceCategoryEnum.HouseRules;
        });

        if (houseRules.length > 0) {
            houseRules.map((item) => {
                item.label = item.svcSCatgDesc;
                item.value = item.svcSCatgId;
            })
            return houseRules;
        }
    }

    getAllCancelationPolicy() {
        const cancelationPolicy = this.serviceCategoryList.filter((item) => {
            return item.svcCatgId === ServiceCategoryEnum.CancellationPolicy;
        });

        if (cancelationPolicy.length > 0) {
            cancelationPolicy.map((item) => {
                item.label = item.svcSCatgDesc;
                item.value = item.svcSCatgId;
            })
            return cancelationPolicy;
        }
    }
}
