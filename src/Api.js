import Swal from "sweetalert2";
import {
    useRouter
} from 'vue-router'
import store from "./vuex"
const BASE_URL = "http://127.0.0.2:8000/api/";
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
    async tokenChecker() {
        const router = useRouter();
        let res
        this.getData("token_checker").then(() => res = true).catch((error) => {
            res = false
            localStorage.removeItem("siperas_key");
            store.dispatch("resetState");
            router.push({
                name: "landing"
            });
        })
        return res
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
    async getData(url = "") {
        let response = await fetch(BASE_URL + url, {
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
    }
}