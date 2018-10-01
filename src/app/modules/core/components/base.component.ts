import { OnDestroy } from '@angular/core';
import { SubscribeModel } from '../../../modals/subscribes/subscribe.model';
import { AppUserModel } from '../../../modals/users/app-user.model';


export class BaseComponent implements OnDestroy {

    public user: AppUserModel;

    private loginSubscribe: SubscribeModel;

    constructor(public userService: UserService) {
        this.user = userService.getCurrentUserSync();
        this.loginWatch();
    }

    public ngOnDestroy() {
        if (this.loginSubscribe) {
            this.loginSubscribe.unsubscribe();
        }
    }

    private loginWatch() {
        this.loginSubscribe = this.userService.subscribeUserLogin(() => {
            this.user = this.userService.getCurrentUserSync();
        });
    }
}
