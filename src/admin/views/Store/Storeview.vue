<template>
  <div>
    <CCol>
      <CCard>
        <CForm @submit.prevent="handleSubmit">
          <CCardHeader>
            <strong v-if="id == undefined && id == null">Add Store </strong>
            <strong v-if="id != undefined && id != null">Edit Store </strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="6">
                <span>Branch</span>
                <v-select
                  style="margin-top: 8px"
                  v-model="user.branch"
                  :options="optionsBranch"
                  placeholder="Select branch"
                  :class="{ 'is-invalid': $v.user.branch.$error }"
                />
                <div v-if="!$v.user.branch.required" class="invalid-feedback">
                  Branch is required.
                </div>
              </CCol>

              <CCol sm="6">
                <CInput
                  label="Store Name"
                  placeholder="Enter Name"
                  :isValid="checkIfValid('storeName')"
                  :value.sync="$v.user.storeName.$model"
                  :maxlength="99"
                  invalidFeedback="StoreName is Required"
                />
              </CCol>

              <CCol sm="6">
                <CInput
                  label="Chinese Store Name"
                  placeholder="Enter Chinese Store Name"
                  :isValid="checkIfValidChienes('chineseStoreName')"
                  :value.sync="$v.user.chineseValues.chineseStoreName.$model"
                  :maxlength="99"
                  invalidFeedback="Chinese Store Name is Required"
                />
              </CCol>

              <CCol sm="6">
                <CInput
                  label="Address"
                  placeholder="Enter Address"
                  :isValid="checkIfValid('address')"
                  :value.sync="$v.user.address.$model"
                  :maxlength="99"
                  invalidFeedback="Address is Required"
                />
              </CCol>

              <CCol sm="6">
                <CInput
                  label="Chinese Address"
                  placeholder="Enter Chinese Address"
                  :isValid="checkIfValidChienes('chineseAddress')"
                  :value.sync="$v.user.chineseValues.chineseAddress.$model"
                  :maxlength="99"
                  invalidFeedback="Chinese Address is Required"
                />
              </CCol>

              <CCol sm="6">
                <CInput
                  label="Area"
                  placeholder="Enter Area"
                  :isValid="checkIfValid('area')"
                  :value.sync="$v.user.area.$model"
                  :maxlength="99"
                  invalidFeedback="Area is Required"
                />
              </CCol>

              <CCol sm="6">
                <CInput
                  v-model="user.chineseValues.chineseArea"
                  label="Chinese Area"
                  placeholder="Enter Chinese Area"
                  :isValid="checkIfValidChienes('chineseArea')"
                  :value.sync="$v.user.chineseValues.chineseArea.$model"
                  :maxlength="99"
                  invalidFeedback="Chinese Area is Required"
                />
              </CCol>

              <CCol sm="6">
                <span>State</span>
                <v-select
                  style="margin-top: 8px"
                  v-model="user.state"
                  :options="optionsState"
                  placeholder="Select State"
                  :class="{ 'is-invalid': $v.user.state.$error }"
                />
                <div v-if="!$v.user.state.required" class="invalid-feedback">
                  State is required.
                </div>
              </CCol>

              <CCol sm="6">
                <label style="margin-top: 8px">District</label>
                <v-select
                  style="margin-top: 4px"
                  v-model="user.city"
                  :options="optionsCity"
                  placeholder="Select District"
                  :class="{ 'is-invalid': $v.user.city.$error }"
                />
                <div v-if="!$v.user.city.required" class="invalid-feedback">
                  City is required.
                </div>
              </CCol>

              <CCol sm="6">
                <CInput
                  style="margin-top: 8px"
                  label="TelePhone Number"
                  placeholder="26XX XXXX"
                  :isValid="checkIfValid('telephoneNumber')"
                  v-model="$v.user.telephoneNumber.$model"
                  invalidFeedback="TelePhone Number is required"
                  oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                  onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                  maxlength="9"
                  v-mask="'#### ####'"
                />
              </CCol>

              <CCol sm="6">
                <CInput
                  v-model="user.directlinephoneNumber"
                  label="DirectLine Number"
                  placeholder="37XX XXXX"
                  onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                  maxlength="9"
                  v-mask="'#### ####'"
                />
              </CCol>

              <CCol sm="6">
                <CInput
                  v-model="user.whatsappNumber"
                  label="Whatsapp Number"
                  placeholder="XXXX XXXX"
                  onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                  maxlength="9"
                  v-mask="'#### ####'"
                />
              </CCol>

              <CCol sm="6">
                <CInput
                  label="Email"
                  placeholder="Enter Email"
                  :isValid="checkIfValid('email') && !modelstate_email"
                  :value.sync="$v.user.email.$model"
                  :maxlength="50"
                  v-on:keyup="user.email = $event.target.value.toLowerCase()"
                  :invalidFeedback="'Email is required'"
                />
              </CCol>

              <CCol sm="6">
                <CInput
                  v-model="user.latitude"
                  label="Latitude"
                  placeholder="Enter Latitude"
                  onkeypress="return event.charCode >= 48 && event.charCode <= 57 && event.charCode = 190"
                  maxlength="10"
                />
              </CCol>

              <CCol sm="6">
                <CInput
                  v-model="user.longitude"
                  label="Longitude"
                  placeholder="Enter longitude"
                  onkeypress="return event.charCode >= 48 && event.charCode <= 57 && event.charCode = 190"
                  maxlength="10"
                />
              </CCol>

              <CCol sm="6">
                <span>Store Images : </span>
                <vue-upload-multiple-image
                  @upload-success="uploadImageSuccess"
                  @before-remove="beforeRemove"
                  @edit-image="editImage"
                  :data-images="user.storeimages"
                  dragText="Drag images (many)"
                  browseText="(or) Select"
                  primaryText="Default"
                  markIsPrimaryText="Set as default"
                  :maxImage="10"
                  popupText="This image will be displayed as default"
                  dropText="Drop your file here ..."
                  accept="image/jpeg,image/png,image/jpg"
                ></vue-upload-multiple-image>
              </CCol>

              <CCol sm="6">
                <b-form-group
                  label="Facilities :"
                  v-slot="{ ariaDescribedby }"
                  v-show="user.services.includes('SelfStorage')"
                >
                  <b-form-checkbox-group
                    id="checkbox-group-1"
                    v-model="user.facilities"
                    :aria-describedby="ariaDescribedby"
                    name="flavour-1"
                    inline
                  >
                    <b-form-checkbox value="TrainConnectivity">
                      <img
                        src="../../../users/assets/images/downloadNew.png"
                        height="25"
                        width="25"
                        class="icon"
                      />
                    </b-form-checkbox>
                    <b-form-checkbox value="24Hropen">
                      <img
                        src="../../../users/assets/images/vector.png"
                        height="25"
                        width="25"
                        class="icon"
                      />
                    </b-form-checkbox>
                    <b-form-checkbox value="Webcam">
                      <img
                        src="../../../users/assets/images/video-camera.png"
                        height="25"
                        width="25"
                        class="icon"
                      />
                    </b-form-checkbox>
                    <b-form-checkbox value="wifi">
                      <img
                        src="../../../users/assets/images/wifi.png"
                        height="25"
                        width="25"
                        class="icon"
                      />
                    </b-form-checkbox>
                    <b-form-checkbox value="weather">
                      <img
                        src="../../../users/assets/images/weather.png"
                        height="25"
                        width="25"
                        class="icon"
                      />
                    </b-form-checkbox>
                  </b-form-checkbox-group>
                </b-form-group>
              </CCol>

              <CCol sm="12">
                <CInput
                  v-model="user.iframe"
                  label="IFrame (Please enter only src url)"
                  placeholder="Enter IFrame"
                  :isValid="checkIfValid('iframe')"
                  invalidFeedback="IFrame is required"
                />
                <div
                  v-if="
                    user.iframe != null &&
                    user.iframe != '' &&
                    user.iframe != undefined
                  "
                  class="image-map"
                >
                  <iframe
                    :src="user.iframe"
                    height="100%"
                    width="100%"
                    frameborder="0" 
                  ></iframe>
                </div>
              </CCol>

              <CCol sm="12" class="mt-3">
                <label>English Remarks on Selfstorage frontend:</label>
                <ckeditor v-model="user.remarks"></ckeditor>
              </CCol>

              <CCol sm="12" class="mt-3">
                <label>Chinese Remarks on Selfstorage frontend:</label>
                <ckeditor
                  v-model="user.chineseValues.chineseRemarks"
                ></ckeditor>
              </CCol>

              <CCol sm="12" class="mt-3">
                <label>English Remarks on Selfstorage details:</label>
                <ckeditor v-model="user.remarksdetail"></ckeditor>
              </CCol>

              <CCol sm="12" class="mt-3">
                <label>Chinese Remarks on Selfstorage details:</label>
                <ckeditor
                  v-model="user.chineseValues.chineseRemarksdetail"
                ></ckeditor>
              </CCol>

              <CCol sm="6" class="mt-3">
                <CInput
                  v-model="user.pagetitle"
                  label="Page Title"
                  placeholder="Enter Page Title"
                />
              </CCol>
            </CRow>
            <span>Office Hours :</span>
            <CRow>
              <CCol sm="6">
                <CRow>
                  <CCol sm="3">
                    <span>Monday:</span>
                  </CCol>
                  <CCol sm="4">
                    <span>Open Time:</span>
                    <b-form-timepicker
                      v-model="user.officehours.monstart"
                    ></b-form-timepicker>
                  </CCol>
                  <CCol sm="4">
                    <span>Close Time:</span>
                    <b-form-timepicker
                      v-model="user.officehours.monend"
                    ></b-form-timepicker>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm="3">
                    <span>Tuesday:</span>
                  </CCol>
                  <CCol sm="4">
                    <span>Open Time:</span>
                    <b-form-timepicker
                      v-model="user.officehours.tuestart"
                    ></b-form-timepicker>
                  </CCol>
                  <CCol sm="4">
                    <span>Close Time:</span>
                    <b-form-timepicker
                      v-model="user.officehours.tueend"
                    ></b-form-timepicker>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm="3">
                    <span>Wednesday:</span>
                  </CCol>
                  <CCol sm="4">
                    <span>Open Time:</span>
                    <b-form-timepicker
                      v-model="user.officehours.wedstart"
                    ></b-form-timepicker>
                  </CCol>
                  <CCol sm="4">
                    <span>Close Time:</span>
                    <b-form-timepicker
                      v-model="user.officehours.wedend"
                    ></b-form-timepicker>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm="3">
                    <span>Thursday:</span>
                  </CCol>
                  <CCol sm="4">
                    <span>Open Time:</span>
                    <b-form-timepicker
                      v-model="user.officehours.thustart"
                    ></b-form-timepicker>
                  </CCol>
                  <CCol sm="4">
                    <span>Close Time:</span>
                    <b-form-timepicker
                      v-model="user.officehours.thuend"
                    ></b-form-timepicker>
                  </CCol>
                </CRow>
              </CCol>
              <CCol sm="6">
                <CRow>
                  <CCol sm="3">
                    <span>Friday:</span>
                  </CCol>
                  <CCol sm="4">
                    <span>Open Time:</span>
                    <b-form-timepicker
                      v-model="user.officehours.fristart"
                    ></b-form-timepicker>
                  </CCol>
                  <CCol sm="4">
                    <span>Close Time:</span>
                    <b-form-timepicker
                      v-model="user.officehours.friend"
                    ></b-form-timepicker>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm="3">
                    <span>Saturday:</span>
                  </CCol>
                  <CCol sm="4">
                    <span>Open Time:</span>
                    <b-form-timepicker
                      v-model="user.officehours.satstart"
                    ></b-form-timepicker>
                  </CCol>
                  <CCol sm="4">
                    <span>Close Time:</span>
                    <b-form-timepicker
                      v-model="user.officehours.satend"
                    ></b-form-timepicker>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm="3">
                    <span>Sunday:</span>
                  </CCol>
                  <CCol sm="4">
                    <span>Open Time:</span>
                    <b-form-timepicker
                      v-model="user.officehours.sunstart"
                    ></b-form-timepicker>
                  </CCol>
                  <CCol sm="4">
                    <span>Close Time:</span>
                    <b-form-timepicker
                      v-model="user.officehours.sunend"
                    ></b-form-timepicker>
                  </CCol>
                </CRow>
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
              :to="{ name: 'Store' }"
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
import CKEditor from "ckeditor4-vue";
import { required, email } from "vuelidate/lib/validators";
import APIService from "@/services/api.service.js";
import vSelect from "vue-select";
import VueUploadMultipleImage from "vue-upload-multiple-image";
import "vue-select/dist/vue-select.css";
import Store from "@/store/index";

export default {
  name: "Storeview",
  components: {
    vSelect,
    "vue-upload-multiple-image": VueUploadMultipleImage,
    ckeditor: CKEditor.component,
  },
  created() {
    if (this.id != undefined && this.id != null) {
      Store.commit("showLoader");
      document.title = this.$store.state.projecttitle + " - Edit Store";
      APIService.getById("/getstore", this.id).then((response) => {
        Store.commit("hideLoader");
        this.$set(this, "user", response.data);
        for (var image = 0; image < response.data.storeimages.length; image++) {
          var _image = {
            default: image == 0 ? 1 : 0,
            highlight: image == 0 ? 1 : 0,
            name: response.data.storeimages[image],
            path:
              this.$store.state.apiURL +
              "/store/" +
              response.data.storeimages[image],
          };
          response.data.storeimages[image] = _image;
        }
        response.data.uploadedimages = response.data.storeimages;
      });
    } else {
      document.title = this.$store.state.projecttitle + " - Add Store";
    }
    var _optionsBranchlist = [];
    APIService.post("/getbranchforDD").then((response) => {
      for (var i = 0; i < response.data.length; i++) {
        const tag = {
          label:
            response.data[i].Name +
            (response.data[i].ChineseBranchName != undefined &&
            response.data[i].ChineseBranchName != null &&
            response.data[i].ChineseBranchName != ""
              ? " / " + response.data[i].ChineseBranchName
              : ""),
          value: response.data[i]._id,
        };
        _optionsBranchlist.push(tag);
      }
      this.optionsBranch = _optionsBranchlist;
    });
    var _optionsCity = [];
    APIService.post("/getcityforDD").then((response) => {
      for (var i = 0; i < response.data.length; i++) {
        const tag = {
          label:
            response.data[i].name +
            (response.data[i].chineseName != null &&
            response.data[i].chineseName != "" &&
            response.data[i].chineseName != undefined
              ? " / " + response.data[i].chineseName
              : ""),
          value: response.data[i]._id,
        };
        _optionsCity.push(tag);
      }
      this.optionsCity = _optionsCity;
    });
    var _optionsState = [];
    APIService.get("/getstateforDD").then((response) => {
      for (var i = 0; i < response.data.length; i++) {
        const tag = {
          label:
            response.data[i].name +
            (response.data[i].chineseName != null &&
            response.data[i].chineseName != "" &&
            response.data[i].chineseName != undefined
              ? " / " + response.data[i].chineseName
              : ""),
          value: response.data[i]._id,
        };
        _optionsState.push(tag);
      }
      this.optionsState = _optionsState;
    });
  },
  data() {
    return {
      id: this.$route.params.id,
      optionsBranch: [],
      optionsCity: [],
      optionsState: [],
      optionsfacilities: [],
      user: {
        branch: "",
        storeName: "",
        address: "",
        area: "",
        state: "",
        city: "",
        // pincode: "",
        telephoneNumber: "",
        directlinephoneNumber: "",
        whatsappNumber: "",
        email: "",
        latitude: "",
        longitude: "",
        iframe: "",
        storeimages: [],
        uploadedimages: [],
        services: ["SelfStorage"],
        facilities: [],
        remarks: "",
        remarksdetail: "",
        pagetitle: "",
        seotitle: "",
        keyword: "",
        description: "",
        officehours: {
          monstart: "",
          monend: "",
          tuestart: "",
          tueend: "",
          wedstart: "",
          wedend: "",
          thustart: "",
          thuend: "",
          fristart: "",
          friend: "",
          satstart: "",
          satend: "",
          sunstart: "",
          sunend: "",
        },
        chineseValues: {
          chineseStoreName: "",
          chineseAddress: "",
          chineseArea: "",
          chineseRemarks: "",
          chineseRemarksdetail: "",
        },
        createdBy: this.$store.state.userInfo.userId,
        parentId: this.$store.state.userInfo.userType == "Users",
      },
      submitted: false,
      modelstate_email: "",
      item: {},
    };
  },
  validations: {
    user: {
      branch: { required },
      storeName: { required },
      address: { required },
      area: { required },
      state: { required },
      city: { required },
      chineseValues: {
        chineseStoreName: { required },
        chineseAddress: { required },
        chineseArea: { required },
      },
      // pincode: { required },
      telephoneNumber: { required },
      email: { required, email },
      iframe: { required },
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
    checkIfValidChienes(fieldName) {
      const field = this.$v.user.chineseValues[fieldName];
      if (!field.$dirty) {
        return null;
      }
      return !(field.$invalid || field.$model === "");
    },
    uploadImageSuccess(formData, index, fileList) {
      console.log("data", formData, index, fileList);
      this.user.uploadedimages.push(fileList[index]);
    },
    beforeRemove(index, done, fileList) {
      console.log("index", index, fileList);
      var r = confirm("Are you sure you want to remove selected image?");
      if (r == true) {
        this.user.uploadedimages = fileList;
        this.user.storeimages = fileList;
        done();
      }
    },
    editImage(formData, index, fileList) {
      console.log("edit data", formData, index, fileList);
      this.user.uploadedimages[index] = fileList[0];
    },
    handleSubmit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.submitted = true;

      if (this.id != undefined && this.id != null && this.id != "") {
        APIService.post("/updatestore", this.user, this.id).then(() => {
          this.$successAlert("Store Updated Successfully!!!.");
          this.$router.push({ name: "Store" });
          this.submitted = false;
        });
      } else {
        APIService.post("/AddStore", this.user).then(() => {
          this.$successAlert("Store Added Successfully!!!.");
          this.$router.push({ name: "Store" });
          this.submitted = false;
        });
      }
      this.submitted = true;
    },
  },
};
</script>
<style scoped>
.image-map {
  width: 100%;
  height: 270px;
}
</style>