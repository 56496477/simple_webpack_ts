import axios from 'axios';

class requestHttp {

    constructor() {
        this.$http = axios.create();
        this.$http.interceptors.response.use(this.responseInterceptors, this.errorInterceptors);
    }

    responseInterceptors(config) {
        return config.data;
    }

    errorInterceptors(error){
        return Promise.reject(error);
    }

    get = (...args) => this.$http.get(...args);

    post = (...args) => this.$http.post(...args);

    put = (...args) => this.$http.put(...args);

    delete = (...args) => this.$http.delete(...args);

}

export default new requestHttp;