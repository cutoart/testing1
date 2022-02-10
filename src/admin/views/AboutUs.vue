<template>
  <div>
    <CCol>
      <CCard>
        <CForm @submit.prevent="handleSubmit">
          <CCardHeader>
            <strong>About Us</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="12">
                <strong>English</strong>
                <ckeditor v-model="vmodel.e_aboutus"></ckeditor>
              </CCol>
            </CRow>
            <br />
            <br />
            <CRow>
              <CCol sm="12">
                <strong>Chinese</strong>
                <ckeditor v-model="vmodel.c_aboutus"></ckeditor>
              </CCol>
            </CRow>
            <br />
          </CCardBody>
          <CCardFooter>
            <CButton
              type="submit"
              class="mr-1"
              :disabled="submitted"
              color="primary"
            >
              Save
            </CButton>
          </CCardFooter>
        </CForm>
      </CCard>
    </CCol>
  </div>
</template>

<script>
import CKEditor from "ckeditor4-vue";
import APIService from "@/services/api.service.js";
import { required } from "vuelidate/lib/validators";
import Store from "@/store/index";

export default {
  components: {
    ckeditor: CKEditor.component,
  },
  data() {
    return {
      vmodel: {
        userId: this.$store.state.userInfo.userId,
        _id: null,
        e_aboutus: "",
        c_aboutus: "",
      },
      valmodel: null,
      submitted: false,
    };
  },
  validations: {
    vmodel: {
      e_aboutus: { required },
      c_aboutus: { required },
    },
  },
  created() {
    Store.commit("showLoader");
    document.title = this.$store.state.projecttitle + " - About Us";
    APIService.getById("/AboutUsGet", "").then((response) => {
      Store.commit("hideLoader");
      // this.$set(this, "vmodel", response.data);
      this.vmodel._id = response.data
        .filter((x) => x.language == "english")
        .map((x) => x._id);

      this.vmodel.e_aboutus = response.data
        .filter((x) => x.language == "english")
        .map((x) => x.aboutus)[0];      
      this.vmodel.c_aboutus = response.data
        .filter((x) => x.language == "chinese")
        .map((x) => x.aboutus)[0];
    });
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
      var _vmodel = this.vmodel;
      APIService.post("/AddUpdateAboutUs", _vmodel).then(() => {
        this.$router.push({ name: "About Us" });
        this.$successAlert("Your data is updated.");
        this.submitted = false;
      });
    },
  },
};
</script>
