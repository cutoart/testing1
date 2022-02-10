<template>
  <div>
    <CCol>
      <CCard>
        <CForm @submit.prevent="handleSubmit">
          <CCardHeader>
            <strong>FAQs</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="12">
                <CInput
                  label="Question*"
                  :value.sync="$v.vmodel.question.$model"
                  v-model="vmodel.question"
                  :isValid="checkIfValid('question') && !modelstate.question"
                  placeholder="Enter Question"
                  autocomplete="off"
                  :invalidFeedback="
                    !checkIfValid('question')
                      ? 'Question is required'
                      : modelstate.question
                  "
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInput
                  label="Answer*"
                  :value.sync="$v.vmodel.answer.$model"
                  v-model="vmodel.answer"
                  :isValid="checkIfValid('answer') && !modelstate.answer"
                  placeholder="Enter Answer"
                  autocomplete="off"
                  :invalidFeedback="
                    !checkIfValid('answer')
                      ? 'Answer is required'
                      : modelstate.answer
                  "
                />
              </CCol>
            </CRow>
            <CRow>
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
            >
              Save
            </CButton>
            <CButton
              type="button"
              router-link
              :to="{ name: 'FAQs' }"
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
import Store from "@/store/index";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  name: "add-faqs",
  components: {
    vSelect,
  },

  created() {
    if (this.id != undefined && this.id != null) {
      Store.commit("showLoader");
      document.title = this.$store.state.projecttitle + " - Edit FAQs";
      APIService.getById("/FAQGetById", this.id).then((response) => {
        Store.commit("hideLoader");
        this.$set(this, "vmodel", response.data);
      });
    } else {
      document.title = this.$store.state.projecttitle + " - Add FAQs";
    }
  },
  

  data() {
    return {
      id: this.$route.params.id,
      vmodel: {
        language: "chinese",
      },
      valmodel: null,
      modelstate: {},
      submitted: false,
      optionResource: ["chinese", "english"],
    };
  },

  validations: {
    vmodel: {
      question: { required },
      answer: { required },
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
      var _vmodel = this.vmodel;
      if (this.id != undefined && this.id != null && this.id != "") {
        _vmodel.id = this.id;
      } else {
        _vmodel.id = "";
      }

      APIService.post("/CheckFAQExist", _vmodel).then((response) => {
       
        if (response && response.data) {
          if (this.vmodel.question == response.data.question) {
            this.modelstate.question = "Question already exist !";
          }
          this.submitted = false;
        } else {
          this.vmodel.userId = this.$store.state.userInfo.userId;
          if (this.id != undefined && this.id != null && this.id != "") {
            APIService.post("/UpdateFAQ", _vmodel, this.id).then(() => {
              this.$successAlert("Your data is updated.");
              this.$router.push({ name: "FAQs" });
            });
          } else {
            APIService.post("/AddFAQ", this.vmodel).then(() => {
              this.$successAlert("Your data is added.");
              this.$router.push({ name: "FAQs" });
            });
          }
        }
      });
    },
  },
};
</script>