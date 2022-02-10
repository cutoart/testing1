<template>
  <div class="update-password content">
    <div class="section-title">
      <h4>{{ $store.state.resource.updatepassword.updatepassword }}</h4>
    </div>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <input
          type="password"
          v-model="user.oldPassword"
          :class="{
            'is-invalid': submitted && $v.user.oldPassword.$error,
          }"
          name="oldpassword"
          :placeholder="
            $store.state.resource.updatepassword.oldpasswordplaceholder
          "
        />
        <div
          v-if="submitted && !$v.user.oldPassword.required"
          class="invalid-feedback"
        >
          Old Password is required
        </div>
      </div>
      <div class="form-group">
        <input
          type="password"
          v-model="user.newPassword"
          :class="{
            'is-invalid': submitted && $v.user.newPassword.$error,
          }"
          name="newpassword"
          :placeholder="
            $store.state.resource.updatepassword.newpasswordplaceholder
          "
        />
        <div
          v-if="submitted && !$v.user.newPassword.required"
          class="invalid-feedback"
        >
          New Password is required
        </div>
      </div>
      <div class="form-group">
        <input
          v-model="user.confirmPassword"
          type="password"
          name="confirmnewpasswiord"
          :class="{
            'is-invalid': submitted && $v.user.confirmPassword.$error,
          }"
          :placeholder="
            $store.state.resource.updatepassword.confirmnewpasswordplaceholder
          "
        />
        <div
          v-if="submitted && !$v.user.confirmPassword.required"
          class="invalid-feedback"
        >
          New Password is required
        </div>
      </div>
      <div class="form-group buttons text-right">
        <button type="submit" name="btnupdate" value="" class="btn btn-primary">
          {{ $store.state.resource.updatepassword.btnsubmit }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import APIService from "@/services/api.service.js";
import { required } from "vuelidate/lib/validators";

export default {
  name: "app",
  data() {
    return {
      user: {
        id: this.$store.state.regUserInfo.userId,
        confirmPassword: "",
        newPassword: "",
        oldPassword: "",
      },
      errormessage: "",
      submitted: false,
    };
  },
  validations: {
    user: {
      oldPassword: { required },
      newPassword: { required },
      confirmPassword: { required },
    },
  },
  methods: {
    handleSubmit() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      APIService.post("/ChangePassword", this.user).then((res) => {
        if (res.data.message != null) {
          if (res.data.success == true) {
            // this.$successAlert(res.data.message);
            this.$store.dispatch("userlogout").then(() => {
              this.$router.push("/");
            });
          } else {
            this.$dangerAlert(res.data.message);
          }
        }
      });
    },
  },
};
</script>

<style scoped>
.btn-primary {
  padding: 10px 35px;
}
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
