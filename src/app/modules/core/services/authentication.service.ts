import { Injectable } from '@angular/core';
import { AppTokens } from '../../../modals/authentications/app-token.model';


@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {

    private appTokens: AppTokens;

    private storageKey = 'authorization';


    private recoveryEmail: string;

    constructor() {
        this.revokeTokens();
    }

    public saveToken(tokens: AppTokens) {
        this.appTokens = tokens;
        this.storeTokens();
    }

    public getAcessToken(): string {
        if (this.appTokens && this.appTokens.accessToken) {
            return this.appTokens.accessToken;
        }
        return '';
    }

    public getTokenExpires(): Date {
        if (this.appTokens && this.appTokens.expiresIn) {
            return this.appTokens.expiresIn;
        }
        return null;
    }

    public getRefreshToken(): string {
        if (this.appTokens && this.appTokens.refreshToken) {
            return this.appTokens.refreshToken;
        }
        return null;
    }

    public removeToken() {
        this.appTokens = null;
        localStorage.removeItem(this.storageKey);
    }

    public setRecoveryEmail(email: string) {
        this.recoveryEmail = email;
    }

    public getRecoveryEmail(): string {
        if (this.recoveryEmail) {
            return this.recoveryEmail;
        }
        return '';
    }

    private revokeTokens() {
        if (localStorage && localStorage.getItem) {
            const tokensString = localStorage.getItem(this.storageKey);
            if (tokensString) {
                const tokens = tokensString.split(':');
                if (tokens.length === 3) {
                    this.appTokens = new AppTokens({
                        access_token: tokens[0],
                        refresh_token: tokens[1],
                        expiresIn: new Date(parseInt(tokens[2], 10))
                    });
                }
            }
        }
    }

    private storeTokens() {
        if (localStorage && localStorage.setItem) {
            localStorage.setItem(
                this.storageKey,
                this.appTokens.accessToken + ':' + this.appTokens.refreshToken + ':' + this.appTokens.expiresIn.valueOf()
            );
        }
    }
}
