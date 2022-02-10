<template>
  <div class="container">
    <div class="row">
      <div class="col-12 form-group text-left">
        <div>
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <div class="form-group">
                <label for="code">{{$store.state.resource.changepasswordmodal.labelverificationcode}}</label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  class="form-control"
                  :placeholder="$store.state.resource.changepasswordmodal.labelverificationcodeplaceholder"
                  :maxlength="4"
                  v-model="user.code"
                  autocomplete="off"
                  onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                  :class="{
                    'is-invalid':
                      submitted &&
                      ($v.user.code.$error || codeerrormessage != ''),
                  }"
                />
                <div
                  v-if="
                    submitted && ($v.user.code.$error || codeerrormessage != '')
                  "
                  class="invalid-feedback"
                >
                  <span v-if="codeerrormessage != '' && !$v.user.code.$error">{{
                    codeerrormessage
                  }}</span>
                  <span v-if="!$v.user.code.required">Code is required</span>
                </div>
              </div>
              <div class="form-group">
                <label for="password">{{$store.state.resource.changepasswordmodal.labelnewpassword}}</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  class="form-control"
                  :placeholder="$store.state.resource.changepasswordmodal.labelnewpasswordplaceholder"
                  :maxlength="20"
                  v-model="user.newPassword"
                  :class="{
                    'is-invalid': submitted && $v.user.newPassword.$error,
                  }"
                />
                <div
                  v-if="submitted && $v.user.newPassword.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.user.newPassword.required"
                    >Password is required</span
                  >
                  <span v-if="!$v.user.newPassword.minLength"
                    >Password must be at least 8 characters</span
                  >
                </div>
              </div>
              <div class="form-group">
                <label for="confirmPassword">{{$store.state.resource.changepasswordmodal.labelconfirmpassword}}</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  class="form-control"
                  :placeholder="$store.state.resource.changepasswordmodal.labelconfirmpasswordplaceholder"
                  :maxlength="20"
                  v-model="user.confirmPassword"
                  :class="{
                    'is-invalid':
                      submitted &&
                      ($v.user.confirmPassword.$error || errormessage != ''),
                  }"
                />
                <div
                  v-if="
                    submitted &&
                      ($v.user.confirmPassword.$error || errormessage != '')
                  "
                  class="invalid-feedback"
                >
                  <span
                    v-if="
                      errormessage != '' && $v.user.confirmPassword.required
                    "
                    >{{ errormessage }}</span
                  >
                  <span v-if="!$v.user.confirmPassword.required"
                    >Confirm Password is required</span
                  >
                </div>
              </div>
              <div class="form-group text-right">
                <button type="submit" class="btn btn-primary col-4 mr-2 login">
                  {{$store.state.resource.changepasswordmodal.btnsubmit}} 
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";
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
      id: this.$route.params.id,
      user: {
        code: "",
        newPassword: "",
        confirmPassword: "",
      },
      item: [],
      errormessage: "",
      codeerrormessage: "",
      submitted: false,
    };
  },
  validations: {
    user: {
      code: { required },
      newPassword: { required, minLength: minLength(8) },
      confirmPassword: { required },
    },
  },
  created() {
    document.title = this.$store.state.projecttitle + " - Change Password";
    this.id != undefined && this.id != null;
    APIService.getById("/getuserbyuniqueid", this.id).then((response) => {
      if (
        response.data != "" &&
        response.data != null &&
        response.data != undefined
      ) {
        this.$set(this, "item", response.data);
      } else {
        this.$dangerAlert("User not found!!!");
        this.$emit("update:ShowPopup", false);
        this.$router.push({ name: "Home" });
      }
    });
  },
  methods: {
    handleSubmit() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.errormessage = "";
      this.codeerrormessage = "";
      if (this.user.newPassword !== this.user.confirmPassword) {
        this.errormessage = "Password could not match!!!";
      }
      if (this.user.code != this.item.code) {
        this.codeerrormessage = "Verification code could not match!!!";
      }
      if (this.errormessage != "" || this.codeerrormessage != "") {
        return;
      }
      var model = {
        userid: this.item._id,
        password: this.user.newPassword        
      };
      
      APIService.post("/ChangeForgotPassword", model).then((res) => {
        if (res.data.message != null) {
          if (res.data.success == true) {
            this.changepasswordmodal = false;
            this.$successAlert(res.data.message);
            this.$emit("update:ShowPopup", false);
            this.$router.push({ name: "Home" });
          }
        }
      });
    },
  },
};
</script>

<style scoped>
.login {
  background: #14b7eb;
  border-radius: 0px 0px 20px 0px;
}
.header {
  margin-top: 100px;
  text-align: center;
}
</style>
