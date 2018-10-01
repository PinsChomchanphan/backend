import { PermissionRole } from './permission-role.model';
import { PermissionAction } from './permission-action.model';

export class RoutePermissionModel {
    public permission: PermissionRole;
    public actions: Array<PermissionAction> = [];

    constructor(data: any) {
        if (data) {
            this.cast(data);
        }
    }

    private cast(data) {
        this.permission = data.permission;
        this.actions = data.actions;
    }
}
