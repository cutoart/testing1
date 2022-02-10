<template>
  <div>
    <CCol>
      <CCard>
        <CForm @submit.prevent="handleSubmit">
          <CCardHeader>
            <strong v-if="id == undefined && id == null">Add Image </strong>
            <strong v-if="id != undefined && id != null">Edit Image </strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="6">
                <CInput
                  label="Image Title*"
                  placeholder="Enter Title"
                  :isValid="checkIfValid('title')"
                  :value.sync="$v.vmodel.title.$model"
                  :maxlength="99"
                  invalidFeedback="Title is Required"
                />
              </CCol>
              <CCol sm="6">
                <CInputFile
                  label="Image*"
                  accept="image/jpeg,image/jpg,image/png"
                  @change="onFileChange"                  
                  invalidFeedback="Image is required"
                  :class="{ 'is-invalid': $v.vmodel.filename.$error }"
                />
                <div v-if="!$v.vmodel.filename.required" class="invalid-feedback">
                  Image is required
                </div>
                <img
                  :src="image"
                  :height="150"
                  :width="150"
                  v-if="image.length > 0 && vmodel.filename != null"
                />
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter>
            <CButton type="submit" class="mr-1" color="primary">Save</CButton>
            <CButton
              type="button"
              router-link
              :to="{ name: 'ImageList' }"
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
      document.title = this.$store.state.projecttitle + " - Edit Image";
      APIService.getById("/getimage", this.id).then((response) => {
        Store.commit("hideLoader");
        this.$set(this, "vmodel", response.data);
        this.image =
          this.$store.state.apiURL + "/fedimages/" + this.vmodel.filename;
      });
    } else {
      document.title = this.$store.state.projecttitle + " - Add Image";
    }
  },
  data() {
    return {
      id: this.$route.params.id,
      image: "",
      vmodel: {
        title: "",
        filename: "",
        createdBy: this.$store.state.userInfo.userId,
      },
    };
  },
  validations: {
    vmodel: {
      title: { required },
      filename: { required },
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
        APIService.post("/updateimage", this.vmodel, this.id).then(() => {
          this.$successAlert("Image Updated Successfully!!!.");
          this.$router.push({ name: "ImageList" });
          this.submitted = false;
        });
      } else {
        APIService.post("/addimage", this.vmodel).then(() => {
          this.$successAlert("Image Added Successfully!!!.");
          this.$router.push({ name: "ImageList" });
          this.submitted = false;
        });
      }
      this.submitted = true;
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
        this.vmodel.filename = "";
        return;
      }
      this.createImage(files[0]);
    },
    createImage(file) {
      var reader = new FileReader();
      reader.onload = (e) => {
        this.image = e.target.result;
        this.vmodel.filename = e.target.result;
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>