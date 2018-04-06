import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { ReviewModel, ReviewService } from '../shared/index';
import { MessageService } from 'app/component/shared/message/messageService.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'primeng/components/common/api';
import { MasterService } from '../../shared';


@Component({
  selector: 'app-review-edit',
  templateUrl: './review-edit.component.html',
})
export class ReviewEditComponent implements OnInit {
  header = '';
  addFunctionName = 'Review';
  faIcon = 'fa fa-building fa-fw';
  message: Message[] = [];
  public gender = []
  public userServiceTypes = [];
  public userStatus = [];
  public serviceTypeList = [];

  public reviewModel: ReviewModel = new ReviewModel()


  constructor(private reviewService: ReviewService,
    public route: ActivatedRoute,
    public messageService: MessageService,
    private masterService: MasterService,
    private router: Router) { }



  ngOnInit() {
    this.reviewModel.reviewId = this.route.snapshot.params['reviewId'] || 0;
    if (this.reviewModel.reviewId > 0) {
      this.getReviewById(this.reviewModel.reviewId);
    }
  }


  async getReviewById(reviewId) {
    const data = await this.reviewService.getReviewById(reviewId);
    this.reviewModel = data.data.Result;
  }

  async saveUser() {
    console.log(this.reviewModel)
    this.reviewService.updateReviewDetails(this.reviewModel).then((res) => {
      this.onCancel();
    })
    // if (this.userModel.userId > 0) {
    //   this.userService.updateUserDetails(this.userModel).then((res) => {
    //     this.onCancel();
    //   })
    // } else {
    //   this.userService.saveUserDetails(this.userModel).then((res) => {
    //     this.onCancel();
    //   })
    // }
  }


  onCancel(): void {
    this.router.navigate(['/review']);
  }
}
