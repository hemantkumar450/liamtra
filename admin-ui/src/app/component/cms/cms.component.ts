import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CmsListModel } from './shared/cms.model';
import { TableHeaderComponent } from '../shared/tableHeader/tableHeader.component';
import { CmsService } from './shared/cms.service';
@Component({
  selector: 'app-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.css']
})
export class CmsComponent implements OnInit {


  public cmsList: Array<CmsListModel> = new Array<CmsListModel>();
  totalDB: number;
  moduleName = 'CMS';
  addFunctionName = 'CMS';
  faIcon = 'fa fa-lg fa-fw fa-font-awesome';
  @ViewChild(TableHeaderComponent) searchInput: TableHeaderComponent;
  gb: any;
  messageModal: any
  constructor(private router: Router, private cmsService: CmsService) {
    // this.base = new CmsCommonBaseComponent();
  }

  ngOnInit() {
    this.gb = this.searchInput._gb.nativeElement;
    this.getCmsList();
  }

  async getCmsList() {
    const response = await this.cmsService.getCmsList();
    this.cmsList = response.data.Result;
    this.totalDB = response.data.Result.length; // count of the array list
  }
  editCms(cmsDetail: CmsListModel): void {
    this.router.navigate(['cms/Entry/' + cmsDetail.cmsId]);
  }
  addCms(event): void {
    this.router.navigate(['cms/AddNew']);
  }

}
