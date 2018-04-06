import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'app/component/shared/message/messageService.service';
import { CategoryListmodel } from '../../shared/model/category.model';
import { StateModel, StateService } from '../shared';
import { ServiceCategoryModel } from '../../serviceCategory/index';
@Component({
  selector: 'app-state-edit.component',
  templateUrl: './state-edit.component.html',
  styleUrls: ['./state-edit.component.css']
})
export class StateEditComponent implements OnInit {
  state: StateModel = new StateModel();
  moduleName = 'State';
  faIcon = 'fa fa-flag-o fa-fw';
  totalDB: number =0;
  isLoading: boolean;
  type:any;
  stateId: number;
  public errorMsg: Message[] = [];
  isValidForm: true;
  // serviceCategories: Array<ServiceCategoryModel> = [];
  restServiceUrl: string;
  messageModel:Message[]=[];
  constructor(
    public messageService: MessageService,
    public stateService: StateService,
    private router: Router,
    public route: ActivatedRoute
  ) {
    this.state.stateId = this.route.snapshot.params['stateId'] || 0;
    this.state.countryId = this.route.snapshot.params['countryId'] || 0;
    this.totalDB = this.route.snapshot.params['totalDB']
    if (this.state.stateId > 0) {
      this.getStateById(this.state.stateId);
    }
    // this.getServiceCategories();
  }

  ngOnInit() {
  }

  cancel(): void {
    this.router.navigate(['/state'], { queryParams: { countryId: this.state.countryId } });
  }

  async getStateById(stateId) {
    const result = await this.stateService.getStateById(stateId);
    this.state = result.data.Result;
    this.state.Header = 'Edit State';
    this.state.IconClass = 'fa fa-fw fa-plus txt-color-blue'
  }

  async saveState() {
    if (this.state.stateCode.trim() === '') {
      const message = { severity: 'error', summary: 'Error  Message', detail: 'Please Enter State Code' }
      this.messageService.showMessage(message);
      return
    }
    if (this.state.stateName.trim() === '') {
      const message = { severity: 'error', summary: 'Error  Message', detail: 'Please Enter State Name' }
      this.messageService.showMessage(message);
      return
    }


    const result = await this.stateService.saveState(this.state);
    if (result.data.Result) {
      this.router.navigate(['/state'], { queryParams: { countryId: this.state.countryId } });
    }

  }
}
