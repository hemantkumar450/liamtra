import { Router } from '@angular/router';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
  ViewContainerRef
} from '@angular/core';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { LoaderService } from '../loader/loader.service';
import { LoginEnum } from '../../shared/enum/login.enum';
import { Subscription } from 'rxjs/Subscription';
import { CommonService } from '../../shared/services';
import { BookUniqueHomeService, ContactHost, ReviewModal } from '../../components/book/book-unique-home';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ModalType } from '../../shared/enum/service-category-enum';
import { BookUniqueHomeDetailModel } from '../../components/book/book-unique-home/shared/book-unique-home.model';
import { AttachmentType } from '../../shared/enum/cms-sytem-enum';
import { ServiceCategoryEnum } from '../../shared/enum/service-category-enum';

@Component({
  selector: 'app-general-modal',
  templateUrl: './general-modal.component.html'
})

export class generalModalComponent implements OnInit {
  private subscription: Subscription;
  count: number = 0;
  @Output() contactToHostmodalPopupEvent = new EventEmitter();
  @Input() modalType: number;
  @Input() modal: boolean = true;
  @Input() ownerId: number = 0;
  @Input() svcId: number = 0;
  review: ReviewModal = new ReviewModal();
  contactHost: ContactHost = new ContactHost();

  constructor(private eRef: ElementRef,
    public toastr: ToastsManager, vcr: ViewContainerRef,
    private bookUniqueHomeService: BookUniqueHomeService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private commonService: CommonService,
    private loaderService: LoaderService) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() { }

  closeModal() {
    this.modal = false;
    this.contactToHostmodalPopupEvent.emit(this.modal);
  }

  async sendContactHostMessage() {
    this.contactHost.ownerId = this.ownerId;
    if (!this.contactHost.comments) {
      this.toastr.warning('Message field is required.');
      return;
    }
    try {
      this.loaderService.show();
      let sendContactHostMessage = await this.bookUniqueHomeService.sendContactHostMessage(this.contactHost);
      console.log(sendContactHostMessage);
      this.modal = false;
      this.toastr.warning('Message successfully sent to host.');
      this.closeModal();
      this.loaderService.hide();
    } catch {
      this.loaderService.hide();
    }
  }

  async sendReviewAndRating() {
    if (this.review.reviewRatingValue === 0) {
      this.toastr.warning('Please review us before submit');
      return
    }
    this.review.genId = this.svcId;
    this.review.svcTypeId = ServiceCategoryEnum.HostUniqueHome;
    this.review.reviewTypeId = AttachmentType.Review;
    try {
      this.loaderService.show();
      let sendContactHostMessage = await this.bookUniqueHomeService.sendReviewAndRating(this.review);
      console.log(sendContactHostMessage);
      this.modal = false;
      this.toastr.warning('Message successfully sent to host.');
      this.loaderService.hide();
      this.closeModal();
    } catch (e) {
      this.loaderService.hide();
    }
  }
}
