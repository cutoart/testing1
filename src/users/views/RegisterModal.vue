<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-12 form-group text-left">
          <div>
            <form @submit.prevent="handleSubmit">
              <div class="form-group">
                <label for="email">{{$store.state.resource.registermodal.labelemail}}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  class="form-control"
                  :placeholder="$store.state.resource.registermodal.labelemailplaceholder"
                  :maxlength="50"
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
                <label for="firstName">{{$store.state.resource.registermodal.labelfirstname}}</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  class="form-control"
                  :placeholder="$store.state.resource.registermodal.labelfirstnameplaceholder"
                  :maxlength="25"
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
                <label for="lastName">{{$store.state.resource.registermodal.labellastname}}</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  class="form-control"
                  :placeholder="$store.state.resource.registermodal.labellastnameplaceholder"
                  :maxlength="25"
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
              <div class="form-group">
                <label for="password">{{$store.state.resource.registermodal.labelpassword}}</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  class="form-control"
                  :placeholder="$store.state.resource.registermodal.labelpasswordplaceholder"
                  :maxlength="20"
                  v-model="user.password"
                  :class="{
                    'is-invalid': submitted && $v.user.password.$error,
                  }"
                />
                <div
                  v-if="submitted && $v.user.password.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.user.password.required"
                    >Password is required</span
                  >
                  <span v-if="!$v.user.password.minLength"
                    >Password must be at least 8 characters</span
                  >
                </div>
              </div>
              <div class="form-group">
                <label for="confirmPassword">{{$store.state.resource.registermodal.labelconfirmpassword}}</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  class="form-control"
                  :placeholder="$store.state.resource.registermodal.labelconfirmpasswordplaceholder"
                  :maxlength="20"
                  v-model="user.confirmPassword"
                  :class="{
                    'is-invalid': submitted && $v.user.confirmPassword.$error,
                  }"
                />
                <div
                  v-if="submitted && $v.user.confirmPassword.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.user.confirmPassword.required"
                    >Confirm Password is required</span
                  >
                  <span v-else-if="!$v.user.confirmPassword.sameAsPassword"
                    >Passwords must match</span
                  >
                </div>
              </div>
              <div class="form-group text-right">
                <button type="submit" class="btn btn-primary col-4 register">
                  {{$store.state.resource.registermodal.registerbtn}}
                </button>
              </div>
              <div class="form-group">
                <a id="login" href="#" v-on:click="$emit('loginmodalvalue')"
                  >{{$store.state.resource.registermodal.alreadymemberloginhere}}</a
                >
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import APIService from "@/services/api.service.js";
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      id: this.$route.params.id,
      user: {
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
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
      password: { required, minLength: minLength(8) },
      confirmPassword: { required, sameAsPassword: sameAs("password") },
    },
  },
  created() {
    document.title = this.$store.state.projecttitle + " - Payment";
  },
  methods: {
    handleSubmit() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      var _vmodel = this.user;
      APIService.post("/CheckUserExist", _vmodel).then((response) => {
        if (response && response.data) {
          if (this.user.email == response.data.email) {
            this.$set(this, "modelstate_email", "Email Already Exist !");
          }
          this.submitted = false;
        } else {
          APIService.post("/AddRegister", _vmodel).then(() => {
            this.$successAlert("Your data is Registered.");
            document.getElementById("login").click();
          });
        }
      });
    },
  },
};
</script>
<style scoped>
.register {
  background: #14b7eb;
  border-radius: 0px 0px 20px 0px;
}
</style>
<style>
.modal-footer {
  display: none !important;
}
</style>
