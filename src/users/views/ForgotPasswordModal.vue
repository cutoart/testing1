<template>
  <div class="container">
    <div class="row">
      <div class="col-12 form-group text-left">
        <div>
          <form @submit.prevent="forgotpassword">
            <div class="form-group">
              <label for="email">{{
                $store.state.resource.forgotpasswordmodal.labelemail
              }}</label>
              <input
                type="email"
                v-model="user.email"
                id="email"
                name="email"
                :maxlength="50"
                :placeholder="
                  $store.state.resource.forgotpasswordmodal
                    .labelemailplaceholder
                "
                autocomplete="off"
                class="form-control"
                :class="{
                  'is-invalid':
                    submitted && ($v.user.email.$error || errormessage != ''),
                }"
              />
              <div
                v-if="submitted && ($v.user.email.$error || errormessage != '')"
                class="invalid-feedback"
              >
                <span v-if="errormessage != ''">{{ errormessage }}</span>
                <span v-if="!$v.user.email.required">Email is required</span>
              </div>
            </div>
            <div class="form-group text-right">
              <button class="btn btn-primary col-4 mr-2 next">
                {{ $store.state.resource.forgotpasswordmodal.btnsubmit }}
              </button>
            </div>
            <div class="form-group">
              <a id="login" href="#" v-on:click="$emit('loginmodalvalue')">{{
                $store.state.resource.forgotpasswordmodal.backtologin
              }}</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import APIService from "@/services/api.service.js";

export default {
  props: {
    ShowPopup: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      user: {
        email: "",
        code: "",
        url: window.location.origin,
      },
      submitted: false,
      errormessage: "",
    };
  },
  validations: {
    user: {
      email: { required },
    },
  },
  created() {
    document.title = this.$store.state.projecttitle + " - Reset Password";
  },
  methods: {
    forgotpassword() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.errormessage = "";
      this.user.apiurl = this.$store.state.apiURL;
      APIService.post("/CheckExistForForgot", this.user).then((response) => {
        if (response && response.data) {
          this.forgotpasswordmodal = false;
          this.$successAlert("Check your email to change password.");
          this.$emit("update:ShowPopup", false);
          this.$router.push({ name: "Home" });
        } else {
          this.errormessage = "Email could not found !!!";
        }
      });
    },
  },
};
</script>

<style scoped>
.next {
  background: #14b7eb;
  border-radius: 0px 0px 20px 0px;
}
</style>
