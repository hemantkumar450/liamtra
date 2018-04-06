import { Injectable, OnInit } from '@angular/core';
import { Router, UrlSegment } from '@angular/router';
import { LocalStorageService } from '../core/service/local-storage.service';
@Injectable()

export class RouteService implements OnInit {
    roleId: Number;

    constructor(
        private localStorageService: LocalStorageService
    ) {

    }
    ngOnInit() {
    }

    topModuleMenus(moduleName) {
        let arr = [];
        switch (moduleName) {
            case 'serviceCategory':
                arr = [{ title: 'Sources', sref: 'serviceCategory', defaultMenu: '' }];
                break;
        }
        return arr;
    }

    topMenues() {
        return [
            {
                title: 'Service Category', name: 'serviceCategory', isActive: false, isShow: false, href: '/serviceCategory',
                iconClass: 'fa fa-lg fa-fw fa-database'
            },
            {
                title: 'User', name: 'user', isActive: false, isShow: false, href: '/user',
                iconClass: 'fa fa-lg fa-fw fa-user'
            },
            {
                title: 'System Constant', name: 'systemConstant', isActive: false, isShow: false, href: '/systemConstant',
                iconClass: 'fa fa-lg fa-fw fa-desktop'
            },
            {
                title: 'Service Type', name: 'serviceType', isActive: false, isShow: false, href: '/serviceType',
                iconClass: 'fa fa-lg fa-fw fa-shield'
            },
            {
                title: 'Country', name: 'country', isActive: false, isShow: false, href: '/country',
                iconClass: 'fa fa-lg fa-fw  fa-globe'
            },
            {
                title: 'State', name: 'state', isActive: false, isShow: false, href: '/state',
                iconClass: 'fa fa-lg fa-fw fa-flag-o'
            },
            {
                title: 'City', name: 'city', isActive: false, isShow: false, href: '/city',
                iconClass: 'fa fa-lg fa-fw fa-building'
            },
            {
                title: 'Review', name: 'review', isActive: false, isShow: false, href: '/review',
                iconClass: 'fa fa-lg fa-fw fa-building'
            },
            {
                title: 'CMS', name: 'CMS', isActive: false, isShow: false, href: '/cms',
                iconClass: 'fa fa-lg fa-fw fa-font-awesome'
            },
            {
                title: 'Hosted Unique Homes', name: 'uniqueHome', isActive: false, isShow: false, href: 'host/unique-home',
                iconClass: 'fa fa-lg fa-fw fa-font-awesome'
            },
            {
                title: 'Host Tour', name: 'host-tour', isActive: false, isShow: false, href: 'host/tour',
                iconClass: 'fa fa-lg fa-fw fa-font-awesome'
            },
            {
                title: 'Booked Unique Homes', name: 'booked-home', isActive: false, isShow: false, href: '/book/unique-home',
                iconClass: 'fa fa-lg fa-fw fa-font-awesome'
            }
        ]

    }

    selectTopMenu(selectedTpMenu) {
        const menus = this.topMenues();
        if (selectedTpMenu.length !== 0) {
            menus.map(res => {
                if (res.name === selectedTpMenu[0].path) {
                    res.isActive = true;
                } else {
                    res.isActive = false;
                }
            });
        }
        return this.setPermission(menus);

    }

    setPermission(menus) {

        menus.map(res => {
            this.roleId = +(localStorage.getItem('roleId'));
            if (res.name === 'serviceCategory') {
                res.isShow = true;
            }
            if (res.name === 'user') {
                res.isShow = true;
            }
            if (res.name === 'systemConstant') {
                res.isShow = true;
            }
            if (res.name === 'serviceType') {
                res.isShow = true;
            }
            if (res.name === 'country') {
                res.isShow = true;
            }
            if (res.name === 'city') {
                res.isShow = true;
            }
            if (res.name === 'state') {
                res.isShow = true;
            }
            if (res.name === 'review') {
                res.isShow = true;
            }
            if (res.name === 'CMS') {
                res.isShow = true;
            }
            if (res.name === 'uniqueHome') {
                res.isShow = true;
            }
            if (res.name === 'host-tour') {
                res.isShow = true;
            }
            if (res.name === 'booked-home') {
                res.isShow = true;
            }
        })
        return menus;
    }
}
