import { PermissionRole } from './permission-role.model';

export class PermissionModel {
    public role: PermissionRole;
    public read: boolean;
    public create: boolean;
    public update: boolean;
    public delete: boolean;
}
