<template>
  <div>
    <CCol>
      <CCard>
        <CForm @submit.prevent="handleSubmit">
          <CCardHeader>
            <strong>BoxStorage Refund Html</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="6">
                <CInput
                  label="Phone Number"
                  placeholder="26XX XXXX"
                  v-model="vmodel.phoneno"
                  oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                  onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                  maxlength="9"
                  v-mask="'#### ####'"
                />
              </CCol>
              <CCol sm="6">
                <CTextarea
                  label="Address"
                  placeholder="Enter Address"
                  v-model="vmodel.address"
                  :maxlength="500"
                  type="textarea"
                />
              </CCol>
              <CCol sm="6">
                <CInputFile
                  label="Logo*"
                  accept="image/jpeg,image/jpg,image/png"
                  @change="onFileChange"
                  invalidFeedback="Logo is required"
                />
                <img
                  :src="image"
                  :height="150"
                  :width="150"
                  v-if="image.length > 0 && vmodel.logo != null"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <label>Template HTML <br>
                <small>Note: {{note}} </small></label>
                <ckeditor v-model="vmodel.html"></ckeditor>
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
          </CCardFooter>
        </CForm>
      </CCard>
    </CCol>
  </div>
</template>

<script>
import CKEditor from "ckeditor4-vue";
import APIService from "@/services/api.service.js";
import Store from "@/store/index";

export default {
  components: {
    ckeditor: CKEditor.component,
  },
  data() {
    return {
      image: "",
      vmodel: {
        address: "",
        phoneno: "",
        logo: "",
      },
      note:
        "Use {{fed_address}}, {{fed_number}} & {{fed_logo}} for change in template. Use {{fed_logo}} as img src for display an image.",
      submitted: false,
    };
  },
  created() {
    Store.commit("showLoader");
    document.title =
      this.$store.state.projecttitle + " - BoxStorage Refund Html";
    APIService.post("/GetEmailTemplateByType", {
      type: "BoxStorageRefund",
    }).then((response) => {
      Store.commit("hideLoader");
      if (response.data != null && response.data != "") {
        this.$set(this, "vmodel", response.data);
        this.image =
          this.$store.state.apiURL + "/emaillogo/" + this.vmodel.logo;
      }
    });
  },
  methods: {
    handleSubmit() {
      this.submitted = true;
      var _vmodel = this.vmodel;
      this.vmodel.type = "BoxStorageRefund";
      APIService.post("/AddUpdateEmailTemplate", _vmodel).then(() => {
        this.$router.go({ name: "BoxStorage Refund" });
        this.$successAlert("Your data is updated.");
        this.submitted = false;
      });
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
        this.vmodel.logo = "";
        return;
      }
      this.createImage(files[0]);
    },
    createImage(file) {
      var reader = new FileReader();
      reader.onload = (e) => {
        this.image = e.target.result;
        this.vmodel.logo = e.target.result;
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>
