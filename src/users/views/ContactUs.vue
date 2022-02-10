<template>
  <div>
    <header id="fancy-header" class="fancy-header">
      <div class="container">
        <h2 class="fancy-title">
          {{ $store.state.resource.contactus.contactus }}
        </h2>
      </div>
    </header>
    <div class="content" id="content">
      <div class="about-us-content">
        <div class="container">
          <p class="text">
            {{ $store.state.resource.contactus.serviceenquiry }}
          </p>
          <p class="text">
            {{ $store.state.resource.contactus.ifyouhaveanyenquiries }}
          </p>
          <ol class="text1">
            <li>{{ $store.state.resource.contactus.call }}</li>
            <li>{{ $store.state.resource.contactus.sendmail }}</li>
            <li>
              {{ $store.state.resource.contactus.onlinemessage }}
            </li>
          </ol>
          <CForm @submit.prevent="handleSubmit">
            <CCardBody>
              <CRow>
                <CCol sm="6">
                  <CInput
                    :placeholder="
                      $store.state.resource.contactus.placeholderfirstname
                    "
                    :isValid="checkIfValid('Firstname')"
                    :value.sync="$v.user.Firstname.$model"
                    :maxlength="30"
                    invalidFeedback="Firstname is Required"
                  />
                </CCol>
                <CCol sm="6">
                  <CInput
                    :placeholder="
                      $store.state.resource.contactus.placeholderlastname
                    "
                    :isValid="checkIfValid('Lastname')"
                    :value.sync="$v.user.Lastname.$model"
                    :maxlength="30"
                    invalidFeedback="Lastname is Required"
                  />
                </CCol>
                <CCol sm="12">
                  <!-- <CInput
                  v-model="user.whatsappNumber"
                  label="Whatsapp Number"
                  placeholder="XXXX XXXX"
                  onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                  maxlength="9"
                  v-mask="'#### ####'"
                /> -->
                  <CInput
                    :placeholder="
                      $store.state.resource.contactus.placeholderphonenumber
                    "
                    :isValid="checkIfValid('phoneNumber')"
                    v-model="user.phoneNumber"
                    oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                    onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                    maxlength="9"
                    v-mask="'#### ####'"
                    invalidFeedback="Phone number is Required"
                  />
                </CCol>
                <CCol sm="12">
                  <CInput
                    :value.sync="$v.user.email.$model"
                    :isValid="checkIfValid('email')"
                    :maxlength="30"
                    v-on:keyup="user.email = $event.target.value.toLowerCase()"
                    :placeholder="
                      $store.state.resource.contactus.placeholderemail
                    "
                    autocomplete="email"
                    invalidFeedback="Email is required"
                  />
                </CCol>
                <CCol sm="12">
                  <CTextarea
                    :placeholder="
                      $store.state.resource.contactus.placeholdercontent
                    "
                    :maxlenght="150"
                    v-model="user.Content"
                  />
                </CCol>
              </CRow>
              <div class="form-group text-right">
                <button type="submit" class="btn btn-primary col-4 mr-2 login">
                  {{ $store.state.resource.contactus.sendreqbtn }}
                </button>
              </div>
              <div class="form-group text-right button">
                <button type="submit" class="btn btn-primary send">
                  {{ $store.state.resource.contactus.sendreqbtn }}
                </button>
              </div>
            </CCardBody>
          </CForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import APIService from "@/services/api.service.js";

export default {
  name: "app",
  data() {
    return {
      id: this.$route.params.id,
      user: {
        Firstname: "",
        Lastname: "",
        phoneNumber: "",
        email: "",
        Content: "",
        createdBy: this.$store.state.userInfo.userId,
      },
    };
  },
  validations: {
    user: {
      Firstname: { required },
      Lastname: { required },
      phoneNumber: { required },
      email: { required, email },
    },
  },
  created() {
    document.title = this.$store.state.projecttitle + " - Contact Us";
  },
  methods: {
    checkIfValid(fieldName) {
      const field = this.$v.user[fieldName];
      if (!field.$dirty) {
        return null;
      }
      return !(field.$invalid || field.$model === "");
    },

    handleSubmit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.submitted = true;
      APIService.post("/AddContactRequest", this.user).then(() => {
        this.$successAlert("Your Request Added Successfully!!!.");
        this.$router.go();
        this.submitted = false;
      });
      this.submitted = true;
    },
  },
};
</script>

<style scoped>
.text {
  margin-left: 24px;
}
.text1 {
  font-size: 14px;
  color: #000000;
}
.login {
  background: #14b7eb;
  border-radius: 0px 0px 20px 0px;
}
.button {
  display: none;
}

@media only screen and (max-width: 768px) {
  .login {
    display: none;
  }
  .button {
    display: block;
  }
  .send {
    background: #14b7eb;
    border-radius: 0px 0px 20px 0px;
  }
}
</style>
<style>
textarea.form-control {
  height: 150px !important;
}
</style>
