import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  constructor() {
  }

  public getCurrentUser() {
    if (localStorage.getItem('Authorization')) {
      return localStorage.getItem('Authorization');
    } else {
      return null;
    }
  }



  // public getUserDetail() {
  //   let user = this.getCurrentUser();
  //   if (user) {
  //     return user.User;
  //   }
  //   return null;
  // }

  public getAccessToken(): string {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      return currentUser;
    }
    return '';
  }



  public setCurrentUser(token) {
    localStorage.removeItem('Authorization');
    localStorage.setItem('Authorization', 'bearer'
      + ' ' + token.AccessToken);
    localStorage.setItem('userName', token.User.UserName);
    this.setCurrentUserDetail(token);

  }
  public setCurrentUserDetail(token) {
    localStorage.setItem('userId', token.User.UserId);

  }
  public getCurrentUserDetail() {
    return localStorage.getItem('userId');

  }

  public setCurrentCompnay(selectedCompany) {
    localStorage.setItem('companyId', selectedCompany.CompanyID)
  }

  public setCurrentSelectedTab(tab) {
    localStorage.setItem('selectedTab', tab);
  }

  public getCurrentSelectedTab() {
    return localStorage.getItem('selectedTab');
  }

  public getModuleName() {
    return localStorage.getItem('moduleName');
  }
  public getCompanyId() {
    return localStorage.getItem('companyId');
  }

  public getUserName() {
    return localStorage.getItem('userName');
  }

  public setModuleName(moduleName: string) {
    localStorage.setItem('moduleName', moduleName);
  }

  public getTopMenu() {
    if (localStorage.getItem('selectedTopMenu')) {
      return localStorage.getItem('selectedTopMenu');
    } else {
      return '';
    }
  }

  public setTopMenu(selectedTopMenu: string) {
    localStorage.setItem('selectedTopMenu', selectedTopMenu);
  }

  public removeLogin() {
    // remove user from local storage to log user out
    localStorage.removeItem('Authorization');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('moduleName');
    localStorage.removeItem('companyId');
    localStorage.removeItem('roleId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
  }
}
