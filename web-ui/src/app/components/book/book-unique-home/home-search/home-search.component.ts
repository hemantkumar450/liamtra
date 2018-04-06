import { Component, OnInit } from '@angular/core';
import { BookService, BookUnique, BookUniqueHomeSearchData, ServiceSubCategoryModel } from '../../shared';
import { FilterBookUniqueHomeModel } from '../shared/book-unique-home.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceCategoryEnum } from '../../../../shared/enum/service-category-enum';
import { retry } from 'rxjs/operator/retry';
import { promise } from 'selenium-webdriver';
import { LoaderService } from '../../../../core/loader/loader.service';
import { ApiUrl } from '../../../../api.service';
import { DatePipe } from '@angular/common';
import { PaginationService } from '../../../../shared/services';
import { BookUniqueHomeState } from '../../../../core/store/reducers/app.states';
import * as articleReducer from '../../../../core/store/reducers/article.reducer';
import * as fromActions from '../../../../core/store/actions/article.actions';
import { AttachmentType } from '../../../../shared/enum/cms-sytem-enum';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { INCREMENT, DECREMENT, RESET } from '../../../../counter.component';


@Component({
  selector: 'app-book-unique-home-search',
  templateUrl: './home-search.component.html'
})

export class BookUniqueHomeSearchComponent implements OnInit {
  sliderCss: string = 'bookUniqueHomeSearch';
  apiUrl = ApiUrl;
  showBookingType: boolean = false;
  showRoomType: boolean = false;
  showSize: boolean = false;
  showAmenitie: boolean = false;
  showPrice: boolean = false;
  showPropertyType: boolean = false;
  showExperience: boolean = false;
  bookUnique: BookUnique = new BookUnique();
  bookUniqueHomeSearchData: Array<BookUniqueHomeSearchData> = [];
  filterBookUniqueHome: FilterBookUniqueHomeModel = new FilterBookUniqueHomeModel();
  bookingTypes: Array<ServiceSubCategoryModel>;
  roomTypes: Array<ServiceSubCategoryModel> = [];
  bedrooms: Array<ServiceSubCategoryModel> = [];
  bathrooms: Array<ServiceSubCategoryModel> = [];
  beds: Array<ServiceSubCategoryModel> = [];
  amenities: Array<ServiceSubCategoryModel> = [];
  propertyTypes: Array<ServiceSubCategoryModel> = [];
  experiences: Array<ServiceSubCategoryModel> = [];
  sortingParams: Array<ServiceSubCategoryModel> = [];
  datePipe = new DatePipe('en-US');
  maxSliderValue: number = 53000;
  minSliderValue: number = 0;
  locationCss: string = 'locationMapBooking';
  filterTypeIds: string = '';
  loading = false;
  total = 0;
  page = 1;
  limit = 10;
  storeGetParams: Observable<ServiceSubCategoryModel[]>;
  getFilterData: Array<ServiceSubCategoryModel> = [];

  constructor(
    private store: Store<BookUniqueHomeState>,
    public paginationService: PaginationService,
    private bookService: BookService,
    private router: Router,
    private loaderService: LoaderService,
    public route: ActivatedRoute) {
    this.paginationService.setDefaultPage();
    this.paginationService.pageSize = this.limit;
    this.filterBookUniqueHome.MinRoomPrice = 10;
    this.filterBookUniqueHome.MaxRoomPrice = 53000;

  }

  ngOnInit() {
    this.route.queryParams.subscribe((param) => {
      this.bookUnique.CheckIn = param['CheckIn'];
      this.bookUnique.CheckIn = this.datePipe.transform(this.bookUnique.CheckIn, 'MM-dd-yyyy');
      this.bookUnique.CityName = param['CityName'];
      this.bookUnique.NumberofGuestsInRoom = param['NumberofGuestsInRoom'];
      this.bookUnique.CheckOut = param['CheckOut'];
      this.bookUnique.CheckOut = this.datePipe.transform(this.bookUnique.CheckOut, 'MM-dd-yyyy');
      this.getBookIndividual();
    });
    this.getbookingTypes(ServiceCategoryEnum.BookingPreferences);
    this.getRoomTypes(ServiceCategoryEnum.RoomType);
    this.getBedrooms(ServiceCategoryEnum.TotalRooms);
    this.getBathrooms(ServiceCategoryEnum.TotalBathrooms);
    this.getBeds(ServiceCategoryEnum.TotalBeds);
    this.getAmenities(ServiceCategoryEnum.Amenities);
    this.getPropertyTypes(ServiceCategoryEnum.PropertyType);
    this.getExperiences(ServiceCategoryEnum.ExperienceType);
    this.getSortingParams(ServiceCategoryEnum.Sort);
    this.store.select(articleReducer.getBookUniqueHomeFilter).subscribe((data: any) => {
      this.getFilterData = data;
    });
  }

  async getBookIndividual() {
    try {
      this.loaderService.show();
      this.paginationService.setFilterValues(this.bookUnique);
      this.filterBookUniqueHome.SortId = 214;
      this.onFiltering();
      this.setSearchData();

    } catch (e) {
      console.log(e + 'here is the error');
      this.loaderService.hide();
    }
  }

  async getbookingTypes(id) {
    try {
      this.loaderService.show();
      const response = await this.bookService.getServiceSubCategoryByServiceId(id);
      this.bookingTypes = response.data.Result;
      this.setFilterData(ServiceCategoryEnum.BookingPreferences);
    } catch (e) {
      console.log(e);
    }
  }

  setFilterData(serviceCategoryType) {
    this.getFilterData.forEach(item => {
      if (serviceCategoryType === item.svcCatgId) {
        let index = 0;
        switch (serviceCategoryType) {
          case ServiceCategoryEnum.Amenities:
            index = this.amenities.findIndex(i => i.svcSCatgId === item.svcSCatgId);
            this.amenities.splice(index, 1);
            this.amenities.splice(index, 0, item);
            return;
          case ServiceCategoryEnum.BookingPreferences:
            index = this.bookingTypes.findIndex(i => i.svcSCatgId === item.svcSCatgId);
            this.bookingTypes.splice(index, 1);
            this.bookingTypes.splice(index, 0, item);
            return;
          case ServiceCategoryEnum.RoomType:
            index = this.roomTypes.findIndex(i => i.svcSCatgId === item.svcSCatgId);
            this.roomTypes.splice(index, 1);
            this.roomTypes.splice(index, 0, item);
            return;
          case ServiceCategoryEnum.PropertyType:
            index = this.propertyTypes.findIndex(i => i.svcSCatgId === item.svcSCatgId);
            this.propertyTypes.splice(index, 1);
            this.propertyTypes.splice(index, 0, item);
            return;
          case ServiceCategoryEnum.ExperienceType:
            index = this.experiences.findIndex(i => i.svcSCatgId === item.svcSCatgId);
            this.experiences.splice(index, 1);
            this.experiences.splice(index, 0, item);
            return;
        }
      }
    });
  }

  async getSortingParams(id) {
    try {
      this.loaderService.show();
      const response = await this.bookService.getServiceSubCategoryByServiceId(id);
      this.sortingParams = response.data.Result;
    } catch (e) {
      console.log(e);
    }
  }


  async getRoomTypes(id) {
    try {
      this.loaderService.show();
      const response = await this.bookService.getServiceSubCategoryByServiceId(id);
      this.roomTypes = response.data.Result;
      this.setFilterData(ServiceCategoryEnum.RoomType);
    } catch (e) {
      this.loaderService.hide();
      console.log(e);
    }
  }

  async getBedrooms(id) {
    try {
      this.loaderService.show();
      const response = await this.bookService.getServiceSubCategoryByServiceId(id);
      this.bedrooms = response.data.Result;
    } catch (e) {
      this.loaderService.hide();
      console.log(e);
    }
  }

  async getBathrooms(id) {
    try {
      this.loaderService.show();
      const response = await this.bookService.getServiceSubCategoryByServiceId(id);
      this.bathrooms = response.data.Result;
    } catch (e) {
      this.loaderService.hide();
      console.log(e);
    }
  }

  async getBeds(id) {
    try {
      this.loaderService.show();
      const response = await this.bookService.getServiceSubCategoryByServiceId(id);
      this.beds = response.data.Result;
    } catch (e) {
      this.loaderService.hide();
      console.log(e);
    }
  }

  async getAmenities(id) {
    try {
      this.loaderService.show();
      const response = await this.bookService.getServiceSubCategoryByServiceId(id);
      this.amenities = response.data.Result;
      this.setFilterData(ServiceCategoryEnum.Amenities);
    } catch (e) {
      this.loaderService.hide();
      console.log(e);
    }
  }

  async getExperiences(id) {
    try {
      this.loaderService.show();
      const response = await this.bookService.getServiceSubCategoryByServiceId(id);
      this.experiences = response.data.Result;
      this.setFilterData(ServiceCategoryEnum.ExperienceType);
      // this.loaderService.hide();
    } catch (e) {
      // this.loaderService.hide();
      // console.log(e);
    }
  }

  async getPropertyTypes(id) {
    try {
      this.loaderService.show();
      const response = await this.bookService.getServiceSubCategoryByServiceId(id);
      this.propertyTypes = response.data.Result;
      this.setFilterData(ServiceCategoryEnum.PropertyType);
      // this.loaderService.hide();
    } catch (e) {
      console.log(e);
    }
  }

  getHomeSearchDetail(svcId) {
    this.router.navigate(['book/unique-homes-detail'], {
      queryParams: {
        CityName: this.bookUnique.CityName,
        NumberofGuestsInRoom: this.bookUnique.NumberofGuestsInRoom, CheckIn: this.bookUnique.CheckIn,
        CheckOut: this.bookUnique.CheckOut, svcId: svcId
      }
    });
  }

  OnPriceChange(item) {
    this.filterBookUniqueHome.MinRoomPrice = item.from;
    this.filterBookUniqueHome.MaxRoomPrice = item.to;
    this.filterUniqueHomeSearch();
  }

  filterUniqueHome(filterType) {
    filterType.isChecked = !filterType.isChecked;
    if (filterType.isChecked) {
      this.filterTypeIds = this.filterTypeIds != "" ? this.filterTypeIds + ',' + filterType.svcSCatgId : filterType.svcSCatgId.toString();
    } else {
      const arr = this.filterTypeIds.split(',');
      const index = arr.findIndex(i => i === filterType.svcSCatgId.toString());
      arr.splice(index, 1);
      this.filterTypeIds = '';
      arr.forEach(id => {
        if (id !== '') {
          this.filterTypeIds += id + ',';
        }
      });
    }
    this.getFilterData.splice(this.getFilterData.length, 0, filterType);
    this.store.dispatch(new fromActions.BookUniqueHomeSearchFilter(this.getFilterData));
    this.filterBookUniqueHome.SvcSCatgId = this.filterTypeIds;
    this.filterUniqueHomeSearch();
  }

  async filterUniqueHomeSearch() {
    try {
      this.filterBookUniqueHome.CheckIn = this.bookUnique.CheckIn;
      this.filterBookUniqueHome.CheckOut = this.bookUnique.CheckOut;
      this.filterBookUniqueHome.CityName = this.bookUnique.CityName;
      this.filterBookUniqueHome.NumberofGuestsInRoom = this.bookUnique.NumberofGuestsInRoom;
      this.paginationService.setFilterValues(this.filterBookUniqueHome);
      this.loaderService.show();
      const response = await this.bookService.getUniqueHomeListingWithFilter(this.paginationService.getParams());
      this.bookUniqueHomeSearchData = response.data.Result.data;
      this.total = response.data.Result.totalRecords;
      this.setSearchData();
    } catch (e) {
      // console.log(e);
      this.loaderService.hide();
    }
  }

  onFiltering() {
    this.filterBookUniqueHome.CheckIn = this.bookUnique.CheckIn;
    this.filterBookUniqueHome.CheckOut = this.bookUnique.CheckOut;
    this.filterBookUniqueHome.CityName = this.bookUnique.CityName;
    this.filterBookUniqueHome.NumberofGuestsInRoom = this.bookUnique.NumberofGuestsInRoom;
    this.paginationService.setFilterValues(this.filterBookUniqueHome);
    this.serverCallFilterUniqueHome();
  }

  async serverCallFilterUniqueHome() {
    try {
      this.loaderService.show();
      const response = await this.bookService.getUniqueHomeListing(this.paginationService.getParams());
      this.bookUniqueHomeSearchData = response.data.Result.data;
      this.total = response.data.Result.totalRecords;
      this.setSearchData();
    } catch (e) {
      // console.log(e);
      this.loaderService.hide();
    }
  }

  setSearchData() {
    this.bookUniqueHomeSearchData.forEach(element => {
      element.images = [];
      element.videos = [];
      element.allAttachments.forEach(attachment => {
        if (attachment.attachmentType === AttachmentType.Image) {
          let obj = {
            imgSrc: ApiUrl.SRC_URI + attachment.attachmentUrl,
            sType: 'img'
          }
          element.images.splice(element.images.length, 0, obj);
        } else if (attachment.attachmentType === AttachmentType.Video) {
          let obj = {
            videoSrc: ApiUrl.SRC_URI + attachment.attachmentUrl
          }
          element.videos.splice(element.images.length, 0, obj);
        }
      });
    });
    this.loaderService.hide();
  }

  goToPage(n: number): void {
    this.page = n;
    let obj = {
      page: this.page,
      rows: this.limit
    }
    this.paginationService.setPageChange(obj);
    this.getBookIndividual();
  }

  onNext(): void {
    this.page++;
    this.getBookIndividual();
  }

  onPrev(): void {
    this.page--;
    this.getBookIndividual();
  }

  increment() {
    this.store.dispatch({ type: 'Read the docs' });
  }

  addTodo(text) {
    return {
      type: 'ADD_TODO',
      text
    }
  }

  decrement() {
    this.store.dispatch({ type: DECREMENT });
  }

  reset() {
    this.store.dispatch({ type: RESET });
  }
}
