<template>
  <div>
    <CCol>
      <CCard>
        <CForm @submit.prevent="handleSubmit">
          <CCardHeader>
            <strong v-if="id == undefined && id == null">Add District </strong>
            <strong v-if="id != undefined && id != null">Edit District </strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="6">
                <CInput
                  label="District Name*"
                  placeholder="Enter Name"
                  :isValid="checkIfValid('name')"
                  :value.sync="$v.user.name.$model"
                  :maxlength="30"
                  invalidFeedback="Name is Required"
                />
              </CCol>
              <CCol sm="6">
                <CInput
                  label="Chinese District Name*"
                  placeholder="Enter District Name"
                  :isValid="checkIfValid('chineseName')"
                  :value.sync="$v.user.chineseName.$model"
                  :maxlength="30"
                  invalidFeedback="Chinese Name is Required"
                />
              </CCol>
              <CCol sm="6">
                <span>Country</span>
                <v-select
                  style="margin-top: 8px"
                  v-model="user.stateid"
                  :options="optionsState"
                  placeholder="Select Country"
                  :class="{ 'is-invalid': $v.user.stateid.$error }"
                />
                <div v-if="!$v.user.stateid.required" class="invalid-feedback">
                  Country is required.
                </div>
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter>
            <CButton type="submit" class="mr-1" color="primary">Save</CButton>
            <CButton
              type="button"
              router-link
              :to="{ name: 'District' }"
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
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import Store from "@/store/index";

export default {
  name: "District",
  components: {
    vSelect,
  },
  created() {
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
    if (this.id != undefined && this.id != null) {
      Store.commit("showLoader");
      document.title = this.$store.state.projecttitle + " - Edit District";
      APIService.getById("/getdistrict", this.id).then((response) => {
        Store.commit("hideLoader");
        this.$set(this, "user", response.data);

        this.user.stateid = {
          label: this.optionsState
            .filter((x) => {
              return x.value == response.data.stateid;
            })
            .map((result) => {
              return result.label;
            })[0],
          value: response.data.stateid.toString(),
        };
      });
    } else {
      document.title = this.$store.state.projecttitle + " - Add District";
    }
  },
  data() {
    return {
      id: this.$route.params.id,
      optionsState: [],
      user: {
        name: "",
        stateid: "",
        chineseName: "",
        createdBy: this.$store.state.userInfo.userId,
        parentId: this.$store.state.userInfo.userType == "Users",
      },
    };
  },
  validations: {
    user: {
      name: { required },
      stateid: { required },
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
        APIService.post("/updatedistrict", this.user, this.id).then(() => {
          this.$successAlert("District Updated Successfully!!!.");
          this.$router.push({ name: "District" });
          this.submitted = false;
        });
      } else {
        APIService.post("/adddistrict", this.user).then(() => {
          this.$successAlert("District Added Successfully!!!.");
          this.$router.push({ name: "District" });
          this.submitted = false;
        });
      }
      this.submitted = true;
    },
  },
};
</script>