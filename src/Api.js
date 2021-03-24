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