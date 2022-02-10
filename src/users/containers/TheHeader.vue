<template>
  <div>
    <b-navbar
      toggleable="xl"
      type="light"
      variant="info"
      style="background-color: #ffffff !important; flex-direction: row"
      v-if="$store.state.resource != null"
    >
      <b-navbar-brand>
        <router-link class="navbar-brand" :to="{ name: 'Home' }"
          ><img
            src="/assets/images/logo.png"
            class="custom-logo"
            alt=""
            itemprop="logo"
            style="padding-left: 40px; height: 55px" /></router-link
      ></b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item class="nav-link fSize" :to="{ name: 'SelfStorage' }"
            >{{ $store.state.resource.header.selfstorage }}
          </b-nav-item>
          <b-nav-item class="nav-link fSize" :to="{ name: 'BoxStorage' }">{{
            $store.state.resource.header.boxstorage
          }}</b-nav-item>
          <b-nav-item class="nav-link fSize" :to="{ name: 'AboutUs' }"
            >{{ $store.state.resource.header.aboutus }}
          </b-nav-item>
          <b-nav-item class="nav-link fSize" :to="{ name: 'Promotion' }"
            >{{ $store.state.resource.header.promotion }}
          </b-nav-item>
          <b-nav-item class="nav-link fSize" :to="{ name: 'NewsandActivities' }"
            >{{ $store.state.resource.header.newsandactivities }}
          </b-nav-item>
          <b-nav-item class="nav-link fSize" :to="{ name: 'FAQ' }"
            >{{ $store.state.resource.header.faq }}
          </b-nav-item>
          <b-nav-item class="nav-link fSize" :to="{ name: 'ContactUs' }">
            {{ $store.state.resource.header.contactus }}
          </b-nav-item>
          <b-nav-item
            class="nav-link"
            v-on:click="$emit('loginmodalvalue')"
            href="#"
            v-if="
              $store.state.regUserInfo.userId == '' ||
              $store.state.regUserInfo.userId == null
            "
          >
            {{ $store.state.resource.header.login }}
            <span v-show="false">
              {{ $store.state.regUserInfo.userId }}
            </span>
          </b-nav-item>
          <b-nav-item
            class="nav-link"
            v-if="
              $store.state.regUserInfo.userId != '' &&
              $store.state.regUserInfo.userId != null
            "
            :to="{ name: 'Userinfo' }"
          >
            {{ $store.state.resource.header.myaccount }}
          </b-nav-item>
          <div id="btnlang" class="mt-auto mb-auto">
            <b-button
              size="sm"
              class="my-2 my-sm-0 lan"
              v-if="$store.state.language != 'english'"
              @click="getLanguage('english', true)"
            >
              EN
            </b-button>
            <b-button
              size="sm"
              class="my-2 my-sm-0 lan"
              v-if="$store.state.language != 'chinese'"
              @click="getLanguage('chinese', true)"
            >
              CH
            </b-button>
          </div>
        </b-navbar-nav>
        <div class="buttonsection">
          <div class="phoneno----login">
            <b-button class="phone"
              ><i class="bx bxs-phone des1"></i
              ><a href="tel:2633 3335" style="color: #ffffff;font-size:18px"
                >2633 3335
              </a></b-button
            >
          </div>
          <div class="phoneno----login1">
            <b-button class="book-now">
              <a
                v-on:click="booknow()"
                style="cursor: pointer; color: #ffffff; padding-right: 12px;font-size:18px"
              >
                {{ $store.state.resource.header.booknow }}</a
              >
            </b-button>
          </div>
        </div>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import APIService from "@/services/api.service.js";
import Store from "@/store/index";

export default {
  created() {
    this.getLanguage(this.$store.state.language, false);
  },
  methods: {
    getLanguage(lang, mounted) {
      Store.commit("setLanguage", lang);
      APIService.post("/GetLanguage", null, lang, false).then(
        ((response) => {
          Store.commit("setResource", response.data);
          if (mounted) {
            this.$router.go();
          }
        }).bind(this)
      );
    },
    booknow() {
      this.$router.push({ name: "Service" });
    },
  },
};
</script>
<style scoped>
.navbar-top ul li a {
  font-size: 18px !important;
}
.navbar-top ul li {
  padding: 0 12px;
}
.phoneno----login {
  height: 75px;
  /* background: red; */
  width: 140px;
  /* border-bottom: 75px solid #ef2b37 !important; */
  /* border-left: 53px solid transparent; */
  background: #E83828 !important;
  margin-left: -100px;
  position: absolute;
  transform: skew(-30deg);
  text-align: inherit;
  height: 100%;
}
.phoneno----login1 {
  height: 75px;
  width: 150px;
  /* background: red; */
  /* width: 150px; */
  /* border-bottom: 75px solid #465ecb !important;
  border-left: 53px solid transparent; */
  background: #4B5FC4 !important;
  /* margin-left: -85px; */
  text-align: right;
  height: 100%;
}
.book-now {
  background: #465ecb;
  padding-top: 25px;
  border: transparent;
  text-align: right;
  padding-right: 0;
}
.phone {
  background: transparent;
  padding-top: 25px;
  border: transparent;
  padding-left: 15px;
  transform: skew(30deg);
}
.phone .bxs-phone {
  margin-right: 5px;
}
.lan {
  background: #007bff;
  border: none;
  color: white;
  padding: 10px;
  margin-right: 30px;
  width: 50%;
  margin-left: 10px;
}
.buttonsection {
  position: absolute;
  right: 0;
  height: 100%;
}
.button-nav {
  display: none;
}
.navbar.navbar-light .navbar-nav .nav-link {
  padding: auto;
}
.nav-link {
  font-size: 18px !important;
  color: #404453 !important;
  font-weight: 400;
  text-decoration: none;
  position: relative;
}
li.nav-link a:hover {
  color: #ef2b37 !important;
}
li.nav-link a:before {
  background: #ef2b37 !important;
  transition-delay: 0s;
}
li.nav-link a:after,
li.nav-link a:before {
  content: "";
  position: absolute;
  bottom: 0px;
  left: 0;
  width: 100%;
  height: 3px;
  transform: scaleX(0);
  transform-origin: center left;
  transition: transform 0.3s cubic-bezier(0.22, 0.61, 0.36, 1);
}
li.nav-link a:hover:before {
  transform: scaleX(1) !important;
}

.phone.btn-secondary:hover,
.phone.btn-secondary:active,
.phoneno----login1 .book-now:hover,
.phoneno----login1 .book-now:active {
  background: none !important;
  border: none !important;
  box-shadow: none !important;
}

@media only screen and (max-width: 1199px) {
  .nav-link {
    margin-left: 15px;
  }
  .buttonsection {
    display: none;
  }
  .lan {
    background: #007bff;
    border: none;
    color: white;
    padding: 10px;
    margin-right: 30px;
    width: 10%;
    margin-left: 30px;
  }
}

@media only screen and (max-width: 992px) {
  .custom-logo {
    padding-left: 0px !important;
  }
}

@media only screen and (max-width: 768px) {
  .custom-logo {
    padding-left: 0px !important;
  }
  .phoneno----login {
    height: 75px;
    width: 140px;
    background: #ef2b37 !important;
    height: 100%;
  }
  .phoneno----login1 {
    height: 75px;
    width: 150px;
    background: #465ecb !important;
    text-align: right;
    height: 100%;
  }
  .book-now {
    background: #465ecb;
    padding-top: 25px;
    border: transparent;
    text-align: right;
    padding-right: 0;
  }
  .phone {
    background: transparent;
    padding-top: 25px;
    border: transparent;
    padding-left: 30px;
    transform: skew(30deg);
  }
  .buttonsection {
    display: none;
  }
  .button-nav {
    display: block;
  }
  .btn-contact {
    background: #ef2b37;
    border: none;
    color: white;
    padding: 10px;
    margin-right: 30px;
    width: 50%;
    margin-left: 10px;
  }
  .btn-booknow {
    background: #465ecb;
    border: none;
    color: white;
    padding: 10px;
    margin-right: 30px;
    width: 50%;
    margin-left: 10px;
  }
  li.nav-link {
    padding-left: 20px;
    padding-bottom: 0px;
    padding-top: 0px;
  }
  button.btn-secondary {
    width: auto !important;
  }
  /* #btnlang {
    padding-left: 10px;
  } */
}

@media only screen and (max-width: 280px) {
  .navbar.navbar-light .navbar-toggler {
    margin-left: -6px;
  }
}

@media only screen and (min-device-width: 1198px) and (max-device-width: 1250px) {
  .navbar-brand {
    margin-right: 0px !important;
  }
  .custom-logo {
    padding-left: 10px !important;
    width: 170px !important;
  }
  .navbar-expand-xl .navbar-nav .nav-link {
    padding-right: 6px !important;
    padding-left: 6px !important;
  }
  .nav-link {
    font-size: 14px !important;
  }
  .btn-sm,
  .btn-group-sm > .btn {
    line-height: 0.5;
  }
}

@media only screen and (min-device-width: 1250px) and (max-device-width: 1340px) {
  .navbar-brand {
    margin-right: 0px !important;
  }
  .custom-logo {
    padding-left: 10px !important;
  }
  .navbar-expand-xl .navbar-nav .nav-link {
    padding-right: 6px !important;
    padding-left: 6px !important;
  }
  .nav-link {
    font-size: 14px !important;
  }
  .btn-sm,
  .btn-group-sm > .btn {
    line-height: 0.5;
  }
}

@media only screen and (min-device-width: 1340px) and (max-device-width: 1440px) {
  .navbar-brand {
    margin-right: 0px !important;
  }
  .custom-logo {
    padding-left: 15px !important;
  }
  .navbar-expand-xl .navbar-nav .nav-link {
    padding-right: 6px !important;
    padding-left: 5px !important;
  }
  .nav-link {
    font-size: 14px !important;
  }
}
</style>
