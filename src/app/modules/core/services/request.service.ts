import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { RequestSettings } from '../../../modals/requests/request-settings';
import { ObjectHelper, UrlHelper } from '../../../modals/helpers';
import { Authentication } from '../../../../configs/authentication';
import { AppTokens } from '../../../modals/authentications/app-token.model';
import { EndPointUser } from '../../../../configs/endpoints';
import { IResponse } from '../../../modals/responses/response';

@Injectable({
    providedIn: 'root',
})
export class RequestService {

    private baseUrl: string;

    private pendingRequest: Subscription;

    constructor(
        private http: HttpClient,
        private auth: AuthenticationService
    ) {
        this.baseUrl = environment.host;
    }

    public get(url: string, settings?: RequestSettings): Promise<any> {
        return this.beginRequest((resolve, reject) => {
            const options = this.getRequestOptions();
            this.doRequest
                (
                this.http.get(this.baseUrl + url, options),
                resolve,
                reject,
                settings
                );
        });
    }

    public post(url: string, data: any, settings?: RequestSettings): Promise<any> {
        return this.beginRequest((resolve, reject) => {
            const options = this.getRequestOptions();
            this.doRequest
                (
                this.http.post(this.baseUrl + url, ObjectHelper.toCapitalize(data), options),
                resolve,
                reject,
                settings
                );
        });
    }

    public formPost(url: string, data: URLSearchParams, settings?: RequestSettings): Promise<any> {
        return this.beginRequest((resolve, reject) => {
            const options = this.getFormOptions();
            this.doRequest
                (
                this.http.post(this.baseUrl + url, data.toString(), options),
                resolve,
                reject,
                settings
                );
        });
    }

    public patch(url: string, data: any, settings?: RequestSettings): Promise<any> {
        return this.beginRequest((resolve, reject) => {
            const options = this.getRequestOptions();
            this.doRequest
                (
                this.http.patch(this.baseUrl + url, ObjectHelper.toCapitalize(data), options),
                resolve,
                reject,
                settings
                );
        });
    }

    public put(url: string, data: any, settings?: RequestSettings): Promise<any> {
        return this.beginRequest((resolve, reject) => {
            const options = this.getRequestOptions();
            this.doRequest
                (
                this.http.put(this.baseUrl + url, ObjectHelper.toCapitalize(data), options),
                resolve,
                reject,
                settings
                );
        });
    }

    public delete(url: string, settings?: RequestSettings): Promise<any> {
        return this.beginRequest((resolve, reject) => {
            const options = this.getRequestOptions();
            this.doRequest
                (
                this.http.delete(this.baseUrl + url, options),
                resolve,
                reject,
                settings
                );
        });
    }

    public cancel() {
        if (this.pendingRequest) {
            this.pendingRequest.unsubscribe();
        }
    }

    private beginRequest(callback: Function) {
        return new Promise((resolve, reject) => {
            this.refreshToken(() => {
                callback(resolve, reject);
            });
        });
    }

    private doRequest(req: Observable<ArrayBuffer>, resolve, reject, settings: RequestSettings) {
        this.pendingRequest = this.requesting
            (
            req,
            resolve,
            reject,
            settings
            );
    }

    private requesting(req: Observable<ArrayBuffer>, resolve, reject, setting: RequestSettings): Subscription {
        return req.pipe(map((response) => ObjectHelper.toCamel(response)))
            .subscribe(
                (res) => {
                    this.onSuccess(res, resolve, setting);
                },
                (err) => {
                    this.onError(err, reject, setting);
                });
    }

    private refreshToken(callback: Function) {
        const expires = this.auth.getTokenExpires();
        const refreshToken = this.auth.getRefreshToken();
        const date = new Date();
        if (refreshToken && expires && date >= expires) {
            const options = this.getFormOptions();
            const data = Authentication.getRefreshTokenFormData(refreshToken);
            this.http.post(this.baseUrl + EndPointUser.Login, data.toString(), options)
                .pipe(map((response) => ObjectHelper.toCamel(response)))
                .subscribe(
                    (res) => {
                        const tokens = new AppTokens(res);
                        this.auth.saveToken(tokens);
                        setTimeout(() => callback());
                    },
                    (err) => {
                        if (err.error && err.error.error_description === 'The specified refresh token is invalid.') {
                            this.redirectToLogin();
                        } else {
                            callback();
                        }
                    });
        } else {
            callback();
        }
    }

    private onSuccess(response: IResponse, callback: Function, setting?: RequestSettings) {
        console.log(response);
        if (setting && setting.serializer && typeof setting.serializer === 'function') {
            response = setting.serializer(response.data);
        }

        setTimeout(() => callback(response),
            environment.lazyTimeMs);
    }

    private onError(response: any, callback: Function, setting?: RequestSettings) {
        if (setting && setting.isCustomErrorHandle) {
            try {
                callback(ObjectHelper.toCamel(response));
            } catch (err) {
                callback(response);
            }
        } else {
            this.errorHandler(response, callback);
        }
    }

    private errorHandler(response: any, callback: Function): void {
        let errorResponseObject = response;
        if (response.statusText === 'Unknown Error') {
            console.log(response.statusText);
        } else {
            errorResponseObject = this.extractErrorBody(response);
            if (errorResponseObject && errorResponseObject.length) {
                let message = errorResponseObject.join(',');
                console.log(message);
            } else {
                errorResponseObject = response;
                console.log(errorResponseObject);
            }
        }

        setTimeout(() => callback(errorResponseObject),
            environment.lazyTimeMs);
    }

    private extractErrorBody(res: any): Array<any> {
        console.log(res);
        if (res.error && res.error.errors) {
            return res.error.errors;
        }
        return null;
    }

    private redirectToLogin() {
        this.auth.removeToken();
        location.href = UrlHelper.loginUrl();
    }

    private getRequestOptions(): any {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        const token = this.auth.getAcessToken();
        if (token) {
            httpOptions.headers = httpOptions.headers.append('Authorization', 'Bearer ' + token);
        }
        return httpOptions;
    }

    private getFormOptions(): any {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        };
        const token = this.auth.getAcessToken();
        if (token) {
            httpOptions.headers = httpOptions.headers.append('Authorization', 'Bearer ' + token);
        }
        return httpOptions;
    }
}
