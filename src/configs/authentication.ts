import { environment } from 'src/environments/environment';

export class Authentication {

    public static readonly GRANT_PASSWORD = 'password';
    public static readonly GRANT_REFRESH_TOKEN = 'refresh_token';
    public static readonly GRANT_SCOPE = 'offline_access profile email roles';
    public static readonly RENEW_TOKEN_BEFORE_EXPIRE_IN_MINUTES = 10;

    public static getLoginFormData(username: string, password: string): URLSearchParams {
        const data = new URLSearchParams();
        data.set('username', username);
        data.set('password', password);
        data.set('grant_type', this.GRANT_PASSWORD);
        data.set('scope', this.GRANT_SCOPE);
        data.set('resource', environment.host);
        return data;
    }

    public static getRefreshTokenFormData(refreshToken: string): URLSearchParams {
        const data = new URLSearchParams();
        data.set('grant_type', this.GRANT_REFRESH_TOKEN);
        data.set('scope', this.GRANT_SCOPE);
        data.set('refresh_token', refreshToken);
        data.set('resource', environment.host);
        return data;
    }
}
