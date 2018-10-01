import { Authentication } from '../../../configs/authentication';
import { DateHelper } from '../helpers/date-helper';

export class AppTokens {

    public accessToken: string;

    public refreshToken: string;

    public expiresIn: Date;

    constructor(data?: any) {
        this.accessToken = '';
        this.refreshToken = '';
        if (data) {
            this.cast(data);
        }
    }

    private cast(data) {
        this.accessToken = data['access_token'];
        if (data['refresh_token']) {
            this.refreshToken = data['refresh_token'];
        }
        if (data['expires_in']) {
            this.expiresIn = DateHelper.addSeconds(new Date(), parseInt(data['expires_in'], 10));
            if (Authentication.RENEW_TOKEN_BEFORE_EXPIRE_IN_MINUTES > 0) {
                this.expiresIn = DateHelper.addMinutes(this.expiresIn, -Authentication.RENEW_TOKEN_BEFORE_EXPIRE_IN_MINUTES);
            }
        } else {
            this.expiresIn = data.expiresIn;
        }
    }
}
