import { PermissionModel } from '../permissions/permissions.model';
import { PermissionHelper } from '../helpers/permission-helper';


export class AppUserModel {
    public name: string;
    public email: string;
    public permissions: Array<PermissionModel> = [];

    constructor(data?: any) {
        if (data) {
            this.cast(data);
        }
    }

    private cast(data) {
        this.name = data.name;
        this.email = data.email;
        this.permissions = PermissionHelper.serializePermissions(data.permissions);
    }
}
