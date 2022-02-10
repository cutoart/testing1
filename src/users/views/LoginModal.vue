<template>
  <div class="container">
    <div class="row">
      <div class="col-12 form-group text-left">
        <div>
          <form @submit.prevent="userlogin">
            <div class="form-group">
              <label for="username">{{
                $store.state.resource.loginmodal.labelemail
              }}</label>
              <input
                type="email"
                id="username"
                name="username"
                class="form-control"
                :maxlength="50"
                autocomplete="off"
                :placeholder="
                  $store.state.resource.loginmodal.labelemailplaceholder
                "
                v-model="user.username"
                :class="{
                  'is-invalid':
                    submitted &&
                    ($v.user.username.$error || errormessage != ''),
                }"
              />
              <div
                v-if="
                  submitted && ($v.user.username.$error || errormessage != '')
                "
                class="invalid-feedback"
              >
                <span v-if="errormessage != ''">{{ errormessage }}</span>
                <span v-if="!$v.user.username.required">Email is required</span>
              </div>
            </div>
            <div class="form-group">
              <label for="password">{{
                $store.state.resource.loginmodal.labelpassword
              }}</label>
              <input
                type="password"
                id="password"
                name="password"
                class="form-control"
                :placeholder="
                  $store.state.resource.loginmodal.labelpasswordplaceholder
                "
                :maxlength="20"
                v-model="user.password"
                :class="{
                  'is-invalid':
                    submitted &&
                    ($v.user.password.$error || pswerrormessage != ''),
                }"
              />
              <div
                v-if="
                  submitted &&
                    ($v.user.password.$error || pswerrormessage != '')
                "
                class="invalid-feedback"
              >
                <span v-if="pswerrormessage != ''">{{ pswerrormessage }}</span>
                <span v-if="!$v.user.password.required"
                  >Password is required</span
                >
              </div>
            </div>
            <div class="form-group">
              <a href="#" v-on:click="$emit('forgotpasswordmodalvlaue')">{{
                $store.state.resource.loginmodal.forgotpassword
              }}</a>
            </div>
            <div class="form-group text-right">
              <button class="btn btn-primary col-4 mr-2 login">
                {{ $store.state.resource.loginmodal.loginbtn }}
              </button>
            </div>
            <div class="form-group">
              <a href="#" v-on:click="$emit('registermodalvalue')">{{
                $store.state.resource.loginmodal.notmemberyetregisterone
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
import Store from "../../store";

export default {
  components: {},
  props: {
    ShowPopup: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      submitted: false,
      errormessage: "",
      pswerrormessage: "",
    };
  },
  validations: {
    user: {
      username: { required },
      password: { required },
    },
  },
  created() {
    document.title = this.$store.state.projecttitle + " - Login";
  },
  methods: {
    userlogin() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.errormessage = "";
      this.pswerrormessage = "";
      Store.dispatch("userlogin", this.user)
        .then((response) => {
          if (response.data.success) {
            localStorage.setItem("ULid", response.data._id);
            this.loginmodal = false;
            this.$emit("update:ShowPopup", false);
            if (
              window.location.href.indexOf("service") < 0 &&
              window.location.href.indexOf("selfstorage") < 0
            ) {
              this.$router.push({ name: "Userinfo" });
            } else {
              this.$emit("loginsuccess");
            }
          } else {
            if (response.data.passworderr) {
              this.pswerrormessage = response.data.message;
            } else {
              this.errormessage = response.data.message;
            }
          }
          //this.submitted = false;
        })
        .catch((errors) => {
          console.log(errors);
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
</style>
