import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { UniqueHomeModel, AttachmentModel } from '../../../models/unique-home.model';
import { ServiceCategoryService } from '../../../services/service-category.service';
import { ServiceCategoryEnum, ServiceType } from '../../../../shared/enum/base.enum';
import { ApiUrl } from '../../../../../shared/api.service';
import { AttachmentType } from '../../../../shared/enum/base.enum';

@Component({
  selector: 'app-attachment-video',
  templateUrl: './video.component.html'
})

export class AttachmentVideoComponent implements OnInit {

  @Input() uniqueHome: UniqueHomeModel;
  FileList = [];
  videotype: number = AttachmentType.Video;

  constructor(public serviceCategoryService: ServiceCategoryService) { }

  ngOnInit() {
    this.uniqueHome.allAttachments.forEach(attachment => {
      // attachment.attachmentUrl = ApiUrl.SRC_URI + attachment.attachmentUrl;
    });
  }


  async onVideoUpload(event) {
    const fileList: FileList = event.files;
    if (fileList.length > 0) {
      for (let i = 0; i < fileList.length; i++) {
        const type = fileList[i].type.split('/')[1];
        if (type === 'mp4' || type === 'avi' || type === 'WMV' || type === '3gpp') {
          const fileToLoad = fileList[i];
          await this.generateFileData(fileToLoad);
        } else {
          alert('Please use correct format of image');
        }
      }
    }
  }

  async generateFileData(fileToLoad) {
    const fileReader = new FileReader();
    fileReader.onload = (fileLoadedEvent: any) => {
      const base64Code = fileLoadedEvent.target.result;
      const fileUploadModel = new AttachmentModel();
      fileUploadModel.genId = this.uniqueHome.svcId;
      fileUploadModel.svcTypeId = ServiceType.UniqueHome;
      fileUploadModel.attachmentType = AttachmentType.Video;
      fileUploadModel.fileName = fileToLoad.name;
      fileUploadModel.attachmentDataBase64 = base64Code;
      this.uniqueHome.allAttachments.push(fileUploadModel);
      this.FileList.splice(this.FileList.length, -1, { fileUploadModel });
    };
    fileReader.readAsDataURL(fileToLoad);
  }

  deleteAttachment(index) {
    this.uniqueHome.allAttachments[index].isActive = false;
    // this.uniqueHome.allAttachments.splice(index, 1);
    this.FileList.splice(index, 1);
  }

}
