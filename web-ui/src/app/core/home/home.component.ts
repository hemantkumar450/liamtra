import { Component, OnInit } from '@angular/core';
import { CoreService, CMSModel } from '../shared';
import { CmsSystemEnum } from '../../shared/enum/cms-sytem-enum';
import { LoaderService } from '../loader';
export enum divCmsId {
  div1 = 8,
  div2 = 9,
  div3 = 10,
  div4 = 11,
  div5 = 12,

  div2Title = 48,
  div3Title = 49,
  div4Title = 50,
  div5Title = 51,
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {

  cmsData: Array<CMSModel> = new Array<CMSModel>();
  div1: CMSModel = new CMSModel();
  div2: CMSModel = new CMSModel();
  div3: CMSModel = new CMSModel();
  div4: CMSModel = new CMSModel();
  div5: CMSModel = new CMSModel();

  div2Title: CMSModel = new CMSModel();
  div3Title: CMSModel = new CMSModel();
  div4Title: CMSModel = new CMSModel();
  div5Title: CMSModel = new CMSModel();

  constructor(private coreService: CoreService,
    private loaderService: LoaderService) {
  }

  ngOnInit() {
    this.getIndex();
  }

  async getIndex() {
    try {
      this.loaderService.show();
      const response = await this.coreService.cmsResultById(CmsSystemEnum.Index);
      this.cmsData = response.data.Result;
      this.cmsData.forEach(item => {
        if (item) {
          if (item.sysConstantId === divCmsId.div1) {
            this.div1 = item;
          }
          if (item.sysConstantId === divCmsId.div2) {
            this.div2 = item;
          }
          if (item.sysConstantId === divCmsId.div3) {
            this.div3 = item;
          }
          if (item.sysConstantId === divCmsId.div4) {
            this.div4 = item;
          }
          if (item.sysConstantId === divCmsId.div5) {
            this.div5 = item;
          }

          if (item.sysConstantId === divCmsId.div2Title) {
            this.div2Title = item;
          }
          if (item.sysConstantId === divCmsId.div3Title) {
            this.div3Title = item;
          }
          if (item.sysConstantId === divCmsId.div4Title) {
            this.div4Title = item;
          }
          if (item.sysConstantId === divCmsId.div5Title) {
            this.div5Title = item;
          }
        }
      });
      this.loaderService.hide();
      // console.log(this.cmsData);
    } catch (e) {
      // console.log(e);
      this.loaderService.hide();
    }

  }

}
