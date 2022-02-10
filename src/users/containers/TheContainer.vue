<template>
  <div class="">
    <notifications animation-type="velocity" />
    <div id="loading-overlay" v-show="$store.state.loader == true">
      <div id="loading-wrapper">
        <CSpinner color="primary" style="width: 4rem; height: 4rem" />
        <!-- <div id="loading-title">Loading</div> -->
      </div>
    </div>
    <vue-confirm-dialog></vue-confirm-dialog>
    <!-- <CWrapper> -->
    <TheHeader
      v-on:loginmodalvalue="
        loginmodal ? (loginmodal = false) : (loginmodal = true)
      "
    />
    <transition name="fade">
      <router-view
        v-on:loginmodalvalue="
          loginmodal ? (loginmodal = false) : (loginmodal = true)
        "
        v-on:paymentprocess="paymentprocessmodal = true"
        v-on:paymentprocesshide="paymentprocessmodal = false"
        v-on:changepassword="changemodal('changepassword')"
        :loginsuccess="loginsuccess"
      ></router-view>
    </transition>
    <div>
      <CCol col="2" v-if="registermodal">
        <CModal
          size="xl"
          :title="$store.state.resource.container.registermodaltitle"
          name="registermodal"
          :show.sync="registermodal"
        >
          <RegisterModal v-on:loginmodalvalue="changemodal('login')" />
        </CModal>
      </CCol>
      <CCol col="2" v-if="loginmodal">
        <CModal
          size="xl"
          :title="$store.state.resource.container.loginmodaltitle"
          name="loginmodal"
          :show.sync="loginmodal"
        >
          <LoginModal
            :ShowPopup.sync="loginmodal"
            v-on:registermodalvalue="changemodal('register')"
            v-on:forgotpasswordmodalvlaue="changemodal('forgotpassword')"
            v-on:loginsuccess="loginsuccess = true"
          />
        </CModal>
      </CCol>
      <CCol col="2" v-if="forgotpasswordmodal">
        <CModal
          size="xl"
          :title="$store.state.resource.container.forgotpasswordmodaltitle"
          name="forgotpasswordmodal"
          :show.sync="forgotpasswordmodal"
        >
          <ForgotPasswordModal
            :ShowPopup.sync="forgotpasswordmodal"
            v-on:loginmodalvalue="changemodal('login')"
          />
        </CModal>
      </CCol>
      <CCol col="2" v-if="changepasswordmodal">
        <CModal
          size="xl"
          :title="$store.state.resource.container.changepasswordmodaltitle"
          name="changepasswordmodal"
          :show.sync="changepasswordmodal"
        >
          <ChangePasswordModal
            :ShowPopup.sync="changepasswordmodal"
            v-on:loginmodalvalue="changemodal('login')"
          />
        </CModal>
      </CCol>
      <CCol col="2" v-if="paymentprocessmodal">
        <CModal
          size="xl"
          title=" Payment inprogress... "
          name="paymentprocessmodal"
          id="paymentprocessmodal"
          :show.sync="paymentprocessmodal"          
          :closeOnBackdrop="false"
        >
          <PaymentProcessModal />
        </CModal>
      </CCol>
    </div>
    <TheFooter />
    <!-- </CWrapper> -->
  </div>
</template>

<script>
import TheHeader from "./TheHeader";
import TheFooter from "./TheFooter";
import "../assets/css/bootstrap.css";
import "../assets/css/style.css";
import "../assets/css/boxicons.min.css";
import "../assets/css/bootstrap-select.css";
//import "../assets/css/slick-theme.css";
import "../assets/css/slick.css";
import "../assets/css/googlefont.css";
import RegisterModal from "../views/RegisterModal";
import LoginModal from "../views/LoginModal";
import ForgotPasswordModal from "../views/ForgotPasswordModal";
import ChangePasswordModal from "../views/ChangePaswordModal";
import PaymentProcessModal from "../views/PaymentProcessModal";
// import "../";

export default {
  name: "TheContainer",
  components: {
    TheHeader,
    TheFooter,
    RegisterModal,
    LoginModal,
    ForgotPasswordModal,
    ChangePasswordModal,
    PaymentProcessModal,
  },
  data() {
    return {
      registermodal: false,
      loginmodal: false,
      forgotpasswordmodal: false,
      changepasswordmodal: false,
      loginsuccess: false,
      paymentprocessmodal: false,
    };
  },
  methods: {
    changemodal(type) {
      this.loginmodal = false;
      this.registermodal = false;
      this.forgotpasswordmodal = false;
      this.changepasswordmodal = false;
      if (type == "login") {
        this.loginmodal = true;
      } else if (type == "register") {
        this.registermodal = true;
      } else if (type == "forgotpassword") {
        this.forgotpasswordmodal = true;
      } else if (type == "changepassword") {
        this.changepasswordmodal = true;
      }
    },
  },
};
</script>
<style scoped>
#loading-overlay {
  /* display: none; */
  position: fixed;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  background-color: rgba(255, 255, 255, 0.8);
  justify-content: center;
  align-items: center;
  z-index: 3300;
}

#loading-wrapper {
  padding-bottom: 6rem;
}

#loading-overlay {
  display: flex;
}
</style>
