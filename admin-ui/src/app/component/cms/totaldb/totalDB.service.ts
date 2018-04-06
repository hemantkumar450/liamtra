// import { Http, Headers, RequestOptions, BaseRequestOptions, Response } from '@angular/http';
// // import { ResetPasswordModel } from '../../reset-password/reset-password.model';
// import { Injectable } from '@angular/core';
// import 'rxjs/Rx';
// import { Component, OnInit } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
// import { Action, Store } from '@ngrx/store';
// export const SETTINGS_UPDATE = 'SETTINGS_UPDATE';

// export interface SettingsStore {
//     totalDB: number;
// }
// export interface AppStore {
//     settings: SettingsStore;
// }
// @Injectable()

// export class TotalService {

//     totalDB: Observable<SettingsStore>;

//     constructor(private store: Store<AppStore>) {
//         this.totalDB = this.store.select('settings');
//     }

//     public update(payload) {
//         this.store.dispatch({ type: SETTINGS_UPDATE, payload });
//     }

// }
