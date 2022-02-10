<template>
  <div>
    <CCol>
      <CCard>
        <CForm @submit.prevent="handleSubmit">
          <CCardHeader>
            <strong>NewsandActivities</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="6">
                <CInput
                  label="Title*"
                  v-model="vmodel.title"
                  :isValid="checkIfValid('title')"
                  :maxlength="100"
                  placeholder="Enter Title"
                  autocomplete="off"
                  invalidFeedback="Title is required"
                />
              </CCol>
              <CCol sm="6">
                <CInput
                  label="Date*"
                  type="date"
                  v-model="vmodel.date"
                  :isValid="checkIfValid('date')"
                  :maxlength="100"
                  autocomplete="off"
                  invalidFeedback="Date is required"
                />
              </CCol>
              <CCol sm="12">
                <ckeditor v-model="vmodel.description"></ckeditor>
              </CCol>

              <CCol sm="6">
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
              <CCol sm="6">
                <span>Select Language</span>
                <v-select
                  v-model="vmodel.language"
                  style="margin-top: 8px"
                  :options="optionResource"
                  placeholder="Select Language"
                  :clearable="false"
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
              >Save</CButton
            >
            <CButton
              type="button"
              router-link
              :to="{ name: 'NewsandActivitiesList' }"
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
import CKEditor from "ckeditor4-vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  name: "add-NewsandActivities",
  components: {
    ckeditor: CKEditor.component,
    vSelect,
  },
  created() {
    if (this.id != undefined && this.id != null) {
      Store.commit("showLoader");
      document.title =
        this.$store.state.projecttitle + " - Edit News & Activities";
      APIService.getById("/NewsandActivitiesGetById", this.id).then(
        (response) => {
          Store.commit("hideLoader");
          this.$set(this, "vmodel", response.data);
          this.image =
            this.$store.state.apiURL +
            "/newsandactivities/" +
            this.vmodel.image;
        }
      );
    } else {
      document.title =
        this.$store.state.projecttitle + " - Add News & Activities";
    }
  },

  data() {
    return {
      id: this.$route.params.id,
      vmodel: {
        image: "",
        language: "chinese",
      },
      valmodel: null,
      modelstate: {},
      submitted: false,
      image: "",
      optionResource: ["chinese", "english"],
    };
  },

  validations: {
    vmodel: {
      title: { required },
      description: { required },
      date: { required },
      image: { required },
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
        APIService.post("/UpdateNewsandActivities", _vmodel, this.id).then(
          () => {
            this.$successAlert("Your data is updated.");
            this.$router.push({ name: "NewsandActivitiesList" });
          }
        );
      } else {
        APIService.post("/AddNewsandActivities", this.vmodel).then(() => {
          this.$successAlert("Your data is added.");
          this.$router.push({ name: "NewsandActivitiesList" });
        });
      }
    },
  },
};
</script>

