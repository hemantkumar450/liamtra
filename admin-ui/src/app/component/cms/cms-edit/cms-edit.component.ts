import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { trigger, style, animate, state, transition } from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';


import { CmsListModel, AttachmentModel } from '../shared/cms.model';
import { CmsService } from '../shared/cms.service';
import { MasterService } from '../../shared/service/master.service';
import { CustomDDO } from '../../shared/models/custom-ddo.model';
import { ReviewModel } from '../../shared/models/review.model';
import { SystemConstantModel } from '../../shared/models/system-constant.model';
import { ServiceCategoryEnum, AttachmentType } from '../../shared/enum/base.enum';
import { MessageService } from 'app/component/shared/message/messageService.service';
import { ApiUrl } from '../../../shared/api.service';
import { Message } from 'primeng/primeng';


@Component({
  selector: 'app-cms-edit',
  templateUrl: './cms-edit.component.html',
  styleUrls: ['./cms-edit.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 }))
      ])
    ])
  ]
})
export class CmsEditComponent implements OnInit {
  totalDB: Number = 0;
  public cmsDetail: CmsListModel = new CmsListModel();
  public systemConstantList: Array<CustomDDO> = new Array<CustomDDO>();
  public systemConstantMainList: Array<CustomDDO> = new Array<CustomDDO>();
  public userServiceTypes: Array<CustomDDO> = new Array<CustomDDO>();
  public headerText: string;
  moduleName = 'CMS';
  addFunctionName = 'CMS';
  faIcon = 'fa fa-lg fa-fw fa-font-awesome';
  public videoFiles: Array<any> = [];
  public imageFiles: Array<any> = [];
  public reviewList: Array<ReviewModel> = [];
  public attachmentType = AttachmentType;
  public ApiUrl = ApiUrl;
  reviewModel: ReviewModel = new ReviewModel();;
  public file: AttachmentModel = new AttachmentModel();
  public isAttachmentContainerDisabled: boolean;
  messageModel: Message[] = [];

  constructor(private cmsService: CmsService,
    private masterService: MasterService,
    private sanitizer: DomSanitizer,
    private messageService: MessageService,
    private router: Router,
    public route: ActivatedRoute) {
    this.cmsDetail.cmsId = +this.route.snapshot.params['cmsId'] || 0;
    this.getSystemConstantList();
    this.getReviewList();
    this.getCountryById();
  }

  ngOnInit() {
  }

  async getCountryById() {
    if (this.cmsDetail.cmsId > 0) {
      const response = await this.cmsService.getCMSById(this.cmsDetail.cmsId);
      this.cmsDetail = response.data.Result;
      if (this.cmsDetail.review.length > 0) {
        this.reviewModel = this.cmsDetail.review[0];
      }
      this.cmsDetail.Header = 'Edit CMS';
      this.cmsDetail.IconClass = 'fa fa-fw fa-plus txt-color-blue';
      this.onSelectSystemConstant();
      this.getUserServiceType();
      console.log(this.cmsDetail);
    }
  }

  async onSelectSystemConstant() {
    this.systemConstantMainList = await this.masterService.getSystemConstantDDO(this.cmsDetail.sysConstantMainId);
    this.cmsDetail.sysConstantId = this.cmsDetail.sysConstantId;
  }

  async getSystemConstantList() {
    this.systemConstantList = await this.masterService.getSystemConstantMainDDO();
  }

  async getUserServiceType() {
    this.isAttachmentContainerDisabled = false;
    const response = await this.masterService.getSCategoryType(ServiceCategoryEnum.Type);
    switch (this.cmsDetail.type) {
      case AttachmentType.Image:
        this.seperateFilesBasedOnType(AttachmentType.Image);
        this.userServiceTypes = response.filter(i => i.value === AttachmentType.Image);
        return;
      case AttachmentType.Video:
        this.seperateFilesBasedOnType(AttachmentType.Video);
        this.userServiceTypes = response.filter(i => i.value === AttachmentType.Video);
        return;
      case AttachmentType.Review:
        this.userServiceTypes = response.filter(i => i.value === AttachmentType.Review);
        this.checkedSelectedReview();
        return;
      case AttachmentType.Text:
        this.userServiceTypes = response.filter(i => i.value === AttachmentType.Text);
        return;
    }

    if (this.imageFiles.length === 0 || this.videoFiles.length === 0) {
      this.isAttachmentContainerDisabled = true;
    }
  }

  seperateFilesBasedOnType(attachmentType: number): void {
    if (attachmentType === AttachmentType.Image) {
      this.imageFiles = this.cmsDetail.attachment.filter(file => {
        return file.attachmentType === attachmentType && file.isActive === true;
      });
    } else {
      this.videoFiles = this.cmsDetail.attachment.filter(file => {
        return file.attachmentType === attachmentType && file.isActive === true;
      });
    }
  }

  checkedSelectedReview() {
    this.cmsDetail.review.forEach(detail => {
      this.reviewList.filter(reviewL => {
        return reviewL.reviewId === detail.reviewId
      })[0].isDefault = true
    })
  }

  async getReviewList() {
    this.reviewList = await this.masterService.getReviewList();
    this.reviewList.map(res => {
      res.isDefault = false;
    });
    console.log(this.reviewList);
  }

  onAttachmentSelect(event) {
    if (!this.validateFileType(event.target.files[0].type)) {
      event.target.value = '';
      return false;
    }
    this.cmsDetail.fileName = event.target.files[0].name;
    const files = event.dataTransfer ? event.dataTransfer.files : event.target.files;

    Array.from(files).forEach((fileDetail: any) => {
      this.generateFileData(event).then(res => {
        var file: AttachmentModel = new AttachmentModel();
        file.attachmentDataBase64 = res;
        file.attachmentType = this.cmsDetail.type;
        file.cmsImage = fileDetail.name
        file.fileName = fileDetail.name;
        file.isActive = true;
        file.svcTypeId = 3;
        file.remarks = '';
        file.isDefault = false;
        file.attachmmentStatus = 0;
        file.genId = 0;
        file.cmsUrl = '';
        file.attachmentId = 0;
        file.attachmentUrl = '';
        file.objectURL = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(fileDetail)));
        this.cmsDetail.attachment.push(Object.assign({}, file));
        this.isAttachmentContainerDisabled = false;
        this.seperateFilesBasedOnType(file.attachmentType);
      });
    })
    if (event.target) { event.target.value = ''; }
  }



  validateFileType(fileType): boolean {
    if (this.cmsDetail.type === AttachmentType.Image
      && fileType.indexOf('image') === -1) {
      return false;
    }
    if (this.cmsDetail.type === AttachmentType.Video
      && fileType.indexOf('video') === -1) {
      return false;
    }
    return true;

  }



  generateFileData(event) {
    let fileData;
    const promise = new Promise((resolve, reject) => {

      const FR = new FileReader();

      FR.onload = (e) => {
        fileData = (e.target as any).result;
        resolve(fileData);
      }
      FR.readAsDataURL(event.target.files[0]);

    });
    return promise;
  }

  remove(index: number, file: AttachmentModel) {
    this.cmsDetail.fileName
      = this.cmsDetail.attachment[index].name === this.cmsDetail.fileName ?
        '' : this.cmsDetail.fileName;
    this.cmsDetail.attachment[index].isActive = false;
    this.seperateFilesBasedOnType(file.attachmentType);
    this.delay(1000);
    if ((this.imageFiles.length === 0 && file.attachmentType === this.attachmentType.Image)
      || (this.videoFiles.length === 0 && file.attachmentType === this.attachmentType.Video)) {
      this.isAttachmentContainerDisabled = true;
    }
  }

  delay(ms) {
    return new Promise(function (resolve) {
      setTimeout(resolve, ms);
    });
  }

  async saveCmsDetails() {
    const message = { severity: 'error', summary: 'error', detail: '' };
    if (!this.cmsDetail.sysConstantId) {
      message.detail = 'System Constant is mandatory';
      this.messageService.showMessage(message);
      return;
    }

    if (!this.cmsDetail.type) {
      message.detail = 'Type is mandatory';
      this.messageService.showMessage(message);
      return;
    }
    if (this.imageFiles.length > 0) {
      const selectedImage = this.imageFiles.filter(res => {
        return res.isDefault === 1 || res.isDefault === true;
      })
      if (selectedImage.length === 0) {
        this.cmsDetail.type = AttachmentType.Image;
        message.detail = 'Atleast One Image Selection is mandatory';
        this.messageService.showMessage(message);
        return;
      }
    }
    if (this.videoFiles.length > 0) {
      const selectedVideo = this.videoFiles.filter(res => {
        return res.isDefault === 1 || res.isDefault === true;
      })
      if (selectedVideo.length === 0) {
        this.cmsDetail.type = AttachmentType.Video;
        message.detail = 'Atleast One Video Selection is mandatory';
        this.messageService.showMessage(message);
        return;
      }
    }
    this.cmsDetail.review = this.reviewList.filter(res => {
      return res.isDefault === true;
    });
    console.log(this.cmsDetail);
    if (this.cmsDetail.type == this.attachmentType.Text) {
      this.reviewModel.isDefault = true;
      this.reviewModel.reviewTypeId = AttachmentType.Text;
      this.cmsDetail.review.push(this.reviewModel);
    }
    const response = await this.cmsService.saveCmsDetail(this.cmsDetail);
    if (response) {
      this.cancel();
    }
  }

  cancel() {
    this.router.navigate(['/cms']);
  }

}
