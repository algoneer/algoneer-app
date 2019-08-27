
function urlEncode(data){
    if (data && typeof data === 'object') {
        return Object.keys(data).map(function (key) {
            return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
        }).join('&');
    }
    return null;
}

export default class BaseApi {

    constructor(settings){
        this.settings = settings;
    }

    get version(){
        return 'v1/';
    }

    get storage(){
        return localStorage;
    }

    get csrfToken(){
        return this.storage.getItem('csrf-token');
    }

    set csrfToken(value){
        return this.storage.setItem('csrf-token', value);
    }

    get accessToken(){
        return this.storage.getItem('access-token');
    }

    set accessToken(value){
        if (value === null || value === undefined)
            this.storage.removeItem('access-token');
        else
            this.storage.setItem('access-token', value);
    }

    get baseUrl() {
        return this.settings.get(['algonautUrl']);
    }

    url(url){
        return this.baseUrl+'/'+this.version+url;
    }

    authenticatedRequest(opts) {
        if (opts.headers === undefined)
            opts.headers = {};
        opts.headers['Authorization'] = 'Bearer '+this.accessToken;
        return this.request(opts);
    }

    request(opts) {

        const getUrl = (url) => this.url(url);

        const normalize = (data) => {
            if (data.errors === undefined)
                data.errors = {};
            return data;
        };

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            const params = urlEncode(opts.params);
            const url = getUrl(opts.url);
            xhr.open(opts.method, url+(params !== null ? '?'+params : ''));

            xhr.onload = () => {
                const contentType = xhr.getResponseHeader('content-type').trim();
                if (/^application\/json(;.*)?$/i.exec(contentType) === null)
                    reject({
                        status: xhr.status,
                        message: 'not a JSON response',
                        errors: {},
                    });
                const data = normalize(JSON.parse(xhr.response));
                data.status = xhr.status;
                if (xhr.status >= 200 && xhr.status < 300)
                    resolve(data);
                else{
                    reject(data);
                }
            };
            xhr.onerror = () => {
                reject({
                    status: xhr.status,
                    message: xhr.statusText || this.settings.t(['api', 'request-failed']),
                    errors: {},
                });
            };
            if (opts.headers) {
                Object.keys(opts.headers).forEach((key) => {
                    xhr.setRequestHeader(key, opts.headers[key]);
                });
            }
            const data = opts.data;
            const json = opts.json;

            const cb = () => {
                if (data !== undefined){
                    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    xhr.send(urlEncode(data));
                } else if (json !== undefined){
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.send(JSON.stringify(json));
                } else {
                    xhr.send();
                }
            };

            if (this.settings.get('env') === 'development'){
                // we slow down all API requests in dev mode, which makes it
                // easier to develop consistent state handling and see glitches
                setTimeout(cb, 1000);
            } else {
                cb();
            }
        });
    }

}
