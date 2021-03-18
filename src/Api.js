const BASE_URL = "http://127.0.0.1:8000/api/";
let myHeaders = new Headers();
let token = localStorage.siperas_key
if (token) {
    myHeaders.append("Authorization", `Bearer ${token}`);
}
myHeaders.append("Content-Type", "application/json");
myHeaders.append("charset", "utf-8");
export default {
    async postData(url = "", data = {}) {
        let response = await fetch(BASE_URL + url, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(data),
        }).then(async (res) => {
            if (!res.ok) {
                let error = await res.json();
                return Promise.reject(error);
            } else {
                let data = await res.json();
                return Promise.resolve(data);
            }
        })
        return response;
    }
}