import Swal from "sweetalert2";
import {
    useRouter
} from 'vue-router'
import store from "./vuex"
const BASE_URL = "http://127.0.0.1:8000/api/";
let headersApi = new Headers();
let token = localStorage.siperas_key
if (token)
    headersApi.append("Authorization", `Bearer ${token}`);
headersApi.append("Content-Type", "application/json");
headersApi.append("charset", "utf-8");
export default {
    setHeaders(token) {
        headersApi.append("Authorization", `Bearer ${token}`)
    },
    deleteAuthorization() {
        headersApi.delete("Authorization");
    },
    async tokenChecker() {
        const router = useRouter();
        this.getData("token_checker").catch((error) => {
            headersApi.delete("Authorization");
            Swal.fire(error.message, '', 'error')
            localStorage.removeItem("siperas_key");
            store.dispatch("resetState");
            router.push({
                name: "landing"
            });
        })
    },
    async postData(url = "", data = {}) {
        let response = await fetch(BASE_URL + url, {
            method: "POST",
            headers: headersApi,
            body: JSON.stringify(data),
        }).then(async (res) => {
            let data = await res.json();
            if (res.ok) {
                return Promise.resolve(data);
            } else {
                return Promise.reject(data);
            }
        })
        return response;
    },
    async getData(url = "", raw) {
        const uri = raw ? url : BASE_URL + url;
        let response = await fetch(uri, {
            method: "GET",
            headers: headersApi
        }).then(async res => {
            let data = await res.json();
            if (res.ok) {
                return Promise.resolve(data);
            } else {
                return Promise.reject(data);
            }
        })
        return response;
    },
    async deleteData(url = "", logout = null) {
        let response = await fetch(BASE_URL + url, {
            method: "DELETE",
            headers: headersApi
        }).then(async res => {
            let data = await res.json();
            if (res.ok) {
                return Promise.resolve(data);
            } else {
                return Promise.reject(data);
            }
        })
        if (logout) {
            headersApi.delete("Authorization");
        }
        return response;
    },
    async putData(url = "", data = {}) {
        let response = await fetch(BASE_URL + url, {
            method: "PUT",
            headers: headersApi,
            body: JSON.stringify(data),
        }).then(async (res) => {
            let data = await res.json();
            if (res.ok) {
                return Promise.resolve(data);
            } else {
                return Promise.reject(data);
            }
        })
        return response;
    },
}