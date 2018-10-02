
import { UserViewModel, AppUserModel } from '../../../modals/users';
import { Injectable } from '@angular/core';
import { SubscribeModel } from '../../../modals/subscribes/subscribe.model';
import { RequestService } from './request.service';
import { ServiceEndpoints } from '../../../modals/endpoints/service-endpoints.model';
import { RequestSettings } from '../../../modals/requests/request-settings';
import { BaseService } from './base.service';
import { EndPointUser } from '../../../../configs/endpoints';
import { StringHelper } from '../../../modals/helpers/string-helper';
import { IService } from './interface.service';
import { ForgetPasswordModel, RecoveryPasswordModel } from '../../../modals/accounts';

@Injectable({
    providedIn: 'root',
})
export class UserService extends BaseService<UserViewModel> implements IService<UserViewModel> {

    private user: AppUserModel;

    private onLoginSubscribes: Array<SubscribeModel> = [];

    constructor(public request: RequestService) {
        super(request, new ServiceEndpoints({
            get: '',
            getAll: EndPointUser.GetAllUsers,
            create: EndPointUser.CreateUser,
            update: '',
            delete: '',
        }), UserViewModel.makeList);
    }

    public getCurrentUserAsync(): Promise<AppUserModel> {
        return new Promise((resolve, reject) => {
            this.request.get(
                EndPointUser.GetCurrentUser,
                new RequestSettings({
                    isCustomErrorHandle: true
                }
                )).then((res) => {
                    this.user = new AppUserModel(res);
                    this.broadcastOnLogin();
                    resolve(this.user);
                }).catch((err) => {
                    reject(err);
                });
        });
    }


    public recoveryPassword(model: ForgetPasswordModel): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.request.post(EndPointUser.RecoveryPassword, model).then(() => {
                resolve(true);
            }).catch(() => {
                reject(false);
            });
        });
    }

    public resetPassword(model: RecoveryPasswordModel): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.request.post(EndPointUser.ResetPassword, model).then(() => {
                resolve(true);
            }).catch(() => {
                reject(false);
            });
        });
    }

    public getCurrentUserSync(): AppUserModel {
        return this.user;
    }

    public removeUser() {
        this.user = null;
    }

    public subscribeUserLogin(callback: Function): SubscribeModel {
        const id = StringHelper.randomString();
        const subscribe = new SubscribeModel({
            id: id,
            callback: callback,
            unsubscribe: () => {
                this.unsubscribeOnLogin(id);
            }
        });
        this.onLoginSubscribes.push(subscribe);
        return subscribe;
    }

    private broadcastOnLogin() {
        for (let i = 0; i < this.onLoginSubscribes.length; i++) {
            this.onLoginSubscribes[i].callback();
        }
    }

    private unsubscribeOnLogin(id: string) {
        let index = -1;
        for (let i = 0; i < this.onLoginSubscribes.length; i++) {
            if (this.onLoginSubscribes[i].id === id) {
                index = i;
            }
        }
        if (index > -1) {
            this.onLoginSubscribes.splice(index, 1);
        }
    }
}
