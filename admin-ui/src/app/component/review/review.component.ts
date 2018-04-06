import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewModel, ReviewService } from './shared/index';
import { ResourceLoader } from '@angular/compiler';
import { TableHeaderComponent } from '../shared/tableHeader/tableHeader.component'


@Component({
  selector: 'app-review',
  templateUrl: './review.component.html'
})
export class ReviewComponent implements OnInit {
  ReviewList: Array<ReviewModel> = [];
  totalDB: number = 0;
  moduleName = 'Reviews';
  addFunctionName = 'Review';
  faIcon = 'fa fa-database fa-fw';
  disabledAddNewButton: boolean = true;
  @ViewChild(TableHeaderComponent) searchInput: TableHeaderComponent;
  gb;
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public reviewService: ReviewService
  ) { this.getReviewList() }

  ngOnInit() {
    this.gb = this.searchInput._gb.nativeElement;
  }

  async getReviewList() {
    const response = await this.reviewService.getReviewList();
    this.ReviewList = response.data.Result;
    this.totalDB = response.data.Result.length;
  }

  editReview(reviewId): void {
    this.router.navigate(['review/Edit/' + reviewId]);
  }
  
}
