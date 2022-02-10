import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const API_URL = process.env.VUE_APP_API_URL;

const state = {
  sidebarShow: "responsive",
  sidebarMinimize: false,
  apiURL: API_URL,
  status: "",
  token: localStorage.getItem("token") || "",
  user: {},
  regstatus: "",
  regtoken: localStorage.getItem("regtoken") || "",
  reglogin: {},
  loader: false,
  projecttitle: "Fedstorage",
  language: "chinese",
  navItems: {},
  resource: null,
};

const userInfo = {};
const regUserInfo = {};

const mutations = {
  toggleSidebarDesktop(state) {
    const sidebarOpened = [true, "responsive"].includes(state.sidebarShow);
    state.sidebarShow = sidebarOpened ? false : "responsive";
  },
  toggleSidebarMobile(state) {
    const sidebarClosed = [false, "responsive"].includes(state.sidebarShow);
    state.sidebarShow = sidebarClosed ? true : "responsive";
  },
  set(state, [variable, value]) {
    state[variable] = value;
  },
  auth_request(state) {
    state.status = "loading";
  },
  auth_success(state, token, user) {
    state.status = "success";
    state.token = token;
    state.user = user;
  },
  auth_error(state) {
    state.status = "error";
  },
  logout(state) {
    state.status = "";
    state.token = "";
  },
  showLoader(state) {
    state.loader = true;
  },
  hideLoader(state) {
    state.loader = false;
  },
  setLanguage(state, language) {
    state.language = language;
  },
  setNavItems(state, navItems) {
    state.navItems = navItems;
  },
  setResource(state, resource) {
    state.resource = resource;
  },
  setUserInfo(state, userId) {
    state.userInfo.userId = userId;
  },
  setUserType(state, type) {
    state.userInfo.userType = type;
  },
  setUserName(state, name) {
    state.userInfo.userName = name;
  },
  //userlogin
  auth_request_user(state) {
    state.regstatus = "loading";
  },
  auth_success_user(state, regtoken, reglogin) {
    state.regstatus = "success";
    state.regtoken = regtoken;
    state.reglogin = reglogin;
  },
  auth_error_user(state) {
    state.regstatus = "error";
  },
  logout_user(state) {
    state.regstatus = "";
    state.regtoken = "";
  },
  setUserInfo_user(state, userId) {
    state.regUserInfo.userId = userId;
  },
  setUserType_user(state, type) {
    state.regUserInfo.userType = type;
  },
  setUserName_user(state, name) {
    state.regUserInfo.userName = name;
  },
  setUserEmail_user(state, email) {
    state.regUserInfo.userEmail = email;
  },
  setUserAddress_user(state, address) {
    state.regUserInfo.userAddress = address;
  },
  setUserRegion_user(state, region) {
    state.regUserInfo.userRegion = region;
  },
};

export default new Vuex.Store({
  state: state,
  mutations,
  plugins: [
    createPersistedState({
      paths: ["userInfo", "regUserInfo", "language", "navItems", "resource"],
    }),
  ],
  modules: {
    userInfo,
    regUserInfo,
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({ url: state.apiURL + "/login", data: user, method: "POST" })
          .then((resp) => {
            const token = resp.data.token;
            const user = resp.data;
            const userId = resp.data._id;
            const userType = resp.data.type;
            const name = resp.data.loginId;
            localStorage.setItem("token", token);
            commit("setUserInfo", userId);
            commit("setUserType", userType);
            commit("setUserName", name);
            // Add the following line:
            axios.defaults.headers.common["Authorization"] = token;
            commit("auth_success", token, user);
            resolve(resp);
          })
          .catch((err) => {
            commit("auth_error");
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit("logout");
        localStorage.removeItem("eUid");
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    },
    userlogin({ commit }, reglogin) {
      return new Promise((resolve, reject) => {
        commit("auth_request_user");
        axios({
          url: state.apiURL + "/Userlogin",
          data: reglogin,
          method: "POST",
        })
          .then((resp) => {
            const regtoken = resp.data.token;
            const userId = resp.data._id;
            const userType = resp.data.type;
            const name = resp.data.firstName + " " + resp.data.lastName;
            const address = resp.data.address;
            const region = resp.data.region;
            localStorage.setItem("regtoken", regtoken);
            commit("setUserInfo_user", userId);
            commit("setUserType_user", userType);
            commit("setUserName_user", name);
            commit("setUserAddress_user", address);
            commit("setUserRegion_user", region);
            commit("setUserEmail_user", resp.data.email);
            axios.defaults.headers.common["Authorization"] = regtoken;
            commit("auth_success_user", regtoken, resp.data);
            resolve(resp);
          })
          .catch((err) => {
            commit("auth_error_user");
            localStorage.removeItem("regtoken");
            reject(err);
          });
      });
    },
    userlogout({ commit }) {
      return new Promise((resolve) => {
        commit("logout_user");
        localStorage.removeItem("ULid");
        commit("setUserInfo_user", "");
        localStorage.removeItem("regtoken");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    isRegLoggedIn: (state) => !!state.regtoken,
    authStatus: (state) => state.status,
  },
});
