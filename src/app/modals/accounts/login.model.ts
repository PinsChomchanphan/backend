import { Authentication } from "../../../configs/authentication";

export class LoginModel {

    public username: string;

    public password: string;

    public isPasswordValid: boolean;

    public isUsernameValid: boolean;

    public isFail: boolean;

    constructor() {
        this.username = '';
        this.password = '';
        this.resetModelState();
    }

    public isModelValid(): boolean {
        let isValid = true;
        this.resetModelState();
        if (!this.username.trim()) {
            this.isUsernameValid = false;
            isValid = false;
        }
        if (!this.password.trim()) {
            this.isPasswordValid = false;
            isValid = false;
        }
        return isValid;
    }

    public toFormData(): URLSearchParams {
        return Authentication.getLoginFormData(this.username, this.password);
    }

    private resetModelState() {
        this.isPasswordValid = true;
        this.isUsernameValid = true;
    }
}
