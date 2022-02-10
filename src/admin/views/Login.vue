<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="8">
          <CCardGroup>
            <CCard
              color="warning"
              text-color="white"
              class="text-center py-5 d-md-down-none"
              body-wrapper
            >
              <CCardBody>
                <h2>Fed Storage</h2>
                <p>Your trusted storage partner.</p>
              </CCardBody>
            </CCard>
            <CCard class="p-4">
              <CCardBody>
                <CForm @submit.prevent="login">
                  <h1>Welcome to FedStorage</h1>
                  <p class="text-muted">Sign In to your account</p>
                  <p v-if="errormessage != ''" class="text-danger text-center">
                    {{ errormessage }}
                  </p>
                  <CInput
                    placeholder="Login Id"
                    autocomplete="off"
                    :isValid="checkIfValid('loginId')"
                    :value.sync="$v.user.loginId.$model"
                    :maxlength="20"
                    invalidFeedback="Login Id is Required"
                  >
                    <template #prepend-content
                      ><CIcon name="cil-user"
                    /></template>
                  </CInput>
                  <CInput
                    placeholder="Password"
                    autocomplete="curent-password"
                    :isValid="checkIfValid('password')"
                    :value.sync="$v.user.password.$model"
                    :maxlength="20"
                    invalidFeedback="Password is Required"
                    type="password"
                  >
                    <template #prepend-content
                      ><CIcon name="cil-lock-locked"
                    /></template>
                  </CInput>
                  <CRow>
                    <CCol class="text-left">
                      <CButton
                        type="submit"
                        size="lg"
                        block
                        color="warning"
                        class="px-4"
                        :disabled="submitted"
                        >Login</CButton
                      >
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
//import router from "@/router";

export default {
  name: "Login",
  data() {
    return {
      user: {
        loginId: "",
        password: "",
      },
      errormessage: "",
      submitted: false,
    };
  },
  validations: {
    user: {
      loginId: { required },
      password: { required },
    },
  },
  created() {
    document.title = this.$store.state.projecttitle + " - Login";
    document.getElementById("chatra").style.display = "none";
  },
  methods: {
    checkIfValid(fieldName) {
      const field = this.$v.user[fieldName];
      if (!field.$dirty) {
        return null;
      }
      return !(field.$invalid || field.$model === "");
    },
    login() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.submitted = true;
      this.$store
        .dispatch("login", this.user)
        .then((response) => {
          if (response.data.success) {
            localStorage.setItem("eUid", response.data._id);
            // this.$store.commit("setUserType", response.data.type);
            this.errormessage = "";
            //router.push("branchList");
            this.$router.push({ name: "Branch" });
          } else {
            this.errormessage = response.data.message;
          }
          this.submitted = false;
        })
        .catch((errors) => {
          console.log(errors);
        });
    },
  },
};
</script>
