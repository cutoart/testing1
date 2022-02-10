<template>
  <div>
    <CCol>
      <CCard>
        <CForm @submit.prevent="handleSubmit">
          <CCardHeader>
            <strong v-if="id == undefined && id == null">Add Branch </strong>
            <strong v-if="id != undefined && id != null">Edit Branch </strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="6">
                <CInput
                  label="Branch Name*"
                  placeholder="Enter Name"
                  :isValid="checkIfValid('Name')"
                  :value.sync="$v.user.Name.$model"
                  :maxlength="99"
                  invalidFeedback="Name is Required"
                />
              </CCol>
              <CCol sm="6">
                <CInput
                  label="Chinese Branch Name*"
                  placeholder="Enter Chinese Branch Name"
                  :isValid="checkIfValid('ChineseBranchName')"
                  :value.sync="$v.user.ChineseBranchName.$model"
                  :maxlength="99"
                  invalidFeedback="Chinese Branch Name is Required"
                />
              </CCol>
              <CCol sm="6">
                <CInput
                  label="Branch Code*"
                  placeholder="Enter Code"
                  :isValid="checkIfValid('Code')"
                  :value.sync="$v.user.Code.$model"
                  :maxlength="99"
                  invalidFeedback="Code is Required"
                />
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter>
            <CButton type="submit" class="mr-1" color="primary">Save</CButton>
            <CButton
              type="button"
              router-link
              :to="{ name: 'Branch' }"
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
import Store from "@/store/index";

export default {
  name: "app",
  created() {
    if (this.id != undefined && this.id != null) {
      Store.commit("showLoader");
      document.title = this.$store.state.projecttitle + " - Edit Branch";
      APIService.getById("/getbranch", this.id).then((response) => {
        Store.commit("hideLoader");
        this.$set(this, "user", response.data);
      });
    } else {
      document.title = this.$store.state.projecttitle + " - Add Branch";
    }
  },
  data() {
    return {
      id: this.$route.params.id,
      user: {
        Name: "",
        Code: "",
        ChineseBranchName: "",
        createdBy: this.$store.state.userInfo.userId,
      },
    };
  },
  validations: {
    user: {
      Name: { required },
      Code: { required },
      ChineseBranchName: { required },
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
      if (this.id != undefined && this.id != null && this.id != "") {
        APIService.post("/updatebranch", this.user, this.id).then(() => {
          this.$successAlert("Branch Updated Successfully!!!.");
          this.$router.push({ name: "Branch" });
          this.submitted = false;
        });
      } else {
        APIService.post("/addbranch", this.user).then(() => {
          this.$successAlert("Branch Added Successfully!!!.");
          this.$router.push({ name: "Branch" });
          this.submitted = false;
        });
      }
      this.submitted = true;
    },
  },
};
</script>