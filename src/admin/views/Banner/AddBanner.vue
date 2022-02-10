<template>
  <div>
    <CCol>
      <CCard>
        <CForm @submit.prevent="handleSubmit">
          <CCardHeader>
            <strong>Add Banner</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="12">
                <CInput
                  label="Navigate Url"
                  v-model="vmodel.url"
                  placeholder="Enter Navigate Url"
                  autocomplete="off"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInputFile
                  label="Image*"
                  accept="image/jpeg,image/jpg,image/png"
                  @change="onFileChange"
                  :isValid="checkIfValid('image')"
                  invalidFeedback="Image is required"
                />
                <img
                  :src="image"
                  :height="150"
                  :width="150"
                  v-if="image.length > 0"
                />
              </CCol>
            </CRow>
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
            <CButton
              type="button"
              router-link
              :to="{ name: 'BannerList' }"
              class="mr-1"
              color="secondary"
            >
              Cancel
            </CButton>
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
      id: this.$route.params.id,
      vmodel: {
        image: "",
      },
      valmodel: null,
      modelstate: {},
      submitted: false,
      image: "",
    };
  },
  validations: {
    vmodel: {
      image: { required },
    },
  },
  created() {
    document.title = this.$store.state.projecttitle + " - Add Banner";
  },
  methods: {
    checkIfValid(fieldName) {
      const field = this.$v.vmodel[fieldName];
      if (!field.$dirty) {
        return null;
      }
      return !(field.$invalid || field.$model === "");
    },
    onFileChange(filename, e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      if (files[0].size > 10485760) {
        e.preventDefault();
        alert("File must be less than 10MB.");
        e.target.value = "";
        return;
      }
      var supportedFileType = "image/jpeg,image/jpg,image/png";
      if (supportedFileType.indexOf(filename[0].type) < 0) {
        e.preventDefault();
        this.$dangerAlert("Only .jpeg, .jpg & .png file type support.");
        e.target.value = "";
        this.image = "";
        this.vmodel.image = "";
        return;
      }
      this.createImage(files[0]);
    },
    createImage(file) {
      var reader = new FileReader();
      reader.onload = (e) => {
        this.image = e.target.result;
        this.vmodel.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    handleSubmit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.submitted = true;
      var _vmodel = this.vmodel;
      if (this.id != undefined && this.id != null && this.id != "") {
        _vmodel.id = this.id;
      } else {
        _vmodel.id = "";
      }

      this.vmodel.userId = this.$store.state.userInfo.userId;
      if (this.id != undefined && this.id != null && this.id != "") {
        APIService.post("/UpdateBanner", _vmodel, this.id).then(() => {
          this.$successAlert("Your data is updated.");
          this.$router.push({ name: "BannerList" });
        });
      } else {
        APIService.post("/AddBanner", this.vmodel).then(() => {
          this.$successAlert("Your data is added.");
          this.$router.push({ name: "BannerList" });
        });
      }
    },
  },
};
</script>