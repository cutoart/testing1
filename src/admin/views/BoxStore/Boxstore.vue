<template>
  <div>
    <CCol>
      <CCard>
        <CForm @submit.prevent="handleSubmit">
          <CCardHeader>
            <strong>Box Store</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="6">
                <CInput
                  label="Title*"
                  v-model="vmodel.title"
                  :isValid="checkIfValid('title')"
                  :maxlength="50"
                  placeholder="Enter Title"
                  autocomplete="off"
                  invalidFeedback="Title is required"
                />
              </CCol>
              <CCol sm="6">
                <CInput
                  label="Chinese Title*"
                  v-model="vmodel.chineseValues.title"
                  :isValid="checkIfValidChienes('title')"
                  :maxlength="50"
                  placeholder="Enter Title"
                  autocomplete="off"
                  invalidFeedback="Title is required"
                />
              </CCol>
              <CCol sm="12">
                <CTextarea
                  label="Description*"
                  v-model="vmodel.description"
                  :isValid="checkIfValid('description')"
                  :maxlength="500"
                  placeholder="Enter description"
                  autocomplete="off"
                  invalidFeedback="Description is required"
                />
              </CCol>
              <CCol sm="12">
                <CTextarea
                  label="Chinese Description*"
                  v-model="vmodel.chineseValues.description"
                  :isValid="checkIfValidChienes('description')"
                  :maxlength="500"
                  placeholder="Enter description"
                  autocomplete="off"
                  invalidFeedback="Description is required"
                />
              </CCol>
              <CCol sm="6">
                <CInput
                  label="Price*"
                  v-model="vmodel.price"
                  :isValid="checkIfValid('price')"
                  :maxlength="10"
                  autocomplete="off"
                  invalidFeedback="Price is required"
                />
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
              :to="{ name: 'BoxstoreList' }"
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
  name: "add-Boxstore",
  components: {},

  created() {
    if (this.id != undefined && this.id != null) {
      Store.commit("showLoader");
      document.title = this.$store.state.projecttitle + " - Edit Box Store";
      APIService.getById("/BoxstorageGetById", this.id).then((response) => {
        Store.commit("hideLoader");
        if (response.data.chineseValues === undefined) {
          response.data.chineseValues = {
            title: "",
            description: "",
          };
        }
        this.$set(this, "vmodel", response.data);
        this.image =
          this.$store.state.apiURL + "/boxstore/" + this.vmodel.image;
      });
    } else {
      document.title = this.$store.state.projecttitle + " - Add Box Store";
    }
  },

  data() {
    return {
      id: this.$route.params.id,
      vmodel: {
        image: "",
        chineseValues: {
          title: "",
          description: "",
        },
      },
      valmodel: null,
      modelstate: {},
      submitted: false,
      image: "",
    };
  },

  validations: {
    vmodel: {
      title: { required },
      description: { required },
      price: { required },
      image: { required },
      chineseValues: {
        title: { required },
        description: { required },
      },
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
    checkIfValidChienes(fieldName) {
      const field = this.$v.vmodel.chineseValues[fieldName];
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
        APIService.post("/UpdateBoxstore", _vmodel, this.id).then(() => {
          this.$successAlert("Your data is updated.");
          this.$router.push({ name: "BoxstoreList" });
        });
      } else {
        APIService.post("/AddBoxstore", this.vmodel).then(() => {
          this.$successAlert("Your data is added.");
          this.$router.push({ name: "BoxstoreList" });
        });
      }
    },
  },
};
</script>

