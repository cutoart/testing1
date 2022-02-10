<template>
  <div>
    <CCol>
      <CCard>
        <CForm @submit.prevent="handleSubmit">
          <CCardHeader>
            <strong v-if="id == undefined && id == null">Add Settings </strong>
            <strong v-if="id != undefined && id != null">Edit Settings </strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="12">
                <CInput
                  label="Box Storage Renew Days Before*"
                  placeholder="Enter number of days"
                  v-model="vmodel.boxstoragenoofdays"
                  :isValid="checkIfValid('boxstoragenoofdays')"
                  :maxlength="99"
                  invalidFeedback="Box Storage Renew Days Before is Required"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInput
                  v-model="vmodel.iframe"
                  label="IFrame for Self Storage (Please enter only src url)*"
                  placeholder="Enter IFrame"
                  :isValid="checkIfValid('iframe')"
                />
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter>
            <CButton type="submit" class="mr-1" color="primary">Save</CButton>
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
    Store.commit("showLoader");
    APIService.getById("/getglobalsettings").then((response) => {
      Store.commit("hideLoader");
      if (
        response.data !== null &&
        response.data !== undefined &&
        response.data.length > 0
      ) {
        document.title = this.$store.state.projecttitle + " - Edit Settings";
        this.$set(this, "vmodel", response.data[0]);
        this.id = response.data[0]._id.toString();
      } else {
        document.title = this.$store.state.projecttitle + " - Add Settings";
      }
    });
  },
  data() {
    return {
      id: null,
      vmodel: {
        boxstoragenoofdays: 0,
        iframe: "",
      },
    };
  },
  validations: {
    vmodel: {
      boxstoragenoofdays: { required },
      iframe: { required },
    },
  },
  methods: {
    checkIfValid(fieldName) {
      const field = this.$v.vmodel[fieldName];
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
        APIService.post("/updateglobalsettings", this.vmodel, this.id).then(
          () => {
            this.$successAlert("Settings Updated Successfully!!!.");
            this.$router.go({ name: "GlobalSettings" });
            this.submitted = false;
          }
        );
      } else {
        APIService.post("/addglobalsettings", this.vmodel).then(() => {
          this.$successAlert("Settings Added Successfully!!!.");
          this.$router.go({ name: "GlobalSettings" });
          this.submitted = false;
        });
      }
      this.submitted = true;
    },
  },
};
</script>