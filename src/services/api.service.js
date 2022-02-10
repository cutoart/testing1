import axios from "axios";
import Store from "../store/index";

var baseURL = "";
if (window.location.href.indexOf('marvelconnect')>=-1 || window.location.href.indexOf('localhost')>=-1)
baseURL = process.env.VUE_APP_API_URL;
else
baseURL = process.env.VUE_APP_API_URL1;
export default {
    async get(url, showLoader = true) {
        if (showLoader) Store.commit('showLoader');
        var getURL = baseURL + url;
        return await axios({ method: "POST", url: getURL })
            .then((res) => {
                Store.commit('hideLoader');
                return res;
            })
            .catch((error) => {
                Store.commit('hideLoader');
                return error;
            });
    },
    async getById(url, id, showLoader = true) {
        if (showLoader) Store.commit('showLoader');
        var getURL = baseURL + url;
        if (id != "" && id != null && id != undefined) {
            getURL = baseURL + url + "/" + id;
        }
        return await axios
            .get(getURL)
            .then((res) => {
                Store.commit('hideLoader');
                return res;
            })
            .catch((error) => {
                Store.commit('hideLoader');
                return error;
            });
    },
    async post(url, model, id, showLoader = true) {
        if (showLoader) Store.commit('showLoader');
        var apiurl = baseURL + url;
        if (id != null && id != undefined && id != "") {
            apiurl = baseURL + url + "/" + id;
        }
        return await axios
            .post(apiurl, model)
            .then((res) => {
                Store.commit('hideLoader');
                return res;
            })
            .catch((error) => {
                Store.commit('hideLoader');
                return error;
            });
    },
    async delete(url, req, showLoader = true) {
        if (showLoader) Store.commit('showLoader');
        var deleteURL = baseURL + url;
        return await axios
            .post(deleteURL, req)
            .then((res) => {
                Store.commit('hideLoader');
                return res;
            })
            .catch((error) => {
                Store.commit('hideLoader');
                return error;
            });
    },
};