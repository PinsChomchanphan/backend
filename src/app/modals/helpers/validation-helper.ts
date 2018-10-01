export class ValidationHelper {

    static isValidEmail(email: string): boolean {
        // tslint:disable-next-line:max-line-length
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    static isValidPassword(password: string) {
        const re = /^(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/;
        return re.test(String(password));
    }
}
