<template>
  <div>
    <CCol>
      <CCard>
        <CForm @submit.prevent="handleSubmit">
          <CCardHeader>
            <strong>Add Video Link</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="12">
                <CInput
                  label="Box Storage Link"
                  v-model="vmodel.boxstorage"
                  placeholder="Enter Box Storage Link"
                  autocomplete="off"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInput
                  label="Self Storage Link"
                  v-model="vmodel.selfstorage"
                  placeholder="Enter Self Storge Link"
                  autocomplete="off"
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
          </CCardFooter>
        </CForm>
      </CCard>
    </CCol>
  </div>
</template>
<script>
import APIService from "@/services/api.service.js";
export default {
  data() {
    return {
      id: this.$route.params.id,
      vmodel: {
        boxstorage: "",
        selfstorage: "",
      },
      submitted: false,
    };
  },
  created() {
    document.title = this.$store.state.projecttitle + " - Add Video Link";
    APIService.getById("/GetVideo", "").then((response) => {
      if (
        response.data != null &&
        response.data != "" &&
        response.data != undefined &&
        response.data.length > 0
      ) {
        this.vmodel = response.data[0];
      }
    });
  },
  methods: {
    handleSubmit() {
      if (
        this.vmodel._id != undefined &&
        this.vmodel._id != null &&
        this.vmodel._id != ""
      ) {
        APIService.post("/UpdateVideo", this.vmodel, this.vmodel._id).then(
          () => {
            this.$successAlert("Your data is updated.");
          }
        );
      } else {
        APIService.post("/AddVideo", this.vmodel).then(() => {
          this.$successAlert("Your data is added.");
        });
      }
    },
  },
};
</script>