<template>
  <div class="info content">
    <div class="section-title">
      <h4>{{ $store.state.resource.updateinfo.info }}</h4>
    </div>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <input
          type="email"
          name="email"
          :placeholder="$store.state.resource.updateinfo.emailplaceholder"
          autocomplete="off"
          v-model="user.email"
          :class="{
            'is-invalid':
              (submitted && $v.user.email.$error) ||
              (modelstate_email != null &&
                modelstate_email != '' &&
                modelstate_email != undefined),
          }"
        />
        <div
          v-if="
            (submitted && $v.user.email.$error) ||
              (modelstate_email != null &&
                modelstate_email != '' &&
                modelstate_email != undefined)
          "
          class="invalid-feedback"
        >
          <span v-if="!$v.user.email.required">Email is required</span>
          <span v-if="!$v.user.email.email">Email is invalid</span>
          <span
            v-if="
              modelstate_email != null &&
                modelstate_email != '' &&
                modelstate_email != undefined
            "
            >{{ modelstate_email }}</span
          >
        </div>
      </div>
      <div class="form-group">
        <input
          type="text"
          name="firstname"
          :placeholder="$store.state.resource.updateinfo.firstnameplaceholder"
          autocomplete="off"
          v-model="user.firstName"
          :class="{
            'is-invalid': submitted && $v.user.firstName.$error,
          }"
        />
        <div
          v-if="submitted && !$v.user.firstName.required"
          class="invalid-feedback"
        >
          First Name is required
        </div>
      </div>
      <div class="form-group">
        <input
          type="text"
          name="lastname"
          :placeholder="$store.state.resource.updateinfo.lastnameplaceholder"
          autocomplete="off"
          v-model="user.lastName"
          :class="{
            'is-invalid': submitted && $v.user.lastName.$error,
          }"
        />
        <div
          v-if="submitted && !$v.user.lastName.required"
          class="invalid-feedback"
        >
          Last Name is required
        </div>
      </div>
      <div class="section-title">
        <h4>{{ $store.state.resource.updateinfo.billingaddress }}</h4>
      </div>
      <div class="form-group">
        <input
          type="text"
          maxlength="100"
          id="address"
          :placeholder="$store.state.resource.updateinfo.addressplaceholder"
          v-model="user.address"
          autocomplete="off"
          :class="{
            'is-invalid': submitted && $v.user.address.$error,
          }"
        />
        <div
          v-if="submitted && !$v.user.address.required"
          class="invalid-feedback"
        >
          Address is required
        </div>
      </div>
      <div class="form-group">
        <input
          type="text"
          maxlength="50"
          id="region"
          :placeholder="$store.state.resource.updateinfo.regionplaceholder"
          v-model="user.region"
          autocomplete="off"
          :class="{
            'is-invalid': submitted && $v.user.region.$error,
          }"
        />
        <div
          v-if="submitted && !$v.user.region.required"
          class="invalid-feedback"
        >
          Region is required
        </div>
      </div>
      <div class="form-group buttons text-right">
        <button type="submit" name="btnupdate" class="btn btn-primary">
          {{ $store.state.resource.updateinfo.btnupdate }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import APIService from "@/services/api.service.js";
import { required, email } from "vuelidate/lib/validators";
import Store from "@/store/index";

export default {
  components: {},

  created() {
    Store.commit("showLoader");
    if (this.id != undefined && this.id != null) {
      document.title = this.$store.state.projecttitle + " - Update Info";
      APIService.getById("/getregisteruser", this.id).then((response) => {
        Store.commit("hideLoader");
        this.$set(this, "user", response.data);
      });
    } else {
      this.$router.push({ name: "Home" });
    }
  },

  data() {
    return {
      id: this.$store.state.regUserInfo.userId,
      user: {
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        region: "",
      },
      submitted: false,
      modelstate_email: "",
    };
  },
  validations: {
    user: {
      email: { required, email },
      firstName: { required },
      lastName: { required },
      address: { required },
      region: { required },
    },
  },

  methods: {
    handleSubmit() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      var _vmodel = this.user;
      if (this.id != undefined && this.id != null && this.id != "") {
        _vmodel.id = this.id;
      } else {
        _vmodel.id = "";
      }
      APIService.post("/CheckUserExist", _vmodel).then((response) => {
        if (response && response.data) {
          if (this.user.email == response.data.email) {
            this.$set(this, "modelstate_email", "Email Already Exist !");
          }
          this.submitted = false;
        } else {
          APIService.post("/updateregisteruser", _vmodel, this.id).then(() => {
            this.$successAlert("Your data is updated.");
            this.$store.commit(
              "setUserName_user",
              _vmodel.firstName + " " + _vmodel.lastName
            );
            this.$store.commit("setUserAddress_user", _vmodel.address);
            this.$store.commit("setUserRegion_user", _vmodel.region);
            this.$store.commit("setUserEmail_user", _vmodel.email);
          });
        }
      });
    },
  },
};
</script>

<style scoped>
@media only screen and (max-width: 992px) {
  .my-account-details-content .tab-content .content {
    margin-top: 0px;
    margin-left: 20px;
  }

  .my-account-details-content .tab-content .content .buttons button {
    padding: 10px 45px;
  }
}

@media only screen and (max-width: 765px) {
  .my-account-details-content .tab-content .content {
    margin-top: 20px;
    margin-left: 0px;
  }

  .my-account-details-content .tab-content .content .buttons button {
    padding: 10px 45px;
  }
}
</style>
