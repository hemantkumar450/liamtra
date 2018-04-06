import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HostTourModel, AttachmentModel, HostTourService } from '../shared/index';
import { DomSanitizer } from '@angular/platform-browser';
import { trigger, style, animate, state, transition } from '@angular/animations';
import { ServiceCategoryEnum, AttachmentType } from '../../../shared/enum/base.enum';
import { ApiUrl } from '../../../../shared/api.service';
import { MessageModel } from '../../../shared/message/messageService.model';
declare const $;

@Component({
  selector: 'app-tour-attachment.component',
  templateUrl: './tour-attachment.component.html',
  styleUrls: ['./tour-attachment.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 }))
      ])
    ])
  ]
})

export class HostTourAttachmentComponent implements OnInit {
  tourId: number = 0;
  svcId: number = 0;
  header: string = 'Tour Attachments';
  iconClass: string = 'fa fa-fw fa-plus txt-color-blue';
  messageModel: MessageModel;
  routeAttachmentType: number = 158;
  tourType: string = 'image';
  private svcTypeId: number = 14;
  private routeType: string = 'addNew';
  file: AttachmentModel = new AttachmentModel();
  attachments: Array<AttachmentModel> = [];
  attachmentsFolderName: string = 'attachments/';

  constructor(
    private sanitizer: DomSanitizer,
    public hostTourService: HostTourService,
    public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.parent.params.subscribe((param) => {
      this.tourId = +param['tourId'];
      this.svcId = +param['svcId']
      if (this.tourId > 0) {
        this.routeType = 'entry';
      } else {
        this.routeType = 'addNew';
      }

      this.getAttchmentBySvcTypeTdAndTourId();
    });

  }

  cancel(): void {
    this.getAttchmentBySvcTypeTdAndTourId();
  }

  validateFileType(fileType): boolean {
    if (this.routeAttachmentType === AttachmentType.Image
      && fileType.indexOf('image') === -1) {
      return false;
    }
    return true;

  }


  onAttachmentSelect(event) {
    if (!this.validateFileType(event.target.files[0].type)) {
      event.target.value = '';
      return false;
    }
    this.file = new AttachmentModel();
    this.file.fileName = event.target.files[0].name;
    const files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
    Array.from(files).forEach((fileDetail: any) => {
      this.generateFileData(event).then(res => {
        this.file.attachmentDataBase64 = res;
        this.file.attachmentType = this.routeAttachmentType;
        this.file.fileName = fileDetail.name;
        this.file.isActive = true;
        this.file.svcTypeId = 14;
        this.file.remarks = '';
        this.file.isDefault = false;
        this.file.attachmmentStatus = 1;
        this.file.genId = this.svcId;
        this.file.cmsUrl = '';
        this.file.attachmentId = 0;
        this.file.attachmentUrl = '';
        this.file.attachmentData = [];
        this.file.objectURL = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(fileDetail)));
        this.attachments.push(this.file);
      });
    })
    if (event.target) { event.target.value = ''; }
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

  seperateFilesBasedOnType(): void {

  }

  remove(index: number) {
    this.file.fileName = this.attachments[index].fileName === this.file.fileName ? '' : this.file.fileName;
    this.attachments[index].isActive = false;
    if (this.attachments[index].attachmentId === 0) {
      this.attachments.splice(index, 1);
    }

    this.seperateFilesBasedOnType();
  }

  setDefaultImage(index: number) {
    if (this.attachments[index].attachmentId > 0) {
      this.attachments[index].isTouched = true;
    }
  }

  saveTourAttachments() {
    const response = this.hostTourService.updateByHostTour(this.attachments).then(res => {
      if (res.data.Status) {
        this.cancel();
      }
    }).catch((error) => {

    });
  }

  async getAttchmentBySvcTypeTdAndTourId() {
    if (this.tourId > 0) {
      const response = await this.hostTourService.getAttchmentBySvcTypeTdAndTourId(this.svcId, this.svcTypeId);
      this.attachments = response.data.Result;
    }
  }

}
