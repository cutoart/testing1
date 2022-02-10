<template>
  <div>
    <CCol>
      <CCard>
        <CForm @submit.prevent="handleSubmit">
          <CCardHeader>
            <strong>Change Password</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="12">
                <CInput
                  label="Old Password"
                  placeholder="Enter Old Password"
                  type="password"
                  :maxlength="25"
                  :isValid="checkIfValid('oldPassword')"
                  :value.sync="$v.user.oldPassword.$model"
                  invalidFeedback="Old Password is Required"
                />
              </CCol>
              <CCol sm="12">
                <CInput
                  label="New Password"
                  placeholder="Enter New Password"
                  type="password"
                  :maxlength="25"
                  :isValid="checkIfValid('newPassword')"
                  :value.sync="$v.user.newPassword.$model"
                  invalidFeedback="New Password is Required"
                />
              </CCol>
              <CCol sm="12">
                <CInput
                  label="Confirm New Password"
                  placeholder="Confirm New Password"
                  type="password"
                  :maxlength="25"
                  :isValid="checkIfValid('confirmPassword')"
                  :value.sync="$v.user.confirmPassword.$model"
                  invalidFeedback="Confirm New Password is Required"
                />
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter>
            <CButton type="submit" class="mr-1" color="primary">Save</CButton>
            <CButton
              type="button"
              router-link
              :to="{ name: 'Login' }"
              class="mr-1"
              color="secondary"
              >Cancel</CButton
            >
          </CCardFooter>
        </CForm>
      </CCard>
    </CCol>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import APIService from "@/services/api.service.js";

export default {
  data() {
    return {
      user: {
        id: this.$store.state.userInfo.userId,
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
      APIService.post("/AdminChangePassword", this.user).then((res) => {
        if (res.data.message != null) {
          if (res.data.success == true) {
            this.$successAlert(res.data.message);
            this.$store.dispatch("logout").then(() => {
              this.$router.push("/login");
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
