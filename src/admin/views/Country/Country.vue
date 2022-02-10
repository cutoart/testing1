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
                  label="Country Name*"
                  placeholder="Enter Name"
                  :isValid="checkIfValid('name')"
                  :value.sync="$v.user.name.$model"
                  :maxlength="30"
                  invalidFeedback="Name is Required"
                />
              </CCol>
              <CCol sm="6">
                <CInput
                  label="Country Chinese Name*"
                  placeholder="Enter Chinese Name"
                  :isValid="checkIfValid('chineseName')"
                  :value.sync="$v.user.chineseName.$model"
                  :maxlength="30"
                  invalidFeedback="Chinese Name is Required"
                />
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter>
            <CButton type="submit" class="mr-1" color="primary">Save</CButton>
            <CButton
              type="button"
              router-link
              :to="{ name: 'Country' }"
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
  name: "Country",
  created() {
    if (this.id != undefined && this.id != null) {
      Store.commit("showLoader");
      document.title = this.$store.state.projecttitle + " - Edit Country";
      APIService.getById("/getcountry", this.id).then((response) => {
        Store.commit("hideLoader");
        this.$set(this, "user", response.data);
      });
    } else {
      document.title = this.$store.state.projecttitle + " - Add Country";
    }
  },
  data() {
    return {
      id: this.$route.params.id,
      user: {
        name: "",
        chineseName: "",
        createdBy: this.$store.state.userInfo.userId,
      },
    };
  },
  validations: {
    user: {
      name: { required },
      chineseName: { required },
    },
  },
  methods: {
    checkIfValid(fieldname) {
      const field = this.$v.user[fieldname];
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
        APIService.post("/updatecountry", this.user, this.id).then(() => {
          this.$successAlert("Country Updated Successfully!!!.");
          this.$router.push({ name: "Country" });
          this.submitted = false;
        });
      } else {
        APIService.post("/addcountry", this.user).then(() => {
          this.$successAlert("Country Added Successfully!!!.");
          this.$router.push({ name: "Country" });
          this.submitted = false;
        });
      }
      this.submitted = true;
    },
  },
};
</script>