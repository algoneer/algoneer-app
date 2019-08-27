export default class BaseApi {
    constructor(settings) {
        this.settings = settings;
    }

    get storage() {
        return localStorage;
    }

    get csrfToken() {
        return this.storage.getItem('csrf-token');
    }

    set csrfToken(value) {
        return this.storage.setItem('csrf-token', value);
    }

    get accessToken() {
        return this.storage.getItem('access-token');
    }

    set accessToken(value) {
        if (value === null || value === undefined)
            this.storage.removeItem('access-token');
        else
            this.storage.setItem('access-token', value);
    }

}
