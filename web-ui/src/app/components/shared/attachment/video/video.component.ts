import { Component, OnInit, Input, Output, ViewContainerRef, EventEmitter } from '@angular/core';
// import { AttachmentModel } from '../../attachment.model';
import { HostModel, AttachmentModel } from '../../../host/shared/host.model';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AttachmentType } from '../../../../shared/enum/cms-sytem-enum';
const URL = 'http://localhost:5000/api/Attachment/UploadFiles/';
import { FileUploader, FileUploaderOptions } from 'ng2-file-upload';
import { LocalStorageService } from '../../../../shared/services/index';
import { LoaderService } from '../../../../core/loader/loader.service';

@Component({
  selector: 'app-attachment-video',
  templateUrl: './video.component.html'
})


export class AttachmentVideoComponent implements OnInit {
  public uploader: FileUploader;
  @Input() hostModel: HostModel;
  @Input() serviceTypeId: number = 0;
  fileName: string = '';
  FileList = [];
  // attachmentSrc: String;


  constructor(
    public toastr: ToastsManager, vcr: ViewContainerRef,
    private loaderService: LoaderService,
    private localStorageService: LocalStorageService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    let options: FileUploaderOptions = {
      authToken: this.localStorageService.getAccessToken(),
      authTokenHeader: 'Authorization',
      url: URL
    };
    this.uploader = new FileUploader(options);
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    }

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      item.remove();
      this.loaderService.hide();
    };
  }

  async videoUploadEvent(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      for (let i = 0; i < fileList.length; i++) {
        const size = fileList[i].size;
        if (size > 2600000) {
          this.toastr.warning('Please upload less than or equal to 2.50mb videos only');
          return;
        }
        const type = fileList[i].type.split('/')[1];
        if (type === 'mp4' || type === 'avi' || type === 'WMV' || type === '3gpp') {
          const fileToLoad = fileList[i];
          await this.generateFileData(fileToLoad);
        } else {
          this.toastr.warning('Please use correct format of image');
        }
      }
    }
  }

  callAPI(item) {
    this.loaderService.show();
    item.queue[0].upload();
  }

  deleteAttachment($index) {
    this.hostModel.allAttachments.splice($index, 1);
    this.FileList.splice($index, 1);
    // this.attachmentSrc = '';
  }

  // showAttachment(data) {
  //   this.attachmentSrc = data.fileUploadModel.attachmentDataBase64;
  // }

  async generateFileData(fileToLoad) {
    const fileReader = new FileReader();
    fileReader.onload = (fileLoadedEvent: any) => {
      const base64Code = fileLoadedEvent.target.result;
      const fileUploadModel = new AttachmentModel();
      fileUploadModel.attachmentType = AttachmentType.Video;
      fileUploadModel.fileName = fileToLoad.name;
      fileUploadModel.attachmentDataBase64 = base64Code;
      fileUploadModel.svcTypeId = this.serviceTypeId;
      this.hostModel.allAttachments.push(fileUploadModel);
      // this.attachmentSrc = fileUploadModel.attachmentDataBase64;
      this.FileList.splice(this.FileList.length, -1, { fileUploadModel });
    };
    fileReader.readAsDataURL(fileToLoad);
  }
}
